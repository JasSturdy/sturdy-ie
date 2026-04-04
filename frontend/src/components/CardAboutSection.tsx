"use client";

import type { ReactNode } from "react";

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

import type { CardAboutIcon } from "@/lib/cardAbout";

const CARDS: {
  icon: CardAboutIcon;
  line1: string;
  line2: string;
  description: string;
}[] = [
  {
    icon: "governance",
    line1: "Data Governance",
    line2: "& Compliance",
    description: "Translating regulatory requirements into operational systems and controls.",
  },
  {
    icon: "security",
    line1: "Security",
    line2: "Architecture",
    description: "Designing environments with built-in control, access management, and resilience.",
  },
  {
    icon: "infrastructure",
    line1: "Data",
    line2: "Infrastructure",
    description: "Building platforms that perform reliably in regulated and mission-critical settings.",
  },
  {
    icon: "operating",
    line1: "Operating",
    line2: "Models & Delivery",
    description: "Designing systems for adoption, usability, and long-term sustainability.",
  },
  {
    icon: "regulatory",
    line1: "Standards &",
    line2: "Interoperability",
    description: "Enabling secure, structured data exchange across systems and organisations.",
  },
  {
    icon: "collaboration",
    line1: "Resilience &",
    line2: "System Integrity",
    description: "Ensuring systems operate reliably under real-world conditions.",
  },
];

const ICON_MAP: Record<CardAboutIcon, ReactNode> = {
  governance:     <IconGovernance />,
  security:       <IconSecurity />,
  infrastructure: <IconInfrastructure />,
  operating:      <IconOperating />,
  regulatory:     <IconRegulatory />,
  collaboration:  <IconCollaboration />,
};

export function CardAboutSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-8xl px-6 py-16 md:px-10 md:py-20 lg:px-0">
        {/* Badge */}
        <div className="mb-4 flex items-center justify-center gap-2 text-zinc-300">
          <span
            className="h-2 w-2 rounded-full bg-[#c5f018]"
            style={{ animation: "dotPulse 1s ease-in-out infinite" }}
          />
          <span className="text-sm md:text-lg">Focus</span>
        </div>

        {/* Heading */}
        <h2 className="mb-12 text-center text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          <span className="text-[#c5f018]">Core </span>
          Areas of Focus
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={`${card.line1}-${card.line2}`}
              className="flex flex-col gap-4 rounded-2xl bg-zinc-800/80 p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c5f018]/50 bg-[#c5f018]/10 p-3 text-[#c5f018]">
                {ICON_MAP[card.icon] ?? ICON_MAP.governance}
              </div>
              <h3 className="text-xl font-light leading-tight text-white md:text-2xl lg:text-3xl">
                {card.line1}
                <br />
                {card.line2}
              </h3>
              <p className="text-sm leading-relaxed text-white">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}