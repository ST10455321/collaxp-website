import { o as __toESM } from "../_runtime.mjs";
import { t as EventCard } from "./EventCard-DRq6At-e.mjs";
import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { t as Input } from "./input-DDsObxxJ.mjs";
import { s as listPublishedEvents } from "./events-CDmwh__r.mjs";
import { r as CATEGORIES, u as cn } from "./helpers-OIPvucp0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { m as Search } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/discover-DDFWPLCo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Discover() {
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const { data: events = [], isLoading } = useQuery({
		queryKey: ["events", "all"],
		queryFn: async () => {
			return await listPublishedEvents();
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Explore"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Every live campus event across institutions."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 80,
				className: "mt-8 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search events, institutions, locations",
						"aria-label": "Search events",
						className: "h-12 rounded-full border-border bg-surface pl-11"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCategory(c),
						className: cn("rounded-full border px-4 py-2 font-display text-[11px] uppercase tracking-widest transition-all duration-300", category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground"),
						children: c
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-72 animate-pulse" }, i))
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: "Nothing here yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: events.length === 0 ? "No organiser has published an event yet." : "No event matches your search or filter."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: filtered.map((event, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: Math.min(i, 6) * 60,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { event })
					}, event.id))
				})
			})
		]
	});
}
export { Discover as component };
