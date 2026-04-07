"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import type { ExecutiveProfileData } from "@/lib/executiveProfile";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ExecutiveProfileSection({
  profiles,
}: {
  profiles: ExecutiveProfileData[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  if (!profiles.length) return null;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % profiles.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? profiles.length - 1 : prev - 1));

  const current = profiles[currentIndex];
  const sectionHeading = profiles[0].sectionHeading;
  const sectionHeadingAccent = profiles[0].sectionHeadingAccent;
  const primaryCtaLabel = current.primaryCtaLabel ?? "View Case Studies";
  const primaryCtaHref = current.primaryCtaHref ?? "/case-studies";
  const secondaryCtaLabel = current.secondaryCtaLabel ?? "Explore Insights";
  const secondaryCtaHref = current.secondaryCtaHref ?? "/myinsights";

  return (
    <section ref={ref} className="mt-2 overflow-hidden bg-transparent md:mt-4">
      <div className="mx-auto max-w-8xl px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Image */}
          <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 md:h-96 lg:order-2 lg:h-auto lg:min-h-[min(520px,70vh)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-image"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={current.imageUrl}
                  alt={`${sectionHeading} ${sectionHeadingAccent ?? ""}`.trim()}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <div className="flex min-h-0 flex-col justify-center lg:order-1 lg:py-4">
            <div className="w-full">
              <h2 className="mb-6 text-left text-4xl font-light leading-tight text-white md:mb-8 md:text-5xl lg:text-6xl">
                <span className="font-bold text-[#c5f018]">{sectionHeading}</span>
                {sectionHeadingAccent && (
                  <span className="font-light text-white"> {sectionHeadingAccent}</span>
                )}
              </h2>

              <div className="rounded-2xl bg-[#222222] p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id + "-text"}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 text-sm leading-relaxed text-white md:text-base"
                  >
                    {current.paragraphs.map((para, i) => (
                      <p key={i} className={para.isBold ? "font-bold text-white" : ""}>
                        {para.text}
                      </p>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                {profiles.length > 1 && (
                  <div className="mt-6 flex items-center gap-4 md:mt-8">
                    <button
                      onClick={handlePrev}
                      className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:bg-zinc-800"
                      aria-label="Previous profile"
                    >
                      ←
                    </button>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#c5f018]" />
                    <button
                      onClick={handleNext}
                      className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#c5f018] text-black transition hover:bg-lime-300"
                      aria-label="Next profile"
                    >
                      →
                    </button>
                  </div>
                )}

               

              </div>
            </div>
             {/* CTA Buttons */}
                <div className="flex flex-row justify-center gap-3 pt-6 sm:justify-start sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="flex-1 sm:flex-none"
                  >
                    <Link
                      href={primaryCtaHref}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c5f018] px-3 py-3 text-sm font-semibold text-black transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
                    >
                      {primaryCtaLabel}
                      <ArrowIcon />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.58 }}
                    className="flex-1 sm:flex-none"
                  >
                    <Link
                      href={secondaryCtaHref}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-lime-400/70 bg-transparent px-3 py-3 text-sm font-semibold text-lime-300 transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:bg-[#CCFF00] hover:text-black"
                    >
                      {secondaryCtaLabel}
                      <ArrowIcon />
                    </Link>
                  </motion.div>
                </div>
          </div>

        </div>
      </div>
    </section>
  );
}