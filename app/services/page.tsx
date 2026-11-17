import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { services, inr } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — AI Automations, Websites, Android & Desktop Apps",
  description:
    "Explore Vantorix services: AI automations (chatbots, workflow automation, integrations), website development (business, e-commerce, custom web apps), Android app development and Windows desktop applications.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Services</p>
            <h1 className="display mt-4 text-5xl leading-[1.05] text-foreground sm:text-6xl">
              Everything you need to launch.{" "}
              <span className="text-muted">Nothing you don&apos;t.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Four capabilities, one standard: work that&apos;s thoughtful, well-engineered and
              delivered without drama.
            </p>
          </div>
          {/* Quick jumps */}
          <nav aria-label="Jump to a service" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 pb-14">
            {services.map((s) => (
              <a key={s.slug} href={`#${s.anchor}`} className="link-accent text-sm">
                {s.name} ›
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Service editorial sections */}
      {services.map((service, index) => {
        const alt = index % 2 === 1;
        const num = `0${index + 1}`;
        return (
          <section
            key={service.slug}
            id={service.anchor}
            aria-label={service.name}
            className={`scroll-mt-20 border-t border-line py-16 sm:py-20 ${alt ? "bg-alt" : "bg-white"}`}
          >
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
              {/* Section header row */}
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground ring-1 ring-line">
                      <service.icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-muted">{num} / 04</span>
                  </div>
                  <h2 className="display mt-6 text-4xl leading-[1.06] text-foreground sm:text-5xl">
                    {service.name}.
                  </h2>
                  <p className="mt-3 text-base font-medium text-foreground/80">{service.tagline}</p>
                  <p className="mt-4 leading-relaxed text-muted">{service.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-[0.95rem] text-foreground/85">
                        <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Link href={`/contact?service=${service.slug}`} className="btn-primary min-h-11 px-6 text-sm">
                      Inquire About {service.name}
                    </Link>
                    <p className="text-sm text-muted">
                      From <span className="font-semibold text-foreground">{inr(service.startingAt)}</span>{" "}
                      ·{" "}
                      <Link href="/pricing" className="link-accent">
                        Pricing ›
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Capability rows */}
                <div className="lg:col-span-7">
                  <h3 className="eyebrow">What we build</h3>
                  <ul className="mt-4 border-t border-line">
                    {service.features.map((feature) => (
                      <li
                        key={feature.title}
                        className="grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:gap-6"
                      >
                        <span className="text-[0.95rem] font-semibold tracking-tight text-foreground sm:col-span-4">
                          {feature.title}
                        </span>
                        <span className="text-sm leading-relaxed text-muted sm:col-span-8">
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
                    <span className="font-medium text-foreground/70">Built with:</span>
                    {service.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
