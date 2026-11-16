import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-grJerPa1.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { c as listMyRegistrations, n as cancelRegistration } from "./registrations-CNP-eODM.js";
import { _ as formatDate, v as formatPrice } from "./helpers-OIPvucp0.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, MapPin, QrCode, Ticket } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
// src/components/tickets/TicketQrDialog.tsx
function ticketPayload(registrationId, ticketNo) {
	return `COLLAXP|${registrationId}|${ticketNo}`;
}
function TicketQrDialog({ open, onOpenChange, registrationId, ticketNo, eventTitle, eventMeta }) {
	const [src, setSrc] = useState(null);
	useEffect(() => {
		if (!open) return;
		let active = true;
		QRCode.toDataURL(ticketPayload(registrationId, ticketNo), {
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
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-sm",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "font-display",
				children: eventTitle
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Show this QR code at the door — the organiser scans it to check you in." })] }), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-4",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "rounded-2xl bg-white p-3",
						children: src ? /* @__PURE__ */ jsx("img", {
							src,
							alt: `QR code for ticket ${ticketNo}`,
							className: "h-56 w-56"
						}) : /* @__PURE__ */ jsx("div", { className: "h-56 w-56 animate-pulse rounded-xl bg-surface-2" })
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "rounded-full bg-primary/15 px-4 py-1 font-display text-sm uppercase tracking-widest text-primary",
						children: ["Ticket ", ticketNo]
					}),
					eventMeta && /* @__PURE__ */ jsx("p", {
						className: "text-center text-xs text-muted-foreground",
						children: eventMeta
					})
				]
			})]
		})
	});
}
// src/routes/_authenticated/my-events.tsx?tsr-split=component
function MyEvents() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [qrTicket, setQrTicket] = useState(null);
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
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl sm:text-4xl",
				children: "My Events"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Click an event to view the full details."
			})] }),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "mt-8 space-y-4",
				children: [0, 1].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-28 animate-pulse" }, i))
			}) : registrations.length === 0 ? /* @__PURE__ */ jsxs(Reveal, {
				className: "panel mt-8 p-10 text-center",
				children: [
					/* @__PURE__ */ jsx(Ticket, { className: "mx-auto h-6 w-6 text-primary" }),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 font-display text-lg",
						children: "No tickets yet"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Register for an event and it will show up here instantly."
					}),
					/* @__PURE__ */ jsx(Button, {
						className: "mt-6",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/discover",
							children: "Explore events"
						})
					})
				]
			}) : /* @__PURE__ */ jsx("ul", {
				className: "mt-8 space-y-4",
				children: registrations.map((r, i) => /* @__PURE__ */ jsx(Reveal, {
					as: "li",
					delay: i * 60,
					children: /* @__PURE__ */ jsxs("div", {
						className: "panel hover-lift flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: "/events/$eventId",
							params: { eventId: r.event?.id ?? "" },
							className: "flex flex-1 items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-2",
								children: r.event?.poster_url ? /* @__PURE__ */ jsx("img", {
									src: r.event.poster_url,
									alt: r.event.title,
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-[var(--gradient-neon)]" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "font-display text-xs uppercase tracking-widest text-primary",
										children: r.event?.institution
									}),
									/* @__PURE__ */ jsx("p", {
										className: "truncate font-display text-lg",
										children: r.event?.title
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
													r.event ? formatDate(r.event.event_date) : "",
													" · ",
													r.event?.start_time
												]
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
													" ",
													r.event?.location
												]
											}),
											/* @__PURE__ */ jsx("span", { children: r.event ? formatPrice(Number(r.event.price)) : "" })
										]
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 sm:flex-col sm:items-end",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "rounded-full bg-primary/15 px-3 py-1 font-display text-[11px] uppercase tracking-widest text-primary",
									children: ["Ticket ", r.ticket_no]
								}),
								/* @__PURE__ */ jsxs(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setQrTicket(r),
									children: [/* @__PURE__ */ jsx(QrCode, { className: "mr-2 h-4 w-4" }), " Show QR"]
								}),
								/* @__PURE__ */ jsx(Button, {
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
			qrTicket && /* @__PURE__ */ jsx(TicketQrDialog, {
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
