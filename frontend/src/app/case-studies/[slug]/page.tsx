import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getCaseStudyBySlug, getCaseStudiesIndex } from "../../../lib/caseStudies";

const SECTIONS = [
  { key: "overviewContext", heading: "Overview & Context" },
  { key: "environmentModel", heading: "Environment Model" },
  { key: "governanceControls", heading: "Governance & Controls" },
  { key: "standardsInteroperability", heading: "Standards & Interoperability" },
  { key: "outcomesImpact", heading: "Outcomes & Impact" },
  { key: "partnershipRelevance", heading: "Partnership Relevance" },
] as const;

function BodyContent({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para: string, i: number) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Detect inline bullet pattern: "Some intro: - item - item" or "- item - item"
        const bulletSplit = trimmed.split(/\s*-\s+/);

        if (bulletSplit.length > 1) {
          const intro = bulletSplit[0].trim();
          const items = bulletSplit.slice(1).filter(Boolean);

          return (
            <div key={i}>
              {intro && (
                <p className="text-[16px] text-white mb-2">{intro}</p>
              )}
              <ul className="space-y-2 pl-1">
                {items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[16px] text-white">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-sm bg-[#c5f018]" />
                    {item.trim()}
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

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [study, allStudies] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudiesIndex(),
  ]);
  if (!study) notFound();

  const recentStudies = allStudies.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <main className="relative w-full overflow-x-hidden bg-black text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="relative border-b border-zinc-900/60 bg-black">
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${study.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-0">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-lg font-medium text-zinc-400 transition hover:text-zinc-200"
          >
            ← Case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-[#c5f018]/40 bg-[#c5f018]/10 px-3 py-0.5 font-semibold text-[#c5f018]">
              {study.theme}
            </span>
          </div>

          <h1 className="mt-5 max-w-8xl text-2xl font-light text-white md:text-3xl lg:text-6xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-8xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {study.summary}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-0">
        {/* Body sections */}
        <article className="space-y-4">
          {SECTIONS.map(({ key, heading }) => {
            const body = (study as Record<string, string>)[key];
            if (!body?.trim()) return null;
            return (
              <section key={key}>
                <h2 className="flex items-center gap-3 text-5xl font-light text-white py-4 md:py-10 lg:py-10">
                  {/* <span className="h-2 w-2 rounded-sm bg-[#c5f018]" /> */}
                  {heading}
                </h2>
                <BodyContent text={body} />
              </section>
            );
          })}

          {/* CTA */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <h3 className="text-2xl md:text-5xl lg:text-5xl font-light text-white mb-6">Interested in 
              <span className="text-[#c5f018]"> collaborating?</span></h3>
              <p>
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

        {/* Recent case studies */}
        <section className="pt-20 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="flex items-center gap-2 text-sm text-white mb-1">
                <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                Case studies
              </p>
              <h2 className="text-[36px] font-bold text-white">
                Recent <span className="text-[#c5f018]">case studies</span>
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a] self-start sm:self-auto"
            >
              View more
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recentStudies.map((cs) => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-video bg-zinc-900 mb-4">
                  <img
                    src={cs.img}
                    alt={cs.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[16px] text-zinc-500 mb-2">
                  {[cs.theme, cs.period].filter(Boolean).join(" • ")}
                </p>
                <h3 className="text-[36px] font-bold text-white leading-snug group-hover:text-zinc-200 transition-colors">
                  {cs.title}
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