"use client";

import type { ReactNode } from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import type { PrincipleData, ExploreCardData, PrincipleIcon } from "@/lib/principles";

const iconBtnProps = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconTrust() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconStandards() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function IconControl() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconResilience() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function IconExplore() {
  return (
    <svg {...iconBtnProps} aria-hidden viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

const ICON_MAP: Record<PrincipleIcon, ReactNode> = {
  trust: <IconTrust />,
  control: <IconControl />,
  standards: <IconStandards />,
  resilience: <IconResilience />,
};

type Props = {
  principles: PrincipleData[];
  exploreCard: ExploreCardData;
};

export function TestimonialsSection({ principles, exploreCard }: Props) {
  const [active, setActive] = useState<PrincipleData>(principles[0]);

  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "0px 0px -60px 0px" });
  const buttonInView = useInView(buttonRef, { once: true, margin: "0px 0px -60px 0px" });

  const maxBars = Math.max(...principles.map((p) => p.bars), 4);

  return (
    <section className="mx-auto max-w-8xl px-4 py-8 md:px-4 md:py-12 lg:px-4">
      <div className="flex items-center justify-center gap-2 py-4">
        <span
          className="h-2 w-2 rounded-sm bg-[#c5f018]"
          style={{ animation: "dotPulse 1s ease-in-out infinite" }}
        />
        <span className="text-sm text-white md:text-lg">Principles</span>
      </div>

      <motion.h2
        ref={headingRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-12 text-center text-3xl font-light text-white md:mb-16 md:text-6xl"
      >
        <span className="font-semibold text-[#c5f018]">Principles</span>
        <span className="text-white"> for System Design</span>
      </motion.h2>

      <div className="flex flex-col items-stretch gap-6 md:flex-row">
        {/* Icon selectors */}
        <div className="flex items-center justify-center rounded-3xl bg-zinc-900/80 px-6 py-8 sm:px-8 md:px-10 md:py-10">
          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:flex-col md:flex-nowrap">
            {principles.map((p) => {
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p)}
                  className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 p-3 transition-all duration-300 sm:h-16 sm:w-16 md:h-20 md:w-20 ${isActive
                    ? "border-[#c5f018] bg-[#c5f018]/15 text-[#c5f018] shadow-[0_0_12px_rgba(197,240,24,0.35)]"
                    : "border-zinc-700 bg-zinc-800/80 text-zinc-400 opacity-80 hover:opacity-100"
                    }`}
                  aria-label={`Show principle: ${p.title}`}
                  aria-pressed={isActive}
                >
                  {ICON_MAP[p.icon] ?? ICON_MAP.trust}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active principle card */}
        <div className="flex-[1] rounded-3xl border border-[#c5f018] p-[1px]">
          <div className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-[#395407] to-[#090d00] px-8 py-10 md:min-h-0 md:px-10 md:py-12">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-80 -translate-x-1/2 bg-[radial-gradient(circle,rgba(197,240,24,0.65)_0%,transparent_70%)] blur-2xl" />
            <div className="relative p-4 md:p-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-medium uppercase tracking-wider text-[#c5f018]">
                  Principle
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: maxBars }, (_, i) => (
                    <div
                      key={i}
                      className={`h-6 w-[3px] rounded-full ${i + 1 <= active.bars ? "bg-[#c5f018]" : "bg-white/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-light text-white md:text-4xl">
                {active.title}
              </h3>
              <div className="mt-6 text-sm leading-relaxed text-zinc-200 md:text-lg md:leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0">
                <LexicalRenderer data={active.body} />
              </div>
            </div>
          </div>
        </div>

        {/* Explore card */}
        <div
          className="relative flex max-w-sm flex-[1] flex-col justify-between overflow-hidden rounded-3xl bg-cover bg-center px-8 py-10 md:px-10 md:py-12"
          style={{ backgroundImage: `url('${exploreCard.backgroundImage}')` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="relative z-[1] space-y-6">
            <div className="flex items-center h-16 w-16 text-[#c5f018]">
              <IconExplore />
            </div>
            <div>
              <h3 className="text-2xl font-light text-white md:text-3xl">
                {exploreCard.heading}
              </h3>
              <div className="mt-3 text-sm leading-relaxed text-white [&_p]:mb-0">
                <LexicalRenderer data={exploreCard.body} />
              </div>
            </div>
          </div>

          <motion.div
            ref={buttonRef}
            className="relative z-[1]"
            initial={{ opacity: 0, y: 40 }}
            animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <Link
              href={exploreCard.ctaHref}
              className="relative mt-6 flex items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-6 py-4 text-sm font-medium text-black transition duration-300 hover:border hover:border-white hover:bg-black hover:text-[#c5f018] md:mt-0 md:text-lg"
            >
              {exploreCard.ctaLabel}
              <svg
                width="16" height="16" viewBox="0 0 16 16"
                fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3V11"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}