"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import type { FooterData } from "@/lib/footer";
import type { MyInsightIndex } from "../../lib/myInsight";

const ITEMS_PER_PAGE = 6;

export function WritingClient({
  myInsights,
  footerData,
}: {
  myInsights: MyInsightIndex[];
  footerData?: FooterData | null;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? myInsights
        : myInsights.filter((a) => a.category === activeCategory),
    [activeCategory, myInsights],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-8xl pt-24 pb-16 sm:px-6 lg:px-0 text-center">
        <h1 className="text-5xl font-light text-white md:text-6xl lg:text-7xl">
          My
          <span className="text-[#F59709]"> Insights</span>
        </h1>
        <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-zinc-300">
          Executive perspectives on sovereign infrastructure, governance-led
          transformation, secure collaboration, and standards-led
          interoperability across regulated ecosystems.
        </p>
      </section>

  

      {/* My Insights */}
      <section className="bg-black">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 md:px-10 lg:px-0">
          <p className="mb-10 text-xs text-zinc-500">
            Showing{" "}
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-white">{activeCategory}</span>
              </span>
            )}
          </p>

          {paginated.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">
              No insights in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((insight) => (
                <Link
                  key={insight.slug}
                  href={`/myinsight/${insight.slug}`}
                  className="group block"
                >
                  <div className="flex flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 to-black p-6 min-h-[290px] transition-all duration-300 group-hover:border-[#f59e0b]/70 group-hover:shadow-[0_0_60px_rgba(245,158,11,0.12)]">
                    {/* Category pill (top-right) */}
                    <div className="flex items-start justify-end">
                      <span className="rounded-full border border-[#f59e0b]/45 bg-[#f59e0b]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#f59e0b]">
                        {insight.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-6 text-[28px] font-light leading-[1.12] text-white transition-colors group-hover:text-[#fcd34d]">
                      {insight.title}
                    </h2>

                    {/* Divider */}
                    <div className="mt-6 h-px w-full bg-zinc-800" />

                    {/* Date */}
                    <p className="mt-6 text-sm text-zinc-500">{insight.date}</p>

                    {/* Excerpt */}
                    <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                      {insight.excerpt}
                    </p>

                    {/* Button (bottom-right) */}
                    <div className="mt-auto pt-8 flex items-center justify-end">
                      <span className="inline-flex items-center rounded-xl border border-zinc-700 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:border-[#f59e0b]/70 group-hover:text-[#fcd34d]">
                        Read more
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm text-white transition hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                        page === currentPage
                          ? "bg-[#c5f018] text-black"
                          : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm text-white transition hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next page →
              </button>
            </div>
          )}
        </div>
      </section>
      <FooterSection data={footerData} />
    </main>
  );
}