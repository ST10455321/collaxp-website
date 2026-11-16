import { t as getDb } from "./config-B8lMgJTO.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp, collection, doc, getDoc } from "firebase/firestore";
// src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// src/integrations/firebase/errors.ts
var MESSAGES = {
	"auth/invalid-credential": "Incorrect email or password.",
	"auth/invalid-login-credentials": "Incorrect email or password.",
	"auth/wrong-password": "Incorrect email or password.",
	"auth/user-not-found": "Incorrect email or password.",
	"auth/email-already-in-use": "An account with this email already exists.",
	"auth/weak-password": "Password is too weak — use at least 8 characters.",
	"auth/invalid-email": "That email address doesn't look right.",
	"auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
	"auth/network-request-failed": "Network error. Check your connection and try again.",
	"auth/user-disabled": "This account has been disabled.",
	"auth/expired-action-code": "This reset link has expired. Request a new one.",
	"auth/invalid-action-code": "This reset link is invalid or has already been used.",
	"auth/requires-recent-login": "Please sign in again, then retry.",
	"permission-denied": "You don't have permission to do that.",
	unauthenticated: "Please sign in and try again.",
	unavailable: "Service temporarily unavailable. Please try again.",
	"storage/unauthorized": "You don't have permission to upload that file.",
	"storage/canceled": "Upload cancelled.",
	"storage/quota-exceeded": "Storage quota exceeded."
};
function errorCode(error) {
	if (error && typeof error === "object" && "code" in error) {
		const code = error.code;
		return typeof code === "string" ? code : void 0;
	}
}
function friendlyMessage(error) {
	const code = errorCode(error);
	if (code) {
		const key = code.replace(/^firestore\//, "");
		if (MESSAGES[key]) return MESSAGES[key];
		if (MESSAGES[code]) return MESSAGES[code];
	}
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
}
async function guard(fn) {
	try {
		return await fn();
	} catch (error) {
		const wrapped = new Error(friendlyMessage(error));
		wrapped.code = errorCode(error);
		throw wrapped;
	}
}
// src/lib/collaxp.ts
var INSTITUTIONS = [
	"Rosebank College",
	"University of Johannesburg",
	"University of the Witwatersrand",
	"Gauteng City College",
	"Joburg Theatre"
];
var CATEGORIES = [
	"Campus",
	"Culture",
	"Music",
	"Theatre",
	"Sport",
	"Career",
	"Seminar",
	"Rally",
	"Graduation"
];
var EVENT_TYPES = [
	{
		value: "ticketed",
		label: "Ticketed event"
	},
	{
		value: "seminar",
		label: "Seminar (RSVP)"
	},
	{
		value: "rally",
		label: "Campaign rally (RSVP)"
	}
];
function isRsvpType(type) {
	return type === "seminar" || type === "rally";
}
function eventTypeLabel(type) {
	return EVENT_TYPES.find((t) => t.value === type)?.label ?? "Ticketed event";
}
var REPORT_REASONS = [
	"Spam or scam",
	"Harassment or hate speech",
	"Nudity or sexual content",
	"Violence or dangerous content",
	"Misinformation",
	"Other"
];
var DEMO_ACCOUNTS = {
	student: {
		email: "ST00000000@rcconnect.edu.za",
		password: "DemoStudent123!",
		fullName: "Demo Student"
	},
	organiser: {
		email: "demo.organiser@collaxp.demo",
		password: "DemoOrganiser123!",
		fullName: "Demo Organiser"
	}
};
var STUDENT_EMAIL_PATTERN = /^ST\d{8}@rcconnect\.edu\.za$/i;
function levelFromXp(xp) {
	return Math.max(1, Math.floor(xp / 250) + 1);
}
function levelProgress(xp) {
	return Math.round(xp % 250 / 250 * 100);
}
function xpToNextLevel(xp) {
	return 250 - xp % 250;
}
var BADGES = [
	{
		name: "First Steps",
		description: "Register for your first event",
		requirement: 1
	},
	{
		name: "Campus Regular",
		description: "Register for 3 events",
		requirement: 3
	},
	{
		name: "Culture Vulture",
		description: "Register for 5 events",
		requirement: 5
	},
	{
		name: "Year Book Legend",
		description: "Register for 10 events",
		requirement: 10
	}
];
function formatPrice(price) {
	return price <= 0 ? "Free" : `R${Number(price).toFixed(2)}`;
}
function formatDate(date) {
	return (/* @__PURE__ */ new Date(`${date}T00:00:00`)).toLocaleDateString("en-ZA", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
// src/integrations/firebase/data/helpers.ts
var C = {
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
	contentReports: "content_reports"
};
var col = (name) => collection(getDb(), name);
var ref = (name, id) => doc(getDb(), name, id);
function normalize(id, data) {
	const out = { id };
	for (const [key, value] of Object.entries(data)) out[key] = value instanceof Timestamp ? value.toDate().toISOString() : value;
	return out;
}
function fromSnap(snap) {
	if (!snap.exists()) return null;
	return normalize(snap.id, snap.data({ serverTimestamps: "estimate" }));
}
function isPermissionDenied(error) {
	return errorCode(error) === "permission-denied";
}
async function getManyDocs(name, ids) {
	const unique = [...new Set(ids.filter(Boolean))];
	const results = await Promise.all(unique.map(async (id) => {
		try {
			return fromSnap(await getDoc(ref(name, id)));
		} catch (error) {
			if (isPermissionDenied(error)) return null;
			throw error;
		}
	}));
	const map = /* @__PURE__ */ new Map();
	results.forEach((row, i) => {
		if (row) map.set(unique[i], row);
	});
	return map;
}
function chunk(items, size) {
	const out = [];
	for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
	return out;
}
function sortByDate(rows, dir) {
	const sign = dir === "asc" ? 1 : -1;
	return [...rows].sort((a, b) => sign * (a.created_at ?? "").localeCompare(b.created_at ?? ""));
}
export { errorCode as C, xpToNextLevel as S, cn as T, formatDate as _, getManyDocs as a, levelFromXp as b, sortByDate as c, DEMO_ACCOUNTS as d, EVENT_TYPES as f, eventTypeLabel as g, STUDENT_EMAIL_PATTERN as h, fromSnap as i, BADGES as l, REPORT_REASONS as m, chunk as n, isPermissionDenied as o, INSTITUTIONS as p, col as r, ref as s, C as t, CATEGORIES as u, formatPrice as v, guard as w, levelProgress as x, isRsvpType as y };
