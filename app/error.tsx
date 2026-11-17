"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <TriangleAlert size={40} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
      <h1 className="display mt-5 text-2xl tracking-tight text-foreground sm:text-3xl">
        Something went wrong.
      </h1>
      <p className="mt-2 max-w-md text-muted">
        An unexpected error occurred while rendering this page. Try again — if it keeps happening,
        please let us know.
      </p>
      <button onClick={reset} className="btn-primary mt-7 min-h-12 px-7 text-base">
        <RotateCcw size={17} strokeWidth={1.8} aria-hidden="true" />
        Try Again
      </button>
    </div>
  );
}
