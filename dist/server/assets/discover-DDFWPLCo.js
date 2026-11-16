import { t as EventCard } from "./EventCard-DRq6At-e.js";
import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { s as listPublishedEvents } from "./events-CDmwh__r.js";
import { T as cn, u as CATEGORIES } from "./helpers-OIPvucp0.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
// src/routes/discover.tsx?tsr-split=component
function Discover() {
	const [q, setQ] = useState("");
	const [category, setCategory] = useState("All");
	const { data: events = [], isLoading } = useQuery({
		queryKey: ["events", "all"],
		queryFn: async () => {
			return await listPublishedEvents();
		}
	});
	const filtered = useMemo(() => {
		const term = q.trim().toLowerCase();
		return events.filter((e) => {
			const matchesCat = category === "All" || e.category === category;
			const matchesTerm = !term || [
				e.title,
				e.description,
				e.institution,
				e.location
			].some((v) => (v ?? "").toLowerCase().includes(term));
			return matchesCat && matchesTerm;
		});
	}, [
		events,
		q,
		category
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Explore"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Every live campus event across institutions."
			})] }),
			/* @__PURE__ */ jsxs(Reveal, {
				delay: 80,
				className: "mt-8 space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search events, institutions, locations",
						"aria-label": "Search events",
						className: "h-12 rounded-full border-border bg-surface pl-11"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ jsx("button", {
						onClick: () => setCategory(c),
						className: cn("rounded-full border px-4 py-2 font-display text-[11px] uppercase tracking-widest transition-all duration-300", category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground"),
						children: c
					}, c))
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-10",
				children: isLoading ? /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-72 animate-pulse" }, i))
				}) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "panel p-10 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-display text-lg",
						children: "Nothing here yet"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: events.length === 0 ? "No organiser has published an event yet." : "No event matches your search or filter."
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((event, i) => /* @__PURE__ */ jsx(Reveal, {
						delay: Math.min(i, 6) * 60,
						children: /* @__PURE__ */ jsx(EventCard, { event })
					}, event.id))
				})
			})
		]
	});
}
export { Discover as component };
