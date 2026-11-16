import { o as __toESM } from "../_runtime.mjs";
import { a as isValidStudentEmail, h as signIn, l as Logo, m as requestPasswordReset, o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { t as Input } from "./input-DDsObxxJ.mjs";
import { t as Label } from "./label-CfH-19Jn.mjs";
import { i as DEMO_ACCOUNTS } from "./helpers-OIPvucp0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/student-login-Dha9OGup.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentLogin() {
	const navigate = useNavigate();
	const { user, role, loading, claimAccount, demoLogin } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user && role !== "organiser") navigate({
			to: "/dashboard",
			replace: true
		});
	}, [
		loading,
		user,
		role,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		if (!isValidStudentEmail(email)) {
			toast.error("Use your student email in the format ST########@rcconnect.edu.za");
			return;
		}
		setBusy(true);
		try {
			await signIn(email.trim().toUpperCase(), password);
			await claimAccount("student");
		} catch (error) {
			setBusy(false);
			toast.error(error.message);
			return;
		}
		setBusy(false);
		toast.success("Signed in");
		navigate({
			to: "/dashboard",
			replace: true
		});
	};
	const signInAsDemo = async () => {
		setBusy(true);
		try {
			await demoLogin("student");
			toast.success("Signed in with the demo student account");
			navigate({
				to: "/dashboard",
				replace: true
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setBusy(false);
		}
	};
	const reset = async () => {
		if (!isValidStudentEmail(email)) {
			toast.error("Enter your student email first");
			return;
		}
		try {
			await requestPasswordReset(email.trim().toUpperCase());
			toast.success("Password reset email sent");
		} catch (error) {
			toast.error(error.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "animate-rise h-24 w-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl",
				children: "Login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "panel mt-8 w-full space-y-5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Student email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "ST10455321@rcconnect.edu.za",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							autoComplete: "current-password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void reset(),
						className: "font-display text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary",
						children: "Forgot password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						size: "lg",
						disabled: busy,
						children: busy ? "Signing in…" : "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						disabled: busy,
						onClick: () => void signInAsDemo(),
						children: "Use demo student account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-[11px] text-muted-foreground",
						children: [
							"Demo: ",
							DEMO_ACCOUNTS.student.email,
							" / ",
							DEMO_ACCOUNTS.student.password
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"New here?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/student-signup",
								className: "text-primary hover:underline",
								children: "Sign up"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/organiser-login",
								className: "text-primary hover:underline",
								children: "Organiser login"
							})
						]
					})
				]
			})
		]
	});
}
export { StudentLogin as component };
