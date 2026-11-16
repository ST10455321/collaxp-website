import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit as limitTo,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
  type QueryConstraint,
} from "firebase/firestore";

import { getDb } from "../config";
import { guard } from "../errors";
import type { EventFull, EventPayload } from "../types";
import { C, col, fromSnap, getManyDocs, isPermissionDenied, ref } from "./helpers";

export function listPublishedEvents(opts: { limit?: number; fromDate?: string } = {}) {
  return guard(async () => {
    const constraints: QueryConstraint[] = [where("is_published", "==", true)];
    if (opts.fromDate) constraints.push(where("event_date", ">=", opts.fromDate));
    constraints.push(orderBy("event_date", "asc"));
    if (opts.limit) constraints.push(limitTo(opts.limit));
    const snap = await getDocs(query(col(C.events), ...constraints));
    return snap.docs.map((d) => fromSnap<EventFull>(d)!);
  });
}

export function getEvent(id: string) {
  return guard(async () => {
    try {
      return fromSnap<EventFull>(await getDoc(ref(C.events, id)));
    } catch (error) {
      // Unpublished events belong to their organiser only; everyone else sees "not found".
      if (isPermissionDenied(error)) return null;
      throw error;
    }
  });
}

export function getEventsByIds(ids: string[]) {
  return guard(() => getManyDocs<EventFull>(C.events, ids));
}

export function listOrganiserEvents(organiserId: string) {
  return guard(async () => {
    const snap = await getDocs(query(col(C.events), where("organiser_id", "==", organiserId)));
    return snap.docs
      .map((d) => fromSnap<EventFull>(d)!)
      .sort((a, b) => a.event_date.localeCompare(b.event_date));
  });
}

// Organisers link their own events to reels; students can link any published event.
export function listLinkableEvents(role: string | null, uid: string) {
  return guard(async () => {
    if (role === "organiser") {
      const own = await listOrganiserEvents(uid);
      return own.reverse().slice(0, 50);
    }
    const snap = await getDocs(
      query(
        col(C.events),
        where("is_published", "==", true),
        orderBy("event_date", "desc"),
        limitTo(50),
      ),
    );
    return snap.docs.map((d) => fromSnap<EventFull>(d)!);
  });
}

export function createEvent(organiserId: string, payload: EventPayload) {
  return guard(async () => {
    const created = await addDoc(col(C.events), {
      ...payload,
      age_restriction: payload.age_restriction ?? "PG",
      organiser_id: organiserId,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return created.id;
  });
}

export function updateEvent(id: string, payload: Partial<EventPayload>) {
  return guard(async () => {
    const { organiser_id: _ignored, ...rest } = payload;
    await updateDoc(ref(C.events, id), { ...rest, updated_at: serverTimestamp() });
  });
}

// Firestore has no ON DELETE CASCADE, so remove the event's registrations here.
export function deleteEvent(organiserId: string, id: string) {
  return guard(async () => {
    const regs = await getDocs(
      query(
        col(C.registrations),
        where("organiser_id", "==", organiserId),
        where("event_id", "==", id),
      ),
    );
    for (let i = 0; i < regs.docs.length; i += 400) {
      const batch = writeBatch(getDb());
      regs.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
    await deleteDoc(ref(C.events, id));
  });
}
