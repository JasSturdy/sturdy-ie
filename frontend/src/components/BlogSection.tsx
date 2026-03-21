"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/** One author avatar everywhere — same URL, same circular treatment */
const AUTHOR = {
  name: "Jason Sturdy",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&auto=format&fit=crop&q=80",
} as const;

const authorAvatarClassName =
  "h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-[#c5f018]/30 sm:h-10 sm:w-10";

const FEATURED_POST = {
  img: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&auto=format&fit=crop&q=80",
  title: "Designing Trust Into Digital Infrastructure",
  date: "Insights",
  href: "/myinsight/designing-trust-into-digital-infrastructure",
};

const SMALL_POSTS = [
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    title: "Governance in Regulated Data Ecosystems",
    date: "Insights",
    href: "/myinsight/governance-in-regulated-data-ecosystems",
  },
  {
    img: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=400&auto=format&fit=crop&q=80",
    title: "Standards and the Future of Data Exchange",
    date: "Insights",
    href: "/myinsight/standards-and-the-future-of-data-exchange",
  },
];

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

function AuthorRow() {
  return (
    <div className="flex items-center gap-2">
      <img
        src={AUTHOR.avatar}
        alt={AUTHOR.name}
        className={authorAvatarClassName}
      />
      <span className="text-sm font-light text-[#c5f018] sm:text-base">
        {AUTHOR.name}
      </span>
    </div>
  );
}

export function BlogSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -60px 0px",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="mx-auto max-w-8xl px-8 py-10 md:px-16 md:py-16">
      <div className="mb-8 flex flex-col items-start justify-between md:mb-16">
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

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
              className="text-2xl font-light leading-tight text-white md:text-5xl lg:text-6xl"
            >
              <span className="font-semibold text-[#c5f018]">Perspective </span>
              <span className="font-light text-white">on Governance, Infrastructure, and Data Systems</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.22 }}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-lg"
            >
              Short perspectives on designing systems that work in regulated environments
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
            }
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="shrink-0 self-start lg:self-center"
          >
            <Link
              href="/myinsights"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-4 py-3 text-sm font-medium text-black transition duration-300 hover:border hover:border-white hover:bg-black hover:text-[#c5f018] sm:px-6 sm:py-4 md:text-lg"
            >
              Explore All Insights
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

      <Link
        href={FEATURED_POST.href}
        className="group mb-4 block rounded-xl border border-[#68800a]"
      >
        <div className="relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 transition-colors duration-300 sm:flex-row">
          <div
            ref={imgRef}
            className="relative w-full shrink-0 cursor-none overflow-hidden sm:w-[40%]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src={FEATURED_POST.img}
              alt={FEATURED_POST.title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full sm:min-h-[220px]"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />
            <div
              className="pointer-events-none absolute left-0 top-0"
              style={{
                transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease, transform 0.06s linear",
                willChange: "transform",
              }}
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm sm:h-20 sm:w-20">
                <div className="absolute inset-0 rounded-full border-2 border-[#c5f018] shadow-[0_0_24px_6px_rgba(197,240,24,0.65)]" />
                <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 lg:p-8">
            <h3 className="text-xl font-light leading-tight text-white sm:text-2xl lg:text-5xl">
              {FEATURED_POST.title}
            </h3>
            <div className="mt-4 flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between">
              <AuthorRow />
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <CalendarIcon />
                <span>{FEATURED_POST.date}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SMALL_POSTS.map((post, i) => (
          <Link key={i} href={post.href} className="group block">
            <div className="flex h-full flex-row overflow-hidden rounded-xl border border-[#68800a] transition-colors duration-300">
              <div className="relative w-28 shrink-0 overflow-hidden sm:w-32 lg:w-75">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-full w-full min-h-[120px] object-cover transition-transform duration-500 group-hover:scale-105 sm:min-h-[140px]"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4 lg:p-8">
                <h3 className="line-clamp-2 text-sm font-light leading-snug text-white sm:text-base lg:text-2xl">
                  {post.title}
                </h3>
                <div className="mt-2 sm:mt-3">
                  <AuthorRow />
                  <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm">
                    <CalendarIcon />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
