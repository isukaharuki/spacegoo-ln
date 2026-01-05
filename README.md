# SpaceGOO LN Translation Myanmar

Modern, mobile-first site to publish and manage translated light novels with dedicated pages and admin tools.

## Features
- Homepage grid of novels with covers, titles, and short reviews.
- Dedicated novel pages with a Links/Volumes section (Telegram/Facebook).
- Search by title/keywords.
- Secure admin: login, add/edit/delete novels, manage volumes.
- Default admin: username `admin`, password `CarDogcatfish1324` (change in Settings).

## Tech
- Next.js (App Router), Tailwind CSS.
- Prisma ORM + SQLite (switch to Postgres later).
- JWT auth with HttpOnly cookies.

## Setup
1. Copy `.env.example` to `.env` and set JWT_SECRET.
2. Install dependencies:

npm I
3. Generate Prisma client and migrate:

4. Seed admin and sample content:

5. Run dev:

6. Visit:
- Public: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Admin settings (change password): http://localhost:3000/admin/settings

## Deploy
- Use Vercel for the Next.js app.
- Keep SQLite for small deployments or move to Postgres (Railway/Render). Update `DATABASE_URL` and run `prisma migrate deploy`.

## Notes
- Cover images use external URLs; swap to S3/CDN later without changing the schema.
- Add tags/genres, pagination, and analytics as future enhancements.