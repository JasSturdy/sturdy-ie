"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { MyInsightIndex, CATEGORY_STYLES } from "../../lib/myInsight";

const CATEGORIES = [
  "All",
  "Governance & Compliance",
  "Research Collaboration",
  "Interoperability & Standards",
  "Preventive Health Innovation",
  "AI & Regulated Data",
];

const ITEMS_PER_PAGE = 6;

export function WritingClient({
  myInsights,
}: {
  myInsights: MyInsightIndex[];
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
          <span className="text-[#c5f018]"> Insights</span>
        </h1>
        <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-zinc-300">
          Executive perspectives on sovereign infrastructure, governance-led
          transformation, secure collaboration, and standards-led
          interoperability across regulated ecosystems.
        </p>
      </section>

      {/* Category filter */}
      <section className="bg-black/95 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 md:px-10 lg:px-0">
          <p className="text-lg font-bold uppercase tracking-[0.1em] text-white mb-3">
            Categories
          </p>
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 focus:outline-none focus:border-zinc-400 cursor-pointer"
          >
            {CATEGORIES.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
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
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl bg-zinc-900 aspect-[4/3]">
                    {insight.image ? (
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-zinc-800" />
                    )}
                    {insight.flagship && (
                      <div className="absolute top-3 left-3 rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">
                        Cornerstone
                      </div>
                    )}
                  </div>

                  {/* Meta: category · date */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-300">
                      {insight.category}
                    </span>
                    <span>·</span>
                    <span>{insight.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-3 text-xl font-semibold leading-snug text-white transition-colors group-hover:text-zinc-300 md:text-2xl">
                    {insight.title}
                  </h2>
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

      <FooterSection />
    </main>
  );
}
