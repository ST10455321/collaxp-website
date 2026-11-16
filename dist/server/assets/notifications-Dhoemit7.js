import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { a as setNotificationRead, i as markAllNotificationsRead, n as deleteNotification, r as listNotifications } from "./notifications-B5GODNMG.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellRing, CheckCheck, Ticket, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
// src/routes/_authenticated/notifications.tsx?tsr-split=component
function iconFor(kind) {
	if (kind === "registration") return Ticket;
	if (kind === "welcome") return Zap;
	return BellRing;
}
function Notifications() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: items = [], isLoading } = useQuery({
		queryKey: ["notifications", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => await listNotifications(user.id)
	});
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["notifications"] });
	};
	const markAll = useMutation({
		mutationFn: () => markAllNotificationsRead(user.id),
		onSuccess: () => {
			toast.success("All notifications marked as read");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const toggleRead = useMutation({
		mutationFn: (n) => setNotificationRead(n.id, !n.is_read),
		onSuccess: invalidate,
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteNotification(id),
		onSuccess: () => {
			toast.success("Notification removed");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const unread = items.filter((i) => !i.is_read).length;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ jsxs(Reveal, {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Notifications"
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [unread, " unread"]
			})] }), /* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => markAll.mutate(),
				disabled: markAll.isPending || unread === 0,
				children: [/* @__PURE__ */ jsx(CheckCheck, { className: "mr-2 h-4 w-4" }), " Mark all read"]
			})]
		}), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "mt-8 space-y-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-20 animate-pulse" }, i))
		}) : items.length === 0 ? /* @__PURE__ */ jsx(Reveal, {
			className: "panel mt-8 p-10 text-center text-sm text-muted-foreground",
			children: "Nothing here yet."
		}) : /* @__PURE__ */ jsx("ul", {
			className: "mt-8 space-y-3",
			children: items.map((n, i) => {
				const Icon = iconFor(n.kind);
				return /* @__PURE__ */ jsx(Reveal, {
					as: "li",
					delay: Math.min(i, 6) * 50,
					children: /* @__PURE__ */ jsxs("div", {
						className: `panel flex items-start gap-4 p-4 transition-colors ${n.is_read ? "opacity-70" : "border-primary/40"}`,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "rounded-full bg-primary/15 p-2 text-primary",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "font-display text-sm",
										children: n.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: n.body
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-[11px] text-muted-foreground/70",
										children: new Date(n.created_at).toLocaleString("en-ZA")
									}),
									n.event_id && /* @__PURE__ */ jsx(Link, {
										to: "/events/$eventId",
										params: { eventId: n.event_id },
										className: "mt-2 inline-block font-display text-[11px] uppercase tracking-widest text-primary hover:underline",
										children: "View event →"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex shrink-0 flex-col gap-1",
								children: [/* @__PURE__ */ jsx(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => toggleRead.mutate(n),
									className: "text-[11px]",
									children: n.is_read ? "Unread" : "Read"
								}), /* @__PURE__ */ jsx(Button, {
									size: "sm",
									variant: "ghost",
									"aria-label": "Delete notification",
									onClick: () => remove.mutate(n.id),
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
								})]
							})
						]
					})
				}, n.id);
			})
		})]
	});
}
export { Notifications as component };
