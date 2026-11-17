"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — the email is
      // visible on screen and selectable as a fallback.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="btn-ghost min-h-11 px-4 text-xs"
      aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
    >
      {copied ? (
        <>
          <Check size={14} className="text-accent" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden="true" />
          Copy Email
        </>
      )}
    </button>
  );
}
