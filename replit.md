# ShotByLeza

Sydney-based photography portfolio site for ShotByLeza — showcasing travel, portraits, events, fashion, and nightlife photography.

## Run & Operate

- `pnpm --filter @workspace/shotbyleza run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS v3, shadcn/ui
- Routing: react-router-dom v6 (BrowserRouter with BASE_URL basename)
- Email: @emailjs/browser (needs credentials configured — see Gotchas)
- API: Express 5 (scaffold, not used by frontend currently)
- DB: PostgreSQL + Drizzle ORM (scaffold, not used currently)

## Where things live

- `artifacts/shotbyleza/` — frontend React app (portfolio site)
- `artifacts/shotbyleza/src/pages/` — 5 pages: Index, Portfolio, About, Services, Contact, NotFound
- `artifacts/shotbyleza/src/components/` — Navbar, Footer, PageLayout, home section components, shadcn/ui
- `artifacts/shotbyleza/src/index.css` — Tailwind v3 + CSS design tokens (black/red/white theme)
- `artifacts/api-server/` — Express backend scaffold (unused by frontend)
- `lib/db/` — Drizzle ORM + Postgres scaffold

## Architecture decisions

- Pure frontend portfolio — no Supabase, no database, no auth required
- Tailwind v3 with postcss config (not @tailwindcss/vite) for compatibility with copied Lovable source
- BrowserRouter uses `import.meta.env.BASE_URL` as basename for correct path-based proxy routing
- EmailJS used for contact form (client-side email sending, no backend needed)

## Product

- Home page with hero, quick-about, and featured work sections
- Portfolio page showcasing photography categories
- About page with photographer bio
- Services page listing photography packages
- Contact page with enquiry form (EmailJS)

## User preferences

- Dark cinematic aesthetic: black background (#000), deep red primary (#D1001F), white text
- Font: Inter (loaded via Google Fonts in index.html)
- Brand: ShotByLeza, Sydney-based photographer

## Secrets to configure in Replit Secrets

| Secret | Required | Description |
|---|---|---|
| `ADMIN_SECRET` | **Yes — set this now** | Password to access `/admin` dashboard and protect `GET/PATCH /api/inquiries`. Pick any strong password. |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes (for email) | EmailJS public key — contact form email sending |
| `VITE_GA4_ID` | Optional | GA4 Measurement ID (`G-XXXXXXXXXX`) — get from Google Analytics → Admin → Data Streams |

## Gotchas

- `ADMIN_SECRET` must be set in Replit Secrets or the admin API returns 503. The `/admin` login gate passes this as a Bearer token.
- Contact form uses EmailJS — needs `VITE_EMAILJS_PUBLIC_KEY` env var to actually send emails (service_1vneowx / template_7l6shd9 already hardcoded)
- Tailwind v3 uses postcss config (`postcss.config.js` + `tailwind.config.ts`) — do NOT switch to `@tailwindcss/vite`
- Do NOT run `pnpm dev` at workspace root — run via workflows or `pnpm --filter @workspace/shotbyleza run dev`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
