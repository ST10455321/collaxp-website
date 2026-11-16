import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyPasswordResetCode,
} from "firebase/auth";
import { getDoc, serverTimestamp, writeBatch } from "firebase/firestore";

import { STUDENT_EMAIL_PATTERN } from "@/lib/collaxp";

import { getDb, getFirebaseAuth } from "../config";
import { guard } from "../errors";
import type { AppRole, Profile } from "../types";
import { C, fromSnap, ref } from "./helpers";

export type RegisterInput = {
  email: string;
  password: string;
  role: "student" | "organiser";
  fullName: string;
  username: string;
  institution: string;
};

// Replaces the old `handle_new_user` Postgres trigger: after the Auth user exists we create
// the profile, public profile, role and welcome notification in one atomic batch.
export function registerAccount(input: RegisterInput) {
  return guard(async () => {
    const email = input.email.trim();
    const credential = await createUserWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      input.password,
    );
    const uid = credential.user.uid;

    const studentNumber = STUDENT_EMAIL_PATTERN.test(email)
      ? email.split("@")[0]!.toUpperCase()
      : null;
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
        updated_at: serverTimestamp(),
      });
      batch.set(ref(C.publicProfiles, uid), {
        username,
        full_name: fullName,
        avatar_url: null,
        institution,
        updated_at: serverTimestamp(),
      });
      batch.set(ref(C.userRoles, uid), { role: input.role, created_at: serverTimestamp() });
      batch.set(ref(C.notifications, `welcome_${uid}`), {
        user_id: uid,
        title: isOrganiser ? "Organiser account created" : "Welcome to COLLAXP",
        body: isOrganiser
          ? "You can now create and manage campus events."
          : "Discover campus events, register and start earning XP.",
        kind: "welcome",
        event_id: null,
        is_read: false,
        created_at: serverTimestamp(),
      });
      await batch.commit();
    } catch (error) {
      // Don't leave a half-created account behind.
      await credential.user.delete().catch(() => undefined);
      throw error;
    }
    return uid;
  });
}

export function signIn(email: string, password: string) {
  return guard(async () => {
    const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
    return credential.user.uid;
  });
}

export function signOutUser() {
  return guard(() => signOut(getFirebaseAuth()));
}

export function requestPasswordReset(email: string) {
  return guard(() =>
    sendPasswordResetEmail(getFirebaseAuth(), email.trim(), {
      url: `${window.location.origin}/student-login`,
    }),
  );
}

// For when the Firebase email template's action URL points at /reset-password
// (it passes the one-time code as ?oobCode=...).
export function confirmPasswordResetWithCode(code: string, password: string) {
  return guard(async () => {
    const auth = getFirebaseAuth();
    await verifyPasswordResetCode(auth, code);
    await confirmPasswordReset(auth, code, password);
  });
}

export function changePassword(password: string) {
  return guard(async () => {
    const user = getFirebaseAuth().currentUser;
    if (!user) throw new Error("Open the reset link from your email, or sign in first.");
    await updatePassword(user, password);
  });
}

export function fetchProfileAndRole(uid: string) {
  return guard(async () => {
    const [profileSnap, roleSnap] = await Promise.all([
      getDoc(ref(C.profiles, uid)),
      getDoc(ref(C.userRoles, uid)),
    ]);
    const profile = fromSnap<Profile>(profileSnap);
    const roleValue = roleSnap.exists() ? (roleSnap.data()["role"] as AppRole) : null;
    return { profile, role: roleValue };
  });
}

export type ProfilePatch = {
  username: string | null;
  full_name: string | null;
  bio: string | null;
  institution: string | null;
  avatar_url: string | null;
  course: string | null;
  graduation_date: string | null;
};

// Replaces the old `sync_public_profile` trigger by writing both docs together.
export function updateProfile(uid: string, patch: ProfilePatch) {
  return guard(async () => {
    const batch = writeBatch(getDb());
    batch.update(ref(C.profiles, uid), { ...patch, updated_at: serverTimestamp() });
    batch.set(
      ref(C.publicProfiles, uid),
      {
        username: patch.username,
        full_name: patch.full_name,
        avatar_url: patch.avatar_url,
        institution: patch.institution,
        updated_at: serverTimestamp(),
      },
      { merge: true },
    );
    await batch.commit();
  });
}

// For accounts that exist in Firebase Auth but have no Firestore records yet (for example
// users imported from the old system). Creates only what is missing; never overwrites.
export function ensureAccountRecords(
  uid: string,
  email: string | null,
  role: "student" | "organiser",
) {
  return guard(async () => {
    const [profileSnap, roleSnap] = await Promise.all([
      getDoc(ref(C.profiles, uid)),
      getDoc(ref(C.userRoles, uid)),
    ]);
    if (profileSnap.exists() && roleSnap.exists()) return;

    const batch = writeBatch(getDb());
    if (!roleSnap.exists()) {
      batch.set(ref(C.userRoles, uid), { role, created_at: serverTimestamp() });
    }
    if (!profileSnap.exists()) {
      const studentNumber =
        email && STUDENT_EMAIL_PATTERN.test(email) ? email.split("@")[0]!.toUpperCase() : null;
      const username = studentNumber ?? (email ? email.split("@")[0]! : null);
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
        updated_at: serverTimestamp(),
      });
      batch.set(ref(C.publicProfiles, uid), {
        username,
        full_name: null,
        avatar_url: null,
        institution: null,
        updated_at: serverTimestamp(),
      });
      batch.set(ref(C.notifications, `welcome_${uid}`), {
        user_id: uid,
        title: role === "organiser" ? "Organiser account created" : "Welcome to COLLAXP",
        body:
          role === "organiser"
            ? "You can now create and manage campus events."
            : "Discover campus events, register and start earning XP.",
        kind: "welcome",
        event_id: null,
        is_read: false,
        created_at: serverTimestamp(),
      });
    }
    await batch.commit();
  });
}
