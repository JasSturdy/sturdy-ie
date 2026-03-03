import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getArticleBySlug, CATEGORY_STYLES } from "../../../lib/articles";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const tagStyle = CATEGORY_STYLES[article.category]?.tag ?? "border-zinc-700 text-zinc-400";

  return (
    <main className="relative w-full overflow-x-hidden bg-black text-zinc-200">
      <Header />

      {/* Hero image */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 md:h-[420px]">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-0">
        {/* Back */}
        <div className="py-8">
          <Link href="/insight" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            My Insights
          </Link>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tagStyle}`}>{article.category}</span>
          {article.flagship && (
            <span className="rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">Cornerstone Article</span>
          )}
          <span className="text-xs text-zinc-500">{article.date}</span>
          <span className="text-zinc-700">-</span>
          <span className="text-xs text-zinc-500">{article.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white leading-tight mb-12 md:text-4xl lg:text-5xl">
          {article.title}
        </h1>

        <div className="h-px w-full bg-zinc-800 mb-14" />

        {/* Article body */}
        <article className="space-y-14 pb-24">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#c5f018] mb-5">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-base leading-8 text-zinc-300">{para.trim()}</p>
                ))}
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <h3 className="text-lg font-bold text-white mb-3">Interested in collaborating?</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed max-w-md mx-auto">
              If this perspective resonates and you are exploring collaboration across research, governance, or secure data environments, I welcome the conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a]"
            >
              Discuss collaboration
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>
        </article>
      </div>

      <FooterSection />
    </main>
  );
}