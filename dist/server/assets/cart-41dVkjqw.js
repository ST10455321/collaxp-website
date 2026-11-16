import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { c as setCartQuantity, i as useCartItems, o as useAuth, s as removeCartItem } from "./router-Bmo75UHY.js";
import { r as checkoutCart } from "./registrations-CNP-eODM.js";
import { _ as formatDate, v as formatPrice } from "./helpers-OIPvucp0.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
// src/routes/_authenticated/cart.tsx?tsr-split=component
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
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("p", {
			className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
			children: "Checkout"
		}), /* @__PURE__ */ jsx("h1", {
			className: "mt-1 text-3xl sm:text-4xl",
			children: "Ticket cart"
		})] }), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "mt-8 space-y-3",
			children: [0, 1].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-24 animate-pulse" }, i))
		}) : items.length === 0 ? /* @__PURE__ */ jsxs(Reveal, {
			className: "panel mt-8 p-10 text-center",
			children: [
				/* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-6 w-6 text-primary" }),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 font-display text-lg",
					children: "Your cart is empty"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Add tickets from any event page to check out here."
				}),
				/* @__PURE__ */ jsx(Button, {
					className: "mt-6",
					asChild: true,
					children: /* @__PURE__ */ jsx(Link, {
						to: "/discover",
						children: "Browse events"
					})
				})
			]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("ul", {
			className: "mt-8 space-y-3",
			children: items.map((row, i) => /* @__PURE__ */ jsx(Reveal, {
				as: "li",
				delay: Math.min(i, 6) * 60,
				children: /* @__PURE__ */ jsxs("div", {
					className: "panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2",
							children: row.event?.poster_url ? /* @__PURE__ */ jsx("img", {
								src: row.event.poster_url,
								alt: row.event.title,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex h-full w-full items-center justify-center bg-[var(--gradient-neon)] font-display text-[10px] uppercase tracking-widest text-primary-foreground",
								children: row.event?.category
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ jsx(Link, {
									to: "/events/$eventId",
									params: { eventId: row.event_id },
									className: "truncate font-display text-lg hover:text-primary",
									children: row.event?.title ?? "Event"
								}),
								/* @__PURE__ */ jsxs("p", {
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
								/* @__PURE__ */ jsxs("p", {
									className: "mt-1 font-display text-sm text-primary",
									children: [formatPrice(Number(row.event?.price ?? 0)), " each"]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(Button, {
									size: "icon",
									variant: "outline",
									"aria-label": "Decrease quantity",
									onClick: () => setQuantity.mutate({
										id: row.id,
										quantity: row.quantity - 1
									}),
									children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsx("span", {
									className: "w-8 text-center font-display",
									children: row.quantity
								}),
								/* @__PURE__ */ jsx(Button, {
									size: "icon",
									variant: "outline",
									"aria-label": "Increase quantity",
									disabled: row.quantity >= 10,
									onClick: () => setQuantity.mutate({
										id: row.id,
										quantity: row.quantity + 1
									}),
									children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsx(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "Remove from cart",
									onClick: () => removeItem.mutate(row.id),
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						})
					]
				})
			}, row.id))
		}), /* @__PURE__ */ jsxs(Reveal, {
			delay: 120,
			className: "panel mt-6 space-y-4 p-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between text-sm text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "Tickets" }), /* @__PURE__ */ jsx("span", { children: items.reduce((s, r) => s + r.quantity, 0) })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between text-sm text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "XP you'll earn" }), /* @__PURE__ */ jsxs("span", {
						className: "text-primary",
						children: [
							"+",
							totalXp,
							" XP"
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border-t border-border/60 pt-4 font-display text-xl",
					children: [/* @__PURE__ */ jsx("span", { children: "Total" }), /* @__PURE__ */ jsx("span", { children: formatPrice(total) })]
				}),
				/* @__PURE__ */ jsx(Button, {
					size: "lg",
					className: "w-full",
					disabled: checkout.isPending,
					onClick: () => checkout.mutate(),
					children: checkout.isPending ? "Processing…" : "Complete order"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "Card payments are not enabled yet — orders are confirmed instantly and your ticket numbers appear in My Events."
				})
			]
		})] })]
	});
}
export { CartPage as component };
