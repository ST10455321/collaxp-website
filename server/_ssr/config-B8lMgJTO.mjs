import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { r as getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { _ as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import { r as getStorage } from "../_libs/firebase__storage.mjs";
// node_modules/.nitro/vite/services/ssr/assets/config-B8lMgJTO.js
function readConfig() {
	const env = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyDNRE97bZwioSklNgdvi10mk8gHQAGmaSc",
		"VITE_FIREBASE_APP_ID": "1:194379155425:web:ee2f296fdf967243f374a0",
		"VITE_FIREBASE_AUTH_DOMAIN": "collegexp-4004f.firebaseapp.com",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "194379155425",
		"VITE_FIREBASE_PROJECT_ID": "collegexp-4004f",
		"VITE_FIREBASE_STORAGE_BUCKET": "collegexp-4004f.firebasestorage.app",
		"VITE_SUPABASE_PROJECT_ID": "hjtfwofzhenuzqprlatc",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_5RJEGpbwZMeREElWAJ4kaQ_iXKoCEdE",
		"VITE_SUPABASE_URL": "https://hjtfwofzhenuzqprlatc.supabase.co"
	};
	const config = {
		apiKey: env["VITE_FIREBASE_API_KEY"],
		authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"],
		projectId: env["VITE_FIREBASE_PROJECT_ID"],
		storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"],
		messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"],
		appId: env["VITE_FIREBASE_APP_ID"]
	};
	const missing = Object.entries(config).filter(([, value]) => !value).map(([key]) => `VITE_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);
	if (missing.length > 0) {
		const message = `Missing Firebase environment variable(s): ${missing.join(", ")}. Copy .env.example to .env and fill them in from your Firebase project settings.`;
		console.error(`[Firebase] ${message}`);
		throw new Error(message);
	}
	return config;
}
var _app;
var _auth;
var _db;
var _storage;
function getFirebaseApp() {
	if (!_app) _app = getApps().length > 0 ? getApp() : initializeApp(readConfig());
	return _app;
}
function getFirebaseAuth() {
	if (!_auth) _auth = getAuth(getFirebaseApp());
	return _auth;
}
function getDb() {
	if (!_db) _db = getFirestore(getFirebaseApp());
	return _db;
}
function getFirebaseStorage() {
	if (!_storage) _storage = getStorage(getFirebaseApp());
	return _storage;
}
export { getFirebaseAuth as n, getFirebaseStorage as r, getDb as t };
