"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CaseStudyIndex } from "../lib/caseStudies";

const ITEMS_PER_PAGE = 6;

export function CaseStudyBlogSection({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(caseStudies.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return caseStudies.slice(start, start + ITEMS_PER_PAGE);
  }, [caseStudies, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        {/* Header - matches WritingClient */}
        <div className="mb-12 text-center">
          <p className="text-sm text-[#c5f018] mb-2">• Our case studies</p>
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-white">Case studies &amp; </span>
            <span className="text-[#c5f018]">delivery examples</span>
          </h2>
        </div>

        {/* Article grid - matches WritingClient layout */}
        {paginated.length === 0 ? (
          <div className="py-24 text-center text-zinc-500">No case studies yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {paginated.map((post) => (
              <Link
                key={post.slug}
                href={`/case-studies/${post.slug}`}
                className="group block overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[440/500] bg-zinc-800">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#c5f018] px-3 py-1 text-xs font-semibold text-black">
                    {(post.theme || "").split(" / ")[0] || post.theme || "Case study"}
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-[16px] text-white mb-2">
                    {[post.theme, post.period].filter(Boolean).join(" • ") || "—"}
                  </p>
                  <h3 className="text-[36px] text-white leading-snug group-hover:text-zinc-200 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination - matches WritingClient */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-4">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center gap-2 rounded-lg border border-white bg-zinc-900 px-6 py-3 text-sm text-white transition hover:bg-zinc-800"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                  </svg>
                  Previous page
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="flex items-center gap-2 rounded-lg border border-white bg-zinc-900 px-6 py-3 text-sm text-white transition hover:bg-zinc-800"
                >
                  Next page
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
