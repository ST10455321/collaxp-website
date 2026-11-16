import {
  deleteDoc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit as limitTo,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
  type Transaction,
} from "firebase/firestore";

import { levelFromXp } from "@/lib/collaxp";

import { getDb } from "../config";
import { guard } from "../errors";
import type {
  EventFull,
  Profile,
  RegistrationProfile,
  RegistrationRow,
  RegistrationWithEvent,
} from "../types";
import {
  C,
  col,
  fromSnap,
  getManyDocs,
  isPermissionDenied,
  ref,
  sortByDate,
} from "./helpers";

const makeTicketNo = () => `#${Math.floor(1000 + Math.random() * 9000)}`;

function formatNotifDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function snapshotProfile(profile: Profile | null): RegistrationProfile {
  return {
    student_number: profile?.student_number ?? null,
    username: profile?.username ?? null,
    full_name: profile?.full_name ?? null,
    institution: profile?.institution ?? null,
  };
}

// Replaces the old `handle_registration` trigger. Must be called after all reads of the
// transaction. Creates the ticket and both notifications; the caller applies the XP.
function stageTicket(
  tx: Transaction,
  uid: string,
  profile: Profile | null,
  event: EventFull,
) {
  const regRef = ref(C.registrations, crypto.randomUUID());
  const ticketNo = makeTicketNo();

  tx.set(regRef, {
    event_id: event.id,
    user_id: uid,
    organiser_id: event.organiser_id,
    ticket_no: ticketNo,
    attended: false,
    scanned_at: null,
    profile: snapshotProfile(profile), // denormalised so organisers can list attendees
    created_at: serverTimestamp(),
  });

  tx.set(ref(C.notifications, crypto.randomUUID()), {
    user_id: uid,
    title: `Registered: ${event.title}`,
    body: `Ticket ${ticketNo} · ${formatNotifDate(event.event_date)} · ${event.start_time}`,
    kind: "registration",
    event_id: event.id,
    is_read: false,
    created_at: serverTimestamp(),
  });

  tx.set(ref(C.notifications, crypto.randomUUID()), {
    user_id: event.organiser_id,
    title: "New registration",
    body: `A student registered for ${event.title}`,
    kind: "organiser",
    event_id: event.id,
    is_read: false,
    created_at: serverTimestamp(),
  });

  return { id: regRef.id, ticket_no: ticketNo };
}

export function getMyRegistration(eventId: string, uid: string) {
  return guard(async () => {
    const snap = await getDocs(
      query(
        col(C.registrations),
        where("user_id", "==", uid),
        where("event_id", "==", eventId),
        limitTo(1),
      ),
    );
    const d = snap.docs[0];
    return d ? fromSnap<RegistrationRow>(d) : null;
  });
}

export function registerForEvent(uid: string, eventId: string) {
  return guard(async () => {
    if (await getMyRegistration(eventId, uid)) {
      throw new Error("You're already registered for this event.");
    }
    return runTransaction(getDb(), async (tx) => {
      const eventSnap = await tx.get(ref(C.events, eventId));
      const profileSnap = await tx.get(ref(C.profiles, uid));
      const event = fromSnap<EventFull>(eventSnap);
      if (!event) throw new Error("This event is no longer available.");
      const profile = fromSnap<Profile>(profileSnap);

      const ticket = stageTicket(tx, uid, profile, event);
      if (profile) {
        const xp = (profile.xp ?? 0) + (event.xp_reward ?? 50);
        tx.update(ref(C.profiles, uid), {
          xp,
          level: levelFromXp(xp),
          updated_at: serverTimestamp(),
        });
      }
      return { id: ticket.id, ticket_no: ticket.ticket_no };
    });
  });
}

export function cancelRegistration(id: string) {
  return guard(() => deleteDoc(ref(C.registrations, id)));
}

export function cancelMyRegistrationsForEvent(uid: string, eventId: string) {
  return guard(async () => {
    const snap = await getDocs(
      query(
        col(C.registrations),
        where("user_id", "==", uid),
        where("event_id", "==", eventId),
      ),
    );
    await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
  });
}

export function listMyRegistrations(uid: string) {
  return guard(async (): Promise<RegistrationWithEvent[]> => {
    const snap = await getDocs(query(col(C.registrations), where("user_id", "==", uid)));
    const rows = sortByDate(
      snap.docs.map((d) => fromSnap<RegistrationRow>(d)!),
      "desc",
    );
    const events = await getManyDocs<EventFull>(
      C.events,
      rows.map((r) => r.event_id),
    );
    return rows.map((r) => ({ ...r, event: events.get(r.event_id) ?? null }));
  });
}

