import { o as __toESM } from "../_runtime.mjs";
import { u as cn } from "./helpers-OIPvucp0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/Reveal-4T7NNWSK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setVisible(true);
				io.unobserve(entry.target);
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(node);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn("reveal", className),
		"data-visible": visible ? "true" : "false",
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
export { Reveal as t };
