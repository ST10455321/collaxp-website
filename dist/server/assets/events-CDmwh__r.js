import { t as getDb } from "./config-B8lMgJTO.js";
import { a as getManyDocs, i as fromSnap, o as isPermissionDenied, r as col, s as ref, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { addDoc, deleteDoc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from "firebase/firestore";
// src/integrations/firebase/data/events.ts
function listPublishedEvents(opts = {}) {
	return guard(async () => {
		const constraints = [where("is_published", "==", true)];
		if (opts.fromDate) constraints.push(where("event_date", ">=", opts.fromDate));
		constraints.push(orderBy("event_date", "asc"));
		if (opts.limit) constraints.push(limit(opts.limit));
		return (await getDocs(query(col(C.events), ...constraints))).docs.map((d) => fromSnap(d));
	});
}
function getEvent(id) {
	return guard(async () => {
		try {
			return fromSnap(await getDoc(ref(C.events, id)));
		} catch (error) {
			if (isPermissionDenied(error)) return null;
			throw error;
		}
	});
}
function getEventsByIds(ids) {
	return guard(() => getManyDocs(C.events, ids));
}
function listOrganiserEvents(organiserId) {
	return guard(async () => {
		return (await getDocs(query(col(C.events), where("organiser_id", "==", organiserId)))).docs.map((d) => fromSnap(d)).sort((a, b) => a.event_date.localeCompare(b.event_date));
	});
}
function listLinkableEvents(role, uid) {
	return guard(async () => {
		if (role === "organiser") return (await listOrganiserEvents(uid)).reverse().slice(0, 50);
		return (await getDocs(query(col(C.events), where("is_published", "==", true), orderBy("event_date", "desc"), limit(50)))).docs.map((d) => fromSnap(d));
	});
}
function createEvent(organiserId, payload) {
	return guard(async () => {
		return (await addDoc(col(C.events), {
			...payload,
			age_restriction: payload.age_restriction ?? "PG",
			organiser_id: organiserId,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp()
		})).id;
	});
}
function updateEvent(id, payload) {
	return guard(async () => {
		const { organiser_id: _ignored, ...rest } = payload;
		await updateDoc(ref(C.events, id), {
			...rest,
			updated_at: serverTimestamp()
		});
	});
}
function deleteEvent(organiserId, id) {
	return guard(async () => {
		const regs = await getDocs(query(col(C.registrations), where("organiser_id", "==", organiserId), where("event_id", "==", id)));
		for (let i = 0; i < regs.docs.length; i += 400) {
			const batch = writeBatch(getDb());
			regs.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
			await batch.commit();
		}
		await deleteDoc(ref(C.events, id));
	});
}
export { listLinkableEvents as a, updateEvent as c, getEventsByIds as i, deleteEvent as n, listOrganiserEvents as o, getEvent as r, listPublishedEvents as s, createEvent as t };
