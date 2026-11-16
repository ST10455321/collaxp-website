// Turns Firebase error codes into messages that are fit to show in a toast.
const MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-login-credentials": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password is too weak — use at least 8 characters.",
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/expired-action-code": "This reset link has expired. Request a new one.",
  "auth/invalid-action-code": "This reset link is invalid or has already been used.",
  "auth/requires-recent-login": "Please sign in again, then retry.",
  "permission-denied": "You don't have permission to do that.",
  unauthenticated: "Please sign in and try again.",
  unavailable: "Service temporarily unavailable. Please try again.",
  "storage/unauthorized": "You don't have permission to upload that file.",
  "storage/canceled": "Upload cancelled.",
  "storage/quota-exceeded": "Storage quota exceeded.",
};

export function errorCode(error: unknown): string | undefined {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }
  return undefined;
}

export function friendlyMessage(error: unknown): string {
  const code = errorCode(error);
  if (code) {
    const key = code.replace(/^firestore\//, "");
    if (MESSAGES[key]) return MESSAGES[key]!;
    if (MESSAGES[code]) return MESSAGES[code]!;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

// Run a Firebase call and rethrow failures as plain Errors with a friendly message,
// so existing `toast.error(error.message)` handlers keep working.
export async function guard<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const wrapped = new Error(friendlyMessage(error)) as Error & { code?: string | undefined };
    wrapped.code = errorCode(error);
    throw wrapped;
  }
}
