# Aryan's Portfolio (Next.js 14 + Tailwind + Prisma)

Clean, aesthetic, and lightweight. Admin panel controls heading bar, version, skills, projects, and service plans.
Auth: username/password with JWT cookie. Uses PostgreSQL via Prisma.

## Quick Start

```bash
# 1) Install
npm i

# 2) Configure env
cp .env.example .env
# set DATABASE_URL (PostgreSQL) + JWT_SECRET

# 3) Prisma
npx prisma migrate dev --name init
npm run seed

# 4) Dev
npm run dev
```

### Admin
- URL: `/admin`
- Default username: `sciaryan_log`
- Default password: `sciaryan_@5314`

> ⚠️ Change `ADMIN_PASSWORD` and `JWT_SECRET` in production.

### Deploy
- Frontend & backend are one Next.js app; can run on Render.  
- If you still want frontend on Hostinger: build static export won't include admin APIs. Prefer deploying the app to Render (free) with Postgres (free tier).
