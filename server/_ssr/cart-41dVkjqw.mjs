import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { c as setCartQuantity, i as useCartItems, o as useAuth, s as removeCartItem, u as Button } from "./router-Bmo75UHY.mjs";
import { r as checkoutCart } from "./registrations-CNP-eODM.mjs";
import { h as formatPrice, m as formatDate } from "./helpers-OIPvucp0.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as ShoppingBag, g as Plus, s as Trash2, v as Minus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/cart-41dVkjqw.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { user } = useAuth();
	const { data: items = [], isLoading } = useCartItems();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const total = items.reduce((sum, row) => sum + row.quantity * Number(row.event?.price ?? 0), 0);
	const totalXp = items.reduce((sum, row) => sum + row.quantity * Number(row.event?.xp_reward ?? 0), 0);
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["cart"] });
	};
	const setQuantity = useMutation({
		mutationFn: ({ id, quantity }) => setCartQuantity(id, quantity),
		onSuccess: invalidate,
		onError: (e) => toast.error(e.message)
	});
	const removeItem = useMutation({
		mutationFn: (id) => removeCartItem(id),
		onSuccess: () => {
			toast.success("Removed from cart");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const checkout = useMutation({
		mutationFn: () => checkoutCart(user.id, items.map((row) => ({
			event_id: row.event_id,
			quantity: row.quantity
		}))),
		onSuccess: () => {
			toast.success("Order complete", { description: "Your tickets are in My Events." });
			invalidate();
			queryClient.invalidateQueries({ queryKey: ["my-events"] });
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			navigate({ to: "/my-events" });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
			children: "Checkout"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl sm:text-4xl",
			children: "Ticket cart"
		})] }), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-3",
			children: [0, 1].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-24 animate-pulse" }, i))
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "panel mt-8 p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-6 w-6 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-lg",
					children: "Your cart is empty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Add tickets from any event page to check out here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						children: "Browse events"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 space-y-3",
			children: items.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				as: "li",
				delay: Math.min(i, 6) * 60,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2",
							children: row.event?.poster_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: row.event.poster_url,
								alt: row.event.title,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full w-full items-center justify-center bg-[var(--gradient-neon)] font-display text-[10px] uppercase tracking-widest text-primary-foreground",
								children: row.event?.category
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/events/$eventId",
									params: { eventId: row.event_id },
									className: "truncate font-display text-lg hover:text-primary",
									children: row.event?.title ?? "Event"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										row.event ? formatDate(row.event.event_date) : "",
										" ·",
										" ",
										row.event?.start_time,
										" · ",
										row.event?.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-display text-sm text-primary",
									children: [formatPrice(Number(row.event?.price ?? 0)), " each"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									"aria-label": "Decrease quantity",
									onClick: () => setQuantity.mutate({
										id: row.id,
										quantity: row.quantity - 1
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 text-center font-display",
									children: row.quantity
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "outline",
									"aria-label": "Increase quantity",
									disabled: row.quantity >= 10,
									onClick: () => setQuantity.mutate({
										id: row.id,
										quantity: row.quantity + 1
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "Remove from cart",
									onClick: () => removeItem.mutate(row.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						})
					]
				})
			}, row.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			delay: 120,
			className: "panel mt-6 space-y-4 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tickets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: items.reduce((s, r) => s + r.quantity, 0) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "XP you'll earn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-primary",
						children: [
							"+",
							totalXp,
							" XP"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border/60 pt-4 font-display text-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "w-full",
					disabled: checkout.isPending,
					onClick: () => checkout.mutate(),
					children: checkout.isPending ? "Processing…" : "Complete order"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "Card payments are not enabled yet — orders are confirmed instantly and your ticket numbers appear in My Events."
				})
			]
		})] })]
	});
}
export { CartPage as component };
