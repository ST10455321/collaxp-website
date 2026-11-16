import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { t as Progress } from "./progress-Bkl795H7.mjs";
import { i as countMyRegistrations } from "./registrations-CNP-eODM.mjs";
import { S as levelProgress, T as xpToNextLevel, t as BADGES } from "./helpers-OIPvucp0.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { H as Award, S as Lock, t as Zap } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/rewards-BDjXL-j6.js
var import_jsx_runtime = require_jsx_runtime();
function Rewards() {
	const { profile, user } = useAuth();
	const { data: registrationCount = 0 } = useQuery({
		queryKey: ["profile-registrations", user?.id],
		enabled: Boolean(user?.id),
		queryFn: () => countMyRegistrations(user.id)
	});
	const xp = profile?.xp ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Rewards"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted-foreground",
				children: "XP, levels and badges are a bonus for taking part — the campus experience stays the main event."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 80,
				className: "panel mt-8 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs uppercase tracking-widest text-primary",
						children: "Current level"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl",
						children: profile?.level ?? 1
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-2 font-display text-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-primary" }),
								" ",
								xp,
								" XP"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [xpToNextLevel(xp), " XP to next level"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: levelProgress(xp),
					className: "mt-5"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Badges"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: BADGES.map((badge, i) => {
						const unlocked = registrationCount >= badge.requirement;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 70,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `panel flex items-start gap-4 p-5 ${unlocked ? "border-primary/50" : "opacity-70"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full p-3 ${unlocked ? "bg-primary/20 text-primary" : "bg-surface-2 text-muted-foreground"}`,
									children: unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-base",
										children: badge.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: badge.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-[11px] uppercase tracking-widest text-primary",
										children: unlocked ? "Unlocked" : `${registrationCount}/${badge.requirement} events`
									})
								] })]
							})
						}, badge.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 120,
				className: "panel mt-10 p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Want more XP? Register for another campus event."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						children: "Explore events"
					})
				})]
			})
		]
	});
}
export { Rewards as component };
