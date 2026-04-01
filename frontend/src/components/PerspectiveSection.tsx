"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import type { PerspectiveData, PerspectiveImage } from "@/lib/perspective";

const FALLBACK_IMAGES: PerspectiveImage[] = [
  {
    url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Team collaboration",
  },
  {
    url: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Systems design",
  },
  {
    url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Infrastructure",
  },
];

const FALLBACK: PerspectiveData = {
  badge: "Perspective",
  heading: "Designing Systems",
  headingLight: "That Work in Practice",
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
              text: "Addressing the gap between policy, systems, and real-world use requires more than technology.",
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
              text: "It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.",
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
  ctaLabel: "Explore Insights",
  ctaHref: "/myinsights",
  ctaLabel2: "Learn More",
  ctaHref2: "/about",
  images: FALLBACK_IMAGES,
};

// Stacked positions for up to 3 images [top-left, middle, bottom-right]
const STACK_POSITIONS = [
  { startLeft: 30, endLeft: 0, startTop: 30, endTop: 0 },
  { startLeft: 33, endLeft: 15, startTop: 33, endTop: 22 },
  { startLeft: 36, endLeft: 38, startTop: 36, endTop: 45 },
];

function StackedImages({ images }: { images: PerspectiveImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lerp = (a: number, b: number) => a + (b - a) * progress;

  const displayImages = images.length ? images.slice(0, 3) : FALLBACK_IMAGES;

  return (
    <div ref={ref} className="relative w-full h-[400px] lg:h-[450px]">
      {displayImages.map((img, i) => {
        const pos = STACK_POSITIONS[i];
        return (
          <div
            key={i}
            className="absolute bg-cover bg-center"
            style={{
              backgroundImage: `url('${img.url}')`,
              width: "50%",
              height: "45%",
              left: `${lerp(pos.startLeft, pos.endLeft)}%`,
              top: `${lerp(pos.startTop, pos.endTop)}%`,
              zIndex: (i + 1) * 5,
              borderRadius: "10px",
            }}
            aria-label={img.alt}
          />
        );
      })}
    </div>
  );
}

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Star SVG used in the divider */
const StarIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 0L9.6 6.4L16 8L9.6 9.6L8 16L6.4 9.6L0 8L6.4 6.4L8 0Z"
      fill="currentColor"
    />
  </svg>
);

function BottomDivider() {
  return (
    <div className="mt-12 flex items-center gap-3">
      <div className="h-px w-full lg:w-120 lg:w-140 bg-zinc-700" />
      <span className="text-4xl font-semibold text-[#c5f018]">✳</span>
    </div>
  );
}

export function PerspectiveSection({
  data,
}: {
  data?: PerspectiveData | null;
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
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-8xl justify-center px-4 py-8 md:px-4 lg:px-4 bg-black"
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="mb-10 lg:w-1/2">
          {/* Badge */}
          <div
            className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300"
            style={{
              opacity: 0,
              animation: visible ? "fadeUp 2s forwards" : "none",
            }}
          >
            <span
              className="h-2 w-2 rounded-full bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm md:text-lg">{d.badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-light leading-tight text-white md:text-5xl">
            <span className="font-light ">Where </span>
            <span className="font-bold text-[#c5f018]">Policy</span>{" "}
            <span className="font-light ">,Systems and Operations Meet</span>
          </h2>

          {/* Body */}
          <div className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0">
            <LexicalRenderer data={d.body} />
          </div>

          {/* CTA Buttons */}
          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{
              opacity: 0,
              animation: visible ? "fadeUp 2s forwards" : "none",
            }}
          >
            <Link
              href={d.ctaHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-6 py-5 text-lg font-semibold text-black transition duration-500 hover:-translate-y-[1px] hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
            >
              {d.ctaLabel}
              <ArrowIcon />
            </Link>
            <Link
              href={d.ctaHref2}
              className="inline-flex items-center gap-2 rounded-lg border border-lime-400/70 bg-transparent px-6 py-5 text-lg font-semibold text-lime-300 transition duration-500 hover:-translate-y-[1px] hover:bg-[#CCFF00] hover:text-black"
            >
              {d.ctaLabel2}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2">
          <StackedImages images={d.images} />
        </div>
      </div>

      {/* Bottom Divider with Stars */}
      <BottomDivider />
    </section>
  );
}