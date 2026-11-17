"use client";

import { useEffect, useRef } from "react";

/**
 * Monochrome "ink drift" — a slow particle flow-field drawn on canvas.
 * One accent hue (#0071e3) among ink particles. Reacts gently to the pointer.
 * Static single frame when prefers-reduced-motion is set.
 */
export default function InkField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect?.width ?? canvas.clientWidth));
      height = Math.max(1, Math.floor(rect?.height ?? canvas.clientHeight));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ededef";
      ctx.fillRect(0, 0, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Flow-field pseudo-noise (layered trig — no dependency) */
    const fieldAngle = (x: number, y: number, t: number) =>
      (Math.sin(x * 0.004 + t * 0.00016) + Math.cos(y * 0.005 - t * 0.00012) +
        Math.sin((x + y) * 0.0021 + t * 0.00009)) *
      Math.PI;

    type P = { x: number; y: number; px: number; py: number; speed: number; life: number; accent: boolean };
    const spawn = (): P => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return { x, y, px: x, py: y, speed: 1.15 + Math.random() * 1.35, life: 70 + Math.random() * 130, accent: Math.random() < 0.08 };
    };
    const COUNT = Math.floor((width * height) / 13000);
    const particles: P[] = Array.from({ length: Math.max(110, Math.min(COUNT, 190)) }, spawn);

    const pointer = { x: -9999, y: -9999, active: false };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    canvas.parentElement?.addEventListener("pointermove", onMove);
    canvas.parentElement?.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let running = true;
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* Gentle fade for motion trails */
    const fade = () => {
      ctx.fillStyle = "rgba(237, 237, 239, 0.13)";
      ctx.fillRect(0, 0, width, height);
    };

    const tick = (t: number) => {
      if (!running) return;
      fade();

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, t);
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;

        /* Pointer gently pushes particles aside */
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 0.1) {
            const force = (1 - dist / 170) * 2.1;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.lineWidth = p.accent ? 1.7 : 1.25;
        ctx.strokeStyle = p.accent ? "rgba(0, 113, 227, 0.65)" : "rgba(29, 29, 31, 0.48)";
        ctx.stroke();

        p.life -= 1;
        const out = p.x < -8 || p.x > width + 8 || p.y < -8 || p.y > height + 8;
        if (p.life <= 0 || out) Object.assign(p, spawn());
      }

      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      /* Single static frame for reduced motion */
      for (let step = 0; step < 260; step++) {
        for (const p of particles) {
          const angle = fieldAngle(p.x, p.y, step * 120);
          p.px = p.x; p.py = p.y;
          p.x += Math.cos(angle) * p.speed;
          p.y += Math.sin(angle) * p.speed;
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y);
          ctx.lineWidth = p.accent ? 1.4 : 1;
          ctx.strokeStyle = p.accent ? "rgba(0,113,227,0.4)" : "rgba(29,29,31,0.25)";
          ctx.stroke();
        }
      }
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
      canvas.parentElement?.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
