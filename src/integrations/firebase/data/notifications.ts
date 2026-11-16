import {
  deleteDoc,
  getCountFromServer,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { getDb } from "../config";
import { guard } from "../errors";
import type { NotificationRow } from "../types";
import { C, col, fromSnap, ref, sortByDate } from "./helpers";

export function listNotifications(uid: string) {
  return guard(async () => {
    const snap = await getDocs(query(col(C.notifications), where("user_id", "==", uid)));
    return sortByDate(
      snap.docs.map((d) => fromSnap<NotificationRow>(d)!),
      "desc",
    );
  });
}

export function countUnreadNotifications(uid: string) {
  return guard(async () => {
    const snap = await getCountFromServer(
      query(col(C.notifications), where("user_id", "==", uid), where("is_read", "==", false)),
    );
    return snap.data().count;
  });
}

export function markAllNotificationsRead(uid: string) {
  return guard(async () => {
    const snap = await getDocs(
      query(col(C.notifications), where("user_id", "==", uid), where("is_read", "==", false)),
    );
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = writeBatch(getDb());
      snap.docs.slice(i, i + 400).forEach((d) => batch.update(d.ref, { is_read: true }));
      await batch.commit();
    }
  });
}

export function setNotificationRead(id: string, isRead: boolean) {
  return guard(() => updateDoc(ref(C.notifications, id), { is_read: isRead }));
}

export function deleteNotification(id: string) {
  return guard(() => deleteDoc(ref(C.notifications, id)));
}
