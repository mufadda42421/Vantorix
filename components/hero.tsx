"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InkField from "@/components/ink-field";
import Magnetic from "@/components/magnetic";

const LINES = ["We Build Technology", "That Moves You Forward."];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Reactive ink-drift canvas */}
      <InkField className="absolute inset-0 h-full w-full" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-[1200px] flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-28">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Engineering Tomorrow, Today.
        </motion.p>

        <h1 className="display mt-6 text-[2.75rem] leading-[1.0] text-foreground sm:text-6xl xl:text-[5.15rem]">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <motion.span
                className="block will-change-transform"
                initial={{ y: reduce ? 0 : "115%", opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.12 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          Thoughtful software. Intelligent automation. Digital experiences built for
          what&apos;s next.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <Magnetic>
            <Link href="/services" className="btn-primary min-h-12 px-7 text-base">
              Explore Our Services
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn-ghost min-h-12 px-7 text-base">
              Start a Project
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
