import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { l as updateProfile, u as Button } from "./auth-DVlmHz9A.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.js";
import { t as Textarea } from "./textarea-DQriKw-b.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { i as countMyRegistrations } from "./registrations-CNP-eODM.js";
import { _ as formatDate, p as INSTITUTIONS } from "./helpers-OIPvucp0.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
// src/routes/_authenticated/profile.tsx?tsr-split=component
function ProfilePage() {
	const { profile, user, role, refreshProfile } = useAuth();
	const [form, setForm] = useState({
		username: "",
		full_name: "",
		bio: "",
		institution: INSTITUTIONS[0],
		avatar_url: "",
		course: "",
		graduation_date: ""
	});
	const [busy, setBusy] = useState(false);
	useEffect(() => {
		if (!profile) return;
		setForm({
			username: profile.username ?? "",
			full_name: profile.full_name ?? "",
			bio: profile.bio ?? "",
			institution: profile.institution ?? INSTITUTIONS[0],
			avatar_url: profile.avatar_url ?? "",
			course: profile.course ?? "",
			graduation_date: profile.graduation_date ?? ""
		});
	}, [profile]);
	const { data: registrationCount = 0 } = useQuery({
		queryKey: ["profile-registrations", user?.id],
		enabled: Boolean(user?.id),
		queryFn: () => countMyRegistrations(user.id)
	});
	const save = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await updateProfile(user.id, {
				username: form.username.trim() || null,
				full_name: form.full_name.trim() || null,
				bio: form.bio.trim() || null,
				institution: form.institution,
				avatar_url: form.avatar_url.trim() || null,
				course: form.course.trim() || null,
				graduation_date: form.graduation_date || null
			});
		} catch (error) {
			setBusy(false);
			toast.error(error.message);
			return;
		}
		setBusy(false);
		await refreshProfile();
		toast.success("Profile saved");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-2xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ jsxs(Reveal, {
			className: "panel flex flex-col items-center p-8 text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "h-24 w-24 overflow-hidden rounded-full border-2 border-primary neon-ring",
					children: form.avatar_url ? /* @__PURE__ */ jsx("img", {
						src: form.avatar_url,
						alt: "",
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ jsx("div", {
						className: "flex h-full w-full items-center justify-center bg-[var(--gradient-neon)] font-display text-2xl text-primary-foreground",
						children: (profile?.username ?? profile?.student_number ?? "C").slice(0, 2).toUpperCase()
					})
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "mt-4 text-2xl",
					children: ["@", profile?.username ?? "student"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "font-display text-sm text-muted-foreground",
					children: profile?.institution
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 font-display text-sm text-primary",
					children: profile?.student_number ?? (role === "organiser" ? "Organiser account" : user?.email)
				}),
				profile?.course && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: profile.course
				}),
				profile?.graduation_date && /* @__PURE__ */ jsxs("p", {
					className: "mt-1 font-display text-xs uppercase tracking-widest text-primary",
					children: ["Graduating ", formatDate(profile.graduation_date)]
				}),
				profile?.bio && /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: profile.bio
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 grid w-full grid-cols-3 gap-3",
					children: [
						{
							label: "Events",
							value: registrationCount
						},
						{
							label: "XP",
							value: profile?.xp ?? 0
						},
						{
							label: "Level",
							value: profile?.level ?? 1
						}
					].map((s) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-surface-2 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-xl",
							children: s.value
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[11px] uppercase tracking-widest text-muted-foreground",
							children: s.label
						})]
					}, s.label))
				})
			]
		}), /* @__PURE__ */ jsx(Reveal, {
			delay: 90,
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: save,
				className: "panel mt-6 space-y-5 p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-lg",
						children: "Personal information"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "username",
							children: "Username"
						}), /* @__PURE__ */ jsx(Input, {
							id: "username",
							value: form.username,
							onChange: (e) => setForm((p) => ({
								...p,
								username: e.target.value
							})),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "full_name",
							children: "Full name"
						}), /* @__PURE__ */ jsx(Input, {
							id: "full_name",
							value: form.full_name,
							onChange: (e) => setForm((p) => ({
								...p,
								full_name: e.target.value
							})),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "bio",
							children: "Bio"
						}), /* @__PURE__ */ jsx(Textarea, {
							id: "bio",
							rows: 3,
							value: form.bio,
							onChange: (e) => setForm((p) => ({
								...p,
								bio: e.target.value
							})),
							placeholder: "young, wild and free",
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
							onValueChange: (v) => setForm((p) => ({
								...p,
								institution: v
							})),
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
							htmlFor: "course",
							children: "Course / qualification"
						}), /* @__PURE__ */ jsx(Input, {
							id: "course",
							value: form.course,
							onChange: (e) => setForm((p) => ({
								...p,
								course: e.target.value
							})),
							placeholder: "e.g. Diploma in Marketing Management",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "graduation_date",
							children: "Graduation date"
						}), /* @__PURE__ */ jsx(Input, {
							id: "graduation_date",
							type: "date",
							value: form.graduation_date,
							onChange: (e) => setForm((p) => ({
								...p,
								graduation_date: e.target.value
							})),
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx(Label, {
							htmlFor: "avatar_url",
							children: "Avatar image URL"
						}), /* @__PURE__ */ jsx(Input, {
							id: "avatar_url",
							value: form.avatar_url,
							onChange: (e) => setForm((p) => ({
								...p,
								avatar_url: e.target.value
							})),
							placeholder: "https://…",
							className: "bg-surface-2"
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: busy ? "Saving…" : "Save"
					})
				]
			})
		})]
	});
}
export { ProfilePage as component };
