# Firebase setup

1. Create a Firebase project, then add a **Web app** (Project settings → Your apps) and copy its
   config into `.env` (see `.env.example`).
2. Enable **Authentication → Email/Password**.
3. Create a **Firestore** database and a **Storage** bucket (Storage needs the Blaze plan on new projects).
4. Deploy the security rules and indexes:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase use <your-project-id>
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```
5. Optional: in Authentication → Templates → Password reset, set the action URL to
   `https://<your-domain>/reset-password` so reset links open the in-app page.
6. Add your deploy domain under Authentication → Settings → Authorized domains.

## Data model (Firestore collections)

`profiles/{uid}`, `public_profiles/{uid}`, `user_roles/{uid}`, `events`, `event_registrations`,
`notifications`, `cart_items/{uid}_{eventId}`, `orders`, `order_items`, `reels`,
`reel_likes/{reelId}_{uid}`, `reel_comments`, `content_reports`.
Reel videos are stored in Storage at `reels/{uid}/{file}`.
