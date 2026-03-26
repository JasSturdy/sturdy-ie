import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getMyInsightBySlug, CATEGORY_STYLES } from "../../../lib/myInsight";

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
  const myInsight = await getMyInsightBySlug(slug);
  if (!myInsight) notFound();

  const tagStyle = CATEGORY_STYLES[myInsight.category]?.tag ?? "border-zinc-700 text-zinc-400";

  return (
    <main className="relative px-2 lg:px-6 md:px-6 w-full overflow-x-hidden bg-black text-zinc-200">
      <Header />

      {/* Hero image */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 md:h-[420px]">
        {myInsight.image && (
          <img src={myInsight.image} alt={myInsight.title} className="h-full w-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-0">
        {/* Back */}
        <div className="py-8">
          <Link href="/myinsights" className="inline-flex items-center gap-2 text-lg text-zinc-500 hover:text-white transition-colors">
            ← My Insights
          </Link>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tagStyle}`}>{myInsight.category}</span>
          {myInsight.flagship && (
            <span className="rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">Cornerstone Article</span>
          )}
          {/* <span className="text-xs text-zinc-500">{myInsight.date}</span> */}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-light text-white leading-tight mb-12 md:text-4xl lg:text-6xl">
          {myInsight.title}
        </h1>

        <div className="h-px w-full bg-zinc-800 mb-14" />

        {/* Body */}
        <article className="space-y-14 pb-24">
          {myInsight.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold uppercase tracking-widest text-[#c5f018] mb-5">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {typeof section.body === "string"
                  ? section.body.split("\n\n").map((para: string, j: number) => (
                    <p key={j} className="text-base leading-8 text-zinc-300">{para.trim()}</p>
                  ))
                  : renderLexical(section.body).map((para, j) => (
                    <p key={j} className="text-base leading-8 text-zinc-300">{para}</p>
                  ))
                }
              </div>
            </section>
          ))}

          {/* CTA */}
          <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <h3 className="text-2xl md:text-5xl lg:text-5xl font-light text-white mb-6">Interested in 
              <span className="text-[#c5f018]"> collaborating?</span></h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              If this perspective resonates and you are exploring collaboration across research, governance, or secure data environments, I welcome the conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-8 py-5 text-lg font-semibold text-black transition hover:bg-[#d4ff2a]"
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