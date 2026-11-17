import {
  Bot,
  Globe,
  Smartphone,
  Monitor,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  slug: string;
  anchor: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  startingAt: number;
  /** What is included — shown as checkmarked capability list. */
  items: string[];
  /** Outcome-focused benefits. */
  benefits: string[];
  /** Detailed capability blocks. */
  features: { title: string; description: string }[];
  tech: string[];
}

export const services: Service[] = [
  {
    slug: "ai-automations",
    anchor: "ai-automations",
    name: "AI Automations",
    short: "Automate repetitive work with AI chatbots, intelligent workflows and integrations.",
    tagline: "Put your busywork on autopilot.",
    description:
      "We design and build AI-powered systems that take repetitive work off your team's plate — from customer-facing chatbots to internal workflow automation and deep integrations with the tools your business already uses.",
    icon: Bot,
    startingAt: 999,
    items: [
      "AI chatbots",
      "Business workflow automation",
      "AI integrations",
      "Automated customer support",
      "Productivity automation",
    ],
    benefits: [
      "Cut hours of manual, repetitive work every week",
      "Respond to customers 24/7 with consistent quality",
      "Connect your existing tools into one smooth flow",
      "Reduce human error in routine operations",
    ],
    features: [
      {
        title: "AI chatbots",
        description:
          "Conversational assistants trained on your business knowledge — for websites, WhatsApp, Instagram or Slack — that answer questions and qualify leads around the clock.",
      },
      {
        title: "Business workflow automation",
        description:
          "End-to-end automation of repetitive processes: lead routing, data entry, report generation, invoicing triggers, notifications and approvals.",
      },
      {
        title: "AI integrations",
        description:
          "Plug modern AI models into your product or internal tooling — summarisation, classification, document extraction, content drafting and more.",
      },
      {
        title: "Automated customer support",
        description:
          "Tier-1 support handled automatically: FAQs, order status, refund flows and ticket triage — with smooth hand-off to humans when needed.",
      },
      {
        title: "Productivity automation",
        description:
          "Personal and team productivity systems — auto-organised inboxes, meeting summaries, follow-up reminders and CRM hygiene on autopilot.",
      },
    ],
    tech: ["OpenAI", "Claude", "Gemini", "LangChain", "n8n", "Python", "TypeScript"],
  },
  {
    slug: "website-development",
    anchor: "website-development",
    name: "Website Development",
    short: "Fast, beautiful websites and web apps that convert visitors into customers.",
    tagline: "Websites that work as hard as you do.",
    description:
      "From single-page sites to full e-commerce stores and custom web applications, we craft fast, responsive, SEO-friendly websites with world-class design and engineering.",
    icon: Globe,
    startingAt: 999,
    items: [
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "E-commerce websites",
      "Custom web applications",
    ],
    benefits: [
      "A premium first impression that builds instant trust",
      "Blazing-fast page loads that keep visitors engaged",
      "Mobile-perfect layouts on every screen size",
      "SEO-ready foundations so you get found on Google",
    ],
    features: [
      {
        title: "Business websites",
        description:
          "Complete company websites with services, about, contact, lead capture and analytics — designed to turn visitors into enquiries.",
      },
      {
        title: "Portfolio websites",
        description:
          "Striking personal portfolios for developers, designers, photographers and creators — with case studies and a strong call to action.",
      },
      {
        title: "Landing pages",
        description:
          "High-converting single-purpose pages for campaigns, product launches and lead generation — A/B-test ready.",
      },
      {
        title: "E-commerce websites",
        description:
          "Online stores with catalogues, cart, secure checkout, payments and order management — built to scale as you grow.",
      },
      {
        title: "Custom web applications",
        description:
          "Full-stack web apps: dashboards, portals, booking systems, SaaS products — architected for reliability and speed.",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    slug: "android-app-development",
    anchor: "android-app-development",
    name: "Android App Development",
    short: "Native-quality Android apps for business, productivity and beyond.",
    tagline: "Your business, in everyone's pocket.",
    description:
      "We build polished, performant Android applications — from idea and UI/UX to Play Store release — engineered with modern tooling and clean architecture.",
    icon: Smartphone,
    startingAt: 2999,
    items: [
      "Business applications",
      "Productivity apps",
      "Custom Android applications",
      "API integrations",
    ],
    benefits: [
      "Reach your customers on the world's most-used platform",
      "Native-feel performance and buttery-smooth UI",
      "App Store–ready builds with signing & release support",
      "Clean, maintainable code you actually own",
    ],
    features: [
      {
        title: "Business applications",
        description:
          "Field-service, inventory, CRM and operations apps that put your business processes in your team's hands.",
      },
      {
        title: "Productivity apps",
        description:
          "Task managers, habit trackers, note-taking and team coordination apps designed for daily use.",
      },
      {
        title: "Custom Android applications",
        description:
          "Fully bespoke apps built from scratch — sensors, offline sync, notifications, background jobs and more.",
      },
      {
        title: "API integrations",
        description:
          "Seamless connection to your backend, payment gateways, maps, push notifications and third-party services.",
      },
    ],
    tech: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase", "Retrofit", "Room"],
  },
  {
    slug: "desktop-app-development",
    anchor: "desktop-app-development",
    name: "Desktop App Development",
    short: "Powerful Windows desktop software for teams and power users.",
    tagline: "Serious software, right on the desktop.",
    description:
      "We engineer reliable Windows desktop applications — productivity tools, business management systems and custom internal software — with polished UI and robust performance.",
    icon: Monitor,
    startingAt: 2499,
    items: [
      "Windows desktop applications",
      "Productivity software",
      "Business management tools",
      "Custom desktop solutions",
    ],
    benefits: [
      "Offline-capable software that always works",
      "Blazing-fast native performance for heavy workloads",
      "Tailored exactly to your workflow — no bloat",
      "One-click installers your team can use day one",
    ],
    features: [
      {
        title: "Windows desktop applications",
        description:
          "Modern Windows apps with clean installers, auto-updates and seamless Windows integration.",
      },
      {
        title: "Productivity software",
        description:
          "Focused tools that eliminate friction — launchers, clipboard managers, archivers, batch processors and more.",
      },
      {
        title: "Business management tools",
        description:
          "Billing, inventory, HR, attendance, reporting and back-office systems built around your exact process.",
      },
      {
        title: "Custom desktop solutions",
        description:
          "Automation utilities, data tools, POS systems and internal software engineered to your spec.",
      },
    ],
    tech: ["C#", ".NET", "WPF", "Electron", "Tauri", "SQLite"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Pricing (INR, introductory). All plans: "Starting at".              */
/* ------------------------------------------------------------------ */

export interface PricePlan {
  name: string;
  price: number;
  blurb: string;
  includes: string[];
  highlighted?: boolean;
}
export interface PriceCategory {
  slug: string;
  name: string;
  plans: PricePlan[];
}

export const pricingCategories: PriceCategory[] = [
  {
    slug: "ai-automations",
    name: "AI Automations",
    plans: [
      {
        name: "Basic Automation",
        price: 999,
        blurb: "One repetitive workflow, fully automated.",
        includes: [
          "Single workflow automation",
          "Up to 2 app integrations (e.g. Sheets + Email)",
          "Simple triggers & actions",
          "30-day bug-fix support",
        ],
      },
      {
        name: "AI Chatbot",
        price: 1499,
        blurb: "A smart assistant for your website or WhatsApp.",
        includes: [
          "Custom-trained AI chatbot",
          "Up to 30 knowledge entries",
          "Lead capture & hand-off",
          "30-day bug-fix support",
        ],
        highlighted: true,
      },
      {
        name: "Advanced Automation",
        price: 3999,
        blurb: "Multi-step, AI-powered operations pipeline.",
        includes: [
          "Multi-step AI workflows",
          "AI summarisation / classification",
          "Up to 5 integrations",
          "Documentation & handover",
          "60-day bug-fix support",
        ],
      },
    ],
  },
  {
    slug: "websites",
    name: "Websites",
    plans: [
      {
        name: "Single-Page Website",
        price: 999,
        blurb: "A sleek one-pager for individuals & launches.",
        includes: [
          "1-page responsive website",
          "Contact form & social links",
          "Mobile-first design",
          "Basic on-page SEO",
          "15-day bug-fix support",
        ],
      },
      {
        name: "Business Website",
        price: 2499,
        blurb: "Complete company site that wins trust.",
        includes: [
          "Up to 6 pages",
          "Custom design & copy structure",
          "Contact + enquiry system",
          "SEO-ready foundations",
          "30-day bug-fix support",
        ],
        highlighted: true,
      },
      {
        name: "Premium Website",
        price: 4999,
        blurb: "Flagship design with advanced functionality.",
        includes: [
          "Up to 12 pages / custom design system",
          "CMS or dynamic content sections",
          "Advanced animations & interactions",
          "Performance & SEO optimisation",
          "60-day bug-fix support",
        ],
      },
    ],
  },
  {
    slug: "android-apps",
    name: "Android Apps",
    plans: [
      {
        name: "Basic Application",
        price: 2999,
        blurb: "A clean MVP with core features.",
        includes: [
          "Up to 4 screens",
          "Core app functionality",
          "Modern UI (Material 3)",
          "Play Store–ready APK/AAB",
          "30-day bug-fix support",
        ],
      },
      {
        name: "Advanced Application",
        price: 6999,
        blurb: "Full-featured app with backend integration.",
        includes: [
          "Unlimited screens",
          "API / backend integration",
          "Auth, push notifications & analytics",
          "Offline support where applicable",
          "60-day bug-fix support",
        ],
        highlighted: true,
      },
    ],
  },
  {
    slug: "desktop-apps",
    name: "Desktop Apps",
    plans: [
      {
        name: "Basic Application",
        price: 2499,
        blurb: "A focused tool that solves one problem well.",
        includes: [
          "Single-purpose Windows app",
          "Clean, native-feeling UI",
          "Local data storage",
          "One-click installer",
          "30-day bug-fix support",
        ],
      },
      {
        name: "Advanced Application",
        price: 5999,
        blurb: "Full business management software.",
        includes: [
          "Multi-module desktop suite",
          "Database + reporting built in",
          "Role-based access where needed",
          "Auto-update mechanism",
          "60-day bug-fix support",
        ],
        highlighted: true,
      },
    ],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ------------------------------------------------------------------ */
/* Projects — DEMONSTRATION / CONCEPT work, clearly labelled.          */
/* Add real client projects to this array as they complete.            */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  title: string;
  category: "AI Automations" | "Websites" | "Android Apps" | "Desktop Apps";
  description: string;
  image: string;
  tech: string[];
  features: string[];
  challenge: string;
  solution: string;
}

export const projects: Project[] = [
  {
    slug: "aurora-ai-support",
    title: "Aurora — AI Support Agent",
    category: "AI Automations",
    description:
      "A 24/7 AI customer-support agent concept: answers FAQs, triages tickets and hands off to humans gracefully.",
    image: "/images/project-ai-support.svg",
    tech: ["OpenAI", "Next.js", "TypeScript", "PostgreSQL"],
    features: [
      "Replies grounded in business knowledge base",
      "Automatic ticket triage & routing",
      "Human hand-off with full conversation context",
      "Analytics dashboard for resolution rates",
    ],
    challenge:
      "Support teams drown in repetitive tier-1 questions, delays and inconsistent answers outside business hours.",
    solution:
      "An AI agent that answers instantly from a curated knowledge base, escalates complex issues with full context, and reports on what customers ask most.",
  },
  {
    slug: "flowline-automation-suite",
    title: "Flowline — Workflow Automation",
    category: "AI Automations",
    description:
      "A concept automation pipeline that moves leads from enquiry to invoice with zero manual data entry.",
    image: "/images/project-automation.svg",
    tech: ["n8n", "Claude", "Python", "Google Sheets", "Gmail API"],
    features: [
      "Lead capture → CRM → invoice in one flow",
      "AI summarisation of enquiry documents",
      "Automatic follow-up sequences",
      "Failure alerts with retry logic",
    ],
    challenge:
      "Small teams lose hours copying data between forms, sheets, email and invoicing tools.",
    solution:
      "A resilient automation spine: every lead is captured, enriched, routed and invoiced automatically, with alerts only when a human decision is needed.",
  },
  {
    slug: "northwind-commerce",
    title: "Northwind — E-commerce Storefront",
    category: "Websites",
    description:
      "A premium, minimalist storefront concept with cart, checkout and order management.",
    image: "/images/project-commerce.svg",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
    features: [
      "Catalogue with search & filters",
      "Cart + secure Stripe checkout",
      "Order tracking & admin panel",
      "Lighthouse-optimised performance",
    ],
    challenge:
      "Boutique sellers need online presence without marketplace commission fees or bloated subscriptions.",
    solution:
      "A fast, branded storefront with first-class mobile UX, secure payments and a simple admin for orders and inventory.",
  },
  {
    slug: "pulsefield-android",
    title: "PulseField — Productivity App",
    category: "Android Apps",
    description:
      "A concept Android productivity app with focus timer, habits and daily planning.",
    image: "/images/project-android.svg",
    tech: ["Kotlin", "Jetpack Compose", "Room", "Firebase"],
    features: [
      "Adaptive focus timer with streaks",
      "Habit tracking with reminders",
      "Offline-first with cloud sync",
      "Material 3 dynamic theming",
    ],
    challenge:
      "Most productivity apps are either too complex or abandoned within a week.",
    solution:
      "A calm, glanceable app: three surfaces — today, focus, habits — with gentle streak mechanics and offline reliability.",
  },
  {
    slug: "ledgerdesk-windows",
    title: "LedgerDesk — Business Manager",
    category: "Desktop Apps",
    description:
      "A concept Windows desktop suite for billing, inventory and daily reporting.",
    image: "/images/project-desktop.svg",
    tech: ["C#", ".NET", "WPF", "SQLite"],
    features: [
      "Billing + GST-ready invoices",
      "Inventory with low-stock alerts",
      "Daily sales reports & export",
      "Local-first, works fully offline",
    ],
    challenge:
      "Neighbourhood businesses outgrow paper ledgers but can't afford heavyweight ERP systems.",
    solution:
      "A fast, offline-first desktop suite covering billing, stock and reports — learnable in minutes by anyone on the counter.",
  },
  {
    slug: "meridian-portfolio",
    title: "Meridian — Portfolio Experience",
    category: "Websites",
    description:
      "A cinematic portfolio website concept with case-study storytelling and buttery motion.",
    image: "/images/project-portfolio.svg",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    features: [
      "Case-study driven storytelling",
      "Smooth page transitions & scroll motion",
      "Contact + availability section",
      "Perfect Lighthouse scores",
    ],
    challenge:
      "Creative professionals struggle to stand out with generic template portfolios.",
    solution:
      "A cinematic, editorial portfolio where every project reads like a short film — designed to be remembered.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    question: "How does the process work from first message to delivery?",
    answer:
      "It starts with a short discovery conversation — you tell us what you're building and why. We then share a written plan with scope, timeline and a final quote. Once you approve, we design, build, review together and ship. You get a working preview link throughout so there are never surprises.",
  },
  {
    question: "How fast can you deliver my project?",
    answer:
      "Small websites and automations are often delivered within days, not months. Larger apps are scoped realistically after discovery — speed comes from a tight scope, not from cutting corners. You'll always get a clear timeline before paying anything.",
  },
  {
    question: "Why are your prices so affordable?",
    answer:
      "Our introductory pricing is intentional — we're building our early portfolio and reputation, so we keep margins thin to deliver serious work at accessible prices. Every price shown is a starting price; the final quote depends on your exact requirements.",
  },
  {
    question: "Do I own the code and files after delivery?",
    answer:
      "Yes. Once the final payment is complete, all source code, assets and credentials are yours. We can also help you with hosting, deployment and handover documentation.",
  },
  {
    question: "Are domain, hosting and third-party costs included?",
    answer:
      "No — domain names, hosting, paid APIs (like AI model usage), app-store fees and other third-party subscriptions are always charged separately at cost. We'll flag every external cost in the written quote before you commit, so there are no hidden surprises.",
  },
  {
    question: "What if I need changes after delivery?",
    answer:
      "Every project includes a bug-fix period (15–60 days depending on the plan). Beyond that, small tweaks are quick and inexpensive, and larger new features are quoted as separate, clearly-scoped work.",
  },
  {
    question: "Can you handle bigger, custom projects?",
    answer:
      "Absolutely. Multi-page platforms, SaaS products, integrations and internal business systems are all in scope. Choose the 'Custom quote' option on the pricing page or describe your idea in the contact form — we'll scope it properly.",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We listen first — goals, audience, constraints — and ask the questions most agencies skip.",
  },
  {
    step: "02",
    title: "Plan",
    description: "You get a written scope, timeline and transparent quote before any work begins.",
  },
  {
    step: "03",
    title: "Design",
    description: "Wireframes and high-fidelity UI for your review — nothing is built before you approve the look.",
  },
  {
    step: "04",
    title: "Build",
    description: "Clean, typed, fast code with a live preview link so you watch it come to life.",
  },
  {
    step: "05",
    title: "Launch & Support",
    description: "Deployment, handover docs and a bug-fix window — then we're here when you need us.",
  },
];
