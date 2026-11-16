import { l as Logo, o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { t as EventCard } from "./EventCard-DRq6At-e.mjs";
import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { s as listPublishedEvents } from "./events-CDmwh__r.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { U as ArrowRight, i as Users, l as Sparkles, o as Trophy, z as CalendarCheck } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-Cp38JPGz.js
var import_jsx_runtime = require_jsx_runtime();
var highlights = [
	{
		icon: CalendarCheck,
		title: "Discover events",
		body: "Campus tours, sharing sessions, theatre and culture — across every institution."
	},
	{
		icon: Users,
		title: "Register in seconds",
		body: "One tap registration with your student number. Your ticket lands in My Events."
	},
	{
		icon: Trophy,
		title: "Earn XP",
		body: "XP, levels and badges are the bonus for showing up and living campus life."
	}
];
function Home() {
	const { user, profile } = useAuth();
	const { data: events = [] } = useQuery({
		queryKey: ["events", "featured"],
		queryFn: async () => {
			return await listPublishedEvents({ limit: 6 });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full animate-pulse-glow",
				style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent) 0%, transparent 65%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-rise space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Digital year book"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl leading-tight sm:text-5xl md:text-6xl",
							children: [
								"Your campus",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"experience,",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary text-glow",
									children: "collected"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-md text-base text-muted-foreground",
							children: user ? `Welcome back, ${profile?.student_number ?? profile?.username ?? "student"}. Here is what is happening on campus.` : "COLLAXP is where students post their college experience, campus events and award ceremonies — even if you don't go to the same institution."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/discover",
									children: ["Discover events ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: user ? "/dashboard" : "/student-signup",
									children: user ? "My dashboard" : "Create student account"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Students sign in with",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-primary",
									children: "ST########@rcconnect.edu.za"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "animate-float w-[86%] max-w-[440px] drop-shadow-[0_20px_80px_rgba(204,34,224,0.35)]" })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto w-full max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: highlights.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: i * 90,
					className: "panel hover-lift p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(h.icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-lg",
							children: h.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: h.body
						})
					]
				}, h.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl sm:text-3xl",
					children: "Happening soon"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Live events published by campus organisers."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/discover",
					className: "font-display text-xs uppercase tracking-widest text-primary transition-opacity hover:opacity-80",
					children: "View all →"
				})]
			}), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "panel p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: "No events published yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
						children: "Organisers publish campus events from the organiser dashboard. Once an event goes live it appears here instantly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/organiser-login",
							children: "Organiser access"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: events.map((event, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event })
				}, event.id))
			})]
		})
	] });
}
export { Home as component };
