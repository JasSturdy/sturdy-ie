"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { ArticleIndex, CATEGORY_STYLES } from "../../lib/articles";

const CATEGORIES = [
  "All",
  "Governance & Compliance",
  "Research Collaboration",
  "Interoperability & Standards",
  "Preventive Health Innovation",
  "AI & Regulated Data",
];

const ITEMS_PER_PAGE = 6;

export function WritingClient({ articles }: { articles: ArticleIndex[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory),
    [activeCategory, articles]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleCategoryChange = (cat: string) => { setActiveCategory(cat); setCurrentPage(1); };
  const handlePageChange = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 md:px-10 lg:px-0 text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">My Insights</h1>
          <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-zinc-300">
            Exploring governance, secure collaboration, and regulated innovation — examining how institutions operationalise trust and enable research within responsible data ecosystems.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-black/95 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-10 lg:px-0">
          <p className="text-lg font-bold uppercase tracking-[0.1em] text-white mb-3">Categories</p>
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 focus:outline-none focus:border-zinc-400 cursor-pointer"
          >
            {CATEGORIES.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 lg:px-0">
          <p className="mb-10 text-xs text-zinc-500">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <span> in <span className="text-white">{activeCategory}</span></span>}
          </p>

          {paginated.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">No articles in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
              {paginated.map((article) => {
                const tagStyle = CATEGORY_STYLES[article.category]?.tag || "border-zinc-700 text-zinc-400";
                return (
                  <Link key={article.slug} href={`/insight/${article.slug}`} className="group block">
                    <div className="relative overflow-hidden aspect-video bg-zinc-900 mb-5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {article.flagship && (
                        <div className="absolute top-3 left-3 rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">
                          Cornerstone
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                      <span>{article.author}</span>
                      <span>-</span>
                      <span>{article.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-snug mb-3 group-hover:text-zinc-200 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-400">{article.excerpt}</p>
                    <div className="mt-4">
                      <span className={`inline-block rounded-full border px-3 py-1 text-xs ${tagStyle}`}>
                        {article.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                      page === currentPage ? "bg-[#c5f018] text-black" : "border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
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