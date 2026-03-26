"use client";

import Link from "next/link";
import { CaseStudyIndex } from "../lib/caseStudies";

export function CaseStudyBlogSection({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
            <span className="text-xs font-semibold text-lime-300/80">
              All case studies
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white md:text-4xl lg:text-5xl">
            Case studies &amp; delivery examples
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-400">
            Selected examples of governance-aligned delivery, secure data
            collaboration, and regulatory compliance initiatives.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {caseStudies.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col gap-6 border-b border-zinc-800/60 pb-12 last:border-0 last:pb-0 md:flex-row md:gap-10 md:pb-16"
            >
              <Link
                href={`/case-studies/${post.slug}`}
                className="relative block aspect-[16/10] shrink-0 overflow-hidden rounded-lg md:aspect-video md:w-[45%]"
              >
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-[#c5f018] px-3 py-1 text-xs font-semibold text-black">
                  {post.theme.split(" / ")[0]}
                </span>
              </Link>

              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                  <span className="rounded-full border border-zinc-700 px-2.5 py-0.5 font-medium text-zinc-400">
                    {post.theme}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-[#c5f018] md:text-2xl">
                  <Link href={`/case-studies/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{post.summary}</p>
                <Link
                  href={`/case-studies/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c5f018] transition-opacity hover:opacity-80"
                >
                  Read case study <span className="text-xs">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}