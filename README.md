# My Portfolio V3 (Next.js + Tailwind + Prisma) Launching Soon !

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
