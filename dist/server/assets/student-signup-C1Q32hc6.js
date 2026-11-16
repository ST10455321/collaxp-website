import { a as isValidStudentEmail, l as Logo, o as useAuth } from "./router-Bmo75UHY.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.js";
import { p as INSTITUTIONS } from "./helpers-OIPvucp0.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
// src/routes/student-signup.tsx?tsr-split=component
function StudentSignup() {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [form, setForm] = useState({
		fullName: "",
		email: "",
		username: "",
		institution: INSTITUTIONS[0],
		password: "",
		confirm: ""
	});
	const [busy, setBusy] = useState(false);
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
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-14",
		children: [
			/* @__PURE__ */ jsx(Logo, { className: "animate-rise h-24 w-auto" }),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-4 text-3xl",
				children: "Sign up"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-center text-xs text-muted-foreground",
				children: "Student verification uses your institution email"
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "panel mt-8 w-full space-y-5 p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "fullName",
							children: "Full name"
						}), /* @__PURE__ */ jsx(Input, {
							id: "fullName",
							required: true,
							value: form.fullName,
							onChange: (e) => set("fullName", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "email",
								children: "Student email"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								required: true,
								value: form.email,
								onChange: (e) => set("email", e.target.value),
								placeholder: "ST10455321@rcconnect.edu.za",
								className: "bg-surface-2"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Format: ST + 8 digits @rcconnect.edu.za"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "username",
							children: "Username"
						}), /* @__PURE__ */ jsx(Input, {
							id: "username",
							value: form.username,
							onChange: (e) => set("username", e.target.value),
							placeholder: "ARCANE",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "institution",
							children: "Institution"
						}), /* @__PURE__ */ jsxs(Select, {
							value: form.institution,
							onValueChange: (v) => set("institution", v),
							children: [/* @__PURE__ */ jsx(SelectTrigger, {
								id: "institution",
								className: "bg-surface-2",
								children: /* @__PURE__ */ jsx(SelectValue, {})
							}), /* @__PURE__ */ jsx(SelectContent, { children: INSTITUTIONS.map((i) => /* @__PURE__ */ jsx(SelectItem, {
								value: i,
								children: i
							}, i)) })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ jsx(Input, {
							id: "password",
							type: "password",
							required: true,
							autoComplete: "new-password",
							value: form.password,
							onChange: (e) => set("password", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "confirm",
							children: "Confirm password"
						}), /* @__PURE__ */ jsx(Input, {
							id: "confirm",
							type: "password",
							required: true,
							autoComplete: "new-password",
							value: form.confirm,
							onChange: (e) => set("confirm", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? "Creating account…" : "Sign up"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"Already registered?",
							" ",
							/* @__PURE__ */ jsx(Link, {
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
