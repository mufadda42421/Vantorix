"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/project-card";

const filters = ["All", "AI Automations", "Websites", "Android Apps", "Desktop Apps"] as const;
type Filter = (typeof filters)[number];

export default function PortfolioGrid() {
  const [active, setActive] = useState<Filter>("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`min-h-10 rounded-full border px-4 text-[0.82rem] font-medium transition-all duration-200 ${
                isActive
                  ? "border-foreground bg-foreground text-white"
                  : "border-line bg-white text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">
          No demonstration projects in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
