"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import type { IndustriesData, IndustryCard } from "@/lib/industries";

/** Two-line headings for visual consistency across sector cards */
type IndustryCardWithHeadingLines = IndustryCard & {
  headingLines: [string, string];
};

const FALLBACK_CARDS: IndustryCardWithHeadingLines[] = [
  {
    title: "Healthcare & Medical",
    headingLines: ["Healthcare", "& Medical"],
    description:
      "Clinical systems, research environments, and population health data infrastructure.",
    imageUrl:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Financial Services",
    headingLines: ["Financial", "Services"],
    description:
      "Governed data systems supporting risk, compliance, reporting, and operational resilience.",
    imageUrl:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Government & Public Sector",
    headingLines: ["Government", "& Public Sector"],
    description:
      "Policy implementation, national infrastructure, and cross-agency governance.",
    imageUrl:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Defence Infrastructure",
    headingLines: ["Defence", "Infrastructure"],
    description:
      "Secure, resilient systems designed for mission-critical and sensitive environments.",
    imageUrl:
      "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function splitHeadingLines(title: string): [string, string] {
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function CardInterior({
  card,
  index,
}: {
  card: IndustryCardWithHeadingLines;
  index: number;
}) {
  const { headingLines, description } = card;
  const isAlt = index % 2 !== 0;

  return (
    <div className="relative z-[1] mt-auto w-full transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px]">
      <div
        className={`border-l-4 border-[#c5f018] px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4 min-h-[100px] max-h-[100px] md:min-h-[190px] md:max-h-[210px] lg:min-h-[210px] lg:max-h-[210px] ${
          isAlt ? "bg-white" : "bg-zinc-950/80"
        }`}
      >
        <p
          className={`mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] sm:text-xs ${
            isAlt ? "text-black" : "text-[#c5f018]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={`mb-3 text-sm font-semibold leading-tight sm:text-base md:text-2xl [overflow-wrap:anywhere] ${
            isAlt ? "text-black" : "text-white"
          }`}
        >
          <span className="block">{headingLines[0]}</span>
          <span className="block">{headingLines[1]}</span>
        </h3>
        <p
          className={`text-[0.7rem] leading-relaxed sm:text-xs md:text-sm [overflow-wrap:anywhere] ${
            isAlt ? "text-black" : "text-white"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function CapabilitiesSection({ data }: { data?: IndustriesData | null }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const ctaLabel = data?.ctaLabel;
  const ctaHref  = data?.ctaHref ?? "/case-studies";

  const cards: IndustryCardWithHeadingLines[] = data?.cards?.length
    ? data.cards.map((c) => ({
        ...c,
        headingLines: splitHeadingLines(c.title),
      }))
    : FALLBACK_CARDS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-8xl py-8 md:py-12 lg:py-16">
      <div
        className="mb-10 grid grid-cols-1 items-stretch gap-4 px-4 sm:px-6 lg:px-0 md:mb-12 lg:grid-cols-2 lg:gap-12 lg:mb-12"
        style={{
          opacity: visible ? undefined : 0,
          animation: visible ? "fadeUp 1s ease forwards" : "none",
        }}
      >
        <div className="flex h-full flex-col justify-start space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-sm bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm text-white md:text-lg">
              {data?.sectionLabel ?? "Industries"}
            </span>
          </div>
          <h2 className="text-2xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            <span className="font-bold text-[#c5f018]">
              {data?.headingAccent ?? "Operating Across"}
            </span>
            <br />
            {data?.headingRegular ?? "Regulated"}{" "}
            {data?.headingLight ?? "Environments"}
          </h2>
        </div>

        <div className="mt-6 flex h-full flex-col justify-start gap-8">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-white md:text-base">
            {data?.body && LexicalRenderer({ data: { root: data.body.root as any } })}
          </div>

          {ctaLabel && (
            <div
              style={{
                opacity: 0,
                animation: visible ? "fadeUp 0.75s ease forwards 600ms" : "none",
              }}
            >
              <Link
                href={ctaHref}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c5f018] px-3 py-3 text-sm font-semibold text-black transition duration-500 sm:w-auto sm:gap-2 sm:px-6 sm:py-4 sm:text-lg hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
              >
                {ctaLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-0">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="group border border-white/15 transition-all duration-500 cursor-pointer hover:-translate-y-4"
              style={{
                opacity: 0,
                animation: visible
                  ? `fadeUp 0.75s ease forwards ${120 + index * 95}ms`
                  : "none",
              }}
            >
              <article className="group/card relative w-full overflow-hidden bg-zinc-950/80 h-64 sm:h-80 md:h-96 lg:h-[28rem]">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                  style={{ backgroundImage: card.imageUrl ? `url("${card.imageUrl}")` : "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative flex h-full min-h-0 flex-col justify-between p-4 sm:p-5">
                  <CardInterior card={card} index={index} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}