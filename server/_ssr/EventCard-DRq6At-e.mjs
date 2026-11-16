import { h as formatPrice, m as formatDate } from "./helpers-OIPvucp0.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { R as CalendarDays, t as Zap, x as MapPin } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/EventCard-DRq6At-e.js
var import_jsx_runtime = require_jsx_runtime();
function EventCard({ event }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/events/$eventId",
		params: { eventId: event.id },
		className: "panel hover-lift group block overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-surface-2",
			children: [
				event.poster_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: event.poster_url,
					alt: event.title,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center bg-[var(--gradient-neon)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg uppercase tracking-widest text-primary-foreground",
						children: event.category
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-display text-[10px] uppercase tracking-widest text-primary-foreground",
					children: event.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-foreground",
					children: formatPrice(Number(event.price))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs uppercase tracking-widest text-primary",
					children: event.institution || "COLLAXP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-1 font-display text-lg text-foreground",
					children: event.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm text-muted-foreground",
					children: event.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3.5 w-3.5" }),
								" ",
								formatDate(event.event_date),
								" ·",
								" ",
								event.start_time
							]
						}),
						event.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
								" ",
								event.location
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5" }),
								" +",
								event.xp_reward,
								" XP"
							]
						})
					]
				})
			]
		})]
	});
}
export { EventCard as t };
