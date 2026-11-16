import { t as getDb } from "./config-B8lMgJTO.js";
import { c as sortByDate, i as fromSnap, r as col, s as ref, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { deleteDoc, getCountFromServer, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
// src/integrations/firebase/data/notifications.ts
function listNotifications(uid) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.notifications), where("user_id", "==", uid)));
		return sortByDate(snap.docs.map((d) => fromSnap(d)), "desc");
	});
}
function countUnreadNotifications(uid) {
	return guard(async () => {
		return (await getCountFromServer(query(col(C.notifications), where("user_id", "==", uid), where("is_read", "==", false)))).data().count;
	});
}
function markAllNotificationsRead(uid) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.notifications), where("user_id", "==", uid), where("is_read", "==", false)));
		for (let i = 0; i < snap.docs.length; i += 400) {
			const batch = writeBatch(getDb());
			snap.docs.slice(i, i + 400).forEach((d) => batch.update(d.ref, { is_read: true }));
			await batch.commit();
		}
	});
}
function setNotificationRead(id, isRead) {
	return guard(() => updateDoc(ref(C.notifications, id), { is_read: isRead }));
}
function deleteNotification(id) {
	return guard(() => deleteDoc(ref(C.notifications, id)));
}
export { setNotificationRead as a, markAllNotificationsRead as i, deleteNotification as n, listNotifications as r, countUnreadNotifications as t };
