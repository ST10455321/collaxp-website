import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-grJerPa1.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CG4hz8mM.js";
import { t as Textarea } from "./textarea-DQriKw-b.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { c as updateEvent, n as deleteEvent, o as listOrganiserEvents, t as createEvent } from "./events-CDmwh__r.js";
import { o as getOrganiserRegistrationCounts, s as listEventAttendees } from "./registrations-CNP-eODM.js";
import { _ as formatDate, f as EVENT_TYPES, g as eventTypeLabel, p as INSTITUTIONS, u as CATEGORIES, v as formatPrice } from "./helpers-OIPvucp0.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarPlus, Clapperboard, Pencil, QrCode, Trash2, Users, Zap } from "lucide-react";
import { toast } from "sonner";
// src/routes/_authenticated/organiser.tsx?tsr-split=component
var emptyForm = {
	title: "",
	description: "",
	institution: INSTITUTIONS[0],
	location: "",
	category: CATEGORIES[0],
	poster_url: "",
	event_date: "",
	start_time: "18:00",
	price: "0",
	capacity: "100",
	xp_reward: "50",
	is_published: true,
	event_type: "ticketed",
	speaker: "",
	agenda: ""
};
function OrganiserDashboard() {
	const { user, profile, role } = useAuth();
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({ ...emptyForm });
	const [selectedEvent, setSelectedEvent] = useState(null);
	const set = (k, v) => setForm((p) => ({
		...p,
		[k]: v
	}));
	const { data: events = [], isLoading } = useQuery({
		queryKey: ["organiser-events", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => await listOrganiserEvents(user.id)
	});
	const { data: attendees = [] } = useQuery({
		queryKey: ["organiser-attendees", selectedEvent],
		enabled: Boolean(selectedEvent),
		queryFn: async () => await listEventAttendees(user.id, selectedEvent)
	});
	const { data: counts = {} } = useQuery({
		queryKey: [
			"organiser-counts",
			user?.id,
			events.length
		],
		enabled: events.length > 0,
		queryFn: () => getOrganiserRegistrationCounts(user.id)
	});
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["organiser-events"] });
		queryClient.invalidateQueries({ queryKey: ["organiser-counts"] });
		queryClient.invalidateQueries({ queryKey: ["events"] });
	};
	const upsert = useMutation({
		mutationFn: async () => {
			const payload = {
				title: form.title.trim(),
				description: form.description.trim(),
				institution: form.institution,
				location: form.location.trim(),
				category: form.category,
				poster_url: form.poster_url.trim() || null,
				event_date: form.event_date,
				start_time: form.start_time,
				price: form.event_type === "ticketed" ? Number(form.price) || 0 : 0,
				capacity: Number(form.capacity) || 100,
				xp_reward: Number(form.xp_reward) || 0,
				is_published: form.is_published,
				event_type: form.event_type,
				speaker: form.speaker.trim() || null,
				agenda: form.agenda.trim() || null,
				organiser_id: user.id
			};
			if (editing) await updateEvent(editing.id, payload);
			else await createEvent(user.id, payload);
		},
		onSuccess: () => {
			toast.success(editing ? "Event updated" : "Event published");
			setOpen(false);
			setEditing(null);
			setForm({ ...emptyForm });
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteEvent(user.id, id),
		onSuccess: () => {
			toast.success("Event deleted");
			setSelectedEvent(null);
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const startEdit = (event) => {
		setEditing(event);
		setForm({
			title: event.title,
			description: event.description ?? "",
			institution: event.institution,
			location: event.location,
			category: event.category,
			poster_url: event.poster_url ?? "",
			event_date: event.event_date,
			start_time: event.start_time?.slice(0, 5) ?? "18:00",
			price: String(event.price ?? 0),
			capacity: String(event.capacity ?? 100),
			xp_reward: String(event.xp_reward ?? 50),
			is_published: event.is_published,
			event_type: event.event_type ?? "ticketed",
			speaker: event.speaker ?? "",
			agenda: event.agenda ?? ""
		});
		setOpen(true);
	};
	const totalRegistrations = Object.values(counts).reduce((a, b) => a + b, 0);
	if (role !== "organiser") return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-md px-4 py-24 text-center",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl",
			children: "Organiser access only"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "This dashboard is for organiser accounts. Sign in with an organiser account to manage events."
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs(Reveal, {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-display text-xs uppercase tracking-[0.2em] text-primary",
					children: "Organiser dashboard"
				}), /* @__PURE__ */ jsx("h1", {
					className: "mt-1 text-3xl sm:text-4xl",
					children: profile?.full_name ?? profile?.username ?? "Organiser"
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/scan",
								children: [/* @__PURE__ */ jsx(QrCode, { className: "mr-2 h-4 w-4" }), " Scan tickets"]
							})
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/my-reels",
								children: [/* @__PURE__ */ jsx(Clapperboard, { className: "mr-2 h-4 w-4" }), " Manage reels"]
							})
						}),
						/* @__PURE__ */ jsxs(Dialog, {
							open,
							onOpenChange: (v) => {
								setOpen(v);
								if (!v) {
									setEditing(null);
									setForm({ ...emptyForm });
								}
							},
							children: [/* @__PURE__ */ jsx(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs(Button, { children: [/* @__PURE__ */ jsx(CalendarPlus, { className: "mr-2 h-4 w-4" }), " Create event"] })
							}), /* @__PURE__ */ jsxs(DialogContent, {
								className: "max-h-[85vh] overflow-y-auto sm:max-w-lg",
								children: [/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, {
									className: "font-display",
									children: editing ? "Edit event" : "Create event"
								}) }), /* @__PURE__ */ jsxs("form", {
									onSubmit: (e) => {
										e.preventDefault();
										upsert.mutate();
									},
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "title",
												children: "Event title"
											}), /* @__PURE__ */ jsx(Input, {
												id: "title",
												required: true,
												value: form.title,
												onChange: (e) => set("title", e.target.value),
												className: "bg-surface-2"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "description",
												children: "Description"
											}), /* @__PURE__ */ jsx(Textarea, {
												id: "description",
												rows: 3,
												value: form.description,
												onChange: (e) => set("description", e.target.value),
												className: "bg-surface-2"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "ev-type",
													children: "Event type"
												}), /* @__PURE__ */ jsxs(Select, {
													value: form.event_type,
													onValueChange: (v) => set("event_type", v),
													children: [/* @__PURE__ */ jsx(SelectTrigger, {
														id: "ev-type",
														className: "bg-surface-2",
														children: /* @__PURE__ */ jsx(SelectValue, {})
													}), /* @__PURE__ */ jsx(SelectContent, { children: EVENT_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, {
														value: t.value,
														children: t.label
													}, t.value)) })]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "speaker",
													children: "Speaker / host (optional)"
												}), /* @__PURE__ */ jsx(Input, {
													id: "speaker",
													value: form.speaker,
													onChange: (e) => set("speaker", e.target.value),
													placeholder: "e.g. Prof. Dlamini",
													className: "bg-surface-2"
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "agenda",
												children: "Agenda / event details (optional)"
											}), /* @__PURE__ */ jsx(Textarea, {
												id: "agenda",
												rows: 3,
												value: form.agenda,
												onChange: (e) => set("agenda", e.target.value),
												placeholder: "Line-up, agenda items or rally programme",
												className: "bg-surface-2"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "event_date",
													children: "Date"
												}), /* @__PURE__ */ jsx(Input, {
													id: "event_date",
													type: "date",
													required: true,
													value: form.event_date,
													onChange: (e) => set("event_date", e.target.value),
													className: "bg-surface-2"
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "start_time",
													children: "Start time"
												}), /* @__PURE__ */ jsx(Input, {
													id: "start_time",
													type: "time",
													required: true,
													value: form.start_time,
													onChange: (e) => set("start_time", e.target.value),
													className: "bg-surface-2"
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "location",
												children: "Venue"
											}), /* @__PURE__ */ jsx(Input, {
												id: "location",
												required: true,
												value: form.location,
												onChange: (e) => set("location", e.target.value),
												className: "bg-surface-2"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "ev-institution",
													children: "Institution"
												}), /* @__PURE__ */ jsxs(Select, {
													value: form.institution,
													onValueChange: (v) => set("institution", v),
													children: [/* @__PURE__ */ jsx(SelectTrigger, {
														id: "ev-institution",
														className: "bg-surface-2",
														children: /* @__PURE__ */ jsx(SelectValue, {})
													}), /* @__PURE__ */ jsx(SelectContent, { children: INSTITUTIONS.map((i) => /* @__PURE__ */ jsx(SelectItem, {
														value: i,
														children: i
													}, i)) })]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ jsx(Label, {
													htmlFor: "ev-category",
													children: "Category"
												}), /* @__PURE__ */ jsxs(Select, {
													value: form.category,
													onValueChange: (v) => set("category", v),
													children: [/* @__PURE__ */ jsx(SelectTrigger, {
														id: "ev-category",
														className: "bg-surface-2",
														children: /* @__PURE__ */ jsx(SelectValue, {})
													}), /* @__PURE__ */ jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, {
														value: c,
														children: c
													}, c)) })]
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid gap-4 sm:grid-cols-3",
											children: [
												form.event_type === "ticketed" ? /* @__PURE__ */ jsxs("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ jsx(Label, {
														htmlFor: "price",
														children: "Price (R)"
													}), /* @__PURE__ */ jsx(Input, {
														id: "price",
														type: "number",
														min: "0",
														step: "1",
														value: form.price,
														onChange: (e) => set("price", e.target.value),
														className: "bg-surface-2"
													})]
												}) : /* @__PURE__ */ jsx("div", {
													className: "flex items-end space-y-2 pb-1 text-xs text-muted-foreground",
													children: "Seminars and rallies are free — students RSVP instead of buying a ticket."
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ jsx(Label, {
														htmlFor: "capacity",
														children: "Capacity"
													}), /* @__PURE__ */ jsx(Input, {
														id: "capacity",
														type: "number",
														min: "1",
														value: form.capacity,
														onChange: (e) => set("capacity", e.target.value),
														className: "bg-surface-2"
													})]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ jsx(Label, {
														htmlFor: "xp_reward",
														children: "XP reward"
													}), /* @__PURE__ */ jsx(Input, {
														id: "xp_reward",
														type: "number",
														min: "0",
														value: form.xp_reward,
														onChange: (e) => set("xp_reward", e.target.value),
														className: "bg-surface-2"
													})]
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ jsx(Label, {
												htmlFor: "poster_url",
												children: "Poster image URL"
											}), /* @__PURE__ */ jsx(Input, {
												id: "poster_url",
												value: form.poster_url,
												onChange: (e) => set("poster_url", e.target.value),
												placeholder: "https://…",
												className: "bg-surface-2"
											})]
										}),
										/* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-3 text-sm",
											children: [/* @__PURE__ */ jsx("input", {
												type: "checkbox",
												checked: form.is_published,
												onChange: (e) => set("is_published", e.target.checked),
												className: "h-4 w-4 accent-[var(--color-primary)]"
											}), "Visible to students"]
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "submit",
											className: "w-full",
											disabled: upsert.isPending,
											children: upsert.isPending ? "Saving…" : editing ? "Save changes" : "Publish event"
										})
									]
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					{
						label: "Your events",
						value: events.length,
						icon: CalendarPlus
					},
					{
						label: "Registrations",
						value: totalRegistrations,
						icon: Users
					},
					{
						label: "XP issued",
						value: events.reduce((sum, e) => sum + (counts[e.id] ?? 0) * (e.xp_reward ?? 0), 0),
						icon: Zap
					}
				].map((s, i) => /* @__PURE__ */ jsxs(Reveal, {
					delay: i * 70,
					className: "panel p-5",
					children: [
						/* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5 text-primary" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 font-display text-3xl",
							children: s.value
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h2", {
					className: "text-2xl",
					children: "Your events"
				}) }), isLoading ? /* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-3",
					children: [0, 1].map((i) => /* @__PURE__ */ jsx("div", { className: "panel h-24 animate-pulse" }, i))
				}) : events.length === 0 ? /* @__PURE__ */ jsx(Reveal, {
					className: "panel mt-4 p-10 text-center text-sm text-muted-foreground",
					children: "No events yet — create your first one."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-3",
					children: events.map((e, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						delay: Math.min(i, 6) * 50,
						children: /* @__PURE__ */ jsxs("div", {
							className: "panel p-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ jsxs("p", {
											className: "font-display text-xs uppercase tracking-widest text-primary",
											children: [
												eventTypeLabel(e.event_type),
												" · ",
												e.category,
												" · ",
												e.institution,
												!e.is_published && " · hidden"
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "truncate font-display text-lg",
											children: e.title
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [
												formatDate(e.event_date),
												" · ",
												e.start_time?.slice(0, 5),
												" · ",
												e.location,
												" ·",
												" ",
												formatPrice(Number(e.price)),
												" · ",
												counts[e.id] ?? 0,
												"/",
												e.capacity,
												" registered"
											]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex shrink-0 gap-2",
									children: [
										/* @__PURE__ */ jsxs(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => setSelectedEvent(selectedEvent === e.id ? null : e.id),
											children: [/* @__PURE__ */ jsx(Users, { className: "mr-2 h-4 w-4" }), selectedEvent === e.id ? "Hide" : "Attendees"]
										}),
										/* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => startEdit(e),
											children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
										}),
										/* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: "ghost",
											"aria-label": "Delete event",
											onClick: () => remove.mutate(e.id),
											disabled: remove.isPending,
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
										})
									]
								})]
							}), selectedEvent === e.id && /* @__PURE__ */ jsx("div", {
								className: "mt-4 overflow-x-auto rounded-xl border border-border",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-left text-sm",
									children: [/* @__PURE__ */ jsx("thead", {
										className: "bg-surface-2 font-display text-[11px] uppercase tracking-widest text-muted-foreground",
										children: /* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-2",
												children: "Student"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-2",
												children: "Institution"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-2",
												children: "Ticket"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-2",
												children: "Registered"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-3 py-2",
												children: "Check-in"
											})
										] })
									}), /* @__PURE__ */ jsx("tbody", { children: attendees.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 5,
										className: "px-3 py-4 text-center text-muted-foreground",
										children: "No registrations yet."
									}) }) : attendees.map((a) => /* @__PURE__ */ jsxs("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-2",
												children: a.profile?.student_number ?? a.profile?.username ?? "—"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-2 text-muted-foreground",
												children: a.profile?.institution ?? "—"
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-2 text-primary",
												children: a.ticket_no
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-2 text-muted-foreground",
												children: new Date(a.created_at).toLocaleDateString("en-ZA")
											}),
											/* @__PURE__ */ jsx("td", {
												className: "px-3 py-2",
												children: a.attended ? /* @__PURE__ */ jsx("span", {
													className: "font-display text-[11px] uppercase tracking-widest text-primary",
													children: "Scanned"
												}) : /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Pending"
												})
											})
										]
									}, a.id)) })]
								})
							})]
						})
					}, e.id))
				})]
			})
		]
	});
}
export { OrganiserDashboard as component };
