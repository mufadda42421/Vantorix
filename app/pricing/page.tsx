import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Info } from "lucide-react";
import { pricingCategories, inr } from "@/lib/data";

/** Map pricing category slugs to contact-form service values. */
const categoryToService: Record<string, string> = {
  "ai-automations": "ai-automations",
  websites: "website-development",
  "android-apps": "android-app-development",
  "desktop-apps": "desktop-app-development",
};

export const metadata: Metadata = {
  title: "Pricing — Affordable Introductory Rates in ₹",
  description:
    "Vantorix introductory pricing: AI automations from ₹999, websites from ₹999, Android apps from ₹2,999 and desktop apps from ₹2,499. All prices are starting prices; final quotes depend on requirements.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Pricing</p>
            <h1 className="display mt-4 text-5xl leading-[1.05] text-foreground sm:text-6xl">
              Honest pricing.
              <br />
              <span className="text-muted">No games.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Every price below is a <em className="not-italic text-foreground">starting price</em> in
              Indian Rupees. Your final quote depends on your project — scope, features,
              integrations and revisions.
            </p>
          </div>
          <div className="mt-8 flex max-w-3xl items-start gap-3 border-t border-line pt-6 text-sm leading-relaxed text-muted">
            <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <p>
              Domain, hosting, paid APIs (e.g. AI model credits), app-store fees and third-party
              subscriptions are <span className="font-medium text-foreground">charged separately at
              cost</span> — always flagged in your written quote before work begins.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {pricingCategories.map((category) => (
        <section
          key={category.slug}
          aria-label={category.name}
          className="mt-16 border-t border-line py-14 sm:py-16"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <h2 className="display text-2xl tracking-tight text-foreground sm:text-3xl">
              {category.name}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {category.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="card flex flex-col p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {plan.name}
                    </h3>
                    {plan.highlighted && (
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted">{plan.blurb}</p>

                  <p className="mt-6 text-xs text-muted">Starting at</p>
                  <p className="display mt-1 text-5xl tracking-tight text-foreground">
                    {inr(plan.price)}
                  </p>

                  <ul className="mt-6 grow space-y-2.5 border-t border-line pt-6">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?service=${
                      categoryToService[category.slug] ?? "custom-quote"
                    }&plan=${encodeURIComponent(plan.name)}`}
                    className="btn-ghost mt-6 min-h-12 justify-center px-6 text-sm"
                    aria-label={`Inquire about ${plan.name}`}
                  >
                    Inquire
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Custom quote */}
      <section className="border-t border-line bg-alt py-16 sm:py-20" aria-labelledby="custom-quote">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">Larger projects</p>
              <h2 id="custom-quote" className="display mt-3 text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                Something bigger in mind? Let&apos;s talk.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                Multi-page platforms, SaaS products, internal business systems, deep AI pipelines —
                anything outside the standard plans gets a properly scoped, fixed written quote.
                You&apos;ll know the full price before any work begins.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href="/contact?service=custom-quote" className="btn-primary min-h-12 px-8 text-base">
                Request a Custom Quote
                <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
