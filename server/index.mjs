globalThis.__nitro_main__ = import.meta.url;
import { n as serve, t as NodeResponse } from "./_libs/srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
// node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"22e5-p9BbhSPdfj/DOysbSjH789Pymuk\"",
		"mtime": "2026-11-15T18:21:42.227Z",
		"size": 8933,
		"path": "../public/favicon.png"
	},
	"/assets/clapperboard-7uKdRfic.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-bCZMTjEBMfOs1Z+k6ytN9V9q7/o\"",
		"mtime": "2026-11-15T20:19:11.553Z",
		"size": 349,
		"path": "../public/assets/clapperboard-7uKdRfic.js"
	},
	"/assets/cart-BzjJGPW7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e8-XAgO4Wi3RaNY1+R4VMhLjQsW+Os\"",
		"mtime": "2026-11-15T20:19:11.552Z",
		"size": 5352,
		"path": "../public/assets/cart-BzjJGPW7.js"
	},
	"/assets/dashboard-DTipsFFz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1016-0GbzmGAi5syTRHvaefY8OqVGEUs\"",
		"mtime": "2026-11-15T20:19:11.553Z",
		"size": 4118,
		"path": "../public/assets/dashboard-DTipsFFz.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-15T18:21:42.247Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/dialog-C9a4xVRS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b72-4Ndg8+UQTkQ6mBdXd44QRwsyW64\"",
		"mtime": "2026-11-15T20:19:11.554Z",
		"size": 7026,
		"path": "../public/assets/dialog-C9a4xVRS.js"
	},
	"/assets/dist-DEhkl3by.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cb-6BXo1eYCsgQo6yfPKWYeoGUwqrI\"",
		"mtime": "2026-11-15T20:19:11.557Z",
		"size": 715,
		"path": "../public/assets/dist-DEhkl3by.js"
	},
	"/assets/discover-DuRGf5AB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ace-xngNBrJR1Pk4LULRolGtRbdlksI\"",
		"mtime": "2026-11-15T20:19:11.555Z",
		"size": 2766,
		"path": "../public/assets/discover-DuRGf5AB.js"
	},
	"/assets/dist-8CqJHiin.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70d-okeXm0OSLZzd/zn3g1AUdkh3H3Y\"",
		"mtime": "2026-11-15T20:19:11.556Z",
		"size": 1805,
		"path": "../public/assets/dist-8CqJHiin.js"
	},
	"/assets/es2015-8jOf7GYp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"714a-VEC/+gBuMeUdF5V5Cj4o7YQlJN0\"",
		"mtime": "2026-11-15T20:19:11.558Z",
		"size": 29002,
		"path": "../public/assets/es2015-8jOf7GYp.js"
	},
	"/assets/EventCard-DWKBIzwb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ab-eCpOXcbnKYLksQBvtJVAsMQL6bQ\"",
		"mtime": "2026-11-15T20:19:11.544Z",
		"size": 2219,
		"path": "../public/assets/EventCard-DWKBIzwb.js"
	},
	"/assets/events-DaWPuYQX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cc-7gH8rB8sGBJeGllZFLs5/oS2Kaw\"",
		"mtime": "2026-11-15T20:19:11.559Z",
		"size": 1484,
		"path": "../public/assets/events-DaWPuYQX.js"
	},
	"/assets/events._eventId-BpssDTMq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c27-Bg12igFMbd+//SeAkZ9v25NIrHM\"",
		"mtime": "2026-11-15T20:19:11.562Z",
		"size": 7207,
		"path": "../public/assets/events._eventId-BpssDTMq.js"
	},
	"/assets/esm-j-eeAaqZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59f40-bIgHhFzmwb0iA9MCxM7srF6s+as\"",
		"mtime": "2026-11-15T20:19:11.559Z",
		"size": 368448,
		"path": "../public/assets/esm-j-eeAaqZ.js"
	},
	"/assets/input-CJrgrgLm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"299-c7thfif1BTIrT+VjHu73uOWmJek\"",
		"mtime": "2026-11-15T20:19:11.568Z",
		"size": 665,
		"path": "../public/assets/input-CJrgrgLm.js"
	},
	"/assets/jsx-runtime-CkXRJ162.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2033-Z85fXP8ul6LwQru7ju7qGxFFve8\"",
		"mtime": "2026-11-15T20:19:11.572Z",
		"size": 8243,
		"path": "../public/assets/jsx-runtime-CkXRJ162.js"
	},
	"/assets/label-B6Vsb7Lo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fc-htSjin5CysYAnjOozsqFG1viphE\"",
		"mtime": "2026-11-15T20:19:11.575Z",
		"size": 764,
		"path": "../public/assets/label-B6Vsb7Lo.js"
	},
	"/assets/map-pin-BQvfTdSx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b1-SeVU03qPVLhahJpep2IqmYwCMM0\"",
		"mtime": "2026-11-15T20:19:11.582Z",
		"size": 689,
		"path": "../public/assets/map-pin-BQvfTdSx.js"
	},
	"/assets/index-Bn7GOwzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"576d2-1fhIIheXKPZaC9E+nuVYVrTZ5oA\"",
		"mtime": "2026-11-15T20:19:11.543Z",
		"size": 358098,
		"path": "../public/assets/index-Bn7GOwzn.js"
	},
	"/assets/matchContext-BGrbdmPQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e874-Xq+sgz/OgZNq3yrEkT/Tq1Al5eo\"",
		"mtime": "2026-11-15T20:19:11.586Z",
		"size": 59508,
		"path": "../public/assets/matchContext-BGrbdmPQ.js"
	},
	"/assets/my-reels-BqDwWbfW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a94-8S63xRGDok+TQcNh69P/8/sg/+0\"",
		"mtime": "2026-11-15T20:19:11.588Z",
		"size": 6804,
		"path": "../public/assets/my-reels-BqDwWbfW.js"
	},
	"/assets/my-events-TXvsUt-G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f67-MT6cHgU6O7VDZRIZC2VYuXsV62o\"",
		"mtime": "2026-11-15T20:19:11.587Z",
		"size": 28519,
		"path": "../public/assets/my-events-TXvsUt-G.js"
	},
	"/assets/notifications-BifdH3X4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30d-xVvwuUYtH6PV5TogjWhwTEAXXO8\"",
		"mtime": "2026-11-15T20:19:11.589Z",
		"size": 781,
		"path": "../public/assets/notifications-BifdH3X4.js"
	},
	"/assets/notifications-DsGwcIHZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e34-r0HMUiQn6M1vqSRxcs8NoTJZxkE\"",
		"mtime": "2026-11-15T20:19:11.590Z",
		"size": 3636,
		"path": "../public/assets/notifications-DsGwcIHZ.js"
	},
	"/assets/helpers-B4BOocAG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"96e52-P+RkzPPRFL4DeUAl5bPHfvTGjVo\"",
		"mtime": "2026-11-15T20:19:11.564Z",
		"size": 618066,
		"path": "../public/assets/helpers-B4BOocAG.js"
	},
	"/assets/organiser-Ds6fdSOL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35c9-eWqbhDb04Z3WASijsoNvbWxyqJQ\"",
		"mtime": "2026-11-15T20:19:11.591Z",
		"size": 13769,
		"path": "../public/assets/organiser-Ds6fdSOL.js"
	},
	"/assets/organiser-login-7P9MJzpF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1122-5aOEfp4AGni/2H3josjVLr01EjU\"",
		"mtime": "2026-11-15T20:19:11.593Z",
		"size": 4386,
		"path": "../public/assets/organiser-login-7P9MJzpF.js"
	},
	"/assets/plus-DvrYqocX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-Eu+TkZP8gUvIiakVFPyU1PN3l+w\"",
		"mtime": "2026-11-15T20:19:11.594Z",
		"size": 142,
		"path": "../public/assets/plus-DvrYqocX.js"
	},
	"/assets/profile-B1SFw-eY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c9-LHTSecqt5ptxLA65azsGCo4EKug\"",
		"mtime": "2026-11-15T20:19:11.595Z",
		"size": 5321,
		"path": "../public/assets/profile-B1SFw-eY.js"
	},
	"/assets/qr-code-HSF4HEKD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-crc2QOEHxA4jQDbBHDSNYU2Y4Z4\"",
		"mtime": "2026-11-15T20:19:11.597Z",
		"size": 639,
		"path": "../public/assets/qr-code-HSF4HEKD.js"
	},
	"/assets/QueryClientProvider-DvjICgPX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-bIcE7TNDOpjSjeyvn+Z4UtgiETg\"",
		"mtime": "2026-11-15T20:19:11.549Z",
		"size": 424,
		"path": "../public/assets/QueryClientProvider-DvjICgPX.js"
	},
	"/assets/progress-GnRtNcAy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"916-ZzH8pom1x8GCDp++qR1rZVhJNFc\"",
		"mtime": "2026-11-15T20:19:11.596Z",
		"size": 2326,
		"path": "../public/assets/progress-GnRtNcAy.js"
	},
	"/assets/reels-DKLCDIXW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"255c-YWYT9R0JWkcLxJNR4BQoVHFZc+Q\"",
		"mtime": "2026-11-15T20:19:11.599Z",
		"size": 9564,
		"path": "../public/assets/reels-DKLCDIXW.js"
	},
	"/assets/reels-DFOCXHoH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89e-N/laGLKBOxQm7Z2H7bvdpvkqgYc\"",
		"mtime": "2026-11-15T20:19:11.598Z",
		"size": 2206,
		"path": "../public/assets/reels-DFOCXHoH.js"
	},
	"/assets/registrations-DEGWt3s2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc2-sk5Pwdd7hTtucfO6Lrz+HpwrOJs\"",
		"mtime": "2026-11-15T20:19:11.600Z",
		"size": 4034,
		"path": "../public/assets/registrations-DEGWt3s2.js"
	},
	"/assets/reset-password-C6THMlYG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c6-SsYa77lGFxrXfdEgFJWss5uQDf8\"",
		"mtime": "2026-11-15T20:19:11.601Z",
		"size": 1478,
		"path": "../public/assets/reset-password-C6THMlYG.js"
	},
	"/assets/rolldown-runtime-WkwZ5CU-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"257-wHdrXV3vXbjJUFUsIyMQ+8j0C3c\"",
		"mtime": "2026-11-15T20:19:11.603Z",
		"size": 599,
		"path": "../public/assets/rolldown-runtime-WkwZ5CU-.js"
	},
	"/assets/Reveal-D4ohzQdT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e-G3B6QLhxmOK0P2oN2qH2UR1rHqg\"",
		"mtime": "2026-11-15T20:19:11.550Z",
		"size": 654,
		"path": "../public/assets/Reveal-D4ohzQdT.js"
	},
	"/assets/rewards-BQ6Iy0Xg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8d-ja5ieIrL6OB6l/xawG5Wh/wwudU\"",
		"mtime": "2026-11-15T20:19:11.603Z",
		"size": 3213,
		"path": "../public/assets/rewards-BQ6Iy0Xg.js"
	},
	"/assets/route-CI_G81B6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88-RaGitehh2STq7O42L8lDEhcDG3U\"",
		"mtime": "2026-11-15T20:19:11.604Z",
		"size": 136,
		"path": "../public/assets/route-CI_G81B6.js"
	},
	"/assets/routes-CXjLpQp2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1464-UOie3RX5vFSRJb3kOUAOHka9Ix4\"",
		"mtime": "2026-11-15T20:19:11.605Z",
		"size": 5220,
		"path": "../public/assets/routes-CXjLpQp2.js"
	},
	"/assets/scan-BWPBbYmc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168d-SyLJaK4rdibSz7yf9rPQ0XeX1Mo\"",
		"mtime": "2026-11-15T20:19:11.606Z",
		"size": 5773,
		"path": "../public/assets/scan-BWPBbYmc.js"
	},
	"/assets/student-login-BgfJAxP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bab-1Eb04fu4sS/E6kFrXB3TtvSLWhM\"",
		"mtime": "2026-11-15T20:19:11.611Z",
		"size": 2987,
		"path": "../public/assets/student-login-BgfJAxP5.js"
	},
	"/assets/student-signup-Bq6HP6NO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e81-RSHsz0gY/UY3cLEPLKoibW9olTI\"",
		"mtime": "2026-11-15T20:19:11.612Z",
		"size": 3713,
		"path": "../public/assets/student-signup-Bq6HP6NO.js"
	},
	"/assets/select-DPyzgcXa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e208-bbC5+qxNFaIUA4oLwxcwMY0VuF8\"",
		"mtime": "2026-11-15T20:19:11.606Z",
		"size": 57864,
		"path": "../public/assets/select-DPyzgcXa.js"
	},
	"/assets/styles-mcRkRrNU.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14a82-rdCcyA/zimObQSqvfaUy211yyHw\"",
		"mtime": "2026-11-15T20:19:11.619Z",
		"size": 84610,
		"path": "../public/assets/styles-mcRkRrNU.css"
	},
	"/assets/textarea-BBVTnejZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"233-VjK7QFOHTo8EzFzs/XniTywyMI4\"",
		"mtime": "2026-11-15T20:19:11.613Z",
		"size": 563,
		"path": "../public/assets/textarea-BBVTnejZ.js"
	},
	"/assets/ticket-BMO22lRz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-g2NfUWmjvDxkl4p2yH0HpGHZP1k\"",
		"mtime": "2026-11-15T20:19:11.614Z",
		"size": 310,
		"path": "../public/assets/ticket-BMO22lRz.js"
	},
	"/assets/trash-2-Cp5mNlYx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-5U/xXX8wAWgdjwROcg3fgSI8nhI\"",
		"mtime": "2026-11-15T20:19:11.615Z",
		"size": 317,
		"path": "../public/assets/trash-2-Cp5mNlYx.js"
	},
	"/assets/trophy-DaA5PDoo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cd-IEPEDsFuSLFdBpZSzC3xGnjQ+AU\"",
		"mtime": "2026-11-15T20:19:11.615Z",
		"size": 717,
		"path": "../public/assets/trophy-DaA5PDoo.js"
	},
	"/assets/useQuery-DWxXMPsD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58cb-bEMMpYmlxV/7U4idpXJqTNd0snA\"",
		"mtime": "2026-11-15T20:19:11.616Z",
		"size": 22731,
		"path": "../public/assets/useQuery-DWxXMPsD.js"
	},
	"/assets/users-DiM4-OA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-pLfUW78HKo5bBtpAC7c+OGSa7kY\"",
		"mtime": "2026-11-15T20:19:11.617Z",
		"size": 295,
		"path": "../public/assets/users-DiM4-OA_.js"
	},
	"/assets/zap-D7iT1AEH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-KOFlZ2ocJrGaRMTeBCAUk7/x4aQ\"",
		"mtime": "2026-11-15T20:19:11.618Z",
		"size": 251,
		"path": "../public/assets/zap-D7iT1AEH.js"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
// #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
// node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Qm6SmV = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Qm6SmV
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
// node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
