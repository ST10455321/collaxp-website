import { createMiddleware } from "@tanstack/react-start";

import { getFirebaseAuth } from "./config";

// Registered as a global `functionMiddleware` in `src/start.ts`. Attaches the
// signed-in user's Firebase ID token to every server function call. To trust it
// on the server, verify it with the Firebase Admin SDK (`verifyIdToken`).
export const attachFirebaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const token = await getFirebaseAuth().currentUser?.getIdToken();
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
