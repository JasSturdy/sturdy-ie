"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ApplicationData, ApplicationCard } from "@/lib/application";
import { AiRegulationChipIcon } from "@/components/icons/AiRegulationChipIcon";
import { LexicalRenderer } from "./LexicalRenderer";
import Link from "next/link";

const strokeIcon = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<ApplicationCard["icon"], React.ReactNode> = {
  "data-governance": (
    <svg {...strokeIcon} aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "security-architecture": (
    <svg {...strokeIcon} aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "regulatory-systems": <AiRegulationChipIcon />,
  "institutional-infrastructure": (
    <svg {...strokeIcon} aria-hidden>
      <circle cx="5" cy="12" r="2.25" />
      <circle cx="19" cy="6" r="2.25" />
      <circle cx="19" cy="18" r="2.25" />
      <path d="M7 12h7.5l2.5-5.5M7 12h7.5l2.5 5.5" />
    </svg>
  ),
  health: <MedicalGlobeIcon />,
  research: (
    <svg {...strokeIcon} aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 16V10" />
      <path d="M12 16V6" />
      <path d="M17 16v-5" />
    </svg>
  ),
  financial: (
    <svg {...strokeIcon} aria-hidden>
      <path d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14" />
    </svg>
  ),
  "european-data": (
    <svg {...strokeIcon} aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function MedicalGlobeIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="30 30 140 140"
      xmlns="http://www.w3.org/2000/svg"

    >
      <defs>
        <radialGradient id="mgGlobeGrad" cx="20%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1e3012" />
          <stop offset="100%" stopColor="#080f05" />
        </radialGradient>
        <radialGradient id="mgGlowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c5f018" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c5f018" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mgGlobeClip">
          <circle cx="100" cy="100" r="71" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="90" fill="url(#mgGlowGrad)" />
      <circle cx="100" cy="100" r="71" fill="url(#mgGlobeGrad)" />

      <g
        clipPath="url(#mgGlobeClip)"
        fill="none"
        stroke="#c5f018"
        strokeOpacity="0.75"
        strokeWidth="3"
      >
        <ellipse cx="100" cy="100" rx="71" ry="22" />
        <ellipse cx="100" cy="100" rx="71" ry="62" />
        <ellipse cx="100" cy="100" rx="22" ry="71" />
        <line x1="100" y1="29" x2="100" y2="171" />
      </g>

      <circle
        cx="100"
        cy="100"
        r="71"
        fill="none"
        stroke="#c5f018"
        strokeWidth="3.5"
        strokeOpacity="3"
      />

      <circle
        cx="100"
        cy="100"
        r="27"
        fill="#0b1507"
        stroke="#c5f018"
        strokeWidth="1.6"
        strokeOpacity="0.7"
      />

      <rect x="91.5" y="83" width="17" height="34" rx="3.5" fill="#c5f018" />
      <rect x="83" y="91.5" width="34" height="17" rx="3.5" fill="#c5f018" />

      <rect x="94.5" y="83" width="4.5" height="34" rx="2" fill="#eaff6a" opacity="0.25" />
      <rect x="83" y="94.5" width="34" height="4.5" rx="2" fill="#eaff6a" opacity="0.25" />
    </svg>
  );
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function BarIcon({ bars }: { bars: number }) {
  return (
    <div className="flex gap-1 pt-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`h-6 w-[3px] ${i <= bars ? "bg-[#c5f018]" : "bg-zinc-600"}`}
        />
      ))}
    </div>
  );
}

const FALLBACK: ApplicationData = {
  badge: "Application",
  heading: "Applied Across",
  headingAccent: "Critical Environments",
  ctaLabel: "Explore Insights",
  ctaHref: "/my-insights",
  body: {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          version: 1,
          children: [
            {
              type: "text",
              text: "This infrastructure is designed to operate in environments where governance, security, and reliability are essential.",
              version: 1,
            },
          ],
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  },
  cards: [
    {
      slug: "research-platforms",
      title: "Research Platforms",
      tagline: "Supporting data-driven discovery and collaboration",
      imageUrl: "",
      icon: "research",
    },
    {
      slug: "health-data-infrastructure",
      title: "Health Data Infrastructure",
      tagline: "Secure, interoperable healthcare systems",
      imageUrl: "",
      icon: "health",
    },
    {
      slug: "data-ecosystems",
      title: "Data Ecosystems",
      tagline: "Trusted data exchange across organisations",
      imageUrl: "",
      icon: "data-governance",
    },
    {
      slug: "secure-systems",
      title: "Secure Systems",
      tagline: "Infrastructure designed for defence and critical operations",
      imageUrl: "",
      icon: "security-architecture",
    },
  ],
};

function FocusCard({
  card,
  index,
  sectionInView,
  active,
}: {
  card: ApplicationCard;
  index: number;
  sectionInView: boolean;
  active?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.55,
        delay: 0.08 * Math.min(index, 3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className="relative flex min-h-[200px] md:min-h-[400px] lg:min-h-[400px] flex-col justify-between rounded-2xl border p-6 md:p-12 transition-all duration-300"
        style={{
          backgroundColor: active ? "rgba(110, 143, 19, 0.55)" : "rgba(24,24,27,0.95)",
          borderColor: active ? "rgba(197,240,24,0.35)" : "rgba(63,63,70,0.8)",
        }}
      >
        {/* Top row: icon + bars */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 lg:h-16 lg:w-16"
            style={{
              borderColor: active ? "rgba(197,240,24,0.7)" : "rgba(197,240,24,0.4)",
              color: "#c5f018",
              backgroundColor: active ? "rgba(197,240,24,0.08)" : "transparent",
            }}
          >
            <div className="h-6 w-6 lg:h-10 lg:w-10">
              {ICONS[card.icon] ?? ICONS["data-governance"]}
            </div>
          </div>

          <BarIcon bars={Math.min(index + 1, 4)} />
        </div>

        {/* Bottom: title + divider + tagline */}
        <div className="mt-8 md:mt-10">
          <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl lg:text-3xl">
            {card.title}
          </h3>
          <div
            className="mt-2 md:mt-4 h-px w-full"
            style={{
              backgroundColor: active ? "rgba(197,240,24,0.2)" : "rgba(63,63,70,0.8)",
            }}
          />
          <p className="mt-6 text-sm leading-relaxed text-white md:text-[0.9rem]">
            {card.tagline}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function ApplicationSection({ data }: { data?: ApplicationData | null }) {
  const d = data ?? FALLBACK;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section
      ref={ref}
      id="profile"
      className="mx-auto max-w-8xl px-4 py-16 md:px-4 md:py-24 lg:px-4"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-2 mb-4"
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[#c5f018]"
          style={{ animation: "dotPulse 1s ease-in-out infinite" }}
        />
        <span className="text-sm text-white md:text-lg">{d.badge}</span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl"
      >
        {d.heading}{" "}
        <span className="font-bold text-[#c5f018]">{d.headingAccent}</span>
      </motion.h2>

      {/* Body + CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
      >
        <div className="max-w-4xl text-sm leading-relaxed text-white md:text-lg">
          <LexicalRenderer data={d.body} />
        </div>

        {d.ctaLabel && d.ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex sm:justify-center"
          >
            <a
              href={d.ctaHref}
              className="inline-flex items-center justify-center gap-2 text-lg md:text-xl rounded-lg border border-[#c5f018] bg-transparent px-6 py-4 text-sm font-semibold text-[#c5f018] transition duration-500 hover:bg-[#c5f018] hover:text-black w-full sm:w-auto"
            >
              {d.ctaLabel}
              <ArrowIcon />
            </a>
          </motion.div>
        )}
      </motion.div>

      {/* Cards — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {d.cards.map((card, index) => (
          <FocusCard
            key={card.slug}
            card={card}
            index={index}
            sectionInView={isInView}
            active={index === 1 || index === 3}
          />
        ))}
      </div>
    </section>
  );
}