import { t as __exportAll } from "./rolldown-runtime-D8jQpDG7.js";
import { C as errorCode, T as cn, a as getManyDocs, c as sortByDate, d as DEMO_ACCOUNTS, h as STUDENT_EMAIL_PATTERN, i as fromSnap, p as INSTITUTIONS, r as col, s as ref, t as C, w as guard } from "./helpers-OIPvucp0.js";
import { a as registerAccount, c as signOutUser, i as fetchProfileAndRole, r as ensureAccountRecords, s as signIn, u as Button } from "./auth-DVlmHz9A.js";
import { n as getFirebaseAuth, t as getDb } from "./config-B8lMgJTO.js";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Menu, ShoppingCart, X } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { deleteDoc, getDocs, query, runTransaction, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { Toaster, toast } from "sonner";
// src/styles.css?url
var styles_default = "/assets/styles-mcRkRrNU.css";
// src/lib/error-reporting.ts
function reportAppError(error, context = {}) {
	if (typeof window === "undefined") return;
	const options = {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	};
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	console.error("[App Error]", message, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context,
		...options,
		...stack !== void 0 && { stack }
	});
}
var PETAL_D = "M120,120 C162,88 150,16 120,6 C90,28 66,80 120,120 Z";
/**
* The COLLAXP ribbon-flower mark, drawn as vector SVG (no external image).
* `filled` renders the finished metallic look; set false for an outline-only
* (neon) version, used mid-draw by the intro animation.
*/
function LogoMark({ className, style, filled = true }) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 240 240",
		className: cn("select-none", className),
		style,
		"aria-hidden": true,
		children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
			id: "collaxp-mark-grad",
			x1: "10%",
			y1: "0%",
			x2: "90%",
			y2: "100%",
			children: [
				/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#f5f3ff"
				}),
				/* @__PURE__ */ jsx("stop", {
					offset: "45%",
					stopColor: "var(--primary)"
				}),
				/* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#150a1e"
				})
			]
		}) }), /* @__PURE__ */ jsx("g", {
			fill: filled ? "url(#collaxp-mark-grad)" : "none",
			stroke: "var(--primary)",
			strokeWidth: filled ? 1.5 : 3,
			strokeLinecap: "round",
			children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ jsx("path", {
				d: PETAL_D,
				transform: `rotate(${45 * i} 120 120)`
			}, i))
		})]
	});
}
/** The "COLLAXP" wordmark, styled with the site's display font. */
function Wordmark({ className, style }) {
	return /* @__PURE__ */ jsxs("span", {
		className: cn("font-display font-bold uppercase leading-none tracking-wide", className),
		style,
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-foreground",
			children: "COLLA"
		}), /* @__PURE__ */ jsx("span", {
			className: "text-primary",
			children: "XP"
		})]
	});
}
function Logo({ className, variant = "full" }) {
	if (variant === "mark") return /* @__PURE__ */ jsx(LogoMark, { className });
	return /* @__PURE__ */ jsxs("span", {
		className: cn("inline-flex select-none items-center gap-2", className),
		children: [/* @__PURE__ */ jsx(LogoMark, { className: "h-full w-auto shrink-0" }), /* @__PURE__ */ jsx(Wordmark, { className: "text-[0.55em]" })]
	});
}
// src/components/brand/IntroOverlay.tsx
var KEY = "collaxp:intro-played";
/**
* Cinematic ~3s brand intro, staged from the storyboard:
*   1. spark   — purple light ignites
*   2. form    — ribbon petals draw themselves in, one by one, as a neon outline
*   3. build   — the neon outline dissolves into the finished metallic mark
*   4. reveal  — COLLAXP wordmark slides/wipes in next to the mark
*   5. lock    — logo settles with a soft snap
*   6. out     — fades to reveal the site
*
* Fully vector (SVG + text) — no external image assets, so it can never
* show a broken-image icon.
*/
function IntroOverlay() {
	const [phase, setPhase] = useState("done");
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (sessionStorage.getItem(KEY) === "1") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			sessionStorage.setItem(KEY, "1");
			return;
		}
		sessionStorage.setItem(KEY, "1");
		setPhase("spark");
		const timers = [
			window.setTimeout(() => setPhase("form"), 450),
			window.setTimeout(() => setPhase("build"), 1e3),
			window.setTimeout(() => setPhase("reveal"), 1550),
			window.setTimeout(() => setPhase("lock"), 2150),
			window.setTimeout(() => setPhase("out"), 2500),
			window.setTimeout(() => setPhase("done"), 3100)
		];
		return () => timers.forEach(window.clearTimeout);
	}, []);
	const petals = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
		angle: 45 * i,
		delay: i * 55
	})), []);
	if (phase === "done") return null;
	const showFlower = phase !== "spark";
	const showNeon = phase === "form";
	const showFilledMark = phase === "build" || phase === "reveal" || phase === "lock" || phase === "out";
	const showText = phase === "reveal" || phase === "lock" || phase === "out";
	return /* @__PURE__ */ jsxs("div", {
		"aria-hidden": true,
		className: "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-500",
		style: { opacity: phase === "out" ? 0 : 1 },
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full",
				style: {
					background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 70%, transparent) 0%, transparent 62%)",
					animation: "collaxp-spark 1.2s ease-out both",
					opacity: phase === "spark" ? .9 : .45,
					transition: "opacity 600ms ease"
				}
			}),
			phase === "spark" && /* @__PURE__ */ jsx("div", {
				className: "absolute h-3 w-3 rounded-full bg-white",
				style: {
					boxShadow: "0 0 40px 14px color-mix(in oklab, var(--primary) 85%, transparent)",
					animation: "collaxp-spark 0.9s ease-out both"
				}
			}),
			showFlower && /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex h-[46vmin] max-h-[360px] w-[46vmin] max-w-[360px] items-center justify-center",
					children: [showNeon && /* @__PURE__ */ jsx("svg", {
						viewBox: "0 0 240 240",
						className: "absolute inset-0 h-full w-full",
						style: {
							filter: "drop-shadow(0 0 6px var(--primary)) drop-shadow(0 0 18px color-mix(in oklab, var(--primary) 70%, transparent))",
							animation: "collaxp-flower-spin-in 550ms cubic-bezier(0.22,1,0.36,1) both"
						},
						children: /* @__PURE__ */ jsx("g", {
							fill: "none",
							stroke: "var(--primary)",
							strokeWidth: 3,
							strokeLinecap: "round",
							children: petals.map(({ angle, delay }) => /* @__PURE__ */ jsx("path", {
								d: "M120,120 C162,88 150,16 120,6 C90,28 66,80 120,120 Z",
								pathLength: 1,
								transform: `rotate(${angle} 120 120)`,
								style: {
									strokeDasharray: 1,
									animation: `collaxp-petal-draw 420ms ease-out ${delay}ms both`
								}
							}, angle))
						})
					}), /* @__PURE__ */ jsx(LogoMark, {
						className: "absolute inset-0 h-full w-full",
						filled: true,
						style: {
							opacity: showFilledMark ? 1 : 0,
							transform: showFilledMark ? "scale(1)" : "scale(0.9)",
							transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)",
							animation: phase === "lock" || phase === "out" ? "collaxp-lock 420ms cubic-bezier(0.22,1,0.36,1) both" : void 0
						}
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-hidden",
					style: {
						opacity: showText ? 1 : 0,
						animation: showText ? "collaxp-wipe 620ms cubic-bezier(0.22,1,0.36,1) both" : void 0
					},
					children: /* @__PURE__ */ jsx(Wordmark, {
						className: "text-4xl sm:text-5xl",
						style: {
							display: "inline-block",
							animation: phase === "lock" || phase === "out" ? "collaxp-lock 420ms cubic-bezier(0.22,1,0.36,1) both" : void 0
						}
					})
				})]
			})
		]
	});
}
// src/components/layout/SiteFooter.tsx
function SiteFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-24 border-t border-border/60 bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx(Logo, { className: "h-12 w-auto" }), /* @__PURE__ */ jsx("p", {
					className: "max-w-xs text-xs text-muted-foreground",
					children: "The digital year book for campus events, moments and student experience."
				})]
			}), /* @__PURE__ */ jsxs("nav", {
				className: "flex flex-wrap gap-x-6 gap-y-2 font-display text-xs uppercase tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/discover",
						className: "transition-colors hover:text-primary",
						children: "Discover"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/rewards",
						className: "transition-colors hover:text-primary",
						children: "Rewards"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/student-signup",
						className: "transition-colors hover:text-primary",
						children: "Student sign up"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/organiser-login",
						className: "transition-colors hover:text-primary",
						children: "Organisers"
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("p", {
			className: "pb-8 text-center text-[11px] text-muted-foreground/70",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" COLLAXP · Built for South African students"
			]
		})]
	});
}
// src/integrations/firebase/data/cart.ts
function listCartItems(uid) {
	return guard(async () => {
		const snap = await getDocs(query(col(C.cartItems), where("user_id", "==", uid)));
		const rows = sortByDate(snap.docs.map((d) => fromSnap(d)), "asc");
		const events = await getManyDocs(C.events, rows.map((r) => r.event_id));
		return rows.map((r) => ({
			...r,
			event: events.get(r.event_id) ?? null
		})).filter((r) => r.event !== null);
	});
}
function addToCart(uid, eventId, quantity) {
	return guard(() => {
		const cartRef = ref(C.cartItems, `${uid}_${eventId}`);
		return runTransaction(getDb(), async (tx) => {
			const existing = await tx.get(cartRef);
			if (existing.exists()) {
				const current = Number(existing.data()["quantity"] ?? 0);
				tx.update(cartRef, {
					quantity: Math.min(10, current + quantity),
					updated_at: serverTimestamp()
				});
			} else tx.set(cartRef, {
				user_id: uid,
				event_id: eventId,
				quantity: Math.min(10, Math.max(1, quantity)),
				created_at: serverTimestamp(),
				updated_at: serverTimestamp()
			});
		});
	});
}
function setCartQuantity(id, quantity) {
	return guard(async () => {
		if (quantity < 1) {
			await deleteDoc(ref(C.cartItems, id));
			return;
		}
		await updateDoc(ref(C.cartItems, id), {
			quantity: Math.min(10, quantity),
			updated_at: serverTimestamp()
		});
	});
}
function removeCartItem(id) {
	return guard(() => deleteDoc(ref(C.cartItems, id)));
}
// src/hooks/useAuth.tsx
var AuthContext = createContext(null);
function AuthProvider({ children }) {
	const queryClient = useQueryClient();
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);
	const [role, setRole] = useState(null);
	const [loading, setLoading] = useState(true);
	const signingUp = useRef(false);
	const loadSeq = useRef(0);
	const loadDetails = async (userId) => {
		const seq = ++loadSeq.current;
		if (!userId) {
			setProfile(null);
			setRole(null);
			return;
		}
		try {
			const details = await fetchProfileAndRole(userId);
			if (seq !== loadSeq.current) return;
			setProfile(details.profile);
			setRole(details.role);
		} catch (error) {
			console.error("[Auth] Failed to load profile", error);
			setProfile(null);
			setRole(null);
		}
	};
	useEffect(() => {
		let active = true;
		const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (next) => {
			if (!active) return;
			setUser(next ? {
				id: next.uid,
				email: next.email
			} : null);
			if (!next) {
				setProfile(null);
				setRole(null);
				setLoading(false);
				return;
			}
			if (signingUp.current) return;
			loadDetails(next.uid).finally(() => {
				if (active) setLoading(false);
			});
		});
		return () => {
			active = false;
			unsubscribe();
		};
	}, []);
	const signUpAccount = async (input) => {
		signingUp.current = true;
		try {
			const uid = await registerAccount(input);
			await loadDetails(uid);
		} finally {
			signingUp.current = false;
			setLoading(false);
		}
	};
	const value = useMemo(() => ({
		loading,
		user,
		profile,
		role,
		refreshProfile: async () => {
			await loadDetails(user?.id);
		},
		signUp: signUpAccount,
		demoLogin: async (demoRole) => {
			const demo = DEMO_ACCOUNTS[demoRole];
			try {
				await signIn(demo.email, demo.password);
			} catch {
				try {
					await signUpAccount({
						email: demo.email,
						password: demo.password,
						role: demoRole,
						fullName: demo.fullName,
						username: demo.fullName,
						institution: INSTITUTIONS[0]
					});
					return;
				} catch (error) {
					if (errorCode(error) === "auth/email-already-in-use") throw new Error("The demo account exists but its password was changed.");
					throw error;
				}
			}
			const current = getFirebaseAuth().currentUser;
			if (current) {
				await ensureAccountRecords(current.uid, current.email, demoRole);
				await loadDetails(current.uid);
			}
		},
		claimAccount: async (claimRole) => {
			const current = getFirebaseAuth().currentUser;
			if (!current) return;
			await ensureAccountRecords(current.uid, current.email, claimRole);
			await loadDetails(current.uid);
		},
		signOut: async () => {
			await queryClient.cancelQueries();
			queryClient.clear();
			await signOutUser();
		}
	}), [
		loading,
		user,
		profile,
		role,
		queryClient
	]);
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
function isValidStudentEmail(email) {
	return STUDENT_EMAIL_PATTERN.test(email.trim());
}
// src/hooks/useCart.ts
function useCartItems() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["cart", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => await listCartItems(user.id)
	});
}
function useCartCount() {
	const { data = [] } = useCartItems();
	return data.reduce((sum, row) => sum + row.quantity, 0);
}
function useAddToCart() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ eventId, quantity }) => addToCart(user.id, eventId, quantity),
		onSuccess: () => {
			toast.success("Added to cart", { description: "Open your cart to check out." });
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (error) => toast.error(error.message)
	});
}
// src/components/layout/SiteHeader.tsx
var publicLinks = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/discover",
		label: "Discover"
	},
	{
		to: "/reels",
		label: "Reels"
	},
	{
		to: "/rewards",
		label: "Rewards"
	}
];
var studentLinks = [
	{
		to: "/dashboard",
		label: "Dashboard"
	},
	{
		to: "/my-events",
		label: "My Events"
	},
	{
		to: "/profile",
		label: "Profile"
	}
];
function SiteHeader() {
	const { user, profile, role, signOut } = useAuth();
	const cartCount = useCartCount();
	const [open, setOpen] = useState(false);
	const links = [
		...publicLinks,
		...user && role !== "organiser" ? studentLinks : [],
		...role === "organiser" ? [{
			to: "/organiser",
			label: "Organiser"
		}, {
			to: "/scan",
			label: "Scan"
		}] : []
	];
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "flex items-center gap-2 transition-transform hover:scale-[1.03]",
					children: /* @__PURE__ */ jsx(Logo, { className: "h-10 w-auto" })
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "ml-auto hidden items-center gap-1 md:flex",
					children: links.map((l) => /* @__PURE__ */ jsx(Link, {
						to: l.to,
						activeProps: { className: "text-primary" },
						className: "relative rounded-full px-3 py-2 font-display text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "ml-auto flex items-center gap-2 md:ml-0",
					children: [user ? /* @__PURE__ */ jsxs(Fragment, { children: [
						role !== "organiser" && /* @__PURE__ */ jsxs(Link, {
							to: "/cart",
							"aria-label": "Ticket cart",
							className: "relative rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
							children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "h-4 w-4" }), cartCount > 0 && /* @__PURE__ */ jsx("span", {
								className: "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-display text-[9px] text-primary-foreground",
								children: cartCount
							})]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/notifications",
							"aria-label": "Notifications",
							className: "rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
							children: /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hidden font-display text-xs uppercase tracking-widest text-primary sm:inline",
							children: profile?.student_number ?? profile?.username ?? "Organiser"
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => void signOut(),
							children: "Sign out"
						})
					] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/student-login",
							children: "Student login"
						})
					}), /* @__PURE__ */ jsx(Button, {
						size: "sm",
						asChild: true,
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/student-signup",
							children: "Sign up"
						})
					})] }), /* @__PURE__ */ jsx("button", {
						className: "rounded-full border border-border p-2 md:hidden",
						"aria-label": "Menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" })
					})]
				})
			]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "border-t border-border/60 bg-background/95 px-4 pb-4 md:hidden",
			children: /* @__PURE__ */ jsx("nav", {
				className: "flex flex-col",
				children: [
					...links,
					...user && role !== "organiser" ? [{
						to: "/cart",
						label: "Cart"
					}] : [],
					{
						to: "/organiser-login",
						label: "Organiser login"
					}
				].map((l) => /* @__PURE__ */ jsx(Link, {
					to: l.to,
					onClick: () => setOpen(false),
					className: "border-b border-border/40 py-3 font-display text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary",
					children: l.label
				}, l.to))
			})
		})]
	});
}
// src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
// src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportAppError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "COLLAXP — Campus Events for Students" },
			{
				name: "description",
				content: "COLLAXP is the campus events platform where students discover events, register in seconds and earn XP for showing up."
			},
			{
				name: "author",
				content: "COLLAXP"
			},
			{
				property: "og:title",
				content: "COLLAXP — Campus Events for Students"
			},
			{
				property: "og:description",
				content: "Discover campus events, register instantly and level up your student life."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Aldrich&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,400&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
			/* @__PURE__ */ jsx(IntroOverlay, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ jsx(SiteHeader, {}),
					/* @__PURE__ */ jsx("main", {
						className: "flex-1",
						children: /* @__PURE__ */ jsx(Outlet, {})
					}),
					/* @__PURE__ */ jsx(SiteFooter, {})
				]
			}),
			/* @__PURE__ */ jsx(Toaster$1, {})
		] })
	});
}
// src/routes/index.tsx
var $$splitComponentImporter$17 = () => import("./routes-Cp38JPGz.js");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "COLLAXP — Campus Events & Your Digital Year Book" },
		{
			name: "description",
			content: "COLLAXP is the student platform for discovering campus events, registering with your student number and earning XP for every experience."
		},
		{
			property: "og:title",
			content: "COLLAXP — Campus Events & Your Digital Year Book"
		},
		{
			property: "og:description",
			content: "Discover campus events, register with your student number and earn XP for every experience."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
// src/routes/_authenticated/route.tsx
var $$splitComponentImporter$16 = () => import("./route-DZf-ZM5Z.js");
async function getSignedInUser() {
	const auth = getFirebaseAuth();
	await auth.authStateReady();
	return auth.currentUser;
}
var Route$16 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const user = await getSignedInUser();
		if (!user) throw redirect({ to: "/student-login" });
		return { user: {
			id: user.uid,
			email: user.email
		} };
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
// src/routes/discover.tsx
var $$splitComponentImporter$15 = () => import("./discover-DDFWPLCo.js");
var Route$15 = createFileRoute("/discover")({
	head: () => ({ meta: [
		{ title: "Discover Campus Events — COLLAXP" },
		{
			name: "description",
			content: "Browse every published campus event on COLLAXP by category, institution or search — then register with your student number."
		},
		{
			property: "og:title",
			content: "Discover Campus Events — COLLAXP"
		},
		{
			property: "og:description",
			content: "Browse campus events by category, institution or search on COLLAXP."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
// src/routes/organiser-login.tsx
var $$splitComponentImporter$14 = () => import("./organiser-login-C0OnBaNH.js");
var Route$14 = createFileRoute("/organiser-login")({
	head: () => ({ meta: [
		{ title: "Organiser Access — COLLAXP" },
		{
			name: "description",
			content: "Separate organiser sign in and registration for institutions and venues to publish and manage campus events on COLLAXP."
		},
		{
			property: "og:title",
			content: "Organiser Access — COLLAXP"
		},
		{
			property: "og:description",
			content: "Sign in as an organiser to create and manage campus events."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
// src/routes/reels.tsx
var $$splitComponentImporter$13 = () => import("./reels-Bk5Lqqut.js");
var Route$13 = createFileRoute("/reels")({
	head: () => ({ meta: [
		{ title: "Campus Reels — COLLAXP" },
		{
			name: "description",
			content: "Watch short campus reels from event organisers on COLLAXP — like, comment, report and jump straight to the event behind the video."
		},
		{
			property: "og:title",
			content: "Campus Reels — COLLAXP"
		},
		{
			property: "og:description",
			content: "Short campus event videos from organisers on COLLAXP."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
// src/routes/reset-password.tsx
var $$splitComponentImporter$12 = () => import("./reset-password-7DhjT2wp.js");
var Route$12 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Reset Password — COLLAXP" },
		{
			name: "description",
			content: "Set a new password for your COLLAXP student or organiser account."
		},
		{
			property: "og:title",
			content: "Reset Password — COLLAXP"
		},
		{
			property: "og:description",
			content: "Set a new COLLAXP account password."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
// src/routes/student-login.tsx
var $$splitComponentImporter$11 = () => import("./student-login-Dha9OGup.js");
var Route$11 = createFileRoute("/student-login")({
	head: () => ({ meta: [
		{ title: "Student Login — COLLAXP" },
		{
			name: "description",
			content: "Sign in to COLLAXP with your ST########@rcconnect.edu.za student email to register for campus events and track your XP."
		},
		{
			property: "og:title",
			content: "Student Login — COLLAXP"
		},
		{
			property: "og:description",
			content: "Sign in with your student email to register for campus events."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
// src/routes/student-signup.tsx
var $$splitComponentImporter$10 = () => import("./student-signup-C1Q32hc6.js");
var Route$10 = createFileRoute("/student-signup")({
	head: () => ({ meta: [
		{ title: "Student Sign Up — COLLAXP" },
		{
			name: "description",
			content: "Create your COLLAXP student account with your ST########@rcconnect.edu.za email, verify your institution and start earning XP at campus events."
		},
		{
			property: "og:title",
			content: "Student Sign Up — COLLAXP"
		},
		{
			property: "og:description",
			content: "Create your verified COLLAXP student account in under a minute."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
// src/routes/_authenticated/cart.tsx
var $$splitComponentImporter$9 = () => import("./cart-41dVkjqw.js");
var Route$9 = createFileRoute("/_authenticated/cart")({
	head: () => ({ meta: [
		{ title: "Ticket Cart — COLLAXP" },
		{
			name: "description",
			content: "Review the campus event tickets in your COLLAXP cart, adjust quantities and check out to get your ticket numbers instantly."
		},
		{
			property: "og:title",
			content: "Ticket Cart — COLLAXP"
		},
		{
			property: "og:description",
			content: "Review and check out your COLLAXP campus event tickets."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
// src/routes/_authenticated/dashboard.tsx
var $$splitComponentImporter$8 = () => import("./dashboard-DL3exkGz.js");
var Route$8 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Student Dashboard — COLLAXP" },
		{
			name: "description",
			content: "Your COLLAXP dashboard: upcoming registrations, unread notifications, XP progress and events happening on campus."
		},
		{
			property: "og:title",
			content: "Student Dashboard — COLLAXP"
		},
		{
			property: "og:description",
			content: "Your registrations, XP progress and campus feed."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
// src/routes/_authenticated/my-events.tsx
var $$splitComponentImporter$7 = () => import("./my-events-CRJ3L97e.js");
var Route$7 = createFileRoute("/_authenticated/my-events")({
	head: () => ({ meta: [
		{ title: "My Events & Tickets — COLLAXP" },
		{
			name: "description",
			content: "Every campus event you have registered for on COLLAXP, with your ticket number, venue and date."
		},
		{
			property: "og:title",
			content: "My Events & Tickets — COLLAXP"
		},
		{
			property: "og:description",
			content: "Your COLLAXP registrations and ticket numbers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
// src/routes/_authenticated/my-reels.tsx
var $$splitComponentImporter$6 = () => import("./my-reels-DpT6llDR.js");
var Route$6 = createFileRoute("/_authenticated/my-reels")({
	head: () => ({ meta: [
		{ title: "My Reels — COLLAXP" },
		{
			name: "description",
			content: "Upload, publish and remove your campus reels on COLLAXP."
		},
		{
			property: "og:title",
			content: "My Reels — COLLAXP"
		},
		{
			property: "og:description",
			content: "Manage the reels you share on COLLAXP."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
// src/routes/_authenticated/notifications.tsx
var $$splitComponentImporter$5 = () => import("./notifications-Dhoemit7.js");
var Route$5 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "Notifications — COLLAXP" },
		{
			name: "description",
			content: "Event confirmations, ticket numbers, XP awards and organiser updates for your COLLAXP account."
		},
		{
			property: "og:title",
			content: "Notifications — COLLAXP"
		},
		{
			property: "og:description",
			content: "Your COLLAXP event and XP notifications."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
// src/routes/_authenticated/organiser.tsx
var $$splitComponentImporter$4 = () => import("./organiser-DW3liWJ6.js");
var Route$4 = createFileRoute("/_authenticated/organiser")({
	head: () => ({ meta: [
		{ title: "Organiser Dashboard — COLLAXP" },
		{
			name: "description",
			content: "Create, edit and delete campus events, publish them to students and view every registered attendee."
		},
		{
			property: "og:title",
			content: "Organiser Dashboard — COLLAXP"
		},
		{
			property: "og:description",
			content: "Manage your COLLAXP events and registered students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
// src/routes/_authenticated/profile.tsx
var $$splitComponentImporter$3 = () => import("./profile-Cz2UlhlC.js");
var Route$3 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "My Profile — COLLAXP" },
		{
			name: "description",
			content: "Update your COLLAXP profile: username, bio, institution and avatar, tied to your verified student number."
		},
		{
			property: "og:title",
			content: "My Profile — COLLAXP"
		},
		{
			property: "og:description",
			content: "Manage your COLLAXP student profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
// src/routes/_authenticated/rewards.tsx
var $$splitComponentImporter$2 = () => import("./rewards-BDjXL-j6.js");
var Route$2 = createFileRoute("/_authenticated/rewards")({
	head: () => ({ meta: [
		{ title: "Rewards & XP — COLLAXP" },
		{
			name: "description",
			content: "Track the XP, levels and badges you earn as a bonus for attending campus events on COLLAXP."
		},
		{
			property: "og:title",
			content: "Rewards & XP — COLLAXP"
		},
		{
			property: "og:description",
			content: "Your XP, level and badge progress on COLLAXP."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
// src/routes/_authenticated/scan.tsx
var $$splitComponentImporter$1 = () => import("./scan-Bp3uCo2K.js");
var Route$1 = createFileRoute("/_authenticated/scan")({
	head: () => ({ meta: [
		{ title: "Scan Tickets — COLLAXP" },
		{
			name: "description",
			content: "Organiser ticket scanner: check students in at the door by scanning their COLLAXP QR ticket."
		},
		{
			property: "og:title",
			content: "Scan Tickets — COLLAXP"
		},
		{
			property: "og:description",
			content: "Check students in at the door with the COLLAXP QR ticket scanner."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
// src/routes/events.$eventId.tsx
var $$splitComponentImporter = () => import("./events._eventId-DA-C-m5X.js");
var Route = createFileRoute("/events/$eventId")({
	head: () => ({ meta: [
		{ title: "Event Details — COLLAXP" },
		{
			name: "description",
			content: "Full details for this campus event on COLLAXP: date, time, venue, price, age restriction and the XP you earn for attending."
		},
		{
			property: "og:title",
			content: "Event Details — COLLAXP"
		},
		{
			property: "og:description",
			content: "Date, venue, price and XP reward for this campus event on COLLAXP."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
// src/routeTree.gen.ts
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AuthenticatedRouteRoute = Route$16.update({
	id: "/_authenticated",
	getParentRoute: () => Route$18
});
var DiscoverRoute = Route$15.update({
	id: "/discover",
	path: "/discover",
	getParentRoute: () => Route$18
});
var OrganiserLoginRoute = Route$14.update({
	id: "/organiser-login",
	path: "/organiser-login",
	getParentRoute: () => Route$18
});
var ReelsRoute = Route$13.update({
	id: "/reels",
	path: "/reels",
	getParentRoute: () => Route$18
});
var ResetPasswordRoute = Route$12.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$18
});
var StudentLoginRoute = Route$11.update({
	id: "/student-login",
	path: "/student-login",
	getParentRoute: () => Route$18
});
var StudentSignupRoute = Route$10.update({
	id: "/student-signup",
	path: "/student-signup",
	getParentRoute: () => Route$18
});
var AuthenticatedCartRoute = Route$9.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyEventsRoute = Route$7.update({
	id: "/my-events",
	path: "/my-events",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyReelsRoute = Route$6.update({
	id: "/my-reels",
	path: "/my-reels",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$5.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrganiserRoute = Route$4.update({
	id: "/organiser",
	path: "/organiser",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$3.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRewardsRoute = Route$2.update({
	id: "/rewards",
	path: "/rewards",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedScanRoute = Route$1.update({
	id: "/scan",
	path: "/scan",
	getParentRoute: () => AuthenticatedRouteRoute
});
var EventsEventIdRoute = Route.update({
	id: "/events/$eventId",
	path: "/events/$eventId",
	getParentRoute: () => Route$18
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedCartRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedMyEventsRoute,
	AuthenticatedMyReelsRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedOrganiserRoute,
	AuthenticatedProfileRoute,
	AuthenticatedRewardsRoute,
	AuthenticatedScanRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	DiscoverRoute,
	OrganiserLoginRoute,
	ReelsRoute,
	ResetPasswordRoute,
	StudentLoginRoute,
	StudentSignupRoute,
	EventsEventIdRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
// src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
export { isValidStudentEmail as a, setCartQuantity as c, getRouter, useCartItems as i, Logo as l, Route as n, useAuth as o, useAddToCart as r, removeCartItem as s, router_exports as t };
