"use client";

import { useEffect, useRef } from "react";

/**
 * Trailing ring cursor — small dot tracks instantly, larger ring lerps behind.
 * Desktop / fine pointers only; purely decorative (native cursor stays visible).
 * Hidden entirely for touch and reduced-motion users.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let ringSize = 34;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, select, textarea, label, summary')
      );
      ring.dataset.hover = String(interactive);
      ringSize = interactive ? 52 : 34;
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - ringSize / 2}px, ${ry - ringSize / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="vt-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="vt-cursor-ring" aria-hidden="true" />
    </>
  );
}
