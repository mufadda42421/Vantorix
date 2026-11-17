import type { Metadata } from "next";
import {
  Lock,
  Inbox,
  LayoutGrid,
  Tags,
  FileText,
  Database,
  KeyRound,
  Server,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin — Setup Required",
  description: "Vantorix admin dashboard. Requires authentication and database setup — not connected yet.",
  robots: { index: false, follow: false },
};

const areas = [
  {
    icon: Inbox,
    title: "Customer Inquiries",
    purpose: "View, flag and reply to project enquiries from the contact form.",
    needs: ["Database (e.g. PostgreSQL) to persist inquiries", "/api/inquiry switched to DB storage", "Authenticated admin session"],
  },
  {
    icon: LayoutGrid,
    title: "Portfolio Projects",
    purpose: "Add, edit, hide or reorder portfolio projects and demo labels.",
    needs: ["Projects table (title, slug, category, tech, images)", "Image upload or URL storage", "Authenticated content editor"],
  },
  {
    icon: Tags,
    title: "Pricing",
    purpose: "Update starting prices, plan names and included features.",
    needs: ["Plans & price points table", "Draft/publish workflow recommended", "Authenticated admin session"],
  },
  {
    icon: FileText,
    title: "Service Descriptions",
    purpose: "Edit service copy, benefits, features and tech lists without a redeploy.",
    needs: ["Services table or headless CMS (e.g. Sanity)", "Localized fallback copy", "Authenticated content editor"],
  },
];

const setupSteps = [
  {
    icon: KeyRound,
    title: "1. Add authentication",
    body: "Use a proven provider — Auth.js (next-auth), Clerk or Supabase Auth. Never hand-rolled passwords. Suggested: email magic-links restricted to your address.",
  },
  {
    icon: Database,
    title: "2. Add a database",
    body: "PostgreSQL via Supabase, Neon or Railway. Tables: inquiries, projects, price_plans, services. Use an ORM you trust (Drizzle or Prisma).",
  },
  {
    icon: Server,
    title: "3. Protect the route",
    body: "Gate /admin and /api/admin/* behind the session in middleware.ts. Verify on the server on every request — never on the client.",
  },
  {
    icon: ShieldCheck,
    title: "4. Rotate & audit",
    body: "Keep secrets in environment variables, rotate them periodically, and log admin actions. No credentials in the repository, ever.",
  },
];

export default function AdminPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6">
        {/* Banner */}
        <div className="flex items-start gap-5 border-t border-line pt-8 sm:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-alt text-foreground ring-1 ring-line">
            <Lock size={20} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div className="max-w-3xl">
            <h1 className="display text-3xl tracking-tight text-foreground sm:text-4xl">
              Admin — requires setup
            </h1>
            <p className="mt-3 leading-relaxed text-muted">
              This dashboard is intentionally <strong className="font-semibold text-foreground">not
              connected to any backend</strong>. Authentication and a database have not been
              configured for this deployment, so there is{" "}
              <strong className="font-semibold text-foreground">no working login and no live
              data</strong> — nothing here can be signed into, and no credentials exist in this
              codebase. Follow the checklist below to bring it online safely.
            </p>
          </div>
        </div>

        {/* Management areas */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {areas.map((area) => (
            <section key={area.title} aria-label={area.title} className="flex flex-col bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground">
                  <area.icon size={19} strokeWidth={1.7} className="text-muted" aria-hidden="true" />
                  {area.title}
                </h2>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Not connected
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{area.purpose}</p>
              <h3 className="mt-4 text-xs font-medium text-foreground/70">Required to enable</h3>
              <ul className="mt-1.5 space-y-1.5">
                {area.needs.map((need) => (
                  <li key={need} className="flex items-start gap-2 text-[0.82rem] text-muted">
                    <span aria-hidden="true" className="mt-[3px] text-line">—</span>
                    {need}
                  </li>
                ))}
              </ul>
              <div
                aria-hidden="true"
                className="mt-5 rounded-xl border border-dashed border-line bg-card px-4 py-3 text-center text-xs text-muted"
              >
                Interface placeholder — activates after setup
              </div>
            </section>
          ))}
        </div>

        {/* Setup checklist */}
        <section aria-labelledby="setup-checklist" className="mt-12">
          <p className="eyebrow">Setup checklist</p>
          <h2 id="setup-checklist" className="display mt-2 text-2xl tracking-tight text-foreground">
            The honest way to bring this online.
          </h2>
          <ol className="mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {setupSteps.map((step) => (
              <li key={step.title} className="border-b border-line py-6 pr-5 lg:border-b-0">
                <step.icon size={20} strokeWidth={1.7} className="text-foreground" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            Until these steps are done, this page deliberately shows empty states instead of fake
            data or a fake login. Any admin page accepting credentials without real authentication
            behind it is worse than none — we don&apos;t ship that.
          </p>
        </section>
      </div>
    </div>
  );
}
