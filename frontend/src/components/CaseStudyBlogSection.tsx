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
            <article
              key={post.slug}
              className="group"
            >
              <Link
                href={`/case-studies/${post.slug}`}
                className="block overflow-hidden rounded-2xl bg-black transition-colors hover:border-zinc-700"
              >
                <div className="p-4">
                  <div className="relative aspect-[22/25] overflow-hidden rounded-xl bg-zinc-900">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${post.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="px-4 pb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-300">
                      {post.theme.split(" / ")[0]}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-500">
                      {post.date ? post.date : post.period ? post.period : "Case study"}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-light leading-tight text-white md:text-3xl">
                    {post.title}
                  </h3>

                  {/* <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                    {post.summary}
                  </p> */}

                  {/* <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c5f018] transition-opacity group-hover:opacity-90">
                    Read case study <span className="text-xs">→</span>
                  </div> */}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}