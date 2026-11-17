import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Our Mission, Values & Approach",
  description:
    "Vantorix exists to make modern technology accessible and useful for everyone. Learn about our mission, our values and the way we work.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Innovation",
    text: "We reach for the modern toolkit — AI, automation, current frameworks — when it genuinely serves the goal. Never for show.",
  },
  {
    title: "Quality",
    text: "Clean architecture, typed code, tested flows and considered design. Work we'd be proud to put our name on — because it is.",
  },
  {
    title: "Simplicity",
    text: "The best software disappears. We obsess over the details so the result feels effortless — simple on the outside, serious underneath.",
  },
  {
    title: "Reliability",
    text: "What we ship works — and keeps working. A written quote, a live preview at every step, and a bug-fix window on delivery.",
  },
  {
    title: "Making technology accessible",
    text: "The tools used to belong to the biggest companies. We bring them within reach of every individual, startup and business with an ambition.",
  },
];

const approach = [
  {
    step: "01",
    title: "Start with the why",
    text: "Before a single design or API call, we understand the outcome you actually want — leads, sales, efficiency, delight.",
  },
  {
    step: "02",
    title: "Prototype fast, decide faster",
    text: "We favour working previews over long documents. You react to something real, early — while changes are still cheap.",
  },
  {
    step: "03",
    title: "Direct collaboration",
    text: "You talk to the person building your product — not an account manager three layers removed from the work.",
  },
  {
    step: "04",
    title: "Ship, then support",
    text: "Launch day is the beginning of the relationship — a bug-fix window, honest reporting and help when you need it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Mission */}
      <section className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 sm:pb-24">
          <p className="eyebrow">About {site.name}</p>
          <h1 className="display mt-4 max-w-5xl text-5xl leading-[1.04] text-foreground sm:text-7xl">
            Making modern technology{" "}
            <span className="text-muted">accessible and useful for everyone.</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-foreground/85 md:col-span-7">
              {site.name} was founded on one belief: the tools that once separated the biggest
              companies from everyone else — AI, automation, world-class engineering — should belong
              to every person and business willing to use them well.
            </p>
            <p className="leading-relaxed text-muted md:col-span-4 md:col-start-9">
              We&apos;re a young, craft-obsessed studio — not a faceless agency. You deal directly
              with the engineer building your product, pricing is honest, and quality is
              non-negotiable. We don&apos;t invent clients, awards or history for this page — our
              work and our words are the only résumé that should matter to you.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line bg-alt py-16 sm:py-20" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Our principles</p>
            <h2 id="principles-heading" className="display mt-3 text-4xl leading-[1.08] text-foreground sm:text-5xl">
              Five beliefs. Zero compromise.
            </h2>
          </div>
          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((principle) => (
              <li key={principle.title} className="border-t border-line pt-5">
                <h3 className="display text-base tracking-tight text-foreground">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 sm:py-20" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-heading" className="display mt-3 text-4xl leading-[1.08] text-foreground sm:text-5xl">
              How working with us feels.
            </h2>
          </div>
          <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item) => (
              <li key={item.step} className="border-b border-line py-7 pr-6 lg:border-b-0">
                <span className="text-sm font-medium text-muted">{item.step}</span>
                <h3 className="display mt-1.5 text-lg tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line py-16 text-center sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="display text-3xl leading-tight text-foreground sm:text-4xl">
            Want to see if we&apos;re a fit?
          </h2>
          <p className="mt-3 text-muted">One conversation is usually enough to know. No pitch decks, no pressure.</p>
          <Link href="/contact" className="btn-primary mt-7 min-h-12 px-8 text-base">
            Start a Conversation
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
