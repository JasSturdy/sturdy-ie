"use client";

import { useEffect, useRef, useState } from "react";
import { CaseStudyIndex } from "../lib/caseStudies";

interface SlideItem {
  number: number;
  title: string;
  img: string;
  slug: string;
}

function CaseStudySlide({ item }: { item: SlideItem }) {
  return (
    <article className="relative flex min-h-screen w-full shrink-0 flex-col items-stretch md:min-h-0 md:h-full md:min-w-full md:flex-row md:items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-16 sm:px-8 md:px-20 lg:px-28">
        <div className="space-y-4">
          <div className="mb-4 flex items-center gap-3 text-xs font-medium text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
            <span className="tracking-[0.25em] uppercase">Case studies</span>
          </div>
          <h3 className="text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            Case Study {item.number}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-200 md:text-lg">
            {item.title}
          </p>
        </div>
      </div>

      {/* Number */}
      <div className="relative z-10 flex justify-end px-4 pb-8 md:absolute md:right-0 md:top-0 md:flex md:h-full md:items-center md:px-8 md:pb-0 md:pr-12 lg:pr-16">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c5f018] text-sm font-semibold text-black md:h-12 md:w-12">
          {item.number}
        </div>
      </div>
    </article>
  );
}

export function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const slides: SlideItem[] = caseStudies.map((c, i) => ({
    number: i + 1,
    title: c.summary,
    img: c.img,
    slug: c.slug,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!slides.length) return null;

  const translatePercent = -progress * (slides.length - 1) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-zinc-900/60 bg-black md:h-[300vh]"
    >
      {/* Mobile: vertical stack */}
      <div className="flex flex-col md:hidden">
        {slides.map((item) => (
          <CaseStudySlide key={item.slug} item={item} />
        ))}
      </div>

      {/* Desktop: sticky horizontal slide */}
      <div className="hidden h-full md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="flex h-full w-full will-change-transform"
            style={{ transform: `translateX(${translatePercent}%)` }}
          >
            {slides.map((item) => (
              <CaseStudySlide key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}