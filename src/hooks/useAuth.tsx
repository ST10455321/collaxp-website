import { useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getFirebaseAuth } from "@/integrations/firebase/config";
import { errorCode } from "@/integrations/firebase/errors";
import {
  ensureAccountRecords,
  fetchProfileAndRole,
  registerAccount,
  signIn,
  signOutUser,
  type RegisterInput,
} from "@/integrations/firebase/data";
import type { Profile } from "@/integrations/firebase/types";
import { DEMO_ACCOUNTS, INSTITUTIONS, STUDENT_EMAIL_PATTERN } from "@/lib/collaxp";

export type { Profile };
export { STUDENT_EMAIL_PATTERN };

// Minimal user shape the app relies on (`user.id`, `user.email`).
export type AppUser = { id: string; email: string | null };

type AuthValue = {
  loading: boolean;
  user: AppUser | null;
  profile: Profile | null;
  role: "student" | "organiser" | "admin" | null;
  refreshProfile: () => Promise<void>;
  signUp: (input: RegisterInput) => Promise<void>;
  claimAccount: (role: "student" | "organiser") => Promise<void>;
  demoLogin: (role: "student" | "organiser") => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AuthValue["role"]>(null);
  const [loading, setLoading] = useState(true);
  // While signing up, the auth listener must not load details: the profile doc
  // doesn't exist until registerAccount finishes writing it.
  const signingUp = useRef(false);
  const loadSeq = useRef(0);

  const loadDetails = async (userId: string | undefined) => {
    const seq = ++loadSeq.current;
    if (!userId) {
      setProfile(null);
      setRole(null);
      return;
    }
    try {
      const details = await fetchProfileAndRole(userId);
      if (seq !== loadSeq.current) return; // a newer load superseded this one
      setProfile(details.profile);
      setRole(details.role);
    } catch (error) {
      console.error("[Auth] Failed to load profile", error);
      setProfile(null);
      setRole(null);
    }
  };

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (next) => {
      if (!active) return;
      setUser(next ? { id: next.uid, email: next.email } : null);
      if (!next) {
        setProfile(null);
        setRole(null);
        setLoading(false);
        return;
      }
      if (signingUp.current) return;
      void loadDetails(next.uid).finally(() => {
        if (active) setLoading(false);
      });
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const signUpAccount = async (input: RegisterInput) => {
    signingUp.current = true;
    try {
      const uid = await registerAccount(input);
      await loadDetails(uid);
    } finally {
      signingUp.current = false;
      setLoading(false);
    }
  };

  const value = useMemo<AuthValue>(
    () => ({
      loading,
      user,
      profile,
      role,
      refreshProfile: async () => {
        await loadDetails(user?.id);
      },
      signUp: signUpAccount,
      demoLogin: async (demoRole) => {
        const demo = DEMO_ACCOUNTS[demoRole];
        try {
          await signIn(demo.email, demo.password);
        } catch {
          // First use: the demo account doesn't exist yet, so create it.
          try {
            await signUpAccount({
              email: demo.email,
              password: demo.password,
              role: demoRole,
              fullName: demo.fullName,
              username: demo.fullName,
              institution: INSTITUTIONS[0]!,
            });
            return;
          } catch (error) {
            if (errorCode(error) === "auth/email-already-in-use") {
              throw new Error("The demo account exists but its password was changed.");
            }
            throw error;
          }
        }
        const current = getFirebaseAuth().currentUser;
        if (current) {
          await ensureAccountRecords(current.uid, current.email, demoRole);
          await loadDetails(current.uid);
        }
      },
      claimAccount: async (claimRole) => {
        const current = getFirebaseAuth().currentUser;
        if (!current) return;
        await ensureAccountRecords(current.uid, current.email, claimRole);
        await loadDetails(current.uid);
      },
      signOut: async () => {
        await queryClient.cancelQueries();
        queryClient.clear();
        await signOutUser();
      },
    }),
    [loading, user, profile, role, queryClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function isValidStudentEmail(email: string) {
  return STUDENT_EMAIL_PATTERN.test(email.trim());
}
