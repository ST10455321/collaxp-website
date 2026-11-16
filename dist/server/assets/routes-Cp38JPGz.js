import { l as Logo, o as useAuth } from "./router-Bmo75UHY.js";
import { t as EventCard } from "./EventCard-DRq6At-e.js";
import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { s as listPublishedEvents } from "./events-CDmwh__r.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarCheck, Sparkles, Trophy, Users } from "lucide-react";
// src/routes/index.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full animate-pulse-glow",
				style: { background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent) 0%, transparent 65%)" }
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "animate-rise space-y-6",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-primary",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }), " Digital year book"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "text-4xl leading-tight sm:text-5xl md:text-6xl",
							children: [
								"Your campus",
								/* @__PURE__ */ jsx("br", {}),
								"experience,",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-primary text-glow",
									children: "collected"
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-md text-base text-muted-foreground",
							children: user ? `Welcome back, ${profile?.student_number ?? profile?.username ?? "student"}. Here is what is happening on campus.` : "COLLAXP is where students post their college experience, campus events and award ceremonies — even if you don't go to the same institution."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								size: "lg",
								asChild: true,
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/discover",
									children: ["Discover events ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							}), /* @__PURE__ */ jsx(Button, {
								size: "lg",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: user ? "/dashboard" : "/student-signup",
									children: user ? "My dashboard" : "Create student account"
								})
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Students sign in with",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-display text-primary",
									children: "ST########@rcconnect.edu.za"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative flex justify-center",
					children: /* @__PURE__ */ jsx(Logo, { className: "animate-float w-[86%] max-w-[440px] drop-shadow-[0_20px_80px_rgba(204,34,224,0.35)]" })
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto w-full max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: highlights.map((h, i) => /* @__PURE__ */ jsxs(Reveal, {
					delay: i * 90,
					className: "panel hover-lift p-6",
					children: [
						/* @__PURE__ */ jsx(h.icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-4 font-display text-lg",
							children: h.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: h.body
						})
					]
				}, h.title))
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6",
			children: [/* @__PURE__ */ jsxs(Reveal, {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-2xl sm:text-3xl",
					children: "Happening soon"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Live events published by campus organisers."
				})] }), /* @__PURE__ */ jsx(Link, {
					to: "/discover",
					className: "font-display text-xs uppercase tracking-widest text-primary transition-opacity hover:opacity-80",
					children: "View all →"
				})]
			}), events.length === 0 ? /* @__PURE__ */ jsxs(Reveal, {
				className: "panel p-10 text-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-display text-lg",
						children: "No events published yet"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
						children: "Organisers publish campus events from the organiser dashboard. Once an event goes live it appears here instantly."
					}),
					/* @__PURE__ */ jsx(Button, {
						className: "mt-6",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/organiser-login",
							children: "Organiser access"
						})
					})
				]
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: events.map((event, i) => /* @__PURE__ */ jsx(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ jsx(EventCard, { event })
				}, event.id))
			})]
		})
	] });
}
export { Home as component };
