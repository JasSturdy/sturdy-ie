"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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

function IconGovernance() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconInfrastructure() {
  return (
    <svg {...iconProps} aria-hidden>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function IconCollaboration() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconInteroperability() {
  return (
    <svg {...iconProps} aria-hidden>
      {/* Bidirectional exchange: right arrow (top) + left arrow (bottom) */}
      <path d="M7 9h9" />
      <path d="m14 6 3 3-3 3" />
      <path d="M17 15H8" />
      <path d="m10 18-3-3 3-3" />
    </svg>
  );
}

type ExpertiseItem = {
  title: string;
  body: string;
  icon: ReactNode;
};

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: "Governance Complexity",
    body: "Turning policy into operational systems",
    icon: <IconGovernance />,
  },
  {
    title: "Sovereign Data Infrastructure",
    body: "Control, resilience, and long-term integrity",
    icon: <IconInfrastructure />,
  },
  {
    title: "Secure Collaboration",
    body: "Trusted data sharing across organisations",
    icon: <IconCollaboration />,
  },
  {
    title: "Interoperability & Data Exchange",
    body: "Standards-based, secure data flows",
    icon: <IconInteroperability />,
  },
];

export function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="px-4 py-8 sm:px-8 md:px-0 md:py-16"
      style={{
        opacity: visible ? undefined : 0,
        animation: visible ? 'fadeUp 2s forwards' : 'none',
      }}
    >
      <style>{`
        @keyframes slideUpReveal {
          from { opacity: 0; transform: translateY(80px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto max-w-8xl md:px-4 lg:px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">

          {/* Left */}
          <div className="w-full lg:w-1/2">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="h-2 w-2 rounded-full bg-[#c5f018]"
                style={{ animation: 'dotPulse 1s ease-in-out infinite' }} />
              <span className="text-sm md:text-lg">Challenge</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight text-[#c5f018]">
              Governance-led{" "}
              <span className="text-white font-light">
                transformation in regulated ecosystems
              </span>
            </h2>

            <p
              className="text-sm leading-relaxed text-white md:text-base"
              style={{
                opacity: 0,
                animation: visible ? 'fadeUp 1.5s ease-out 0.4s forwards' : 'none',
              }}
            >
              Across regulated environments, the challenge is not technology.
              <br/>It is aligning governance, systems, and operations so data can be used in practice.
            </p>

            <div className="mt-10 grid gap-4 grid-cols-2">
              {EXPERTISE_ITEMS.map((item, i) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-800/80 px-4 sm:px-6 py-6"
                  style={{
                    opacity: 0,
                    animation: visible ? `fadeUp 1.5s ease-out ${0.2 + i * 0.3}s forwards` : 'none',
                  }}
                >
                  <div
                    className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c5f018]/70 bg-[#c5f018]/10 text-[#c5f018] sm:h-14 sm:w-14"
                    aria-hidden
                  >
                    <div className="h-5 w-5 sm:h-7 sm:w-7">{item.icon}</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div
              className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              style={{
                opacity: 0,
                animation: visible ? 'slideUpReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards' : 'none',
              }}
            >
              <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[700px] w-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center" />
            </div>

            <p
              className="text-sm leading-relaxed text-white md:text-base"
              style={{
                opacity: 0,
                animation: visible ? 'fadeUp 1.5s ease-out 0.4s forwards' : 'none',
              }}
            >
              Executive delivery across public sector, financial services, and health systems
            </p>

            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c5f018] bg-transparent px-6 py-4 text-sm md:text-base font-semibold text-[#c5f018] transition duration-500 hover:bg-[#c5f018] hover:text-black"
              style={{
                opacity: 0,
                animation: visible ? 'fadeUp 1.5s ease-out 0.6s forwards' : 'none',
              }}
            >
              Explore My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}