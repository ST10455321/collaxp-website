import { _ as formatDate, v as formatPrice } from "./helpers-OIPvucp0.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, MapPin, Zap } from "lucide-react";
// src/components/events/EventCard.tsx
function EventCard({ event }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: "/events/$eventId",
		params: { eventId: event.id },
		className: "panel hover-lift group block overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-surface-2",
			children: [
				event.poster_url ? /* @__PURE__ */ jsx("img", {
					src: event.poster_url,
					alt: event.title,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
				}) : /* @__PURE__ */ jsx("div", {
					className: "flex h-full w-full items-center justify-center bg-[var(--gradient-neon)]",
					children: /* @__PURE__ */ jsx("span", {
						className: "font-display text-lg uppercase tracking-widest text-primary-foreground",
						children: event.category
					})
				}),
				/* @__PURE__ */ jsx("span", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-display text-[10px] uppercase tracking-widest text-primary-foreground",
					children: event.category
				}),
				/* @__PURE__ */ jsx("span", {
					className: "absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 font-display text-[10px] uppercase tracking-widest text-foreground",
					children: formatPrice(Number(event.price))
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-2 p-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-display text-xs uppercase tracking-widest text-primary",
					children: event.institution || "COLLAXP"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "line-clamp-1 font-display text-lg text-foreground",
					children: event.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "line-clamp-2 text-sm text-muted-foreground",
					children: event.description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
								" ",
								formatDate(event.event_date),
								" ·",
								" ",
								event.start_time
							]
						}),
						event.location && /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
								" ",
								event.location
							]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1 text-primary",
							children: [
								/* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5" }),
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