export function countMyRegistrations(uid: string) {
  return guard(async () => {
    const snap = await getCountFromServer(
      query(col(C.registrations), where("user_id", "==", uid)),
    );
    return snap.data().count;
  });
}

export function listEventAttendees(organiserId: string, eventId: string) {
  return guard(async () => {
    const snap = await getDocs(
      query(
        col(C.registrations),
        where("organiser_id", "==", organiserId),
        where("event_id", "==", eventId),
      ),
    );
    return sortByDate(
      snap.docs.map((d) => fromSnap<RegistrationRow>(d)!),
      "asc",
    );
  });
}

export function getOrganiserRegistrationCounts(organiserId: string) {
  return guard(async () => {
    const snap = await getDocs(
      query(col(C.registrations), where("organiser_id", "==", organiserId)),
    );
    const counts: Record<string, number> = {};
    snap.docs.forEach((d) => {
      const eventId = d.data()["event_id"] as string;
      counts[eventId] = (counts[eventId] ?? 0) + 1;
    });
    return counts;
  });
}

// Finds a registration for the scanner. Only the event's organiser can read it (see rules).
export function lookupRegistration(
  organiserId: string,
  opts: { registrationId?: string | undefined; ticketNo?: string | undefined },
) {
  return guard(async (): Promise<RegistrationWithEvent | null> => {
    let reg: RegistrationRow | null = null;
    try {
      if (opts.registrationId) {
        reg = fromSnap<RegistrationRow>(await getDoc(ref(C.registrations, opts.registrationId)));
      } else if (opts.ticketNo) {
        const snap = await getDocs(
          query(
            col(C.registrations),
            where("organiser_id", "==", organiserId),
            where("ticket_no", "==", opts.ticketNo),
            limitTo(1),
          ),
        );
        reg = snap.docs[0] ? fromSnap<RegistrationRow>(snap.docs[0]) : null;
      }
    } catch (error) {
      if (!isPermissionDenied(error)) throw error;
      reg = null;
    }
    if (!reg || reg.organiser_id !== organiserId) return null;
    const event = fromSnap<EventFull>(await getDoc(ref(C.events, reg.event_id)));
    return { ...reg, event };
  });
}

export function markAttended(registrationId: string) {
  return guard(async () => {
    await updateDoc(ref(C.registrations, registrationId), {
      attended: true,
      scanned_at: serverTimestamp(),
    });
  });
}

export type CheckoutLine = { event_id: string; quantity: number };

// One transaction: order + order items + a ticket per seat + XP + clearing the cart.
export function checkoutCart(uid: string, lines: CheckoutLine[]) {
  return guard(async () => {
    if (lines.length === 0) throw new Error("Your cart is empty.");
    return runTransaction(getDb(), async (tx) => {
      const profileSnap = await tx.get(ref(C.profiles, uid));
      const profile = fromSnap<Profile>(profileSnap);

      const events = new Map<string, EventFull>();
      for (const line of lines) {
        if (events.has(line.event_id)) continue;
        const snap = await tx.get(ref(C.events, line.event_id));
        const event = fromSnap<EventFull>(snap);
        if (!event) throw new Error("An event in your cart is no longer available.");
        events.set(line.event_id, event);
      }

      const orderRef = ref(C.orders, crypto.randomUUID());
      let total = 0;
      let xpGained = 0;

      for (const line of lines) {
        const event = events.get(line.event_id)!;
        const qty = Math.min(10, Math.max(1, line.quantity));
        total += qty * Number(event.price ?? 0);

        tx.set(ref(C.orderItems, crypto.randomUUID()), {
          order_id: orderRef.id,
          user_id: uid,
          event_id: line.event_id,
          quantity: qty,
          unit_price: Number(event.price ?? 0),
          created_at: serverTimestamp(),
        });

        for (let i = 0; i < qty; i++) {
          stageTicket(tx, uid, profile, event);
          xpGained += event.xp_reward ?? 50;
        }
        tx.delete(ref(C.cartItems, `${uid}_${line.event_id}`));
      }

      tx.set(orderRef, { user_id: uid, total, status: "paid", created_at: serverTimestamp() });

      if (profile) {
        const xp = (profile.xp ?? 0) + xpGained;
        tx.update(ref(C.profiles, uid), {
          xp,
          level: levelFromXp(xp),
          updated_at: serverTimestamp(),
        });
      }
      return orderRef.id;
    });
  });
}
