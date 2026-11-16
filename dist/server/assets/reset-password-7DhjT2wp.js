import { l as Logo } from "./router-Bmo75UHY.js";
import { n as confirmPasswordResetWithCode, t as changePassword, u as Button } from "./auth-DVlmHz9A.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
// src/routes/reset-password.tsx?tsr-split=component
function ResetPassword() {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}
		setBusy(true);
		try {
			const code = new URLSearchParams(window.location.search).get("oobCode");
			if (code) {
				await confirmPasswordResetWithCode(code, password);
				toast.success("Password updated", { description: "Sign in with your new password." });
				navigate({
					to: "/student-login",
					replace: true
				});
			} else {
				await changePassword(password);
				toast.success("Password updated");
				navigate({
					to: "/dashboard",
					replace: true
				});
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-16",
		children: [
			/* @__PURE__ */ jsx(Logo, { className: "h-20 w-auto" }),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-4 text-3xl",
				children: "New password"
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "panel mt-8 w-full space-y-5 p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "new-password",
						children: "New password"
					}), /* @__PURE__ */ jsx(Input, {
						id: "new-password",
						type: "password",
						required: true,
						autoComplete: "new-password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "bg-surface-2"
					})]
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: busy,
					children: busy ? "Saving…" : "Update password"
				})]
			})
		]
	});
}
export { ResetPassword as component };
