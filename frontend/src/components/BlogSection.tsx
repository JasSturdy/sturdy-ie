"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MyInsightIndex } from "../lib/myInsight";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export function BlogSection({ insights }: { insights: MyInsightIndex[] }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  const featured = insights[0];
  const smallPosts = insights.slice(1, 3);

  if (!featured) return null;

  return (
    <section className="mx-auto max-w-8xl px-6 py-10 sm:px-8 md:px-10 md:py-16 lg:px-0">
      <div className="mb-8 flex flex-col items-start justify-between md:mb-14">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300"
        >
          <span
            className="h-2 w-2 rounded-full bg-[#c5f018]"
            style={{ animation: "dotPulse 1s ease-in-out infinite" }}
          />
          <span className="text-sm md:text-lg">Insights</span>
        </motion.div>

        {/* Heading row */}
        <div className="flex w-full flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
            className="text-[40px] font-light leading-[1.08] text-white sm:text-5xl md:text-5xl lg:text-6xl"
          >
            <span className="font-semibold text-[#c5f018]">Perspective </span>
            <span className="font-light text-white md:hidden">
              on Governance, Infrastructure, and Trusted Data Systems
            </span>
            <span className="hidden font-light text-white md:block">
              <span className="block">on Governance, Infrastructure,</span>
              <span className="block">and Trusted Data Systems</span>
            </span>
          </motion.h2>
        </div>

        {/* Body + CTA side by side */}
        <div className="mt-6 flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.22 }}
            className="max-w-3xl text-sm leading-relaxed text-white md:text-lg"
          >
            Short perspectives on designing systems that can be governed,
            operated, and relied on in regulated environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="flex sm:justify-center shrink-0"
          >
            <Link
              href="/myinsights"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-5 py-3.5 text-base font-medium text-black transition duration-300 hover:border hover:border-white hover:bg-black hover:text-[#c5f018] sm:px-6 sm:py-4 md:text-lg w-full sm:w-auto"
            >
              Explore Insights
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Featured post ── */}
      <Link
        href={`/myinsight/${featured.slug}`}
        className="group mb-6 block"
      >
        <div className="flex w-full flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 to-black p-5 transition-all duration-300 group-hover:border-[#c5f018]/60 group-hover:shadow-[0_0_60px_rgba(197,240,24,0.15)] min-h-[280px] sm:p-6 sm:min-h-[300px]">
          <div className="flex items-start justify-end">
            <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
              {featured.category}
            </span>
          </div>

          <h3 className="mt-5 text-[34px] font-light leading-[1.12] text-white transition-colors group-hover:text-[#d4ff2a] sm:mt-6 sm:text-[34px] md:text-[42px]">
              {featured.title}
            </h3>

          <div className="mt-5 h-px w-full bg-zinc-800 sm:mt-6" />

          {featured.date && (
            <div className="mt-5 flex items-center gap-2 text-sm text-zinc-500 sm:mt-6">
              <CalendarIcon />
              <span>{featured.date}</span>
            </div>
          )}

          {featured.excerpt ? (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-400 sm:mt-5">
              {featured.excerpt}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-end pt-6 sm:pt-8">
            <span className="inline-flex items-center rounded-xl border border-zinc-700 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:border-[#c5f018]/60 group-hover:text-[#d4ff2a]">
              Read more
            </span>
          </div>
        </div>
      </Link>

      {/* ── Small posts ── */}
      {smallPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {smallPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/myinsight/${post.slug}`}
              className="group flex"
            >
              <div className="flex w-full flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 to-black p-5 transition-all duration-300 group-hover:border-[#c5f018]/60 group-hover:shadow-[0_0_48px_rgba(197,240,24,0.12)] min-h-[240px] sm:p-6 sm:min-h-[260px]">
                <div className="flex items-start justify-end">
                  <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-5 line-clamp-2 text-2xl font-light leading-[1.15] text-white transition-colors group-hover:text-[#d4ff2a] md:text-[28px]">
                    {post.title}
                </h3>

                <div className="mt-5 h-px w-full bg-zinc-800" />

                {post.date && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    <CalendarIcon />
                    <span>{post.date}</span>
                  </div>
                )}

                {post.excerpt ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {post.excerpt}
                  </p>
                ) : null}

                <div className="mt-auto flex items-center justify-end pt-6">
                  <span className="inline-flex items-center rounded-xl border border-zinc-700 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-[#c5f018]/60 group-hover:text-[#d4ff2a]">
                    Read more
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}