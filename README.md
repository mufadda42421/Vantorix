# Vantorix — Engineering Tomorrow, Today.

Premium company website for **Vantorix**, a software development studio building
AI automations, websites, Android apps and desktop applications.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production build

```bash
npm run build
npm start          # serves the optimized production build
```

## Lint & type-check

```bash
npm run lint
npx tsc --noEmit
```

## Configure the brand & contacts

Everything brand-related lives in **one file**: `lib/site.ts`

- `name`, `legalName`, `tagline`
- `email` — public contact email
- `whatsappNumber` — **empty by default**; set `+91XXXXXXXXXX` to enable the WhatsApp button
- `url` — canonical site URL (also used for sitemap/OG metadata)
- `nav` — navigation links

Content data (services, pricing, portfolio projects, FAQs, process steps) lives in `lib/data.ts`.
Portfolio items are labelled **demonstration projects** — replace/extend the `projects` array as real client work ships.

## Contact form delivery (required for email)

The inquiry form posts to `/api/inquiry`, which sends mail via SMTP using Nodemailer.
**If SMTP is not configured, the form does NOT pretend to succeed** — visitors see an honest
message with a `mailto:` fallback.

1. Copy `.env.example` → `.env.local`
2. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (Gmail: use an App Password)
3. Optionally set `INQUIRY_TO_EMAIL` (defaults to the site email)

Features: server-side validation, honeypot anti-spam, per-IP throttle (5 / 10 min),
HTML-escaped email template, `replyTo` set to the sender.

## Admin dashboard (`/admin`)

Ships intentionally **without a backend**. Authentication and database are not configured,
and the page says so honestly instead of faking a login or showing fake data.
It lists the four areas it will manage (Inquiries, Projects, Pricing, Services) and a
step-by-step setup checklist (Auth.js/Clerk/Supabase Auth + PostgreSQL + middleware gate).
`/admin` is excluded from `robots` and marked `noindex`.

## Project structure

```
app/                 routes (App Router)
  page.tsx           home
  services|pricing|portfolio|about|contact|admin/
  portfolio/[slug]/  project detail (SSG via generateStaticParams)
  api/inquiry/       inquiry endpoint (nodemailer)
  sitemap.ts robots.ts icon.svg not-found.tsx error.tsx loading.tsx
components/          navbar, footer, floating-actions, inquiry-form, faq, ...
lib/site.ts          ← brand & contact config (edit me)
lib/data.ts          ← services / pricing / projects / faqs (edit me)
public/images/       SVG artwork (hero + project illustrations)
```

## Deployment

Any Node-capable host works (Vercel, Railway, a VPS, …). For Vercel: import the repo,
set the SMTP env vars, deploy. Update `url` in `lib/site.ts` (and `metadataBase`) to the
production domain.
