"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { StandardsData, StandardsCard } from "@/lib/standards";
import { LexicalRenderer } from "./LexicalRenderer";

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

const ICONS: Record<StandardsCard["icon"], React.ReactNode> = {
  "data-governance": (
    <svg {...strokeIcon} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  "security-architecture": (
    <svg {...strokeIcon} aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "regulatory-systems": (
    <svg {...strokeIcon} aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  ),
  "institutional-infrastructure": (
    <svg {...strokeIcon} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  health: (
    <svg {...strokeIcon} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M12 12v5" />
      <path d="M9.5 14.5l2.5-2.5 2.5 2.5" />
    </svg>
  ),
  research: (
    <svg {...strokeIcon} aria-hidden>
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
    </svg>
  ),
  financial: (
    <svg {...strokeIcon} aria-hidden>
      <path d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14" />
    </svg>
  ),
  "european-data": (
    <svg {...strokeIcon} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M6 6.5l4 4" />
      <path d="M18 6.5l-4 4" />
      <path d="M6 17.5l4-4" />
      <path d="M18 17.5l-4-4" />
    </svg>
  ),
};

const FALLBACK: StandardsData = {
  badge: "Standards",
  heading: "Standards,",
  headingAccent: "Frameworks & Ecosystems",
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
              text: "Operating within established standards and regulatory frameworks to ensure governance, interoperability, security, and trust across complex environments.",
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
      slug: "data-protection-privacy",
      title: "Data Protection & Privacy",
      tagline: "GDPR, data governance, and lawful processing frameworks",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
      icon: "data-governance",
    },
    {
      slug: "security-resilience-frameworks",
      title: "Security & Resilience Frameworks",
      tagline: "NIS2, DORA, and operational resilience standards",
      imageUrl: "/profile-security-digital-lock.png",
      icon: "security-architecture",
    },
    {
      slug: "ai-governance-regulation",
      title: "AI Governance & Regulation",
      tagline: "EU AI Act, model risk, and responsible AI systems",
      imageUrl:
        "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=900&auto=format&fit=crop&q=80",
      icon: "regulatory-systems",
    },
    {
      slug: "data-standards-interoperability",
      title: "Data Standards & Interoperability",
      tagline: "FAIR principles, data quality, and exchange frameworks",
      imageUrl:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=900",
      icon: "institutional-infrastructure",
    },
    {
      slug: "health-clinical-standards",
      title: "Health & Clinical Standards",
      tagline: "HL7, FHIR, openEHR, and clinical interoperability",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80",
      icon: "health",
    },
    {
      slug: "research-analytical-models",
      title: "Research & Analytical Models",
      tagline: "OMOP, CDISC, and structured research data models",
      imageUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80",
      icon: "research",
    },
    {
      slug: "financial-regulatory-systems",
      title: "Financial & Regulatory Systems",
      tagline:
        "Risk, reporting, and compliance in regulated financial environments",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&auto=format&fit=crop&q=80",
      icon: "financial",
    },
    {
      slug: "european-data-ecosystems",
      title: "European Data Ecosystems",
      tagline: "GAIA-X, EOSC, and cross-border data collaboration",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
      icon: "european-data",
    },
  ],
};

function FocusCard({
  card,
  index,
}: {
  card: StandardsCard;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.65,
        delay: 0.08 * Math.min(index, 3),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative shrink-0"
      style={{ flex: "0 0 clamp(220px, 24vw, 320px)" }}
    >
      <div className="relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[1.5rem] border border-zinc-800/80 border-l-[3px] border-l-[#c5f018]/85 bg-gradient-to-b from-zinc-900/95 via-zinc-950 to-black p-5 shadow-[0_4px_28px_rgba(0,0,0,0.45)] ring-1 ring-inset ring-white/[0.05] transition-all duration-500 ease-out before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(197,240,24,0.09),transparent_55%)] after:pointer-events-none after:absolute after:inset-0 after:opacity-[0.22] after:[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] after:bg-[length:22px_22px] hover:-translate-y-2 hover:border-zinc-600/70 hover:border-l-[#c5f018] hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.72),0_0_48px_-12px_rgba(197,240,24,0.14)] hover:ring-[#c5f018]/10 md:p-6">
        <div className="relative z-[1] flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c5f018]/45 bg-[#c5f018]/10 text-[#c5f018] shadow-[0_0_24px_-4px_rgba(197,240,24,0.35)] transition-all duration-500 group-hover:scale-110 group-hover:border-[#c5f018]/70 group-hover:bg-[#c5f018]/15 group-hover:shadow-[0_0_28px_-2px_rgba(197,240,24,0.45)] md:h-[3.25rem] md:w-[3.25rem]"
            aria-hidden
          >
            <div className="h-[1.35rem] w-[1.35rem] md:h-7 md:w-7">
              {ICONS[card.icon] ?? ICONS["data-governance"]}
            </div>
          </div>

          <span className="rounded-full border border-zinc-600/50 bg-zinc-900/90 px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-300 group-hover:border-[#c5f018]/35 group-hover:text-[#c5f018] md:text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="relative z-[1] mt-auto flex flex-col pt-8 md:pt-10">
          <div className="mb-4 h-px w-full bg-gradient-to-r from-[#c5f018]/25 via-zinc-700/60 to-transparent md:mb-5" aria-hidden />
          <h3 className="text-xl font-light leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#f4ffc9] md:text-2xl">
            {card.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 md:text-[0.95rem]">
            {card.tagline}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function ProfileSection({ data }: { data?: StandardsData | null }) {
  const d = data ?? FALLBACK;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section
      id="profile"
      className="mx-auto overflow-visible max-w-8xl px-4 py-16 md:px-4 md:py-24 lg:px-4 bg-[radial-gradient(ellipse_80%_80%_at_50%_60%,rgba(197,240,24,0.55)_0%,rgba(160,210,0,0.55)_20%,transparent_65%)]"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex items-center justify-center gap-2 py-4"
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[#c5f018]"
          style={{ animation: "dotPulse 1s ease-in-out infinite" }}
        />
        <span className="text-sm text-white md:text-lg">{d.badge}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        className="text-center text-2xl font-light leading-tight text-white md:text-6xl"
      >
        <span className="text-white">{d.heading} </span>
        <span className="text-white">{d.headingAccent}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <div className="mx-auto mt-6 max-w-4xl space-y-4 text-center text-sm leading-relaxed text-white md:text-lg">
          <LexicalRenderer data={d.body} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="mt-8 flex items-center justify-end gap-2 md:mt-16"
      >
        <span className="text-xs text-zinc-500 md:text-sm">
          
        </span>
      
      </motion.div>

      <div className="relative mt-4 overflow-hidden pt-4 md:mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black/20 to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black/20 to-transparent md:w-24" />

        <div className="marquee-track">
          <div className="marquee-group">
            {d.cards.map((card, index) => (
              <FocusCard key={`group-a-${card.slug}`} card={card} index={index} />
            ))}
          </div>

          <div className="marquee-group" aria-hidden="true">
            {d.cards.map((card, index) => (
              <FocusCard key={`group-b-${card.slug}`} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: profile-marquee 38s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-group {
          display: flex;
          gap: 1.5rem;
          flex-shrink: 0;
          padding-right: 1.5rem;
        }

        @keyframes profile-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}