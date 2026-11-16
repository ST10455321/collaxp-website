import { l as Logo, o as useAuth } from "./router-Bmo75UHY.js";
import { c as signOutUser, i as fetchProfileAndRole, s as signIn, u as Button } from "./auth-DVlmHz9A.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.js";
import { d as DEMO_ACCOUNTS, p as INSTITUTIONS } from "./helpers-OIPvucp0.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
// src/routes/organiser-login.tsx?tsr-split=component
function OrganiserAuth() {
	const navigate = useNavigate();
	const { signUp, claimAccount, demoLogin } = useAuth();
	const [mode, setMode] = useState("login");
	const [form, setForm] = useState({
		email: "",
		password: "",
		orgName: "",
		institution: INSTITUTIONS[0]
	});
	const [busy, setBusy] = useState(false);
	const set = (k, v) => setForm((p) => ({
		...p,
		[k]: v
	}));
	const signInAsDemo = async () => {
		setBusy(true);
		try {
			await demoLogin("organiser");
			toast.success("Signed in with the demo organiser account");
			navigate({
				to: "/organiser",
				replace: true
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setBusy(false);
		}
	};
	const submit = async (e) => {
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
				toast.error(error.message);
				return;
			}
			setBusy(false);
			toast.success("Signed in as organiser");
			navigate({
				to: "/organiser",
				replace: true
			});
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
				institution: form.institution
			});
		} catch (error) {
			setBusy(false);
			toast.error(error.message);
			return;
		}
		setBusy(false);
		toast.success("Organiser account ready");
		navigate({
			to: "/organiser",
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex w-full max-w-md flex-col items-center px-4 py-14",
		children: [
			/* @__PURE__ */ jsx(Logo, { className: "animate-rise h-24 w-auto" }),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-4 text-center text-3xl",
				children: "Organiser"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-center text-xs text-muted-foreground",
				children: "Separate access for institutions, societies and venues"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6 flex w-full rounded-full border border-border bg-surface p-1",
				children: ["login", "register"].map((m) => /* @__PURE__ */ jsx("button", {
					onClick: () => setMode(m),
					className: `flex-1 rounded-full py-2 font-display text-[11px] uppercase tracking-widest transition-all duration-300 ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: m === "login" ? "Login" : "Register"
				}, m))
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "panel mt-6 w-full space-y-5 p-6",
				children: [
					mode === "register" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "orgName",
							children: "Organisation name"
						}), /* @__PURE__ */ jsx(Input, {
							id: "orgName",
							required: true,
							value: form.orgName,
							onChange: (e) => set("orgName", e.target.value),
							placeholder: "Rosebank College Events",
							className: "bg-surface-2"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "institution",
							children: "Institution / venue"
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
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "orgEmail",
							children: "Work email"
						}), /* @__PURE__ */ jsx(Input, {
							id: "orgEmail",
							type: "email",
							required: true,
							value: form.email,
							onChange: (e) => set("email", e.target.value),
							placeholder: "events@institution.ac.za",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "orgPassword",
							children: "Password"
						}), /* @__PURE__ */ jsx(Input, {
							id: "orgPassword",
							type: "password",
							required: true,
							autoComplete: mode === "login" ? "current-password" : "new-password",
							value: form.password,
							onChange: (e) => set("password", e.target.value),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? "Please wait…" : mode === "login" ? "Login as organiser" : "Create organiser account"
					}),
					mode === "login" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						disabled: busy,
						onClick: () => void signInAsDemo(),
						children: "Use demo organiser account"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-center text-[11px] text-muted-foreground",
						children: [
							"Demo: ",
							DEMO_ACCOUNTS.organiser.email,
							" / ",
							DEMO_ACCOUNTS.organiser.password
						]
					})] }),
					/* @__PURE__ */ jsxs("p", {
						className: "text-center text-xs text-muted-foreground",
						children: [
							"Student instead?",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/student-login",
								className: "text-primary hover:underline",
								children: "Student login"
							})
						]
					})
				]
			})
		]
	});
}
export { OrganiserAuth as component };
