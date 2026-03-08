"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CaseStudyIndex, getCaseStudySummary } from "../lib/caseStudies";

const AUTO_SLIDE_INTERVAL_MS = 2000;

export function CaseStudyCarousel({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % caseStudies.length);
  }, [caseStudies.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + caseStudies.length) % caseStudies.length);
  }, [caseStudies.length]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [goNext, activeIndex]);

  if (!caseStudies.length) return null;

  const translatePercent = -activeIndex * 100;

  return (
    <section className="relative border-b border-zinc-900/60 bg-black py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg md:aspect-[21/9]">
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {caseStudies.map((item, i) => (
              <article
                key={item.slug}
                className="relative flex h-full min-w-full items-center overflow-hidden"
              >
                <div className="absolute inset-0">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-1 items-center px-4 sm:px-8 md:px-12 lg:px-16">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-medium text-zinc-300">
                      <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                      <span className="tracking-[0.25em] uppercase">Featured case study</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white md:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-200 md:text-base">
                      {item.summary}
                    </p>
                    <Link
                      href={`/case-studies/${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#c5f018] hover:opacity-80 transition-opacity"
                    >
                      Read case study <span>→</span>
                    </Link>
                  </div>
                </div>

                <div className="relative z-10 pr-8 md:pr-12 lg:pr-16">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5f018] text-sm font-semibold text-black md:h-12 md:w-12">
                    {i + 1}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Arrow buttons */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous case study"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next case study"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}