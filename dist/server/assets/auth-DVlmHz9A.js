import { T as cn, h as STUDENT_EMAIL_PATTERN, i as fromSnap, s as ref, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { n as getFirebaseAuth, t as getDb } from "./config-B8lMgJTO.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { confirmPasswordReset, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, verifyPasswordResetCode } from "firebase/auth";
import { getDoc, serverTimestamp, writeBatch } from "firebase/firestore";
// src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
// src/integrations/firebase/data/auth.ts
function registerAccount(input) {
	return guard(async () => {
		const email = input.email.trim();
		const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, input.password);
		const uid = credential.user.uid;
		const studentNumber = STUDENT_EMAIL_PATTERN.test(email) ? email.split("@")[0].toUpperCase() : null;
		const username = input.username.trim() || studentNumber;
		const fullName = input.fullName.trim() || null;
		const institution = input.institution || null;
		const isOrganiser = input.role === "organiser";
		try {
			const batch = writeBatch(getDb());
			batch.set(ref(C.profiles, uid), {
				email,
				student_number: studentNumber,
				full_name: fullName,
				username,
				institution,
				bio: null,
				avatar_url: null,
				course: null,
				graduation_date: null,
				xp: 0,
				level: 1,
				created_at: serverTimestamp(),
				updated_at: serverTimestamp()
			});
			batch.set(ref(C.publicProfiles, uid), {
				username,
				full_name: fullName,
				avatar_url: null,
				institution,
				updated_at: serverTimestamp()
			});
			batch.set(ref(C.userRoles, uid), {
				role: input.role,
				created_at: serverTimestamp()
			});
			batch.set(ref(C.notifications, `welcome_${uid}`), {
				user_id: uid,
				title: isOrganiser ? "Organiser account created" : "Welcome to COLLAXP",
				body: isOrganiser ? "You can now create and manage campus events." : "Discover campus events, register and start earning XP.",
				kind: "welcome",
				event_id: null,
				is_read: false,
				created_at: serverTimestamp()
			});
			await batch.commit();
		} catch (error) {
			await credential.user.delete().catch(() => void 0);
			throw error;
		}
		return uid;
	});
}
function signIn(email, password) {
	return guard(async () => {
		return (await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password)).user.uid;
	});
}
function signOutUser() {
	return guard(() => signOut(getFirebaseAuth()));
}
function requestPasswordReset(email) {
	return guard(() => sendPasswordResetEmail(getFirebaseAuth(), email.trim(), { url: `${window.location.origin}/student-login` }));
}
function confirmPasswordResetWithCode(code, password) {
	return guard(async () => {
		const auth = getFirebaseAuth();
		await verifyPasswordResetCode(auth, code);
		await confirmPasswordReset(auth, code, password);
	});
}
function changePassword(password) {
	return guard(async () => {
		const user = getFirebaseAuth().currentUser;
		if (!user) throw new Error("Open the reset link from your email, or sign in first.");
		await updatePassword(user, password);
	});
}
function fetchProfileAndRole(uid) {
	return guard(async () => {
		const [profileSnap, roleSnap] = await Promise.all([getDoc(ref(C.profiles, uid)), getDoc(ref(C.userRoles, uid))]);
		return {
			profile: fromSnap(profileSnap),
			role: roleSnap.exists() ? roleSnap.data()["role"] : null
		};
	});
}
function updateProfile(uid, patch) {
	return guard(async () => {
		const batch = writeBatch(getDb());
		batch.update(ref(C.profiles, uid), {
			...patch,
			updated_at: serverTimestamp()
		});
		batch.set(ref(C.publicProfiles, uid), {
			username: patch.username,
			full_name: patch.full_name,
			avatar_url: patch.avatar_url,
			institution: patch.institution,
			updated_at: serverTimestamp()
		}, { merge: true });
		await batch.commit();
	});
}
function ensureAccountRecords(uid, email, role) {
	return guard(async () => {
		const [profileSnap, roleSnap] = await Promise.all([getDoc(ref(C.profiles, uid)), getDoc(ref(C.userRoles, uid))]);
		if (profileSnap.exists() && roleSnap.exists()) return;
		const batch = writeBatch(getDb());
		if (!roleSnap.exists()) batch.set(ref(C.userRoles, uid), {
			role,
			created_at: serverTimestamp()
		});
		if (!profileSnap.exists()) {
			const studentNumber = email && STUDENT_EMAIL_PATTERN.test(email) ? email.split("@")[0].toUpperCase() : null;
			const username = studentNumber ?? (email ? email.split("@")[0] : null);
			batch.set(ref(C.profiles, uid), {
				email,
				student_number: studentNumber,
				full_name: null,
				username,
				institution: null,
				bio: null,
				avatar_url: null,
				course: null,
				graduation_date: null,
				xp: 0,
				level: 1,
				created_at: serverTimestamp(),
				updated_at: serverTimestamp()
			});
			batch.set(ref(C.publicProfiles, uid), {
				username,
				full_name: null,
				avatar_url: null,
				institution: null,
				updated_at: serverTimestamp()
			});
			batch.set(ref(C.notifications, `welcome_${uid}`), {
				user_id: uid,
				title: role === "organiser" ? "Organiser account created" : "Welcome to COLLAXP",
				body: role === "organiser" ? "You can now create and manage campus events." : "Discover campus events, register and start earning XP.",
				kind: "welcome",
				event_id: null,
				is_read: false,
				created_at: serverTimestamp()
			});
		}
		await batch.commit();
	});
}
export { registerAccount as a, signOutUser as c, fetchProfileAndRole as i, updateProfile as l, confirmPasswordResetWithCode as n, requestPasswordReset as o, ensureAccountRecords as r, signIn as s, changePassword as t, Button as u };
