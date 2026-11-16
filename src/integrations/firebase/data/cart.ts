import {
  deleteDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { getDb } from "../config";
import { guard } from "../errors";
import type { CartItemRow, EventFull } from "../types";
import { C, col, fromSnap, getManyDocs, ref, sortByDate } from "./helpers";

export function listCartItems(uid: string) {
  return guard(async (): Promise<CartItemRow[]> => {
    const snap = await getDocs(query(col(C.cartItems), where("user_id", "==", uid)));
    const rows = sortByDate(
      snap.docs.map((d) => fromSnap<Omit<CartItemRow, "event">>(d)!),
      "asc",
    );
    const events = await getManyDocs<EventFull>(
      C.events,
      rows.map((r) => r.event_id),
    );
    // Drop lines whose event was deleted or unpublished (the old DB cascaded these away).
    return rows
      .map((r) => ({ ...r, event: events.get(r.event_id) ?? null }))
      .filter((r) => r.event !== null);
  });
}

// Doc id is `${uid}_${eventId}`, which enforces one cart line per user + event.
export function addToCart(uid: string, eventId: string, quantity: number) {
  return guard(() => {
    const cartRef = ref(C.cartItems, `${uid}_${eventId}`);
    return runTransaction(getDb(), async (tx) => {
      const existing = await tx.get(cartRef);
      if (existing.exists()) {
        const current = Number(existing.data()["quantity"] ?? 0);
        tx.update(cartRef, {
          quantity: Math.min(10, current + quantity),
          updated_at: serverTimestamp(),
        });
      } else {
        tx.set(cartRef, {
          user_id: uid,
          event_id: eventId,
          quantity: Math.min(10, Math.max(1, quantity)),
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
      }
    });
  });
}

export function setCartQuantity(id: string, quantity: number) {
  return guard(async () => {
    if (quantity < 1) {
      await deleteDoc(ref(C.cartItems, id));
      return;
    }
    await updateDoc(ref(C.cartItems, id), {
      quantity: Math.min(10, quantity),
      updated_at: serverTimestamp(),
    });
  });
}

export function removeCartItem(id: string) {
  return guard(() => deleteDoc(ref(C.cartItems, id)));
}
