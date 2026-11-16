import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Firebase web config comes from Vite env vars (see .env.example).
// These values are not secrets — access is enforced by firestore.rules / storage.rules.
function readConfig() {
  const env = import.meta.env;
  const config = {
    apiKey: env["VITE_FIREBASE_API_KEY"] as string | undefined,
    authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] as string | undefined,
    projectId: env["VITE_FIREBASE_PROJECT_ID"] as string | undefined,
    storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] as string | undefined,
    messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] as string | undefined,
    appId: env["VITE_FIREBASE_APP_ID"] as string | undefined,
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => `VITE_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);

  if (missing.length > 0) {
    const message = `Missing Firebase environment variable(s): ${missing.join(", ")}. Copy .env.example to .env and fill them in from your Firebase project settings.`;
    console.error(`[Firebase] ${message}`);
    throw new Error(message);
  }
  return config as Record<keyof typeof config, string>;
}

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!_app) _app = getApps().length > 0 ? getApp() : initializeApp(readConfig());
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getFirebaseApp());
  return _auth;
}

export function getDb(): Firestore {
  if (!_db) _db = getFirestore(getFirebaseApp());
  return _db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) _storage = getStorage(getFirebaseApp());
  return _storage;
}
