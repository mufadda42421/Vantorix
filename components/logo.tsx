import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="group flex shrink-0 items-center gap-2"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-7 w-7 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="#1d1d1f" />
        <path
          d="M13 14.5 L24 34 L35 14.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
          {site.name}
        </span>
      )}
    </Link>
  );
}
