"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import type { FooterData } from "@/lib/footer";
import type { LeadershipPaperIndex } from "@/lib/leadershipPapers";

const ITEMS_PER_PAGE = 6;

export function WritingClient({
  papers,
  footerData,
}: {
  papers: LeadershipPaperIndex[];
  footerData: FooterData | null;
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(papers.map((p) => p.category)))],
    [papers],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? papers
        : papers.filter((p) => p.category === activeCategory),
    [activeCategory, papers],
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
          Leadership
          <span className="text-[#c5f018]"> Papers</span>
        </h1>
        <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-zinc-300">
          Executive perspectives on sovereign infrastructure, governance-led
          transformation, secure collaboration, and standards-led
          interoperability across regulated ecosystems.
        </p>
      </section>

   

      {/* Leadership Papers */}
      <section className="bg-black">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 md:px-10 lg:px-0">
          <p className="mb-10 text-xs text-zinc-500">
            Showing{" "}
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length} paper{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in <span className="text-white">{activeCategory}</span>
              </span>
            )}
          </p>

          {paginated.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">
              No papers in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((paper) => (
                <Link
                  key={paper.slug}
                  href={`/leadership-papers/${paper.slug}`}
                  className="group block rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition duration-300 hover:border-[#c5f018]/70 hover:shadow-[0_0_40px_rgba(197,240,24,0.16)]"
                >
                  <div className="mb-5 flex items-start justify-end">
                    <span className="rounded-full border border-[#c5f018]/45 bg-[#c5f018]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
                      {paper.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-[#e4f98a]">
                    {paper.title}
                  </h2>
                  <div className="my-4 h-px w-full bg-zinc-700/70" />

                  <p className="text-xs text-zinc-400">{paper.date}</p>

                  <p
                    className="mt-4 min-h-[72px] text-sm leading-relaxed text-zinc-300"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {paper.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-end">
                    <span className="rounded-full border border-zinc-500 px-4 py-1.5 text-xs font-semibold text-zinc-200 transition group-hover:border-[#c5f018] group-hover:text-[#c5f018]">
                      Read more
                    </span>
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

      <FooterSection data={footerData} />
    </main>
  );
}