import Link from "next/link";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { services, projects, processSteps, pricingCategories, inr } from "@/lib/data";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import Faq from "@/components/faq";
import Reveal from "@/components/reveal";


const whyChooseUs = [
  {
    title: "Speed, honestly.",
    text: "Tight scopes and clear milestones — fast delivery without the corners cut.",
  },
  {
    title: "Radical transparency.",
    text: "A written quote before work begins. A live preview while it happens. No surprises.",
  },
  {
    title: "Quality you can verify.",
    text: "Clean, typed, tested code you fully own — plus a bug-fix window on delivery.",
  },
  {
    title: "Customer-obsessed.",
    text: "You deal directly with the person building your product — not a ticket queue.",
  },
  {
    title: "Honest pricing.",
    text: "Real engineering at prices a growing business can afford — external costs flagged up front.",
  },
  {
    title: "No lock-in, ever.",
    text: "Source code, assets and credentials are handed over completely. Yours, forever.",
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <Hero />
      <Marquee />

      {/* ============ SERVICES OVERVIEW ============ */}
      <section className="bg-alt py-16 sm:py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              title="What we do."
              description="Four focused capabilities — each designed, engineered and supported end to end."
            />
            <Link href="/services" className="link-accent text-base">
              View all services ›
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06} className="h-full">
              <Link
                href={`/services#${service.anchor}`}
                className="group flex h-full flex-col bg-white p-6 transition-colors duration-300 hover:bg-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-alt text-foreground">
                  <service.icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3 className="display mt-5 text-lg tracking-tight text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 grow text-sm leading-relaxed text-muted">{service.short}</p>
                <span className="link-accent mt-5 inline-flex items-center gap-1.5 text-sm">
                  Learn more
                  <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-20 sm:py-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            eyebrow="Why Vantorix"
            title="A partner, not a vendor."
            description="We treat your product like our own — because for a young studio like ours, every client is the whole reputation."
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h3 className="display text-lg tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="border-t border-line bg-alt py-20 sm:py-24" aria-labelledby="work-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Featured work"
              title="Concepts we'd sign."
              description="Demonstration projects that show how we think, design and engineer. Client work ships here as it's delivered."
            />
            <Link href="/portfolio" className="link-accent text-base">
              View portfolio ›
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="py-20 sm:py-24" aria-labelledby="process-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading
            eyebrow="How we work"
            title="Zero surprises, by design."
            description="Five clear steps from first message to launched product — you always know what happens next."
          />
          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.step} className="border-t border-line pt-5">
                <span className="text-sm font-medium text-muted">{step.step}</span>
                <h3 className="display mt-1.5 text-lg tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ PRICING PREVIEW ============ */}
      <section className="border-t border-line bg-alt py-20 sm:py-24" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Pricing"
              title="Honest, introductory prices."
              description="Every price is a starting price in ₹. Your final quote depends on requirements — external costs are always flagged up front."
            />
            <Link href="/pricing" className="link-accent text-base">
              See all pricing ›
            </Link>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricingCategories.map((category) => {
              const lowest = Math.min(...category.plans.map((p) => p.price));
              return (
                <Link
                  key={category.slug}
                  href="/pricing"
                  className="card card-lift group flex flex-col p-6"
                >
                  <h3 className="text-base font-medium text-foreground">{category.name}</h3>
                  <p className="mt-4 text-xs text-muted">From</p>
                  <p className="display text-4xl tracking-tight text-foreground">{inr(lowest)}</p>
                  <ul className="mt-4 grow space-y-1.5 text-sm text-muted">
                    {category.plans.map((plan) => (
                      <li key={plan.name}>{plan.name}</li>
                    ))}
                  </ul>
                  <span className="link-accent mt-5 inline-flex items-center gap-1.5 text-sm">
                    See plans
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Before you ask." />
          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="border-t border-line bg-alt py-20 text-center sm:py-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="display text-4xl leading-[1.08] text-foreground sm:text-5xl">
            Ready to build?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
            One message is all it takes. We&apos;ll come back with a plan, a timeline and a
            transparent quote — no obligations.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary min-h-12 px-8 text-base">
              Start a Project
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>
            <a href={`mailto:${site.email}`} className="link-accent text-base">
              {site.email} ›
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
