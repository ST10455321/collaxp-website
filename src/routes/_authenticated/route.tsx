import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { getFirebaseAuth } from "@/integrations/firebase/config";

// Firebase restores the persisted session asynchronously, so wait for it before deciding.
async function getSignedInUser() {
  const auth = getFirebaseAuth();
  await auth.authStateReady();
  return auth.currentUser;
}

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = await getSignedInUser();
    if (!user) throw redirect({ to: "/student-login" });
    return { user: { id: user.uid, email: user.email } };
  },
  component: () => <Outlet />,
});
