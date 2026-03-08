import Link from "next/link";
import { ArticleIndex, CATEGORY_STYLES } from "../lib/articles";

export function InsightsPreviewSection({ articles }: { articles: ArticleIndex[] }) {
  const featured = articles.slice(0, 3);

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-0">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
            <span>My Insights</span>
          </div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Executive perspectives on governance, infrastructure, and regulated
            innovation
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
            Short, structured perspectives drawn from building and governing
            mission-critical platforms across regulated ecosystems—covering
            sovereign infrastructure, secure collaboration, and standards-led
            interoperability.
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => {
              const tagStyle =
                CATEGORY_STYLES[article.category]?.tag ||
                "border-zinc-700 text-zinc-400";
              return (
                <Link
                  key={article.slug}
                  href={`/writing/${article.slug}`}
                  className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700"
                >
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-[#c5f018]">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                    {article.excerpt}
                  </p>
                  <span
                    className={`mt-4 inline-block w-fit rounded-full border px-3 py-0.5 text-xs ${tagStyle}`}
                  >
                    {article.category}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-sm text-zinc-500">
            No insights published yet. Check back soon.
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 rounded-full border border-[#c5f018] bg-transparent px-6 py-3 text-sm font-semibold text-[#c5f018] transition hover:bg-[#c5f018] hover:text-black"
          >
            View all insights
            <span className="text-xs">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
