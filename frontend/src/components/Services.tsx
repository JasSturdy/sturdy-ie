"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LexicalRenderer } from "@/components/LexicalRenderer";
import {
  type ChallengeCard,
  type ChallengeData,
} from "@/lib/challenge";

const svgProps = {
  width: "100%" as const,
  height: "100%" as const,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconFragmented = (
  <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100 10 L180 50 L160 170 Q100 230 40 170 L20 50 Z"
      fill="none"
      stroke="black"
      strokeWidth="10"
      strokeLinejoin="round"
    />
    <path
      d="M105 20 L115 60 L90 95 L110 130 L95 180"
      fill="none"
      stroke="black"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconServer = (
  <svg {...svgProps}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const IconNetwork = (
  <svg {...svgProps} aria-hidden>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const IconShieldCheck = (
  <svg {...svgProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ICONS: Record<ChallengeCard["icon"], React.ReactNode> = {
  fragmented: IconFragmented,
  server: IconServer,
  network: IconNetwork,
  shieldCheck: IconShieldCheck,
  shield: (
    <svg {...svgProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  layers: (
    <svg {...svgProps}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  ),
  activity: (
    <svg {...svgProps}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  globe: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a14.8 14.8 0 0 1 0 20 14.8 14.8 0 0 1 0-20" />
    </svg>
  ),
};

function ServiceCard({
  item,
  index,
  total,
  scrollYProgress,
  isMobile,
}: {
  item: ChallengeCard;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isMobile: boolean;
}) {
  const revealStart = index / total;
  const revealEnd   = revealStart + 0.5 / total;
  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  const x       = useTransform(scrollYProgress, [revealStart, revealEnd], [72, 0]);

  return (
    <motion.div
      style={isMobile ? {} : { opacity, x }}
      className="group flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8 rounded-lg md:rounded-2xl border border-[#677f06] p-6 md:p-0"
    >
      <div className="flex-shrink-0 flex h-14 w-14 md:h-45 md:w-40 items-center justify-center rounded-xl md:rounded-l-2xl md:rounded-r-none bg-[#c5f018] text-black">
        <div className="w-10 h-10 md:w-23 md:h-23">
          {ICONS[item.icon] ?? ICONS.fragmented}
        </div>
      </div>
      <div className="space-y-2 md:space-y-4 text-center md:text-left md:px-0 md:pb-0">
        <h3 className="md:text-2xl text-base font-medium text-white">{item.title}</h3>
        <p className="md:text-sm text-xs leading-relaxed text-white">{item.body}</p>
      </div>
    </motion.div>
  );
}

export function ServicesSection({ data }: { data?: ChallengeData | null }) {
  const total = data?.cards.length ?? 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const gradientOpacity = useTransform(scrollYProgress, [1 / (total || 1), 1], [0, 1]);

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      style={{ height: isMobile ? "auto" : `${100 * (total + 1)}vh` }}
    >
      <div className={isMobile ? "" : "sticky top-0 h-fit mb-8 overflow-hidden"}>
        {!isMobile && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: gradientOpacity,
              background:
                "radial-gradient(ellipse at 50% 90%, rgba(152, 209, 47, 0.65) 30%, rgba(99, 135, 35, 0.35) 50%, transparent 70%)",
            }}
          />
        )}

        <div className="relative h-full mx-auto max-w-8xl py-2 md:py-12 lg:py-12 px-4 sm:px-8 md:px-4 lg:px-0 flex items-center">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full">

            {/* Left column */}
            <div className="w-full lg:w-1/2">
              <div className="mb-4 flex items-center gap-2 text-white">
                <span
                  className="h-2 w-2 rounded-full bg-[#c5f018]"
                  style={{ animation: "dotPulse 1s ease-in-out infinite" }}
                />
                <span className="text-sm md:text-lg">Challenges</span>
              </div>

              <h2 className="text-2xl font-bold leading-tight text-[#c5f018] md:text-5xl">
                {data.heading}{" "}
                <span className="font-light text-white">{data.headingLight}</span>
              </h2>

              <div className="mt-4 max-w-xl text-sm leading-relaxed text-white md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0">
                <LexicalRenderer data={data.body} />
              </div>

              <div
                className="mt-8 h-64 w-full rounded-2xl bg-cover bg-center sm:h-80 lg:mt-10 lg:h-[420px]"
                style={{ backgroundImage: `url('${data.imageUrl}')` }}
              />

              {data.imageCaption ? (
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white md:text-base">
                  {data.imageCaption}
                </p>
              ) : null}
            </div>

            <div className="w-full lg:w-1/2 space-y-4">
              {data.cards.map((item, index) => (
                <ServiceCard
                  key={item.title}
                  item={item}
                  index={index}
                  total={total}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}