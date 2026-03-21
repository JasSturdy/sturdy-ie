"use client";

import type { ReactNode } from "react";
import { useRef} from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

const iconProps = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconResearch() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M14.5 2H17a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.5" />
      <path d="M9.5 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2.5" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
      <path d="M12 2v20" />
    </svg>
  );
}

function IconHealth() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconInstitutional() {
  return (
    <svg {...iconProps} aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

type Pillar = {
  body: ReactNode;
  title: string;
  featured: boolean;
  bars: number;
  icon: ReactNode;
};

const INNOVATION_PILLARS: Pillar[] = [
  {
    title: "Governance by Design",
    featured: false,
    bars: 1,
    body: "Embedding policy and control into system architecture",
    icon: <IconResearch />,
  },
  {
    title: "Standards-Led Infrastructure",
    featured: true,
    bars: 2,
    body: "Aligning systems with regulatory frameworks",
    icon: <IconHealth />,
  },
  {
    title: "Institutional Collaboration",
    featured: false,
    bars: 3,
    body: "Enabling trusted data exchange across organisations",
    icon: <IconInstitutional />,
  },
];

function InnovationCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const isSideCard = index === 0 || index === 2;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 72 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 72 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border border-zinc-800/80 p-8 md:p-12 ${
        pillar.featured
          ? "bg-gradient-to-b from-[#4a6b00] to-[#1a2800] shadow-lg shadow-black/20"
          : "bg-zinc-900/90"
      }`}
    >
      {/* Top row: Expertise-style icon + Ventures-style bar accent */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }
          }
          transition={{
            duration: 0.55,
            delay: isSideCard ? 0.12 : 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c5f018]/70 bg-[#c5f018]/10 text-[#c5f018] md:h-16 md:w-16"
          aria-hidden
        >
          <div className="h-7 w-7 md:h-8 md:w-8">{pillar.icon}</div>
        </motion.div>
        <div className="flex gap-1 pt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-7 w-[3px] rounded-full ${
                i <= pillar.bars ? "bg-[#c5f018]" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10" />

      <motion.div
        className="pt-8"
        initial={{ opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{
          duration: 0.6,
          delay: 0.18 + index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3 className="text-2xl font-light leading-snug text-white md:text-3xl lg:text-4xl">
          {pillar.title}
        </h3>
        <p className="mt-4 text-xs leading-relaxed text-white md:text-sm">
          {pillar.body}
        </p>
      </motion.div>
    </motion.article>
  );
}

export function Innovation() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  return (
    <section className="relative mx-auto flex max-w-8xl flex-col px-4 py-8 md:px-4 md:py-24 lg:px-4">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="space-y-5"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-sm bg-[#c5f018]"
            style={{ animation: "dotPulse 1s ease-in-out infinite" }}
          />
          <span className="text-lg text-white">Response</span>
        </div>
        <h2 className="text-3xl leading-tight text-white md:text-6xl">
          Designing Systems That {" "}
          <span className="font-semibold text-[#c5f018]">
            Work in Practice
          </span>
        </h2>
        <div className="max-w-8xl space-y-4 text-lg text-zinc-300">
          <p>
            Addressing the gap between policy, systems, and real-world use requires more than technology.
          </p>
          <p>
            It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.
          </p>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INNOVATION_PILLARS.map((pillar, index) => (
          <InnovationCard key={pillar.title} pillar={pillar} index={index} />
        ))}
      </div>
    </section>
  );
}
