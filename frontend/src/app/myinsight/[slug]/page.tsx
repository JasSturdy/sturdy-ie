import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getMyInsightBySlug, getMyInsightsIndex } from "../../../lib/myInsight";

function BodyContent({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para: string, i: number) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Detect bullet pattern: lines starting with • or -
        const lines = trimmed.split("\n");
        const bulletLines = lines.filter((l) => /^[•\-]\s/.test(l.trim()));

        if (bulletLines.length > 0 && bulletLines.length === lines.length) {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {lines.map((line, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-[16px] text-white"
                >
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#c5f018]" />
                  {line.replace(/^[•\-]\s+/, "").trim()}
                </li>
              ))}
            </ul>
          );
        }

        // Mixed: intro line + bullet lines
        const firstBulletIdx = lines.findIndex((l) =>
          /^[•\-]\s/.test(l.trim()),
        );
        if (firstBulletIdx > 0) {
          const intro = lines.slice(0, firstBulletIdx).join(" ").trim();
          const bullets = lines.slice(firstBulletIdx);
          return (
            <div key={i}>
              {intro && <p className="text-[16px] text-white mb-2">{intro}</p>}
              <ul className="space-y-2 pl-1">
                {bullets.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-[16px] text-white"
                  >
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#c5f018]" />
                    {line.replace(/^[•\-]\s+/, "").trim()}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={i} className="text-[16px] text-white">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

interface LexicalNode {
  type?: string;
  text?: string;
  children?: LexicalNode[];
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[];
  };
}

function renderLexical(content: LexicalContent): string {
  if (!content?.root?.children) return "";

  function extractText(node: LexicalNode): string {
    if (node.type === "text") return node.text ?? "";
    if (node.children) return node.children.map(extractText).join("");
    return "";
  }

  return content.root.children
    .map((block: LexicalNode) => extractText(block).trim())
    .filter(Boolean)
    .join("\n\n");
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

      {/* Hero */}
      <section className="relative bg-black">
        <div className="mx-auto max-w-8xl px-4 pt-16 sm:px-6 md:px-10 md:pt-20 lg:px-0">
          <Link
            href="/myinsight"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-zinc-200"
          >
            ← My Insights
          </Link>

          <div className="mt-10 text-center">
            <h1 className="text-[48px] font-light leading-[1.08] text-white">
              {myInsight.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {myInsight.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
              <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-3 py-1 font-semibold text-[#c5f018]">
                {myInsight.category}
              </span>
              {myInsight.flagship && (
                <span className="rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">
                  Cornerstone
                </span>
              )}
              {myInsight.date && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{myInsight.date}</span>
                </>
              )}
              {myInsight.author && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{myInsight.author}</span>
                </>
              )}
            </div>
          </div>

          {/* Featured image */}
          {myInsight.image && (
            <div className="mt-12 overflow-hidden rounded-2xl bg-zinc-900">
              <img
                src={myInsight.image}
                alt={myInsight.title}
                className="h-[320px] w-full object-cover md:h-[480px] lg:h-[600px]"
              />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-8xl px-4 pt-14 sm:px-6 md:px-10 lg:px-0">
        <article className="space-y-14">
          {myInsight.sections.map((section, i) => {
            const bodyText =
              typeof section.body === "string"
                ? section.body
                : renderLexical(section.body);

            if (!bodyText?.trim()) return null;

            return (
              <section key={i}>
                <h2 className="text-[48px] font-light leading-[1.1] text-white">
                  {section.heading}
                </h2>
                <div className="mt-6">
                  <BodyContent text={bodyText} />
                </div>
              </section>
            );
          })}

          {/* CTA */}
          <section className="pt-16 mb-20">
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black px-6 py-14 text-center shadow-[0_30px_120px_rgba(0,0,0,0.75)] md:px-10">
              <h3 className="text-[48px] font-light leading-[1.1] text-white">
                Interested in{" "}
                <span className="text-[#c5f018]">collaborating?</span>
              </h3>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
                If this perspective resonates and you are exploring
                collaboration across research, governance, or secure data
                environments, I welcome the conversation.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c5f018] px-10 py-4 text-sm font-semibold text-black transition hover:bg-[#d4ff2a]"
                >
                  Discuss collaboration
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="10 7 17 7 17 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </article>

        {/* Recent insights */}
        {recentInsights.length > 0 && (
          <section className="pt-20 pb-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="flex items-center gap-2 text-sm text-white mb-1">
                  <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                  My Insights
                </p>
                <h2 className="text-[48px] font-light leading-[1.1] text-white">
                  More <span className="text-[#c5f018]">insights</span>
                </h2>
              </div>
              <Link
                href="/myinsight"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a] self-start sm:self-auto"
              >
                View all
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recentInsights.map((insight) => (
                <Link
                  key={insight.slug}
                  href={`/myinsight/${insight.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-video bg-zinc-900 mb-4">
                    {insight.image && (
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mb-2">
                    {[insight.category, insight.date]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                  <h3 className="text-[32px] font-light leading-[1.1] text-white group-hover:text-zinc-200 transition-colors">
                    {insight.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <FooterSection />
    </main>
  );
}
