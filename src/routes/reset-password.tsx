import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword, confirmPasswordResetWithCode } from "@/integrations/firebase/data";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — COLLAXP" },
      {
        name: "description",
        content: "Set a new password for your COLLAXP student or organiser account.",
      },
      { property: "og:title", content: "Reset Password — COLLAXP" },
      { property: "og:description", content: "Set a new COLLAXP account password." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setBusy(true);
    try {
      // Firebase reset emails carry a one-time code (?oobCode=...). If there isn't one,
      // fall back to changing the password of the currently signed-in user.
      const code = new URLSearchParams(window.location.search).get("oobCode");
      if (code) {
        await confirmPasswordResetWithCode(code, password);
        toast.success("Password updated", { description: "Sign in with your new password." });
        void navigate({ to: "/student-login", replace: true });
      } else {
        await changePassword(password);
        toast.success("Password updated");
        void navigate({ to: "/dashboard", replace: true });
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-16">
      <Logo className="h-20 w-auto" />
      <h1 className="mt-4 text-3xl">New password</h1>
      <form onSubmit={submit} className="panel mt-8 w-full space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <Input
            id="new-password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-surface-2"
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={busy}>
          {busy ? "Saving…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
