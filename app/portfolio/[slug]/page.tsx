import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { projects, services } from "@/lib/data";

const categoryToService: Record<string, string> = {
  "AI Automations": "ai-automations",
  Websites: "website-development",
  "Android Apps": "android-app-development",
  "Desktop Apps": "desktop-app-development",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Demonstration Project`,
    description: project.description,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const relatedService = services.find(
    (s) => s.slug === categoryToService[project.category]
  );

  return (
    <article className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/portfolio"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
          Portfolio
        </Link>

        {/* Header */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="media-frame">
              <Image
                src={project.image}
                alt={`${project.title} — concept illustration`}
                width={1200}
                height={720}
                priority
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium text-muted">{project.category}</p>
              <span className="rounded-full border border-line px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-muted">
                Concept / Demo
              </span>
            </div>
            <h1 className="display mt-4 text-4xl leading-[1.08] text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

            <ul className="mt-6 space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[0.95rem] text-foreground/85">
                  <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?service=${categoryToService[project.category]}`}
              className="btn-primary mt-8 min-h-12 self-start px-7 text-sm"
            >
              Build Something Like This
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Challenge / approach */}
        <div className="mt-12 grid gap-10 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="eyebrow">The challenge</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{project.challenge}</p>
          </div>
          <div>
            <h2 className="eyebrow">Our approach</h2>
            <p className="mt-3 leading-relaxed text-foreground/85">{project.solution}</p>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-10 border-t border-line pt-8">
          <h2 className="eyebrow">Technology</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full bg-alt px-3 py-1.5 text-xs font-medium text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {relatedService && (
          <p className="mt-10 text-sm text-muted">
            Related service:{" "}
            <Link href={`/services#${relatedService.anchor}`} className="link-accent">
              {relatedService.name} ›
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}
