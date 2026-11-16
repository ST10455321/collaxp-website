import {
  Timestamp,
  collection,
  doc,
  getDoc,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";

import { errorCode } from "../errors";
import { getDb } from "../config";

// Firestore collection names (they mirror the old Postgres table names).
export const C = {
  profiles: "profiles",
  publicProfiles: "public_profiles",
  userRoles: "user_roles",
  events: "events",
  registrations: "event_registrations",
  notifications: "notifications",
  cartItems: "cart_items",
  orders: "orders",
  orderItems: "order_items",
  reels: "reels",
  reelLikes: "reel_likes",
  reelComments: "reel_comments",
  contentReports: "content_reports",
} as const;

export const col = (name: string) => collection(getDb(), name);
export const ref = (name: string, id: string) => doc(getDb(), name, id);

// Converts Firestore Timestamps to ISO strings so the UI can keep treating dates as strings.
export function normalize<T>(id: string, data: DocumentData): T {
  const out: Record<string, unknown> = { id };
  for (const [key, value] of Object.entries(data)) {
    out[key] = value instanceof Timestamp ? value.toDate().toISOString() : value;
  }
  return out as T;
}

export function fromSnap<T>(snap: DocumentSnapshot): T | null {
  if (!snap.exists()) return null;
  return normalize<T>(snap.id, snap.data({ serverTimestamps: "estimate" }));
}

export function isPermissionDenied(error: unknown) {
  return errorCode(error) === "permission-denied";
}

// Reads many documents by id. Unreadable/missing docs are skipped instead of failing the batch.
// (A single `in` query can't be used here: Firestore rules must be able to prove every
// possible result is readable, which they can't for mixed published/unpublished docs.)
export async function getManyDocs<T>(name: string, ids: string[]): Promise<Map<string, T>> {
  const unique = [...new Set(ids.filter(Boolean))];
  const results = await Promise.all(
    unique.map(async (id) => {
      try {
        return fromSnap<T>(await getDoc(ref(name, id)));
      } catch (error) {
        if (isPermissionDenied(error)) return null;
        throw error;
      }
    }),
  );
  const map = new Map<string, T>();
  results.forEach((row, i) => {
    if (row) map.set(unique[i]!, row);
  });
  return map;
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function sortByDate<T extends { created_at: string }>(rows: T[], dir: "asc" | "desc") {
  const sign = dir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => sign * (a.created_at ?? "").localeCompare(b.created_at ?? ""));
}
