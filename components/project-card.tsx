import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      <div className="media-frame m-3 overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={`${project.title} — concept illustration`}
          width={1200}
          height={720}
          className="aspect-[5/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex grow flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted">{project.category}</p>
          <span className="rounded-full border border-line px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-muted">
            Concept / Demo
          </span>
        </div>
        <h3 className="display mt-3 text-xl tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-alt px-2 py-1 text-[0.68rem] font-medium text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <Link
          href={`/portfolio/${project.slug}`}
          className="link-accent mt-auto inline-flex items-center gap-1.5 pt-5 text-sm"
          aria-label={`View details of ${project.title}`}
        >
          Learn more
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
