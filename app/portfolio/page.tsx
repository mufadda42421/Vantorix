import type { Metadata } from "next";
import PortfolioGrid from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio — Demonstration Projects",
  description:
    "Explore Vantorix demonstration projects across AI automations, websites, Android apps and desktop software — clearly labelled concept work that shows our design and engineering standards.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Portfolio</p>
            <h1 className="display mt-4 text-5xl leading-[1.05] text-foreground sm:text-6xl">
              Work that shows
              <br />
              <span className="text-muted">the standard.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Vantorix is a young studio building its reputation the honest way. The projects below
              are demonstration concepts, clearly labelled. Real client work takes centre stage as it ships.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-line bg-alt py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}
