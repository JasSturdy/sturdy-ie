import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { getFooterData } from "@/lib/footer";
import { FooterSection } from "@/components/FooterSection";
import { getCaseStudyBySlug, getCaseStudiesIndex } from "../../../lib/caseStudies";
import { LexicalRenderer } from "../../../components/LexicalRenderer";
import { CopyGuard } from "../../../components/CopyGuard";

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

  const [
    footerData,
  ] = await Promise.all([
    getFooterData(),
  ]);

  const recentStudies = allStudies.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <CopyGuard>
      <main className="relative w-full overflow-x-hidden bg-black text-zinc-200 select-none">
        <Header />

        <section className="relative bg-black">
          <div className="mx-auto max-w-8xl px-4 pt-16 sm:px-6 md:px-10 md:pt-20 lg:px-0">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-zinc-200"
            >
              ← Case studies
            </Link>
            <div className="mt-10 text-center">
              <h1 className="text-[64px] font-light leading-[1.08] text-white">
                {study.title}
              </h1>
             
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
          </div>
        </section>

        <div className="mx-auto max-w-8xl px-4 pt-14 sm:px-6 md:px-10 lg:px-0">
          <div className="mx-auto mt-5 mb-8 text-sm leading-relaxed text-white md:text-base [&_p]:text-white">
                <LexicalRenderer data={study.summary} />
              </div>
          <article className="space-y-14">
            {study.sections.map(({ heading, body }, index) => {
              if (!body) return null;
              return (
                <section key={index}>
                  <h2 className="text-[48px] font-light leading-[1.1] text-white">
                    {heading}
                  </h2>
                  <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-white [&_p]:text-white [&_li]:text-white">
                    <LexicalRenderer data={body} />
                  </div>
                </section>
              );
            })}

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
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="10 7 17 7 17 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </article>

          {recentStudies.length > 0 && (
            <section className="pb-24 pt-20">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 flex items-center gap-2 text-sm text-white">
                    <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                    Case studies
                  </p>
                  <h2 className="text-[48px] font-light leading-[1.1] text-white">
                    Recent <span className="text-[#c5f018]">case studies</span>
                  </h2>
                </div>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 self-start rounded-lg bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d4ff2a] sm:self-auto"
                >
                  View more
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {recentStudies.map((cs) => (
                  <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="group block">
                    <div className="flex min-h-[260px] flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950/70 to-black p-6 transition-all duration-300 group-hover:border-[#c5f018]/50 group-hover:shadow-[0_0_48px_rgba(197,240,24,0.08)]">
                      <div className="flex items-start justify-end">
                        <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
                          {cs.theme.split(" / ")[0]}
                        </span>
                      </div>
                      <h3 className="mt-5 text-2xl font-light leading-[1.15] text-white transition-colors group-hover:text-[#d4ff2a] md:text-[28px]">
                        {cs.title}
                      </h3>
                      <div className="mt-5 h-px w-full bg-zinc-800" />
                      {(cs.date || cs.period) ? (
                        <p className="mt-4 text-sm text-zinc-500">{cs.date || cs.period}</p>
                      ) : null}
                      {cs.excerpt ? (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{cs.excerpt}</p>
                      ) : null}
                      <div className="mt-auto flex justify-end pt-6">
                        <span className="inline-flex items-center rounded-xl border border-zinc-700 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-[#c5f018]/60 group-hover:text-[#d4ff2a]">
                          Read case study
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <FooterSection data={footerData} />
      </main>
    </CopyGuard>
  );
}