import { r as getFirebaseStorage } from "./config-B8lMgJTO.js";
import { a as getManyDocs, c as sortByDate, i as fromSnap, n as chunk, r as col, s as ref$1, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { addDoc, deleteDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
// src/integrations/firebase/data/reels.ts
function listPublishedReels(max = 50) {
	return guard(async () => {
		return (await getDocs(query(col(C.reels), where("is_published", "==", true), orderBy("created_at", "desc"), limit(max)))).docs.map((d) => fromSnap(d));
	});
}
function listOwnReels(uid) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.reels), where("organiser_id", "==", uid)));
		return sortByDate(snap.docs.map((d) => fromSnap(d)), "desc");
	});
}
function getPublicProfiles(ids) {
	return guard(() => getManyDocs(C.publicProfiles, ids));
}
function listLikesForReels(reelIds) {
	return guard(async () => {
		return (await Promise.all(chunk([...new Set(reelIds)], 30).map((ids) => getDocs(query(col(C.reelLikes), where("reel_id", "in", ids)))))).flatMap((snap) => snap.docs.map((d) => ({
			reel_id: d.data()["reel_id"],
			user_id: d.data()["user_id"]
		})));
	});
}
async function getPlaybackUrls(paths) {
	const urls = await Promise.all(paths.map(async (path) => {
		try {
			return await getDownloadURL(ref(getFirebaseStorage(), path));
		} catch {
			return "";
		}
	}));
	return new Map(paths.map((path, i) => [path, urls[i]]));
}
function likeReel(reelId, uid) {
	return guard(() => setDoc(ref$1(C.reelLikes, `${reelId}_${uid}`), {
		reel_id: reelId,
		user_id: uid,
		created_at: serverTimestamp()
	}));
}
function unlikeReel(reelId, uid) {
	return guard(() => deleteDoc(ref$1(C.reelLikes, `${reelId}_${uid}`)));
}
function listReelComments(reelId) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.reelComments), where("reel_id", "==", reelId)));
		return sortByDate(snap.docs.map((d) => fromSnap(d)), "asc");
	});
}
function addReelComment(reelId, uid, body) {
	return guard(async () => {
		await addDoc(col(C.reelComments), {
			reel_id: reelId,
			user_id: uid,
			body,
			created_at: serverTimestamp()
		});
	});
}
function deleteReelComment(id) {
	return guard(() => deleteDoc(ref$1(C.reelComments, id)));
}
function reportReel(input) {
	return guard(async () => {
		await addDoc(col(C.contentReports), {
			reporter_id: input.reporterId,
			reel_id: input.reelId,
			comment_id: null,
			event_id: null,
			reason: input.reason,
			details: input.details,
			status: "open",
			created_at: serverTimestamp()
		});
	});
}
function uploadReel(input) {
	return guard(async () => {
		const ext = input.file.name.split(".").pop() ?? "mp4";
		const path = `reels/${input.uid}/${crypto.randomUUID()}.${ext}`;
		const fileRef = ref(getFirebaseStorage(), path);
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
				updated_at: serverTimestamp()
			});
		} catch (error) {
			await deleteObject(fileRef).catch(() => void 0);
			throw error;
		}
	});
}
function setReelPublished(id, next) {
	return guard(() => updateDoc(ref$1(C.reels, id), {
		is_published: next,
		updated_at: serverTimestamp()
	}));
}
function deleteReel(reel) {
	return guard(async () => {
		await deleteDoc(ref$1(C.reels, reel.id));
		await deleteObject(ref(getFirebaseStorage(), reel.video_url)).catch(() => void 0);
	});
}
export { getPublicProfiles as a, listOwnReels as c, reportReel as d, setReelPublished as f, getPlaybackUrls as i, listPublishedReels as l, uploadReel as m, deleteReel as n, likeReel as o, unlikeReel as p, deleteReelComment as r, listLikesForReels as s, addReelComment as t, listReelComments as u };
