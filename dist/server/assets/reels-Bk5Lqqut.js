import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-grJerPa1.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.js";
import { t as Textarea } from "./textarea-DQriKw-b.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { a as getPublicProfiles, d as reportReel, i as getPlaybackUrls, l as listPublishedReels, o as likeReel, p as unlikeReel, r as deleteReelComment, s as listLikesForReels, t as addReelComment, u as listReelComments } from "./reels-VhMhnMHq.js";
import { i as getEventsByIds } from "./events-CDmwh__r.js";
import { T as cn, m as REPORT_REASONS } from "./helpers-OIPvucp0.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flag, Heart, MessageCircle, Plus, Send, Trash2, Video } from "lucide-react";
import { toast } from "sonner";
// src/routes/reels.tsx?tsr-split=component
function useReelsFeed() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["reels-feed", user?.id ?? "anon"],
		queryFn: async () => {
			const reels = await listPublishedReels(50);
			if (reels.length === 0) return [];
			const organiserIds = [...new Set(reels.map((r) => r.organiser_id))];
			const eventIds = [...new Set(reels.map((r) => r.event_id).filter(Boolean))];
			const reelIds = reels.map((r) => r.id);
			const [profileMap, eventDocs, likes, playbackMap] = await Promise.all([
				getPublicProfiles(organiserIds),
				eventIds.length ? getEventsByIds(eventIds) : Promise.resolve(/* @__PURE__ */ new Map()),
				listLikesForReels(reelIds),
				getPlaybackUrls(reels.map((r) => r.video_url))
			]);
			return reels.map((r) => {
				const reelLikes = likes.filter((l) => l.reel_id === r.id);
				const profile = profileMap.get(r.organiser_id);
				return {
					...r,
					playbackUrl: playbackMap.get(r.video_url) ?? "",
					organiserName: profile?.full_name ?? profile?.username ?? "Organiser",
					institution: profile?.institution ?? "",
					eventTitle: r.event_id ? eventDocs.get(r.event_id)?.title ?? null : null,
					likeCount: reelLikes.length,
					likedByMe: Boolean(user?.id && reelLikes.some((l) => l.user_id === user.id))
				};
			});
		}
	});
}
function ReelsFeed() {
	const { data: reels = [], isLoading } = useReelsFeed();
	const { user } = useAuth();
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-2xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ jsxs(Reveal, {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
					children: "Campus reels"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-1 text-3xl sm:text-4xl",
					children: "Reels"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Short clips from students and organisers — tap through to the event behind each one."
				})
			] }), user && /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/my-reels",
					children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }), " Post a reel"]
				})
			})]
		}), isLoading ? /* @__PURE__ */ jsx("div", {
			className: "mt-8 space-y-6",
			children: [0, 1].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-[420px] animate-pulse" }, i))
		}) : reels.length === 0 ? /* @__PURE__ */ jsxs(Reveal, {
			className: "panel mt-8 p-10 text-center",
			children: [
				/* @__PURE__ */ jsx(Video, { className: "mx-auto h-6 w-6 text-primary" }),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 font-display text-lg",
					children: "No reels yet"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Organisers haven't posted any reels yet. Check back soon."
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "mt-8 space-y-8",
			children: reels.map((reel, i) => /* @__PURE__ */ jsx(Reveal, {
				delay: Math.min(i, 4) * 70,
				children: /* @__PURE__ */ jsx(ReelCard, { reel })
			}, reel.id))
		})]
	});
}
function ReelCard({ reel }) {
	const { user, profile } = useAuth();
	const queryClient = useQueryClient();
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState("");
	const [reportOpen, setReportOpen] = useState(false);
	const [reason, setReason] = useState(REPORT_REASONS[0]);
	const [details, setDetails] = useState("");
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["reels-feed"] });
	};
	const { data: comments = [] } = useQuery({
		queryKey: ["reel-comments", reel.id],
		enabled: showComments,
		queryFn: async () => {
			const data = await listReelComments(reel.id);
			const authors = await getPublicProfiles(data.map((c) => c.user_id));
			return data.map((c) => ({
				...c,
				author: authors.get(c.user_id)?.username ?? authors.get(c.user_id)?.full_name ?? "Student"
			}));
		}
	});
	const toggleLike = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sign in to like reels");
			if (reel.likedByMe) {
				await unlikeReel(reel.id, user.id);
				return;
			}
			await likeReel(reel.id, user.id);
		},
		onSuccess: invalidate,
		onError: (e) => toast.error(e.message)
	});
	const addComment = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sign in to comment");
			const body = comment.trim();
			if (!body) throw new Error("Write something first");
			await addReelComment(reel.id, user.id, body);
		},
		onSuccess: () => {
			setComment("");
			queryClient.invalidateQueries({ queryKey: ["reel-comments", reel.id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteComment = useMutation({
		mutationFn: (id) => deleteReelComment(id),
		onSuccess: () => {
			toast.success("Comment deleted");
			queryClient.invalidateQueries({ queryKey: ["reel-comments", reel.id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const report = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sign in to report content");
			await reportReel({
				reporterId: user.id,
				reelId: reel.id,
				reason,
				details: details.trim()
			});
		},
		onSuccess: () => {
			setReportOpen(false);
			setDetails("");
			toast.success("Report submitted", { description: "Thanks — our team will review it." });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ jsxs("article", {
		className: "panel overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gradient-neon)] font-display text-xs text-primary-foreground",
					children: reel.organiserName.slice(0, 2).toUpperCase()
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsx("p", {
						className: "truncate font-display text-sm",
						children: reel.organiserName
					}), /* @__PURE__ */ jsx("p", {
						className: "truncate text-[11px] uppercase tracking-widest text-muted-foreground",
						children: reel.institution || "COLLAXP"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "relative aspect-[9/12] bg-black sm:aspect-video",
				children: /* @__PURE__ */ jsx("video", {
					src: reel.playbackUrl,
					poster: reel.thumbnail_url ?? void 0,
					controls: true,
					playsInline: true,
					preload: "metadata",
					className: "h-full w-full object-contain"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-lg",
						children: reel.title
					}),
					reel.caption && /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: reel.caption
					}),
					reel.event_id && /* @__PURE__ */ jsxs(Link, {
						to: "/events/$eventId",
						params: { eventId: reel.event_id },
						className: "inline-flex font-display text-xs uppercase tracking-widest text-primary hover:underline",
						children: ["View event: ", reel.eventTitle ?? "details"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1 pt-1",
						children: [
							/* @__PURE__ */ jsxs(Button, {
								variant: "ghost",
								size: "sm",
								"aria-label": "Like reel",
								onClick: () => toggleLike.mutate(),
								children: [/* @__PURE__ */ jsx(Heart, { className: cn("mr-2 h-4 w-4 transition-transform duration-300", reel.likedByMe && "scale-110 fill-current text-primary") }), reel.likeCount]
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "ghost",
								size: "sm",
								"aria-label": "Show comments",
								onClick: () => setShowComments((v) => !v),
								children: [/* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 h-4 w-4" }), showComments ? "Hide" : "Comments"]
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "ghost",
								size: "sm",
								className: "ml-auto text-muted-foreground",
								"aria-label": "Report reel",
								onClick: () => setReportOpen(true),
								children: /* @__PURE__ */ jsx(Flag, { className: "h-4 w-4" })
							})
						]
					}),
					showComments && /* @__PURE__ */ jsxs("div", {
						className: "space-y-3 border-t border-border/60 pt-3",
						children: [comments.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "No comments yet."
						}) : /* @__PURE__ */ jsx("ul", {
							className: "space-y-3",
							children: comments.map((c) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-2 text-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsxs("p", {
										className: "font-display text-xs uppercase tracking-widest text-primary",
										children: ["@", c.author]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground",
										children: c.body
									})]
								}), (c.user_id === user?.id || reel.organiser_id === user?.id) && /* @__PURE__ */ jsx("button", {
									"aria-label": "Delete comment",
									className: "text-muted-foreground transition-colors hover:text-destructive",
									onClick: () => deleteComment.mutate(c.id),
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
								})]
							}, c.id))
						}), user ? /* @__PURE__ */ jsxs("form", {
							onSubmit: (e) => {
								e.preventDefault();
								addComment.mutate();
							},
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								value: comment,
								onChange: (e) => setComment(e.target.value),
								placeholder: `Comment as @${profile?.username ?? profile?.student_number ?? "you"}`,
								"aria-label": "Write a comment",
								className: "bg-surface-2"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								size: "icon",
								disabled: addComment.isPending,
								children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
							})]
						}) : /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx(Link, {
									to: "/student-login",
									className: "text-primary hover:underline",
									children: "Sign in"
								}),
								" ",
								"to like and comment."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: reportOpen,
				onOpenChange: setReportOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, {
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, {
						className: "font-display",
						children: "Report this reel"
					}) }), /* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							report.mutate();
						},
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: `reason-${reel.id}`,
									children: "Reason"
								}), /* @__PURE__ */ jsxs(Select, {
									value: reason,
									onValueChange: setReason,
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										id: `reason-${reel.id}`,
										className: "bg-surface-2",
										children: /* @__PURE__ */ jsx(SelectValue, {})
									}), /* @__PURE__ */ jsx(SelectContent, { children: REPORT_REASONS.map((r) => /* @__PURE__ */ jsx(SelectItem, {
										value: r,
										children: r
									}, r)) })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: `details-${reel.id}`,
									children: "More detail (optional)"
								}), /* @__PURE__ */ jsx(Textarea, {
									id: `details-${reel.id}`,
									rows: 3,
									value: details,
									onChange: (e) => setDetails(e.target.value),
									className: "bg-surface-2"
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "w-full",
								disabled: report.isPending,
								children: report.isPending ? "Sending…" : "Submit report"
							})
						]
					})]
				})
			})
		]
	});
}
export { ReelsFeed as component, useReelsFeed };
