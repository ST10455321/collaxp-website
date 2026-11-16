import { t as Reveal } from "./Reveal-4T7NNWSK.js";
import { u as Button } from "./auth-DVlmHz9A.js";
import { t as Input } from "./input-DDsObxxJ.js";
import { t as Label } from "./label-CfH-19Jn.js";
import { o as useAuth } from "./router-Bmo75UHY.js";
import { l as lookupRegistration, u as markAttended } from "./registrations-CNP-eODM.js";
import { _ as formatDate } from "./helpers-OIPvucp0.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, CameraOff, CheckCircle2, QrCode, XCircle } from "lucide-react";
import { toast } from "sonner";
// src/routes/_authenticated/scan.tsx?tsr-split=component
function parsePayload(text) {
	const parts = text.trim().split("|");
	if (parts[0] === "COLLAXP" && parts[1]) return {
		registrationId: parts[1],
		ticketNo: parts[2] ?? ""
	};
	return null;
}
function ScanPage() {
	const { role, user } = useAuth();
	const queryClient = useQueryClient();
	const [result, setResult] = useState(null);
	const [scanning, setScanning] = useState(false);
	const [manual, setManual] = useState("");
	const [busy, setBusy] = useState(false);
	const scannerRef = useRef(null);
	const lastRef = useRef("");
	const checkIn = async (opts) => {
		setBusy(true);
		try {
			const reg = await lookupRegistration(user.id, {
				registrationId: opts.registrationId,
				ticketNo: opts.ticketNo
			});
			if (!reg) {
				setResult({
					ok: false,
					title: "Ticket not recognised",
					detail: "This ticket does not belong to any of your events."
				});
				return;
			}
			const who = reg.profile?.student_number ?? reg.profile?.full_name ?? reg.profile?.username ?? "Student";
			const when = reg.event ? `${formatDate(reg.event.event_date)} · ${reg.event.start_time?.slice(0, 5)}` : "";
			if (reg.attended) {
				setResult({
					ok: false,
					title: `Already checked in — ${reg.ticket_no}`,
					detail: `${who} was scanned${reg.scanned_at ? ` at ${new Date(reg.scanned_at).toLocaleTimeString("en-ZA")}` : ""}.`
				});
				return;
			}
			await markAttended(reg.id);
			setResult({
				ok: true,
				title: `Checked in — ${reg.ticket_no}`,
				detail: `${who} · ${reg.event?.title ?? ""}${when ? ` · ${when}` : ""}`
			});
			queryClient.invalidateQueries({ queryKey: ["organiser-attendees"] });
		} catch (e) {
			setResult({
				ok: false,
				title: "Scan failed",
				detail: e.message
			});
		} finally {
			setBusy(false);
		}
	};
	const stopScanner = async () => {
		const scanner = scannerRef.current;
		scannerRef.current = null;
		setScanning(false);
		if (scanner) try {
			await scanner.stop();
			scanner.clear();
		} catch {}
	};
	const startScanner = async () => {
		try {
			const { Html5Qrcode } = await import("html5-qrcode");
			const scanner = new Html5Qrcode("collaxp-scanner");
			scannerRef.current = scanner;
			setScanning(true);
			await scanner.start({ facingMode: "environment" }, {
				fps: 10,
				qrbox: {
					width: 240,
					height: 240
				}
			}, (text) => {
				if (text === lastRef.current) return;
				lastRef.current = text;
				const parsed = parsePayload(text);
				if (!parsed) {
					setResult({
						ok: false,
						title: "Not a COLLAXP ticket",
						detail: "Ask the student to open their ticket QR from My Events."
					});
					return;
				}
				checkIn({ registrationId: parsed.registrationId });
			}, () => {});
		} catch (e) {
			setScanning(false);
			scannerRef.current = null;
			toast.error("Camera unavailable", { description: e.message || "Use manual ticket entry instead." });
		}
	};
	useEffect(() => {
		return () => {
			stopScanner();
		};
	}, []);
	if (role && role !== "organiser") return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl",
				children: "Organisers only"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Ticket scanning is available on organiser accounts. Your own ticket QR codes live under My Events."
			}),
			/* @__PURE__ */ jsx(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ jsx(Link, {
					to: "/my-events",
					children: "Go to My Events"
				})
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl sm:text-4xl",
				children: "Scan tickets"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Point the camera at a student's ticket QR code to check them in, or type the ticket number."
			})] }),
			/* @__PURE__ */ jsxs(Reveal, {
				delay: 80,
				className: "panel mt-8 p-5",
				children: [/* @__PURE__ */ jsx("div", {
					id: "collaxp-scanner",
					className: "mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-surface-2",
					style: { minHeight: scanning ? 280 : 0 }
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [scanning ? /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						onClick: () => void stopScanner(),
						children: [/* @__PURE__ */ jsx(CameraOff, { className: "mr-2 h-4 w-4" }), " Stop camera"]
					}) : /* @__PURE__ */ jsxs(Button, {
						onClick: () => void startScanner(),
						children: [/* @__PURE__ */ jsx(Camera, { className: "mr-2 h-4 w-4" }), " Start camera scan"]
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/organiser",
							children: "Back to dashboard"
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(Reveal, {
				delay: 140,
				className: "panel mt-6 p-5",
				children: [/* @__PURE__ */ jsx(Label, {
					htmlFor: "ticket",
					children: "Manual ticket number"
				}), /* @__PURE__ */ jsxs("form", {
					className: "mt-2 flex flex-col gap-2 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						const value = manual.trim();
						if (!value) return;
						checkIn({ ticketNo: value.startsWith("#") ? value : `#${value}` });
						setManual("");
					},
					children: [/* @__PURE__ */ jsx(Input, {
						id: "ticket",
						value: manual,
						onChange: (e) => setManual(e.target.value),
						placeholder: "#1234"
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: busy || !manual.trim(),
						children: [/* @__PURE__ */ jsx(QrCode, { className: "mr-2 h-4 w-4" }), " Check in"]
					})]
				})]
			}),
			result && /* @__PURE__ */ jsxs("div", {
				className: `panel mt-6 flex items-start gap-3 p-5 ${result.ok ? "border-primary/50" : "border-destructive/50"}`,
				children: [result.ok ? /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 text-primary" }) : /* @__PURE__ */ jsx(XCircle, { className: "mt-0.5 h-5 w-5 text-destructive" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-display text-lg",
					children: result.title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: result.detail
				})] })]
			})
		]
	});
}
export { ScanPage as component };
