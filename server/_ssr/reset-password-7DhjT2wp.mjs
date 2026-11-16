import { o as __toESM } from "../_runtime.mjs";
import { d as changePassword, f as confirmPasswordResetWithCode, l as Logo, u as Button } from "./router-Bmo75UHY.mjs";
import { t as Input } from "./input-DDsObxxJ.mjs";
import { t as Label } from "./label-CfH-19Jn.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/reset-password-7DhjT2wp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-20 w-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl",
				children: "New password"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "panel mt-8 w-full space-y-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "new-password",
						children: "New password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "new-password",
						type: "password",
						required: true,
						autoComplete: "new-password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "bg-surface-2"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
