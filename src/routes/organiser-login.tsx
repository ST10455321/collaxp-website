import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { fetchProfileAndRole, signIn, signOutUser } from "@/integrations/firebase/data";
import { DEMO_ACCOUNTS, INSTITUTIONS } from "@/lib/collaxp";

export const Route = createFileRoute("/organiser-login")({
  head: () => ({
    meta: [
      { title: "Organiser Access — COLLAXP" },
      {
        name: "description",
        content:
          "Separate organiser sign in and registration for institutions and venues to publish and manage campus events on COLLAXP.",
      },
      { property: "og:title", content: "Organiser Access — COLLAXP" },
      {
        property: "og:description",
        content: "Sign in as an organiser to create and manage campus events.",
      },
    ],
  }),
  component: OrganiserAuth,
});

function OrganiserAuth() {
  const navigate = useNavigate();
  const { signUp, claimAccount, demoLogin } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    orgName: "",
    institution: INSTITUTIONS[0]!,
  });
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const signInAsDemo = async () => {
    setBusy(true);
    try {
      await demoLogin("organiser");
      toast.success("Signed in with the demo organiser account");
      void navigate({ to: "/organiser", replace: true });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    if (mode === "login") {
      try {
        const uid = await signIn(form.email, form.password);
        await claimAccount("organiser");
        const { role } = await fetchProfileAndRole(uid);
        if (role !== "organiser") {
          await signOutUser();
          setBusy(false);
          toast.error("This account is not an organiser account");
          return;
        }
      } catch (error) {
        setBusy(false);
        toast.error((error as Error).message);
        return;
      }
      setBusy(false);
      toast.success("Signed in as organiser");
      void navigate({ to: "/organiser", replace: true });
      return;
    }

    if (form.password.length < 8) {
      setBusy(false);
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await signUp({
        email: form.email,
        password: form.password,
        role: "organiser",
        fullName: form.orgName.trim(),
        username: form.orgName.trim(),
        institution: form.institution,
      });
    } catch (error) {
      setBusy(false);
      toast.error((error as Error).message);
      return;
    }
    setBusy(false);
    toast.success("Organiser account ready");
    void navigate({ to: "/organiser", replace: true });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-14">
      <Logo className="animate-rise h-24 w-auto" />
      <h1 className="mt-4 text-center text-3xl">Organiser</h1>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Separate access for institutions, societies and venues
      </p>

      <div className="mt-6 flex w-full rounded-full border border-border bg-surface p-1">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full py-2 font-display text-[11px] uppercase tracking-widest transition-all duration-300 ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="panel mt-6 w-full space-y-5 p-6">
        {mode === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="orgName">Organisation name</Label>
              <Input
                id="orgName"
                required
                value={form.orgName}
                onChange={(e) => set("orgName", e.target.value)}
                placeholder="Rosebank College Events"
                className="bg-surface-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution / venue</Label>
              <Select value={form.institution} onValueChange={(v) => set("institution", v)}>
                <SelectTrigger id="institution" className="bg-surface-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INSTITUTIONS.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="orgEmail">Work email</Label>
          <Input
            id="orgEmail"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="events@institution.ac.za"
            className="bg-surface-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="orgPassword">Password</Label>
          <Input
            id="orgPassword"
            type="password"
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            className="bg-surface-2"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy
            ? "Please wait…"
            : mode === "login"
              ? "Login as organiser"
              : "Create organiser account"}
        </Button>

        {mode === "login" && (
          <>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={busy}
              onClick={() => void signInAsDemo()}
            >
              Use demo organiser account
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Demo: {DEMO_ACCOUNTS.organiser.email} / {DEMO_ACCOUNTS.organiser.password}
            </p>
          </>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Student instead?{" "}
          <Link to="/student-login" className="text-primary hover:underline">
            Student login
          </Link>
        </p>
      </form>
    </div>
  );
}
