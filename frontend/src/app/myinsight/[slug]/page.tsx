import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getMyInsightBySlug, getMyInsightsIndex } from "../../../lib/myInsight";

// Converts Lexical JSON to renderable paragraphs
function renderLexical(content: any): string[] {
  if (!content?.root?.children) return [];

  const paragraphs: string[] = [];

  function extractText(node: any): string {
    if (node.type === "text") return node.text ?? "";
    if (node.children) return node.children.map(extractText).join("");
    return "";
  }

  for (const block of content.root.children) {
    const text = extractText(block).trim();
    if (text) paragraphs.push(text);
  }

  return paragraphs;
}

export default async function MyInsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [myInsight, allInsights] = await Promise.all([
    getMyInsightBySlug(slug),
    getMyInsightsIndex(),
  ]);
  if (!myInsight) notFound();

  const recentInsights = allInsights.filter((i) => i.slug !== slug).slice(0, 2);

  return (
    <main className="relative w-full overflow-x-hidden bg-black text-zinc-200">
      <Header />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-0">
        {/* Centered header: title, tagline, author */}
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-[64px] text-white leading-tight">
            {myInsight.title}
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-white max-w-2xl mx-auto">
            {myInsight.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-medium text-white">
              {myInsight.author?.charAt(0) ?? "?"}
            </div>
            <div className="text-left">
              <span className="block text-sm font-medium text-white">{myInsight.author}</span>
              <span className="text-xs text-white">{myInsight.date}</span>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative w-full overflow-hidden bg-zinc-900 mb-14">
          {myInsight.image && (
            <img src={myInsight.image} alt={myInsight.title} className="w-full aspect-[1160/480] object-cover" />
          )}
        </div>

        {/* Body */}
        <article className="space-y-14">
          {myInsight.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-[48px] font-bold text-white mb-5">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {typeof section.body === "string"
                  ? section.body.split("\n\n").map((para: string, j: number) => (
                    <p key={j} className="text-[16px] leading-8 text-white">{para.trim()}</p>
                  ))
                  : renderLexical(section.body).map((para, j) => (
                    <p key={j} className="text-[16px] leading-8 text-white">{para}</p>
                  ))
                }
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <h3 className="text-[48px] font-bold text-white mb-3">Interested in collaborating?</h3>
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

        {/* Recent articles */}
        <section className="pt-20 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="flex items-center gap-2 text-sm text-white mb-1">
                <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                Our blogs
              </p>
              <h2 className="text-[36px] font-bold text-white">
                Recent <span className="text-[#c5f018]">articles</span>
              </h2>
            </div>
            <Link
              href="/myinsights"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a] self-start sm:self-auto"
            >
              View more
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recentInsights.map((insight) => (
              <Link key={insight.slug} href={`/myinsight/${insight.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-video bg-zinc-900 mb-4">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[16px] text-zinc-500 mb-2">{insight.author} • {insight.date}</p>
                <h3 className="text-[36px] font-bold text-white leading-snug group-hover:text-zinc-200 transition-colors">
                  {insight.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <FooterSection />
    </main>
  );
}