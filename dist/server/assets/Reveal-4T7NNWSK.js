import { T as cn } from "./helpers-OIPvucp0.js";
import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
// src/components/Reveal.tsx
function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
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
	return /* @__PURE__ */ jsx(Tag, {
		ref,
		className: cn("reveal", className),
		"data-visible": visible ? "true" : "false",
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
export { Reveal as t };
