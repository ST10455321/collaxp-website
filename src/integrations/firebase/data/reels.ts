import {
  addDoc,
  deleteDoc,
  getDocs,
  limit as limitTo,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { getFirebaseStorage } from "../config";
import { guard } from "../errors";
import type { PublicProfile, ReelBase, ReelCommentRow, ReelLike } from "../types";
import { C, chunk, col, fromSnap, getManyDocs, ref, sortByDate } from "./helpers";

export function listPublishedReels(max = 50) {
  return guard(async () => {
    const snap = await getDocs(
      query(
        col(C.reels),
        where("is_published", "==", true),
        orderBy("created_at", "desc"),
        limitTo(max),
      ),
    );
    return snap.docs.map((d) => fromSnap<ReelBase>(d)!);
  });
}

export function listOwnReels(uid: string) {
  return guard(async () => {
    const snap = await getDocs(query(col(C.reels), where("organiser_id", "==", uid)));
    return sortByDate(
      snap.docs.map((d) => fromSnap<ReelBase>(d)!),
      "desc",
    );
  });
}

export function getPublicProfiles(ids: string[]) {
  return guard(() => getManyDocs<PublicProfile>(C.publicProfiles, ids));
}

export function listLikesForReels(reelIds: string[]) {
  return guard(async () => {
    const batches = await Promise.all(
      chunk([...new Set(reelIds)], 30).map((ids) =>
        getDocs(query(col(C.reelLikes), where("reel_id", "in", ids))),
      ),
    );
    return batches.flatMap((snap) =>
      snap.docs.map((d) => ({
        reel_id: d.data()["reel_id"] as string,
        user_id: d.data()["user_id"] as string,
      })),
    ) as ReelLike[];
  });
}

// Resolves playable URLs for stored videos. `paths` are Storage object paths, e.g. "<uid>/<uuid>.mp4".
export async function getPlaybackUrls(paths: string[]) {
  const urls = await Promise.all(
    paths.map(async (path) => {
      try {
        return await getDownloadURL(storageRef(getFirebaseStorage(), path));
      } catch {
        return "";
      }
    }),
  );
  return new Map(paths.map((path, i) => [path, urls[i]!]));
}

// Doc id `${reelId}_${uid}` guarantees one like per user per reel.
export function likeReel(reelId: string, uid: string) {
  return guard(() =>
    setDoc(ref(C.reelLikes, `${reelId}_${uid}`), {
      reel_id: reelId,
      user_id: uid,
      created_at: serverTimestamp(),
    }),
  );
}

export function unlikeReel(reelId: string, uid: string) {
  return guard(() => deleteDoc(ref(C.reelLikes, `${reelId}_${uid}`)));
}

export function listReelComments(reelId: string) {
  return guard(async () => {
    const snap = await getDocs(query(col(C.reelComments), where("reel_id", "==", reelId)));
    return sortByDate(
      snap.docs.map((d) => fromSnap<ReelCommentRow>(d)!),
      "asc",
    );
  });
}

export function addReelComment(reelId: string, uid: string, body: string) {
  return guard(async () => {
    await addDoc(col(C.reelComments), {
      reel_id: reelId,
      user_id: uid,
      body,
      created_at: serverTimestamp(),
    });
  });
}

export function deleteReelComment(id: string) {
  return guard(() => deleteDoc(ref(C.reelComments, id)));
}

export function reportReel(input: {
  reporterId: string;
  reelId: string;
  reason: string;
  details: string;
}) {
  return guard(async () => {
    await addDoc(col(C.contentReports), {
      reporter_id: input.reporterId,
      reel_id: input.reelId,
      comment_id: null,
      event_id: null,
      reason: input.reason,
      details: input.details,
      status: "open",
      created_at: serverTimestamp(),
    });
  });
}

export function uploadReel(input: {
  uid: string;
  file: File;
  title: string;
  caption: string;
  eventId: string | null;
}) {
  return guard(async () => {
    const ext = input.file.name.split(".").pop() ?? "mp4";
    const path = `reels/${input.uid}/${crypto.randomUUID()}.${ext}`;
    const fileRef = storageRef(getFirebaseStorage(), path);
    await uploadBytes(fileRef, input.file, { contentType: input.file.type || "video/mp4" });

    try {
      await addDoc(col(C.reels), {
        organiser_id: input.uid,
        title: input.title,
        caption: input.caption,
        video_url: path,
        thumbnail_url: null,
        event_id: input.eventId,
        is_published: true,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    } catch (error) {
      await deleteObject(fileRef).catch(() => undefined);
      throw error;
    }
  });
}

export function setReelPublished(id: string, next: boolean) {
  return guard(() =>
    updateDoc(ref(C.reels, id), { is_published: next, updated_at: serverTimestamp() }),
  );
}

export function deleteReel(reel: { id: string; video_url: string }) {
  return guard(async () => {
    await deleteDoc(ref(C.reels, reel.id));
    await deleteObject(storageRef(getFirebaseStorage(), reel.video_url)).catch(() => undefined);
  });
}
