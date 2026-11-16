import { t as EventCard } from "./EventCard-DRq6At-e.js";
import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { t as Progress } from "./progress-Bkl795H7.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { t as countUnreadNotifications } from "./notifications-B5GODNMG.js";
import { c as listMyRegistrations } from "./registrations-CNP-eODM.js";
import { s as listPublishedEvents } from "./events-CDmwh__r.js";
import { S as xpToNextLevel, x as levelProgress } from "./helpers-OIPvucp0.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Bell, CalendarCheck, Compass, Trophy, Zap } from "lucide-react";
// src/routes/_authenticated/dashboard.tsx?tsr-split=component
function Dashboard() {
	const { profile, user, role } = useAuth();
	const { data: registrations = [] } = useQuery({
		queryKey: ["my-events", user?.id],
		enabled: Boolean(user?.id),
		queryFn: () => listMyRegistrations(user.id)
	});
	const { data: unread = 0 } = useQuery({
		queryKey: [
			"notifications",
			"unread",
			user?.id
		],
		enabled: Boolean(user?.id),
		queryFn: () => countUnreadNotifications(user.id)
	});
	const { data: upcoming = [] } = useQuery({
		queryKey: ["events", "upcoming"],
		queryFn: async () => await listPublishedEvents({
			fromDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			limit: 3
		})
	});
	const xp = profile?.xp ?? 0;
	const stats = [
		{
			label: "Registered events",
			value: registrations.length,
			icon: CalendarCheck
		},
		{
			label: "Total XP",
			value: xp,
			icon: Zap
		},
		{
			label: "Level",
			value: profile?.level ?? 1,
			icon: Trophy
		},
		{
			label: "Unread alerts",
			value: unread,
			icon: Bell
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs(Reveal, {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
						children: role === "organiser" ? "Organiser" : profile?.institution ?? "COLLAXP"
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "mt-1 text-3xl sm:text-4xl",
						children: ["Welcome, ", profile?.student_number ?? profile?.username ?? user?.email]
					}),
					profile?.full_name && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: profile.full_name
					})
				] }), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/discover",
						children: [/* @__PURE__ */ jsx(Compass, { className: "mr-2 h-4 w-4" }), " Discover events"]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ jsxs(Reveal, {
					delay: i * 70,
					className: "panel hover-lift p-5",
					children: [
						/* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5 text-primary" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 font-display text-3xl",
							children: s.value
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ jsxs(Reveal, {
				delay: 80,
				className: "panel mt-6 p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "font-display text-lg",
							children: ["Level ", profile?.level ?? 1]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								xpToNextLevel(xp),
								" XP to level ",
								(profile?.level ?? 1) + 1
							]
						})]
					}),
					/* @__PURE__ */ jsx(Progress, {
						value: levelProgress(xp),
						className: "mt-4"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "XP is a bonus for taking part — the events come first."
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsxs(Reveal, {
					className: "mb-4 flex items-end justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl",
						children: "Your next events"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/my-events",
						className: "font-display text-xs uppercase tracking-widest text-primary",
						children: "My events →"
					})]
				}), registrations.length === 0 ? /* @__PURE__ */ jsxs(Reveal, {
					className: "panel p-8 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "You have not registered for anything yet."
					}), /* @__PURE__ */ jsx(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/discover",
							children: "Find an event"
						})
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: registrations.filter((r) => r.event).slice(0, 3).map((r, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ jsx(EventCard, { event: r.event })
					}, r.id))
				})]
			}),
			upcoming.length > 0 && /* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsx(Reveal, {
					className: "mb-4",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-2xl",
						children: "Happening on campus"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: upcoming.map((e, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ jsx(EventCard, { event: e })
					}, e.id))
				})]
			})
		]
	});
}
export { Dashboard as component };
