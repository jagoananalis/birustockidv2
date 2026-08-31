import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as cn } from "./router-Bk59tAoS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/filter-chips-BUVXVBJU.js
var import_jsx_runtime = require_jsx_runtime();
function FilterChips({ options, value, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-7 flex flex-wrap gap-2.5",
		role: "group",
		"aria-label": label,
		children: options.map((opt) => {
			const active = opt === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("filter-chip", active && "is-active"),
				"aria-pressed": active,
				onClick: () => onChange(opt),
				children: opt
			}, opt);
		})
	});
}
//#endregion
export { FilterChips as t };
