import { o as __toESM } from "../_runtime.mjs";
import { t as Reveal } from "./Reveal-4T7NNWSK.mjs";
import { o as useAuth, u as Button } from "./router-Bmo75UHY.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-grJerPa1.mjs";
import { t as Input } from "./input-DDsObxxJ.mjs";
import { t as Label } from "./label-CfH-19Jn.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.mjs";
import { t as Textarea } from "./textarea-DQriKw-b.mjs";
import { c as listOwnReels, f as setReelPublished, i as getPlaybackUrls, m as uploadReel, n as deleteReel } from "./reels-VhMhnMHq.mjs";
import { a as listLinkableEvents, i as getEventsByIds } from "./events-CDmwh__r.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { O as Clapperboard, T as EyeOff, a as Upload, s as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/my-reels-DpT6llDR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MyReels() {
	const { user, role } = useAuth();
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [caption, setCaption] = (0, import_react.useState)("");
	const [eventId, setEventId] = (0, import_react.useState)("none");
	const [file, setFile] = (0, import_react.useState)(null);
	const { data: events = [] } = useQuery({
		queryKey: [
			"reel-link-events",
			user?.id,
			role
		],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			return (await listLinkableEvents(role, user.id)).map((e) => ({
				id: e.id,
				title: e.title
			}));
		}
	});
	const { data: reels = [], isLoading } = useQuery({
		queryKey: ["my-reels", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const data = await listOwnReels(user.id);
			if (data.length === 0) return [];
			const eventIds = [...new Set(data.map((r) => r.event_id).filter(Boolean))];
			const [eventDocs, playbackMap] = await Promise.all([eventIds.length ? getEventsByIds(eventIds) : Promise.resolve(/* @__PURE__ */ new Map()), getPlaybackUrls(data.map((r) => r.video_url))]);
			return data.map((r) => ({
				id: r.id,
				title: r.title,
				caption: r.caption,
				video_url: r.video_url,
				event_id: r.event_id,
				is_published: r.is_published,
				created_at: r.created_at,
				playbackUrl: playbackMap.get(r.video_url) ?? "",
				eventTitle: r.event_id ? eventDocs.get(r.event_id)?.title ?? null : null
			}));
		}
	});
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["my-reels"] });
		queryClient.invalidateQueries({ queryKey: ["reels-feed"] });
	};
	const upload = useMutation({
		mutationFn: async () => {
			if (!file) throw new Error("Choose a video file first");
			if (!title.trim()) throw new Error("Give the reel a title");
			if (file.size > 104857600) throw new Error("Video must be under 100 MB");
			await uploadReel({
				uid: user.id,
				file,
				title: title.trim(),
				caption: caption.trim(),
				eventId: eventId === "none" ? null : eventId
			});
		},
		onSuccess: () => {
			toast.success("Reel published", { description: "It's live in the Reels feed." });
			setOpen(false);
			setTitle("");
			setCaption("");
			setEventId("none");
			setFile(null);
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const togglePublish = useMutation({
		mutationFn: ({ id, next }) => setReelPublished(id, next),
		onSuccess: () => {
			toast.success("Reel updated");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (reel) => deleteReel(reel),
		onSuccess: () => {
			toast.success("Reel deleted");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
					children: "My reels"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl sm:text-4xl",
					children: "Your reels"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Share campus moments with everyone.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reels",
							className: "text-primary hover:underline",
							children: "Back to the feed"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), " Upload reel"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[85vh] overflow-y-auto sm:max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display",
						children: "Upload a reel"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							upload.mutate();
						},
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "reel-title",
									children: "Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "reel-title",
									required: true,
									value: title,
									onChange: (e) => setTitle(e.target.value),
									className: "bg-surface-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "reel-caption",
									children: "Caption"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "reel-caption",
									rows: 2,
									value: caption,
									onChange: (e) => setCaption(e.target.value),
									className: "bg-surface-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "reel-event",
									children: "Linked event (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: eventId,
									onValueChange: setEventId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "reel-event",
										className: "bg-surface-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: "No linked event"
									}), events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: e.id,
										children: e.title
									}, e.id))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "reel-file",
									children: "Video file (MP4/WebM, max 100 MB)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "reel-file",
									type: "file",
									accept: "video/*",
									required: true,
									onChange: (e) => setFile(e.target.files?.[0] ?? null),
									className: "bg-surface-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: upload.isPending,
								children: upload.isPending ? "Uploading…" : "Publish reel"
							})
						]
					})]
				})]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-64 animate-pulse" }, i))
		}) : reels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "panel mt-8 p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "mx-auto h-6 w-6 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-lg",
					children: "No reels yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Upload your first campus reel — everyone will see it in the Reels feed."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: reels.map((reel, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: Math.min(i, 6) * 60,
				className: "panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video bg-black",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: reel.playbackUrl,
						controls: true,
						playsInline: true,
						preload: "metadata",
						className: "h-full w-full object-contain"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-base",
							children: reel.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [reel.eventTitle ? `Event: ${reel.eventTitle}` : "No linked event", !reel.is_published && " · hidden"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => togglePublish.mutate({
									id: reel.id,
									next: !reel.is_published
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "mr-2 h-3.5 w-3.5" }), reel.is_published ? "Hide" : "Publish"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								"aria-label": "Delete reel",
								onClick: () => remove.mutate(reel),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5 text-destructive" })
							})]
						})
					]
				})]
			}, reel.id))
		})]
	});
}
export { MyReels as component };
