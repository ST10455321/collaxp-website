import { o as __toESM } from "../_runtime.mjs";
import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-grJerPa1.mjs";
import { o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { c as listMyRegistrations, n as cancelRegistration } from "./registrations-CNP-eODM.mjs";
import { h as formatPrice, m as formatDate } from "./helpers-OIPvucp0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { R as CalendarDays, c as Ticket, h as QrCode, x as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
// node_modules/.nitro/vite/services/ssr/assets/my-events-CRJ3L97e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function ticketPayload(registrationId, ticketNo) {
	return `COLLAXP|${registrationId}|${ticketNo}`;
}
function TicketQrDialog({ open, onOpenChange, registrationId, ticketNo, eventTitle, eventMeta }) {
	const [src, setSrc] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let active = true;
		import_lib.toDataURL(ticketPayload(registrationId, ticketNo), {
			width: 640,
			margin: 1,
			color: {
				dark: "#0b0510",
				light: "#ffffff"
			}
		}).then((url) => {
			if (active) setSrc(url);
		});
		return () => {
			active = false;
		};
	}, [
		open,
		registrationId,
		ticketNo
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display",
				children: eventTitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Show this QR code at the door — the organiser scans it to check you in." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-white p-3",
						children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: `QR code for ticket ${ticketNo}`,
							className: "h-56 w-56"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 w-56 animate-pulse rounded-xl bg-surface-2" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-full bg-primary/15 px-4 py-1 font-display text-sm uppercase tracking-widest text-primary",
						children: ["Ticket ", ticketNo]
					}),
					eventMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: eventMeta
					})
				]
			})]
		})
	});
}
function MyEvents() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [qrTicket, setQrTicket] = (0, import_react.useState)(null);
	const { data: registrations = [], isLoading } = useQuery({
		queryKey: ["my-events", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => await listMyRegistrations(user.id)
	});
	const cancel = useMutation({
		mutationFn: (id) => cancelRegistration(id),
		onSuccess: () => {
			toast.success("Registration cancelled");
			queryClient.invalidateQueries({ queryKey: ["my-events"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl",
				children: "My Events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Click an event to view the full details."
			})] }),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4",
				children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-28 animate-pulse" }, i))
			}) : registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "panel mt-8 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "mx-auto h-6 w-6 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-lg",
						children: "No tickets yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Register for an event and it will show up here instantly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/discover",
							children: "Explore events"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-4",
				children: registrations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					as: "li",
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel hover-lift flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/events/$eventId",
							params: { eventId: r.event?.id ?? "" },
							className: "flex flex-1 items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2",
								children: r.event?.poster_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: r.event.poster_url,
									alt: r.event.title,
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-[var(--gradient-neon)]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xs uppercase tracking-widest text-primary",
										children: r.event?.institution
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-lg",
										children: r.event?.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-3.5 w-3.5" }),
													r.event ? formatDate(r.event.event_date) : "",
													" · ",
													r.event?.start_time
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
													" ",
													r.event?.location
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.event ? formatPrice(Number(r.event.price)) : "" })
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 sm:flex-col sm:items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-primary/15 px-3 py-1 font-display text-[11px] uppercase tracking-widest text-primary",
									children: ["Ticket ", r.ticket_no]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setQrTicket(r),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mr-2 h-4 w-4" }), " Show QR"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => cancel.mutate(r.id),
									disabled: cancel.isPending,
									children: "Cancel"
								})
							]
						})]
					})
				}, r.id))
			}),
			qrTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketQrDialog, {
				open: true,
				onOpenChange: (open) => !open && setQrTicket(null),
				registrationId: qrTicket.id,
				ticketNo: qrTicket.ticket_no,
				eventTitle: qrTicket.event?.title ?? "Your ticket",
				eventMeta: qrTicket.event ? `${formatDate(qrTicket.event.event_date)} · ${qrTicket.event.start_time} · ${qrTicket.event.location}` : void 0
			})
		]
	});
}
export { MyEvents as component };
