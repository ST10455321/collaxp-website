import { a as getManyDocs, b as levelFromXp, c as sortByDate, i as fromSnap, o as isPermissionDenied, r as col, s as ref, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { t as getDb } from "./config-B8lMgJTO.js";
import { deleteDoc, getCountFromServer, getDoc, getDocs, limit, query, runTransaction, serverTimestamp, updateDoc, where } from "firebase/firestore";
// src/integrations/firebase/data/registrations.ts
var makeTicketNo = () => `#${Math.floor(1e3 + Math.random() * 9e3)}`;
function formatNotifDate(date) {
	return (/* @__PURE__ */ new Date(`${date}T00:00:00`)).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function snapshotProfile(profile) {
	return {
		student_number: profile?.student_number ?? null,
		username: profile?.username ?? null,
		full_name: profile?.full_name ?? null,
		institution: profile?.institution ?? null
	};
}
function stageTicket(tx, uid, profile, event) {
	const regRef = ref(C.registrations, crypto.randomUUID());
	const ticketNo = makeTicketNo();
	tx.set(regRef, {
		event_id: event.id,
		user_id: uid,
		organiser_id: event.organiser_id,
		ticket_no: ticketNo,
		attended: false,
		scanned_at: null,
		profile: snapshotProfile(profile),
		created_at: serverTimestamp()
	});
	tx.set(ref(C.notifications, crypto.randomUUID()), {
		user_id: uid,
		title: `Registered: ${event.title}`,
		body: `Ticket ${ticketNo} · ${formatNotifDate(event.event_date)} · ${event.start_time}`,
		kind: "registration",
		event_id: event.id,
		is_read: false,
		created_at: serverTimestamp()
	});
	tx.set(ref(C.notifications, crypto.randomUUID()), {
		user_id: event.organiser_id,
		title: "New registration",
		body: `A student registered for ${event.title}`,
		kind: "organiser",
		event_id: event.id,
		is_read: false,
		created_at: serverTimestamp()
	});
	return {
		id: regRef.id,
		ticket_no: ticketNo
	};
}
function getMyRegistration(eventId, uid) {
	return guard(async () => {
		const d = (await getDocs(query(col(C.registrations), where("user_id", "==", uid), where("event_id", "==", eventId), limit(1)))).docs[0];
		return d ? fromSnap(d) : null;
	});
}
function registerForEvent(uid, eventId) {
	return guard(async () => {
		if (await getMyRegistration(eventId, uid)) throw new Error("You're already registered for this event.");
		return runTransaction(getDb(), async (tx) => {
			const eventSnap = await tx.get(ref(C.events, eventId));
			const profileSnap = await tx.get(ref(C.profiles, uid));
			const event = fromSnap(eventSnap);
			if (!event) throw new Error("This event is no longer available.");
			const profile = fromSnap(profileSnap);
			const ticket = stageTicket(tx, uid, profile, event);
			if (profile) {
				const xp = (profile.xp ?? 0) + (event.xp_reward ?? 50);
				tx.update(ref(C.profiles, uid), {
					xp,
					level: levelFromXp(xp),
					updated_at: serverTimestamp()
				});
			}
			return {
				id: ticket.id,
				ticket_no: ticket.ticket_no
			};
		});
	});
}
function cancelRegistration(id) {
	return guard(() => deleteDoc(ref(C.registrations, id)));
}
function cancelMyRegistrationsForEvent(uid, eventId) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.registrations), where("user_id", "==", uid), where("event_id", "==", eventId)));
		await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
	});
}
function listMyRegistrations(uid) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.registrations), where("user_id", "==", uid)));
		const rows = sortByDate(snap.docs.map((d) => fromSnap(d)), "desc");
		const events = await getManyDocs(C.events, rows.map((r) => r.event_id));
		return rows.map((r) => ({
			...r,
			event: events.get(r.event_id) ?? null
		}));
	});
}
function countMyRegistrations(uid) {
	return guard(async () => {
		return (await getCountFromServer(query(col(C.registrations), where("user_id", "==", uid)))).data().count;
	});
}
function listEventAttendees(organiserId, eventId) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.registrations), where("organiser_id", "==", organiserId), where("event_id", "==", eventId)));
		return sortByDate(snap.docs.map((d) => fromSnap(d)), "asc");
	});
}
function getOrganiserRegistrationCounts(organiserId) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.registrations), where("organiser_id", "==", organiserId)));
		const counts = {};
		snap.docs.forEach((d) => {
			const eventId = d.data()["event_id"];
			counts[eventId] = (counts[eventId] ?? 0) + 1;
		});
		return counts;
	});
}
function lookupRegistration(organiserId, opts) {
	return guard(async () => {
		let reg = null;
		try {
			if (opts.registrationId) reg = fromSnap(await getDoc(ref(C.registrations, opts.registrationId)));
			else if (opts.ticketNo) {
				const snap = await getDocs(query(col(C.registrations), where("organiser_id", "==", organiserId), where("ticket_no", "==", opts.ticketNo), limit(1)));
				reg = snap.docs[0] ? fromSnap(snap.docs[0]) : null;
			}
		} catch (error) {
			if (!isPermissionDenied(error)) throw error;
			reg = null;
		}
		if (!reg || reg.organiser_id !== organiserId) return null;
		const event = fromSnap(await getDoc(ref(C.events, reg.event_id)));
		return {
			...reg,
			event
		};
	});
}
function markAttended(registrationId) {
	return guard(async () => {
		await updateDoc(ref(C.registrations, registrationId), {
			attended: true,
			scanned_at: serverTimestamp()
		});
	});
}
function checkoutCart(uid, lines) {
	return guard(async () => {
		if (lines.length === 0) throw new Error("Your cart is empty.");
		return runTransaction(getDb(), async (tx) => {
			const profileSnap = await tx.get(ref(C.profiles, uid));
			const profile = fromSnap(profileSnap);
			const events = /* @__PURE__ */ new Map();
			for (const line of lines) {
				if (events.has(line.event_id)) continue;
				const snap = await tx.get(ref(C.events, line.event_id));
				const event = fromSnap(snap);
				if (!event) throw new Error("An event in your cart is no longer available.");
				events.set(line.event_id, event);
			}
			const orderRef = ref(C.orders, crypto.randomUUID());
			let total = 0;
			let xpGained = 0;
			for (const line of lines) {
				const event = events.get(line.event_id);
				const qty = Math.min(10, Math.max(1, line.quantity));
				total += qty * Number(event.price ?? 0);
				tx.set(ref(C.orderItems, crypto.randomUUID()), {
					order_id: orderRef.id,
					user_id: uid,
					event_id: line.event_id,
					quantity: qty,
					unit_price: Number(event.price ?? 0),
					created_at: serverTimestamp()
				});
				for (let i = 0; i < qty; i++) {
					stageTicket(tx, uid, profile, event);
					xpGained += event.xp_reward ?? 50;
				}
				tx.delete(ref(C.cartItems, `${uid}_${line.event_id}`));
			}
			tx.set(orderRef, {
				user_id: uid,
				total,
				status: "paid",
				created_at: serverTimestamp()
			});
			if (profile) {
				const xp = (profile.xp ?? 0) + xpGained;
				tx.update(ref(C.profiles, uid), {
					xp,
					level: levelFromXp(xp),
					updated_at: serverTimestamp()
				});
			}
			return orderRef.id;
		});
	});
}
export { getMyRegistration as a, listMyRegistrations as c, registerForEvent as d, countMyRegistrations as i, lookupRegistration as l, cancelRegistration as n, getOrganiserRegistrationCounts as o, checkoutCart as r, listEventAttendees as s, cancelMyRegistrationsForEvent as t, markAttended as u };
