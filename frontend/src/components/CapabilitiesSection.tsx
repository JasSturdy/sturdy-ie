"use client";

import { useEffect, useRef, useState } from "react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import type { IndustriesData, IndustryCard } from "@/lib/industries";

//Fallback

const FALLBACK: IndustriesData = {
  sectionLabel: "Industries",
  headingRegular: "Operating Across",
  headingAccent: "Regulated",
  headingLight: "Environments",
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
              text: "Across public sector, financial services, healthcare, and critical infrastructure environments, organisations operate under increasing regulatory expectations while managing complex data systems.",
              version: 1,
            },
          ],
        },
        {
          type: "paragraph",
          version: 1,
          children: [
            {
              type: "text",
              text: "The challenge is not a lack of data or policy. It is making both work together in practice.",
              version: 1,
            },
          ],
        },
        {
          type: "paragraph",
          version: 1,
          children: [
            {
              type: "text",
              text: "My work focuses on bridging that gap, designing systems and operating models that align governance, infrastructure, and real-world use.",
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
      title: "Healthcare & Medical",
      description:
        "Clinical, research, and population health data infrastructure",
      imageUrl:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Financial Services",
      description:
        "Digital environments enabling collaboration across research and health institutions",
      imageUrl:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Government & Public",
      description:
        "Policy implementation, national infrastructure, and governance",
      imageUrl:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Defence",
      description: "Secure, resilient systems in mission-critical environments",
      imageUrl:
        "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],
};

function CardInterior({ card, index }: { card: IndustryCard; index: number }) {
  const { title, description } = card;
  const isAlt = index % 2 !== 0;

  return (
    <div className="relative z-[1] mt-auto w-full transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px]">
      <div
        className={`px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4 min-h-[100px] max-h-[100px] md:min-h-[190px] md:max-h-[210px] lg:min-h-[210px] lg:max-h-[210px] ${
          isAlt
            ? "border-l-4 border-[#c5f018] bg-white"
            : "border-t-2 border-[#c5f018]/70 bg-zinc-950/80"
        }`}
      >
        <p
          className={`mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] sm:text-xs ${
            isAlt ? "text-[#c5f018]" : "text-[#c5f018]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={`mb-3 text-sm font-semibold leading-snug sm:text-base md:text-2xl [overflow-wrap:anywhere] ${
            isAlt ? "text-black" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-[0.7rem] leading-relaxed sm:text-xs md:text-sm [overflow-wrap:anywhere] ${
            isAlt ? "text-black" : "text-zinc-300"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function CapabilitiesSection({
  data,
}: {
  data?: IndustriesData | null;
}) {
  const d = data ?? FALLBACK;

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
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mx-auto max-w-8xl py-8 md:py-12 lg:py-16">
      <div
        className="mb-10 grid grid-cols-1 gap-4 md:mb-12 lg:grid-cols-2 lg:gap-12 lg:mb-12"
        style={{
          opacity: visible ? undefined : 0,
          animation: visible ? "fadeUp 1s ease forwards" : "none",
        }}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-sm bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm text-white md:text-lg">
              {d.sectionLabel}
            </span>
          </div>
          <h2 className="text-2xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            {/*<span className="text-[#c5f018]">Operating</span>
            {" Across"}
            <br />*/}
            <span className="text-[#c5f018]"> {d.headingAccent} </span>
            {d.headingRegular}{" "}
            <span className="font-light text-white">{d.headingLight}</span>
          </h2>
        </div>

        <div className="flex items-end text-[0.95rem] leading-snug text-white [&_p]:text-sm [&_p]:md:text-base [&_p]:mb-0 [&_p]:leading-snug">
          <LexicalRenderer data={d.body} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {d.cards.map((card, index) => (
          <div
            key={card.title}
            className="group border border-white/15 transition-all duration-500 cursor-pointer hover:-translate-y-4"
            style={{
              opacity: visible ? undefined : 0,
              animation: visible ? "fadeUp 0.75s ease forwards" : "none",
              animationDelay: visible ? `${120 + index * 95}ms` : "0ms",
            }}
          >
            <article className="group/card relative w-full overflow-hidden bg-zinc-950/80 h-64 sm:h-80 md:h-96 lg:h-[28rem]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                style={{ backgroundImage: `url(${card.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="relative flex h-full min-h-0 flex-col justify-between p-4 sm:p-5">
                <CardInterior card={card} index={index} />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
