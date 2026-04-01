"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ExecutiveProfileData } from "@/lib/executiveProfile";

export function ExecutiveProfileSection({
  profiles,
}: {
  profiles: ExecutiveProfileData[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!profiles.length) return null;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % profiles.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? profiles.length - 1 : prev - 1));

  const current = profiles[currentIndex];
  const sectionHeading = profiles[0].sectionHeading;
  const sectionHeadingAccent = profiles[0].sectionHeadingAccent;

  return (
    <div className="mt-12 md:mt-24 overflow-hidden bg-black">
      <div className="px-6 md:px-10 lg:px-16 mb-8 md:mb-12">
        <h2 className="text-3xl font-light md:text-4xl lg:text-5xl">
          <span className="text-[#c5f018]">{sectionHeading}</span>
          {sectionHeadingAccent && (
            <span className="text-white"> {sectionHeadingAccent}</span>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto lg:order-2 lg:min-h-[540px]">
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
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text */}
        <div className="lg:order-1 flex flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12">
          <div className="bg-[#222222] p-6 sm:p-8 md:p-10 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-text"}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-sm leading-relaxed text-zinc-300 md:text-base"
              >
                {current.paragraphs.map((para, i) => (
                  <p key={i} className={para.isBold ? "font-bold text-white" : ""}>
                    {para.text}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>

            {profiles.length > 1 && (
              <div className="mt-8 flex items-center gap-4">
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
      </div>
    </div>
  );
}