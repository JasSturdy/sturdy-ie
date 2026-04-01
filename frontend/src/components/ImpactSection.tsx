"use client";

import { useEffect, useRef, useState } from "react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
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
            text: "Across government, financial systems, healthcare, and research, the issue is rarely a lack of data or regulation. Both already exist.",
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
            text: "The problem is that data is difficult to use, and regulatory intent is hard to translate into systems that work in practice. Too much effort is spent working around systems rather than benefiting from them.",
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
            text: "My work focuses on aligning data, policy, and infrastructure so organisations can operate with clarity, confidence, and control. This enables better decision-making, stronger oversight, and more effective collaboration across institutions.",
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

const FALLBACK: ImpactData = {
  badge: "Impact",
  heading: "This Matters",
  headingAccent: "Why",
  image: {
    url: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Digital globe with financial data",
  },
  body: FALLBACK_BODY,
};

export function ImpactSection({ data }: { data?: ImpactData | null }) {
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
    <section
      ref={ref}
      className="mx-auto max-w-8xl px-4 py-10 md:px-4 lg:px-4 bg-black"
    >
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 items-stretch">

        {/* Left — Image */}
        <div
          className="lg:w-[42%] shrink-0"
          style={{
            opacity: 0,
            animation: visible ? "fadeUp 1.2s 0.1s forwards" : "none",
          }}
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
        </div>

        {/* Right — Content */}
        <div
          className="lg:w-[58%] flex flex-col justify-center px-0 lg:pl-14 pt-8 lg:pt-0"
          style={{
            opacity: 0,
            animation: visible ? "fadeUp 1.2s 0.25s forwards" : "none",
          }}
        >
          {/* Badge */}
          <div className="mb-4 flex items-center gap-2 text-zinc-300">
            <span
              className="h-2 w-2 rounded-full bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm md:text-lg">{d.badge}</span>
          </div>

          {/* Heading — accent word first then white */}
          <h2 className="text-2xl font-light leading-tight text-white md:text-5xl mb-5">
            <span className="text-[#c5f018] font-bold">{d.headingAccent} </span>
            {d.heading}
          </h2>

          {/* Body */}
          <div className="text-sm leading-relaxed text-white md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0">
            <LexicalRenderer data={d.body} />
          </div>
        </div>
      </div>
    </section>
  );
}