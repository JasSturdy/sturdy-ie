"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { CaseStudyIndex } from "../lib/caseStudies";

function CaseStudySlide({
  item,
  index,
}: {
  item: CaseStudyIndex;
  index: number;
}) {
  const number = index + 1;

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="group relative flex min-h-screen w-full shrink-0 flex-col items-stretch md:min-h-0 md:h-full md:min-w-full md:w-full md:flex-row md:items-center overflow-hidden"
    >
      {item.img?.trim() ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.img})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900" />
      )}

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 py-10 sm:px-8 md:px-20 lg:px-28 md:justify-center">
        <div className="space-y-4">
          <div className="mb-4 flex items-center gap-3 font-medium text-white">
            <span className="h-4 w-4 bg-[#c5f018]" />
            <span className="text-3xl md:text-4xl font-light">{item.title}</span>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-zinc-200 md:text-lg md:px-8 md:pb-6">
            {item.theme?.trim() ||
              (item.summary && item.summary.length > 180
                ? item.summary.slice(0, 180) + "…"
                : item.summary || "")}
          </p>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c5f018] text-2xl font-medium text-black md:h-16 md:w-16">
            {number}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CaseStudyCard({
  item,
  index,
}: {
  item: CaseStudyIndex;
  index: number;
}) {
  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="group relative flex h-64 w-full shrink-0 overflow-hidden rounded-2xl"
      style={{
        opacity: 0,
        animation: `fadeUp 0.6s ease-out ${index * 0.1}s forwards`,
      }}
    >
      {item.img?.trim() ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.img})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800" />
      )}

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end p-5 items-center text-center">
        <h3 className="text-lg font-light text-white">{item.title}</h3>

        <p className="mt-1 text-xs leading-relaxed text-zinc-300 line-clamp-2">
          {item.theme?.trim() || item.summary || ""}
        </p>
      </div>
    </Link>
  );
}

const STICKY_SCROLL_HEIGHT_VH = 100;

export function CaseStudiesSection({
  caseStudies,
}: {
  caseStudies: CaseStudyIndex[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const wrapper = wrapperRef.current;

    if (!el || !wrapper || window.innerWidth < 768) return;

    let hasEntered = false;

    const updateHorizontalScroll = () => {
      if (!hasEntered) return;

      const { scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      const stickyScrollRange = vh * (STICKY_SCROLL_HEIGHT_VH / 100);

      // Horizontal scrolling begins only once section reaches top
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / stickyScrollRange)
      );

      el.scrollLeft = progress * maxScroll;
    };

    const onScroll = () => {
      requestAnimationFrame(updateHorizontalScroll);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          hasEntered = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          updateHorizontalScroll();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const unique = Array.from(
    new Map(caseStudies.map((c) => [c.slug, c])).values()
  );

  return (
    <>
      {/* Mobile */}

      <div className="block md:hidden bg-black px-4 py-2 md:py-10">
        {unique.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {unique.map((c, i) => (
              <CaseStudyCard key={c.slug} item={c} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-zinc-500">
            No case studies published yet. Check back soon.
          </p>
        )}
      </div>

      {/* Desktop Sticky Horizontal */}

      <div ref={wrapperRef} className="hidden md:block min-h-[200vh]">
        <section
          className="relative flex w-full flex-col border-b border-zinc-900/60 bg-black md:sticky md:top-0 md:z-10 md:h-screen"
          aria-label="Case studies"
        >
          <div className="relative flex flex-1 md:overflow-x-clip">
            {unique.length > 0 ? (
              <div
                ref={scrollRef}
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  touchAction: "pan-y",
                } as React.CSSProperties}
                className="flex w-full flex-col md:flex-row md:h-full md:overflow-x-auto md:overscroll-x-contain [&::-webkit-scrollbar]:hidden"
              >
                {unique.map((c, i) => (
                  <CaseStudySlide key={c.slug} item={c} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex w-full flex-1 items-center justify-center bg-zinc-900/40 px-4">
                <p className="text-center text-sm text-zinc-500">
                  No case studies published yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}