import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { n as Route, o as useAuth, r as useAddToCart, u as Button } from "./router-Bmo75UHY.mjs";
import { a as getMyRegistration, d as registerForEvent, t as cancelMyRegistrationsForEvent } from "./registrations-CNP-eODM.mjs";
import { r as getEvent } from "./events-CDmwh__r.mjs";
import { b as isRsvpType, h as formatPrice, m as formatDate, p as eventTypeLabel } from "./helpers-OIPvucp0.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { D as Clock, R as CalendarDays, W as ArrowLeft, c as Ticket, f as ShieldAlert, t as Zap, u as ShoppingCart, x as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/events._eventId-DA-C-m5X.js
var import_jsx_runtime = require_jsx_runtime();
function EventDetails() {
	const { eventId } = Route.useParams();
	const { user, role } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const addToCart = useAddToCart();
	const { data: event, isLoading } = useQuery({
		queryKey: ["event", eventId],
		queryFn: () => getEvent(eventId)
	});
	const { data: registration } = useQuery({
		queryKey: [
			"registration",
			eventId,
			user?.id
		],
		enabled: Boolean(user?.id),
		queryFn: () => getMyRegistration(eventId, user.id)
	});
	const register = useMutation({
		mutationFn: () => registerForEvent(user.id, eventId),
		onSuccess: (data) => {
			toast.success(`You're in! Ticket ${data.ticket_no}`, { description: "Find it under My Events." });
			queryClient.invalidateQueries({ queryKey: ["registration", eventId] });
			queryClient.invalidateQueries({ queryKey: ["my-events"] });
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error) => toast.error(error.message)
	});
	const cancel = useMutation({
		mutationFn: () => cancelMyRegistrationsForEvent(user.id, eventId),
		onSuccess: () => {
			toast.success("Registration cancelled");
			queryClient.invalidateQueries({ queryKey: ["registration", eventId] });
			queryClient.invalidateQueries({ queryKey: ["my-events"] });
		},
		onError: (error) => toast.error(error.message)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-96 animate-pulse" })
	});
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl",
				children: "Event not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "This event may have been removed by its organiser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/discover",
					children: "Back to Explore"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/discover",
				className: "inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Explore"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "panel overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] bg-surface-2",
						children: event.poster_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: event.poster_url,
							alt: event.title,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center bg-[var(--gradient-neon)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl uppercase tracking-widest text-primary-foreground",
								children: event.category
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 90,
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
								children: [
									event.institution || "COLLAXP",
									" · ",
									event.category,
									" ·",
									" ",
									eventTypeLabel(event.event_type)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl sm:text-4xl",
								children: event.title
							}),
							event.speaker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: ["Speaker / host: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: event.speaker
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-primary" }), formatDate(event.event_date)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }),
										" ",
										event.start_time
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
										" ",
										event.location || "To be announced"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-primary" }),
										" Age restriction:",
										" ",
										event.age_restriction
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-4 w-4 text-primary" }),
										" ",
										formatPrice(Number(event.price))
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }),
										" +",
										event.xp_reward,
										" XP on registration"
									]
								})
							]
						}),
						registration ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel space-y-3 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-sm uppercase tracking-widest text-primary",
								children: [
									isRsvpType(event.event_type) ? "RSVP confirmed" : "Registered",
									" ",
									"· Ticket ",
									registration.ticket_no
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/my-events",
										children: "View My Events"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => cancel.mutate(),
									disabled: cancel.isPending,
									children: cancel.isPending ? "Cancelling…" : isRsvpType(event.event_type) ? "Cancel RSVP" : "Cancel registration"
								})]
							})]
						}) : user && role !== "organiser" ? isRsvpType(event.event_type) || Number(event.price) <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							className: "w-full",
							onClick: () => register.mutate(),
							disabled: register.isPending,
							children: register.isPending ? "Registering…" : isRsvpType(event.event_type) ? "RSVP — I'm attending" : "Register for this event"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "w-full",
								onClick: () => addToCart.mutate({
									eventId: event.id,
									quantity: 1
								}),
								disabled: addToCart.isPending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-4 w-4" }), addToCart.isPending ? "Adding…" : `Add ticket to cart — ${formatPrice(Number(event.price))}`]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full",
								onClick: () => void navigate({ to: "/cart" }),
								children: "Go to cart to check out"
							})]
						}) : user && role === "organiser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "panel p-4 text-sm text-muted-foreground",
							children: "Organiser accounts manage events; sign in with a student account to register."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "w-full",
								onClick: () => void navigate({ to: "/student-login" }),
								children: "Sign in to register"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: [
									"No account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/student-signup",
										className: "text-primary hover:underline",
										children: "Create one with your student email"
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 140,
				className: "panel mt-10 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: "About this event"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
						children: event.description || "The organiser has not added a description yet."
					}),
					event.agenda && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-display text-sm uppercase tracking-widest text-primary",
						children: "Agenda / event details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
						children: event.agenda
					})] })
				]
			})
		]
	});
}
export { EventDetails as component };
