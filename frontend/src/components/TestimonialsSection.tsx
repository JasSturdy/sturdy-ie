"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import type { ChallengeIcon, ChallengePayload } from "@/lib/challengeAbout";

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
  return <svg {...iconBtnProps} aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
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

const ICON_MAP: Record<ChallengeIcon, ReactNode> = {
  trust: <IconTrust />,
  control: <IconControl />,
  standards: <IconStandards />,
  resilience: <IconResilience />,
};

export function TestimonialsSection({ badge, heading, headingAccent, body, challenges, exploreCard }: ChallengePayload) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section className="mx-auto mt-14 max-w-8xl px-4 py-16 sm:px-6 md:mt-20 md:px-10 md:py-24 lg:px-4">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">

        <div className="order-2 flex flex-col gap-6 lg:order-2">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm md:text-lg">{badge}</span>
          </div>

          {/* Heading */}
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl font-light text-white md:text-5xl lg:text-6xl"
          >
            <span className="font-bold text-[#c5f018]">{headingAccent} </span>
            <span className="text-white">{heading}</span>
          </motion.h2>

          <div className="text-sm leading-loose text-white md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0">
            <LexicalRenderer data={body} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {challenges.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl bg-zinc-800/80 p-7"
              >
                <div className="flex h-14 w-14 bg-[#c5f018]/10 border-1 border-[#c5f018]/50 items-center justify-center rounded-full p-3 text-[#c5f018]">
                  {ICON_MAP[c.icon] ?? ICON_MAP.trust}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white">{c.title}</h3>
                <div className="text-sm leading-relaxed text-white [&_p]:mb-0">
                  <LexicalRenderer data={c.body} />
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="order-1 flex flex-col gap-7 lg:order-1 lg:h-full lg:min-h-0">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-semibold text-[#c5f018]">✳</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-zinc-800 sm:h-80 lg:h-auto lg:min-h-[280px] lg:flex-1">
            {exploreCard.backgroundImage ? (
              <img
                src={exploreCard.backgroundImage}
                alt={exploreCard.heading}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : null}
          </div>

          <div className="text-sm leading-relaxed text-white md:text-base [&_p]:mb-0">
            <LexicalRenderer data={exploreCard.body} />
          </div>

          {/* CTA Buttons — size and hover animation matched to HeroSection */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:justify-start sm:gap-4">
            <Link
              href={exploreCard.ctaHref}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c5f018] px-4 py-3 text-base font-semibold text-black transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
            >
              {exploreCard.ctaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          {/* <Link
              href={exploreCard.ctaHref2}
              className="inline-flex items-center gap-2 rounded-lg border border-lime-400/70 bg-transparent px-6 py-5 text-lg font-semibold text-lime-300 transition duration-500 hover:-translate-y-[1px] hover:bg-[#CCFF00] hover:text-black"
            >
              {exploreCard.ctaLabel2}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link> */}
        </div>

      </div>
    </section>
  );
}