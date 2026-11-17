"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [waNotice, setWaNotice] = useState(false);
  const wa = whatsappLink();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!waNotice) return;
    const t = setTimeout(() => setWaNotice(false), 5000);
    return () => clearTimeout(t);
  }, [waNotice]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      {waNotice && (
        <div
          role="status"
          className="pointer-events-auto flex max-w-[16rem] items-start gap-2 rounded-2xl border border-line bg-white p-3 text-xs leading-relaxed text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        >
          <p>
            WhatsApp isn&apos;t connected yet. Add the number in{" "}
            <code className="text-accent">lib/site.ts</code> →{" "}
            <code className="text-accent">whatsappNumber</code>. Until then, email us at{" "}
            <a className="link-accent" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <button
            onClick={() => setWaNotice(false)}
            aria-label="Dismiss notice"
            className="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-foreground"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* WhatsApp */}
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="pointer-events-auto inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-4 text-[#062b14] shadow-[0_10px_28px_rgba(18,140,80,0.35)] transition-transform duration-200 hover:scale-105"
        >
          <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setWaNotice(true)}
          aria-label="WhatsApp contact — setup pending"
          title="WhatsApp — setup pending"
          className="pointer-events-auto inline-flex h-13 w-13 items-center justify-center rounded-full border border-line bg-white p-4 text-muted shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-105 hover:text-foreground"
        >
          <MessageCircle size={24} strokeWidth={1.8} aria-hidden="true" />
        </button>
      )}

      {/* Scroll to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowUp size={19} strokeWidth={1.8} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
