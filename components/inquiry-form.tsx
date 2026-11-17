"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MailWarning,
} from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/data";

const BUDGETS = [
  "Under ₹1,000",
  "₹1,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000+",
  "Custom / Not sure yet",
] as const;

const SERVICE_OPTIONS = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "custom-quote", label: "Custom / Not sure yet" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "unconfigured" | "error";

const inputClass =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-foreground placeholder-[#a8a8ad] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_4px_rgba(0,113,227,0.12)]";
const labelClass = "mb-1.5 block text-xs font-medium text-foreground/80";
const errorClass = "mt-1.5 text-xs font-medium text-[#d70015]";

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") ?? "";
  const presetPlan = searchParams.get("plan") ?? "";

  const [values, setValues] = useState(() => ({
    name: "",
    email: "",
    service: SERVICE_OPTIONS.some((o) => o.value === presetService)
      ? presetService
      : "",
    budget: "",
    description: presetPlan
      ? `I'm interested in the "${presetPlan}" plan. `
      : "",
    company: "", // honeypot — humans never fill this
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const serviceSet = useMemo(() => new Set(SERVICE_OPTIONS.map((o) => o.value)), []);

  const update = (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const validate = () => {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!serviceSet.has(values.service)) next.service = "Please choose a service.";
    if (!values.budget) next.budget = "Please choose a budget range.";
    if (values.description.trim().length < 10)
      next.description = "Please describe your project in at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          service: values.service,
          budget: values.budget,
          description: values.description.trim(),
          company: values.company, // honeypot
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 503 && data.code === "EMAIL_NOT_CONFIGURED") {
        setStatus("unconfigured");
        setServerMessage(data.message ?? "");
        return;
      }
      setStatus("error");
      setServerMessage(
        data.message ?? "Something went wrong while sending your enquiry. Please try again."
      );
    } catch {
      setStatus("error");
      setServerMessage("Network error — please check your connection and try again.");
    }
  };

  /* ----- Success state (only shown after a real 200 from the API) ----- */
  if (status === "success") {
    return (
      <div
        className="card rounded-2xl p-8 text-center sm:p-12"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 size={48} strokeWidth={1.6} className="mx-auto text-accent" aria-hidden="true" />
        <h2 className="display mt-5 text-2xl tracking-tight text-foreground sm:text-3xl">
          Enquiry received. Thank you.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Your project details have been delivered to our inbox. We&apos;ll get back to{" "}
          <span className="text-foreground">{values.email.trim()}</span> — typically within 24 hours.
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted">
          {site.name} — {site.tagline}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card rounded-2xl p-6 sm:p-8"
      aria-label="Project inquiry form"
    >
      {/* Honest fallback banner when email delivery isn't configured */}
      {status === "unconfigured" && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-[#e6c200] bg-[#fffae0] px-4 py-4 text-sm leading-relaxed text-[#574b00]"
          role="alert"
        >
          <MailWarning size={20} className="mt-0.5 shrink-0 text-[#b58900]" aria-hidden="true" />
          <div>
            <p className="font-semibold">Email delivery isn&apos;t configured on the server yet.</p>
            <p className="mt-1">
              Your enquiry was <strong>not sent</strong>. Please email us directly at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
                {site.email}
              </a>
              . The owner can enable delivery with the SMTP variables in{" "}
              <code>.env.example</code>.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-[#f5c2c0] bg-[#fff0ef] px-4 py-4 text-sm leading-relaxed text-[#8e1b11]"
          role="alert"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-[#d70015]" aria-hidden="true" />
          <p>{serverMessage}</p>
        </div>
      )}

      {/* Honeypot — hidden from humans & assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            placeholder="Your full name"
            value={values.name}
            onChange={update("name")}
          />
          {errors.name && <p id="name-error" className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            placeholder="you@example.com"
            value={values.email}
            onChange={update("email")}
          />
          {errors.email && <p id="email-error" className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>Service Required *</label>
          <select
            id="service"
            name="service"
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={`${inputClass} appearance-none`}
            value={values.service}
            onChange={update("service")}
          >
            <option value="">Choose a service…</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.service && <p id="service-error" className={errorClass}>{errors.service}</p>}
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>Budget *</label>
          <select
            id="budget"
            name="budget"
            required
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            className={`${inputClass} appearance-none`}
            value={values.budget}
            onChange={update("budget")}
          >
            <option value="">Select a range…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p id="budget-error" className={errorClass}>{errors.budget}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="description" className={labelClass}>Project Description *</label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          className={`${inputClass} min-h-32 resize-y py-3`}
          placeholder="What are you building? Who is it for? What should it do? Goals, features, references, deadline — anything helps."
          value={values.description}
          onChange={update("description")}
        />
        {errors.description && (
          <p id="description-error" className={errorClass}>{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 min-h-12 w-full justify-center px-8 text-base disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send My Project Brief
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        By submitting you agree to be contacted about this enquiry. No lists, no spam.
      </p>
    </form>
  );
}
