# Private blog studio

Open `/studio/blog` to create and publish a post without editing application
code. The editor includes JSON paste mode, a simpler text mode, image upload,
and a collapsible schema/example panel with copy buttons for AI generation.

## Required environment variables

Set these in `.env.local` for development and in Vercel Project Settings for
production. Keep all of these server-only; do not prefix them with `NEXT_PUBLIC_`.

```text
BLOG_ADMIN_PASSWORD=use-a-long-unique-password
BLOG_ADMIN_SESSION_SECRET=use-a-different-long-random-secret
FIREBASE_PROJECT_ID=auto-craft-eb620
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@auto-craft-eb620.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nreplace-with-a-new-key\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=auto-craft-eb620.firebasestorage.app

# Firebase web/client configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-web-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=auto-craft-eb620.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=auto-craft-eb620
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=auto-craft-eb620.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

The studio saves blog documents to the Firestore `blogPosts` collection and
uploads images to Firebase Storage under `images/blog/`. The API returns a
signed Storage URL, which is saved in the blog document. If Firebase variables
are absent, local development falls back to `src/data/blog-posts.json` and
`public/images/blog`.

## Import the existing content

After adding the server credentials to `.env.local`, run:

```bash
npm run seed:firebase
```

This seeds `blogPosts`, `statePages`, and `locationPages` from the JSON files
in `src/data`. Images are not migrated because Firebase Storage is not enabled;
existing `/images/...` paths remain unchanged.

Set `featured: true` on the one post that should lead the homepage and blog
index. Featured posts are prioritized first, followed by `publishedAt`,
`updatedAt`, and slug as deterministic tie-breakers. New text-editor posts
default to `featured: false`.
