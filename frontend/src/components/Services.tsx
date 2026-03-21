"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STANDARDS_ITEMS = [
  {
    title: "Sovereign Data Infrastructure",
    body: "Control, resilience, and jurisdictional integrity",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Secure Data Environments",
    body: "Governed access and controlled data usage",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </svg>
    ),
  },
  {
    title: "Cross-Institution Data Exchange",
    body: "Trusted collaboration across organisations",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Regulated Data Platforms",
    body: "Systems aligned to policy and operational use",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a14.8 14.8 0 0 1 0 20 14.8 14.8 0 0 1 0-20" />
      </svg>
    ),
  },
];

const total = STANDARDS_ITEMS.length;

function ServiceCard({
  item,
  index,
  scrollYProgress,
  isMobile,
}: {
  item: (typeof STANDARDS_ITEMS)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isMobile: boolean;
}) {
  const revealStart = index / total;
  const revealEnd = revealStart + 0.5 / total;

  const opacity = useTransform(scrollYProgress, [revealStart, revealEnd], [0, 1]);
  /* Reveal from right → left (was bottom → top via translateY) */
  const x = useTransform(scrollYProgress, [revealStart, revealEnd], [72, 0]);

  return (
    <motion.div
      style={isMobile ? {} : { opacity, x }}
      className="group flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-12 rounded-lg md:rounded-2xl border border-[#677f06] p-6 md:p-0"
    >
      <div className="flex-shrink-0 flex h-14 w-14 md:h-45 md:w-40 items-center justify-center rounded-xl md:rounded-l-2xl md:rounded-r-none bg-[#c5f018] text-black">
        <div className="w-7 h-7 md:w-14 md:h-14">{item.icon}</div>
      </div>
      <div className="space-y-2 md:space-y-4 text-center md:text-left md:px-0 md:pb-0">
        <h3 className="md:text-2xl text-base font-medium text-white">{item.title}</h3>
        <p className="md:text-sm text-xs leading-relaxed text-zinc-300">{item.body}</p>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
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

  const gradientOpacity = useTransform(
    scrollYProgress,
    [1 / total, 1],
    [0, 1]
  );

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
                "radial-gradient(ellipse at 50% 90%, rgba(103, 147, 20, 0.55) 30%, rgba(45,68,5,0.35) 50%, transparent 70%)",
            }}
          />
        )}

        <div className="relative h-full mx-auto max-w-8xl py-2 md:py-12 lg:py-12 px-4 sm:px-8 md:px-4 lg:px-0 flex items-center">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full">

            <div className="w-full lg:w-1/2">
              <div className="mb-4 flex items-center gap-2 text-white">
                <span
                  className="h-2 w-2 rounded-full bg-[#c5f018]"
                  style={{ animation: "dotPulse 1s ease-in-out infinite" }}
                />
                <span className="text-sm md:text-lg">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-semibold leading-tight text-[#c5f018] md:text-5xl">
                Building Infrastructure {" "}
                <span className="font-light text-white">
                  That Operates at Scale
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
                The systems required in regulated environments go beyond individual tools or platforms.
                <br />
                <br />
                They are infrastructure-level environments that integrate governance, security, and data exchange across organisations.
              </p>
              <div className="mt-8 h-64 w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center sm:h-80 lg:mt-10 lg:h-[420px]" />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
                Infrastructure designed to operate across public sector, financial systems, and health environments
              </p>
            </div>

            <div className="w-full lg:w-1/2 space-y-4">
              {STANDARDS_ITEMS.map((item, index) => (
                <ServiceCard
                  key={item.title}
                  item={item}
                  index={index}
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