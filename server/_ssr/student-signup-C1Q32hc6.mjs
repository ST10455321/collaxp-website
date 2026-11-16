import { o as __toESM } from "../_runtime.mjs";
import { a as isValidStudentEmail, l as Logo, o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { t as Input } from "./input-DDsObxxJ.mjs";
import { t as Label } from "./label-CfH-19Jn.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.mjs";
import { o as INSTITUTIONS } from "./helpers-OIPvucp0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/student-signup-C1Q32hc6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentSignup() {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		email: "",
		username: "",
		institution: INSTITUTIONS[0],
		password: "",
		confirm: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const set = (key, value) => setForm((prev) => ({
		...prev,
		[key]: value
	}));
	const submit = async (e) => {
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
				username: form.username.trim() || email.split("@")[0],
				institution: form.institution
			});
		} catch (error) {
			setBusy(false);
			toast.error(error.message);
			return;
		}
		setBusy(false);
		toast.success(`Welcome, ${email.split("@")[0]}`);
		navigate({
			to: "/dashboard",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "animate-rise h-24 w-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl",
				children: "Sign up"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center text-xs text-muted-foreground",
				children: "Student verification uses your institution email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "panel mt-8 w-full space-y-5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fullName",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "fullName",
							required: true,
							value: form.fullName,
							onChange: (e) => set("fullName", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Student email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								required: true,
								value: form.email,
								onChange: (e) => set("email", e.target.value),
								placeholder: "ST10455321@rcconnect.edu.za",
								className: "bg-surface-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Format: ST + 8 digits @rcconnect.edu.za"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "username",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "username",
							value: form.username,
							onChange: (e) => set("username", e.target.value),
							placeholder: "ARCANE",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "institution",
							children: "Institution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.institution,
							onValueChange: (v) => set("institution", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "institution",
								className: "bg-surface-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INSTITUTIONS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: i,
								children: i
							}, i)) })]
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
							required: true,
							autoComplete: "new-password",
							value: form.password,
							onChange: (e) => set("password", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm",
							type: "password",
							required: true,
							autoComplete: "new-password",
							value: form.confirm,
							onChange: (e) => set("confirm", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? "Creating account…" : "Sign up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"Already registered?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/student-login",
								className: "text-primary hover:underline",
								children: "Login"
							})
						]
					})
				]
			})
		]
	});
}
export { StudentSignup as component };
