/**
 * Central brand & contact configuration.
 * Change these values in ONE place and they update everywhere on the site.
 */
export const site = {
  /** Company brand name (unique, invented). */
  name: "Vantorix",
  legalName: "Vantorix",
  tagline: "Engineering Tomorrow, Today.",
  description:
    "Vantorix builds modern digital solutions — AI automations, websites, Android apps and desktop software — that help individuals, startups and businesses grow through technology.",
  /** Public contact email (used for inquiries & footer). */
  email: "jaorawalamufaddal7@gmail.com",
  /**
   * WhatsApp contact number in international format, e.g. "+919876543210".
   * Leave EMPTY to hide the WhatsApp button until a real number is provided.
   * Never hardcode a placeholder number here.
   */
  whatsappNumber: "",
  /** Prefilled message for the WhatsApp button. */
  whatsappMessage: "Hi Vantorix! I'd like to discuss a project.",
  /** Canonical site URL — used for metadata/OG/sitemap. Update on deploy. */
  url: "https://vantorix.example.com",
  /** Nav links reused by header/footer. */
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;

/** wa.me deep link for the configured WhatsApp number (null when unset). */
export function whatsappLink(): string | null {
  const digits = site.whatsappNumber.replace(/[^\d]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(site.whatsappMessage)}`;
}
