import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/inquiry-form";
import CopyEmailButton from "@/components/copy-email-button";

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description:
    "Tell Vantorix about your project — AI automations, websites, Android apps or desktop software. Get a written plan, timeline and transparent quote, usually within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappLink();

  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-4 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            Tell us what
            <br />
            <span className="text-muted">you&apos;re building.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Fill in the form and we&apos;ll get back with a written plan, timeline and quote —
            typically within 24 hours.
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-line py-14 sm:mt-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left: direct channels + next steps */}
          <div className="lg:col-span-4">
            <div className="border-t border-line pt-6">
              <h2 className="eyebrow">Email</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block break-all text-lg font-medium leading-snug text-foreground transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={`mailto:${site.email}`} className="btn-ghost min-h-11 px-5 text-xs">
                  <Mail size={14} strokeWidth={1.8} aria-hidden="true" />
                  Open Email
                </a>
                <CopyEmailButton email={site.email} />
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <h2 className="eyebrow flex items-center gap-2">
                <MessageCircle size={13} strokeWidth={1.8} aria-hidden="true" />
                WhatsApp
              </h2>
              {wa ? (
                <>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Prefer chatting? Message us and we&apos;ll pick it up there.
                  </p>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-5 text-sm font-semibold text-[#062b14] transition-transform hover:scale-[1.03]"
                  >
                    Chat on WhatsApp
                  </a>
                </>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  WhatsApp isn&apos;t connected yet. Once the number is added in{" "}
                  <code className="text-foreground">lib/site.ts</code> (
                  <code className="text-foreground">whatsappNumber</code>), the button appears
                  automatically. Until then, email is fastest.
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/85">
                {[
                  "We read your enquiry and reply — typically within 24 hours.",
                  "You receive a written plan: scope, timeline and a fixed quote.",
                  "You approve, we build — with a live preview at every milestone.",
                  "Delivery, handover and a bug-fix window included.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-muted">0{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: inquiry form */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="card flex h-96 items-center justify-center rounded-2xl text-sm text-muted">
                  Loading form…
                </div>
              }
            >
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
