import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/data";

export default async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-alt text-xs text-muted">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Tagline row */}
        <div className="border-b border-line/70 py-4">
          <p>
            {site.name} — {site.tagline} {site.description}
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-8 sm:grid-cols-4">
          <nav aria-label="Services">
            <h2 className="font-medium text-foreground">Services</h2>
            <ul className="mt-3 space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.anchor}`} className="hover:text-foreground">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="font-medium text-foreground">Company</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </nav>
          <nav aria-label="Connect">
            <h2 className="font-medium text-foreground">Connect</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <Mail size={12} aria-hidden="true" />
                  Email
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <h2 className="font-medium text-foreground">Get started</h2>
            <p className="mt-3 leading-relaxed">
              Tell us what you&apos;re building — we&apos;ll reply with a plan and a quote.
            </p>
            <Link href="/contact" className="link-accent mt-2 inline-block">
              Start a Project ›
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col justify-between gap-2 border-t border-line/70 py-4 sm:flex-row sm:items-center">
          <p>
            Copyright © {year} {site.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <span aria-hidden="true" className="text-line">|</span>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
            <span aria-hidden="true" className="text-line">|</span>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
