"use client";

import Link from "next/link";
import { CaseStudyIndex } from "../lib/caseStudies";

export function CaseStudyBlogSection({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        {/* <div className="mb-12"> */}
        {/* <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
            <span className="text-xs font-semibold text-lime-300/80">
              All case studies
            </span>
          </div> */}
        {/* <h2 className="mt-4 text-2xl font-semibold text-white md:text-4xl lg:text-5xl">
            Case studies &amp; delivery examples
          </h2> */}
        {/* <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-400">
            Selected examples of governance-aligned delivery, secure data
            collaboration, and regulatory compliance initiatives.
          </p> */}
        {/* </div> */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((post) => (
            <article key={post.slug} className="group h-full">
              <Link
                href={`/case-studies/${post.slug}`}
                className="block h-full"
              >
                <div className="flex flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-black p-6 min-h-[290px] transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-[0_0_60px_rgba(197,240,24,0.06)]">
                  {/* Category pill (top-right) - outline style to differentiate */}
                  <div className="flex items-start justify-end">
                    <span className="rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
                      {post.theme.split(" / ")[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-[28px] font-light leading-[1.12] text-white transition-colors min-h-[128px]">
  {post.title}
</h3>

                  {/* Divider */}
                  <div className="mt-6 h-px w-full bg-zinc-800" />

                  {/* Date */}
                  <p className="mt-6 text-sm text-zinc-500">
                    {post.date ? post.date : post.period ? post.period : "Case study"}
                  </p>

                  {/* Summary snippet */}
                  {post.excerpt ? (
                    <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-zinc-400">
                      {post.excerpt}
                    </p>
                  ) : null}

                  {/* Button (bottom-right) - more neutral than My Insights */}
                  <div className="mt-auto pt-8 flex items-center justify-end">
                    <span className="inline-flex items-center rounded-xl border border-zinc-700 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:border-zinc-600">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}