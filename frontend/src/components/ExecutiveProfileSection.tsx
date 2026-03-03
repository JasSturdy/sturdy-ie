"use client";

import { useState } from "react";

const PROFILES = [
  {
    title: "Data Governance & Infrastructure",
    description:
      "I operate at the intersection of data governance, regulatory compliance, and secure infrastructure design, focusing on enabling trusted collaboration across highly regulated environments.",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Privacy-First Collaboration",
    description:
      "With over two decades of experience delivering enterprise data and digital transformation initiatives, my work centres on enabling privacy-first collaboration across institutional ecosystems.",
    img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Regulated Innovation",
    description:
      "Supporting innovation without compromising regulatory obligations or public trust. I design secure data collaboration environments for highly regulated industries.",
    img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function ExecutiveProfileSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROFILES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? PROFILES.length - 1 : prev - 1
    );
  };

  const current = PROFILES[currentIndex];

  return (
    <div className="mt-24 space-y-12 px-4 md:px-6 lg:px-30 overflow-hidden bg-black">
      {/* Section Header */}
      <div>
        <h2 className="px-6 text-3xl font-bold text-[#c5f018] md:text-4xl">
          Executive
          <span className="text-white"> Profile</span>
        </h2>
      </div>

      {/* Two Column Layout - Text Center, Image Right */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-96">
          {/* Center Column - Text Content */}
          <div className="flex flex-col items-center justify-center space-y-8 z-10 px-6">
            {/* Dark text box */}
            <div className="relative w-full max-w-xl bg-[#222222] p-20 overflow-hidden">
              <div
                key={currentIndex}
                className="animate-in fade-in slide-in-from-left-full duration-500"
              >
                <p className="text-center text-sm leading-relaxed text-zinc-300 md:text-base">
                  {current.description}
                </p>
              </div>
              {/* Navigation Controls */}
            <div className="flex items-center justify-center py-6 gap-6">
              <button
                onClick={handlePrev}
                className="flex h-18 w-18 items-center justify-center rounded-full border-3 border-white bg-transparent text-white transition hover:border-zinc-400 hover:bg-zinc-800/50"
                aria-label="Previous profile"
              >
                ←
              </button>
              <div className="h-12 w-12 rounded-full bg-[#c5f018]" />
              <button
                onClick={handleNext}
                className="flex h-18 w-18 items-center justify-center rounded-full bg-[#c5f018] text-black transition hover:bg-lime-300"
                aria-label="Next profile"
              >
                →
              </button>
            </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-80 lg:h-120 overflow-hidden -ml-20 lg:-ml-40">
            <div
              key={currentIndex}
              className="absolute inset-0 animate-in fade-in slide-in-from-right-full duration-500"
            >
              <img
                src={current.img}
                alt="Executive Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
