"use client";

import type { ReactNode } from "react";
import type { CardAboutData, CardAboutIcon } from "@/lib/cardAbout";
import Link from "next/link";

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

function IconGovernance() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconSecurity() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconInfrastructure() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}
function IconOperating() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconRegulatory() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconCollaboration() {
  return (
    <svg {...iconBtnProps} aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const ICON_MAP: Record<CardAboutIcon, ReactNode> = {
  governance: <IconGovernance />,
  security: <IconSecurity />,
  infrastructure: <IconInfrastructure />,
  operating: <IconOperating />,
  regulatory: <IconRegulatory />,
  collaboration: <IconCollaboration />,
};

const FALLBACK: CardAboutData = {
  badge: "Focus",
  headingAccent: "Core",
  heading: "Areas of Focus",
  primaryCtaLabel: "Read Leadership Papers",
  primaryCtaHref: "/leadership-papers",
  cards: [
    {
      icon: "governance",
      title: "Data Governance\n& Compliance",
      description: "Translating regulatory requirements into operational systems and controls.",
    },
    {
      icon: "security",
      title: "Security\nArchitecture",
      description: "Designing environments with built-in control, access management, and resilience.",
    },
    {
      icon: "infrastructure",
      title: "Data\nInfrastructure",
      description: "Building platforms that perform reliably in regulated and mission-critical settings.",
    },
    {
      icon: "operating",
      title: "Operating\nModels & Delivery",
      description: "Designing systems for adoption, usability, and long-term sustainability.",
    },
    {
      icon: "regulatory",
      title: "Standards &\nInteroperability",
      description: "Enabling secure, structured data exchange across systems and organisations.",
    },
    {
      icon: "collaboration",
      title: "Resilience &\nSystem Integrity",
      description: "Ensuring systems operate reliably under real-world conditions.",
    },
  ],
};

export function CardAboutSection({ data }: { data?: CardAboutData | null }) {
  const d = data ?? FALLBACK;

  return (
    <section className="">
      <div className="mx-auto max-w-8xl px-6 py-16 md:px-10 md:py-20 lg:px-0">
        {/* Badge */}
        <div className="mb-4 flex items-center justify-center gap-2 text-zinc-300">
          <span
            className="h-2 w-2 rounded-full bg-[#c5f018]"
            style={{ animation: "dotPulse 1s ease-in-out infinite" }}
          />
          <span className="text-sm md:text-lg">{d.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="mb-12 text-center text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          <span className="text-[#c5f018] font-semibold">{d.headingAccent} </span>
          {d.heading}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {d.cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 rounded-2xl bg-zinc-800/80 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c5f018]/50 bg-[#c5f018]/10 p-3 text-[#c5f018]">
                {ICON_MAP[card.icon] ?? ICON_MAP.governance}
              </div>
              <h3 className="text-xl font-light leading-tight text-white md:text-2xl lg:text-3xl whitespace-pre-line">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-white">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-12 flex justify-center px-1 sm:mt-10 sm:px-0">
          <Link
            href={d.primaryCtaHref}
            className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-6 py-3.5 text-base font-semibold text-black transition duration-500 hover:-translate-y-[1px] hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00] sm:w-auto sm:max-w-none sm:px-6 sm:py-5 sm:text-lg"
          >
            {d.primaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}