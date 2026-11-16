import { t as EventCard } from "./EventCard-DRq6At-e.mjs";
import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { t as Progress } from "./progress-Bkl795H7.mjs";
import { t as countUnreadNotifications } from "./notifications-B5GODNMG.mjs";
import { c as listMyRegistrations } from "./registrations-CNP-eODM.mjs";
import { s as listPublishedEvents } from "./events-CDmwh__r.mjs";
import { S as levelProgress, T as xpToNextLevel } from "./helpers-OIPvucp0.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Bell, E as Compass, o as Trophy, t as Zap, z as CalendarCheck } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/dashboard-DL3exkGz.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
						children: role === "organiser" ? "Organiser" : profile?.institution ?? "COLLAXP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 text-3xl sm:text-4xl",
						children: ["Welcome, ", profile?.student_number ?? profile?.username ?? user?.email]
					}),
					profile?.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: profile.full_name
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/discover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "mr-2 h-4 w-4" }), " Discover events"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 70,
					className: "panel hover-lift p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 80,
				className: "panel mt-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-lg",
							children: ["Level ", profile?.level ?? 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								xpToNextLevel(xp),
								" XP to level ",
								(profile?.level ?? 1) + 1
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: levelProgress(xp),
						className: "mt-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "XP is a bonus for taking part — the events come first."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mb-4 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Your next events"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/my-events",
						className: "font-display text-xs uppercase tracking-widest text-primary",
						children: "My events →"
					})]
				}), registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "panel p-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "You have not registered for anything yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/discover",
							children: "Find an event"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: registrations.filter((r) => r.event).slice(0, 3).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: r.event })
					}, r.id))
				})]
			}),
			upcoming.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Happening on campus"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: upcoming.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event: e })
					}, e.id))
				})]
			})
		]
	});
}
export { Dashboard as component };
