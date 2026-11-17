import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/* Route Handlers with Cache Components are always dynamic by default — no segment config needed. */

const SERVICE_LABELS: Record<string, string> = {
  "ai-automations": "AI Automations",
  "website-development": "Website Development",
  "android-app-development": "Android App Development",
  "desktop-app-development": "Desktop App Development",
  "custom-quote": "Custom / Not sure yet",
};
const BUDGETS = new Set([
  "Under ₹1,000",
  "₹1,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000+",
  "Custom / Not sure yet",
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Tiny in-memory throttle: 5 enquiries per IP per 10 minutes. */
const hits = new Map<string, { count: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export async function POST(request: Request) {
  /* Parse JSON safely */
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  /* Honeypot: silently accept (and drop) bot submissions */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  /* Server-side validation — never trust the client */
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const budget = typeof body.budget === "string" ? body.budget : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";

  const problems: string[] = [];
  if (name.length < 2 || name.length > 120) problems.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) problems.push("email");
  if (!(service in SERVICE_LABELS)) problems.push("service");
  if (!BUDGETS.has(budget)) problems.push("budget");
  if (description.length < 10 || description.length > 5000) problems.push("description");

  if (problems.length) {
    return NextResponse.json(
      { ok: false, message: `Please check the following fields: ${problems.join(", ")}.` },
      { status: 422 }
    );
  }

  /* Throttle per IP */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many enquiries from this address. Please try again later." },
      { status: 429 }
    );
  }

  /* Email delivery must be explicitly configured — never fake a send */
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      {
        ok: false,
        code: "EMAIL_NOT_CONFIGURED",
        message:
          "Email delivery is not configured on the server (SMTP env vars missing). Please email us directly.",
      },
      { status: 503 }
    );
  }

  const to = INQUIRY_TO_EMAIL?.trim() || site.email;
  const subject = `New project enquiry — ${SERVICE_LABELS[service]} — ${name}`;
  const text = [
    `New project enquiry from ${site.name}`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${SERVICE_LABELS[service]}`,
    `Budget: ${budget}`,
    ``,
    `Project brief:`,
    description,
  ].join("\n");
  const html = `
    <h2 style="font-family:system-ui">New project enquiry — ${esc(site.name)}</h2>
    <table style="font-family:system-ui;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${esc(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${esc(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Service</td><td>${esc(SERVICE_LABELS[service])}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Budget</td><td>${esc(budget)}</td></tr>
    </table>
    <p style="font-family:system-ui;color:#666">Project brief</p>
    <p style="font-family:system-ui;white-space:pre-wrap">${esc(description)}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] SMTP send failed:", err);
    return NextResponse.json(
      { ok: false, message: "The email service failed to send your enquiry. Please try again shortly." },
      { status: 502 }
    );
  }
}
