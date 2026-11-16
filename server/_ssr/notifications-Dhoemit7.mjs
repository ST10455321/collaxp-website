import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { a as setNotificationRead, i as markAllNotificationsRead, n as deleteNotification, r as listNotifications } from "./notifications-B5GODNMG.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { P as CheckCheck, V as BellRing, c as Ticket, s as Trash2, t as Zap } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/notifications-Dhoemit7.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [unread, " unread"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => markAll.mutate(),
				disabled: markAll.isPending || unread === 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "mr-2 h-4 w-4" }), " Mark all read"]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-20 animate-pulse" }, i))
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "panel mt-8 p-10 text-center text-sm text-muted-foreground",
			children: "Nothing here yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 space-y-3",
			children: items.map((n, i) => {
				const Icon = iconFor(n.kind);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					as: "li",
					delay: Math.min(i, 6) * 50,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `panel flex items-start gap-4 p-4 transition-colors ${n.is_read ? "opacity-70" : "border-primary/40"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary/15 p-2 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground/70",
										children: new Date(n.created_at).toLocaleString("en-ZA")
									}),
									n.event_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/events/$eventId",
										params: { eventId: n.event_id },
										className: "mt-2 inline-block font-display text-[11px] uppercase tracking-widest text-primary hover:underline",
										children: "View event →"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => toggleRead.mutate(n),
									className: "text-[11px]",
									children: n.is_read ? "Unread" : "Read"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									"aria-label": "Delete notification",
									onClick: () => remove.mutate(n.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
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
