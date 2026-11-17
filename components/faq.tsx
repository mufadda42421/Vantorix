"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl border-t border-line">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                {item.question}
              </span>
              <Plus
                size={20}
                strokeWidth={1.6}
                aria-hidden="true"
                className={`shrink-0 text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                className="pb-6"
              >
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
