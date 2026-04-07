"use client";

import { useRef } from "react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import { motion, useInView } from "motion/react";
import Link from "next/link";

export interface ImpactData {
  badge: string;
  heading: string;
  headingAccent: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  image: {
    url: string;
    alt: string;
  };
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

const FALLBACK_BODY = {
  root: {
    type: "root",
    children: [
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "Across government, financial systems, healthcare, and research, the issue is rarely the absence of data or regulation.",
          },
        ],
      },
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "The challenge is making both usable—through systems that support decision-making, enable collaboration, and maintain control within regulated environments.",
          },
        ],
      },
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            version: 1,
            text: "Effective infrastructure does more than meet compliance requirements. It enables organisations to operate with confidence, adapt to change, and maintain trust across institutional boundaries.",
          },
        ],
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  },
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FALLBACK: ImpactData = {
  badge: "Impact",
  heading: "This Matters",
  headingAccent: "Why",
  primaryCtaLabel: "Let's Connect",
  primaryCtaHref: "/contact",
  image: {
    url: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Digital globe with financial data",
  },
  body: FALLBACK_BODY,
};

export function ImpactSection({ data }: { data?: ImpactData | null }) {
  const d = data ?? FALLBACK;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      ref={ref}
      className="mx-auto max-w-8xl px-4 py-10 md:px-4 lg:px-4 bg-black"
    >
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 items-stretch">

        {/* Left — Image */}
        <motion.div
          className="lg:w-[42%] shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <div
            className="w-full h-64 lg:h-full min-h-[320px] bg-cover bg-center"
            style={{
              backgroundImage: `url('${d.image.url}')`,
              borderRadius: "10px",
            }}
            role="img"
            aria-label={d.image.alt}
          />
        </motion.div>

        {/* Right — Content */}
        <motion.div
          className="lg:w-[58%] flex flex-col justify-center px-0 lg:pl-14 pt-8 lg:pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
        >
          {/* Badge */}
          <div className="mb-4 flex items-center gap-2 text-zinc-300">
            <span
              className="h-2 w-2 rounded-full bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm md:text-lg">{d.badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-light leading-tight text-white md:text-5xl mb-5">
            <span className="text-[#c5f018] font-bold">{d.headingAccent} </span>
            {d.heading}
          </h2>

          {/* Body */}
          <div className="text-sm leading-relaxed text-white md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0">
            <LexicalRenderer data={d.body} />
          </div>

          {/* CTA */}
          <div className="flex flex-row gap-3 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="flex-1 sm:flex-none"
            >
              <Link
                href={d.primaryCtaHref}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c5f018] px-3 py-3 text-sm font-semibold text-black transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:border-1 hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
              >
                {d.primaryCtaLabel}
              <ArrowIcon />
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}