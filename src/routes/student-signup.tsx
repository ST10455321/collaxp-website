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
import { isValidStudentEmail, useAuth } from "@/hooks/useAuth";
import { INSTITUTIONS } from "@/lib/collaxp";

export const Route = createFileRoute("/student-signup")({
  head: () => ({
    meta: [
      { title: "Student Sign Up — COLLAXP" },
      {
        name: "description",
        content:
          "Create your COLLAXP student account with your ST########@rcconnect.edu.za email, verify your institution and start earning XP at campus events.",
      },
      { property: "og:title", content: "Student Sign Up — COLLAXP" },
      {
        property: "og:description",
        content: "Create your verified COLLAXP student account in under a minute.",
      },
    ],
  }),
  component: StudentSignup,
});

function StudentSignup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    institution: INSTITUTIONS[0]!,
    password: "",
    confirm: "",
  });
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidStudentEmail(form.email)) {
      toast.error("Student email must look like ST10455321@rcconnect.edu.za");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setBusy(true);
    const email = form.email.trim().toUpperCase();
    try {
      await signUp({
        email,
        password: form.password,
        role: "student",
        fullName: form.fullName.trim(),
        username: form.username.trim() || email.split("@")[0]!,
        institution: form.institution,
      });
    } catch (error) {
      setBusy(false);
      toast.error((error as Error).message);
      return;
    }
    setBusy(false);
    toast.success(`Welcome, ${email.split("@")[0]}`);
    void navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-14">
      <Logo className="animate-rise h-24 w-auto" />
      <h1 className="mt-4 text-3xl">Sign up</h1>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Student verification uses your institution email
      </p>

      <form onSubmit={submit} className="panel mt-8 w-full space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            required
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className="bg-surface-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Student email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="ST10455321@rcconnect.edu.za"
            className="bg-surface-2"
          />
          <p className="text-[11px] text-muted-foreground">
            Format: ST + 8 digits @rcconnect.edu.za
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={form.username}
            onChange={(e) => set("username", e.target.value)}
            placeholder="ARCANE"
            className="bg-surface-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Select
            value={form.institution}
            onValueChange={(v) => set("institution", v)}
          >
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
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            className="bg-surface-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            required
            autoComplete="new-password"
            value={form.confirm}
            onChange={(e) => set("confirm", e.target.value)}
            className="bg-surface-2"
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Creating account…" : "Sign up"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/student-login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
