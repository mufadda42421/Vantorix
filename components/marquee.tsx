const items = [
  "AI Automations",
  "Website Development",
  "Android Apps",
  "Desktop Software",
  "AI Chatbots",
  "Workflow Automation",
  "E-commerce",
];

/** Slow monochrome marquee — pure CSS animation, duplicated for a seamless loop. */
export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="marquee-mask overflow-hidden border-y border-line bg-background py-3 select-none"
    >
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 text-sm font-medium uppercase tracking-[0.18em] text-muted"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
