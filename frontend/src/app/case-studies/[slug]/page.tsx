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

      {/* Hero (centered, like reference) */}
      <section className="relative bg-black">
        <div className="mx-auto max-w-8xl px-4 pt-16 sm:px-6 md:px-10 md:pt-20 lg:px-0">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-zinc-200"
          >
            ← Case studies
          </Link>

          <div className="mt-10 text-center">
            <h1 className="text-[48px] font-light leading-[1.08] text-white">
              {study.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {study.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
              <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-3 py-1 font-semibold text-[#c5f018]">
                {study.theme}
              </span>
              {(study.date || study.period) && (
                <>
                  <span className="text-zinc-700">•</span>
                  <span className="text-zinc-500">{study.date || study.period}</span>
                </>
              )}
            </div>
          </div>

          {/* Featured image (approx 1400x600 at max-w-8xl) */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-zinc-900">
            <img
              src={study.img}
              alt={study.title}
              className="blog-feature-image h-[320px] w-full object-cover md:h-[480px] lg:h-[600px]"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-8xl px-4 pt-14 sm:px-6 md:px-10 lg:px-0">
        {/* Body sections */}
        <article className="space-y-14">
          {SECTIONS.map(({ key, heading }) => {
            const body = (study as unknown as Record<string, string>)[key];
            if (!body?.trim()) return null;
            return (
              <section key={key}>
                <h2 className="text-[48px] font-light leading-[1.1] text-white">
                  {heading}
                </h2>
                <div className="mt-6">
                  <BodyContent text={body} />
                </div>
              </section>
            );
          })}

          {/* CTA */}
          <section className="pt-16">
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black px-6 py-14 text-center shadow-[0_30px_120px_rgba(0,0,0,0.75)] md:px-10">
              <h3 className="text-[48px] font-light leading-[1.1] text-white">
                Interested in a similar <span className="text-[#c5f018]">initiative?</span>
              </h3>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
                Open to discussions with institutions exploring governance-aligned collaboration, secure environments, or regulated innovation partnerships.
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

        {/* Recent case studies */}
        <section className="pt-20 pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="flex items-center gap-2 text-sm text-white mb-1">
                <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                Case studies
              </p>
              <h2 className="text-[48px] font-light leading-[1.1] text-white">
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
                  {[cs.theme, cs.date || cs.period].filter(Boolean).join(" • ")}
                </p>
                <h3 className="text-[48px] font-light leading-[1.1] text-white group-hover:text-zinc-200 transition-colors">
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