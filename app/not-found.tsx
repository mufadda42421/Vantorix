import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 pt-24 text-center">
      <div>
        <p className="display text-7xl tracking-tighter text-foreground sm:text-8xl">404</p>
        <h1 className="display mt-5 text-2xl tracking-tight text-foreground sm:text-3xl">
          This page moved, or never existed.
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          The link might be old or mistyped. Let&apos;s get you back on solid ground.
        </p>
        <Link href="/" className="btn-primary mt-8 min-h-12 px-7 text-base">
          <Home size={17} strokeWidth={1.8} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
