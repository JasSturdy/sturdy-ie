import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "@/components/FooterSection";
import { LexicalRenderer } from "../../../components/LexicalRenderer";
import { CopyGuard } from "../../../components/CopyGuard";
import { getFooterData } from "@/lib/footer";
import {
  getLeadershipPaperBySlug,
  getLeadershipPapersIndex,
} from "@/lib/leadershipPapers";

export default async function LeadershipPaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [paper, allPapers, footerData] = await Promise.all([
    getLeadershipPaperBySlug(slug),
    getLeadershipPapersIndex(),
    getFooterData(),
  ]);

  if (!paper) notFound();

  const recentPapers = allPapers.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <CopyGuard>
      <main className="relative w-full overflow-x-hidden bg-black text-zinc-200 select-none">
        <Header />

        {/* ── Hero ── */}
        <section className="relative bg-black">
          <div className="mx-auto max-w-8xl px-4 pt-16 sm:px-6 md:px-10 md:pt-20 lg:px-0">
            <Link
              href="/leadership-papers"
              className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-zinc-200"
            >
              ← Leadership Papers
            </Link>

            <div className="mt-10 text-center">
              <h1 className="text-[48px] font-light leading-[1.08] text-white">
                {paper.title}
              </h1>
              {paper.subtitle && (
                <p className="mx-auto mt-4 max-w-4xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                  {paper.subtitle}
                </p>
              )}

              <div className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base [&_p]:text-zinc-400">
                <LexicalRenderer data={paper.summary} />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full border border-[#c5f018]/35 bg-[#c5f018]/10 px-3 py-1 font-semibold text-[#c5f018]">
                  {paper.category}
                </span>
                {paper.flagship && (
                  <span className="rounded-full bg-[#c5f018] px-3 py-1 text-[10px] font-bold text-black">
                    Cornerstone
                  </span>
                )}
                {paper.date && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-500">{paper.date}</span>
                  </>
                )}
              </div>
            </div>

            {paper.img && (
              <div className="mt-12 overflow-hidden rounded-2xl bg-zinc-900">
                <img
                  src={paper.img}
                  alt={paper.title}
                  draggable={false}
                  className="blog-feature-image h-[320px] w-full object-cover md:h-[480px] lg:h-[600px] pointer-events-none"
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Body ── */}
        <div className="mx-auto max-w-8xl px-4 pt-14 sm:px-6 md:px-10 lg:px-0">
          <article className="space-y-14">
            {paper.sections.map(({ heading, body }, index) => (
              <section key={index}>
                <h2 className="text-[28px] font-light leading-[1.1] text-white">
                  {heading}
                </h2>
                <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-white [&_p]:text-white [&_li]:text-white">
                  <LexicalRenderer data={body} />
                </div>
              </section>
            ))}

            {/* ── CTA ── */}
            <section className="pt-16">
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

          {/* ── Recent papers ── */}
          {recentPapers.length > 0 && (
            <section className="pt-20 pb-24">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <p className="flex items-center gap-2 text-sm text-white mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
                    Leadership Papers
                  </p>
                  <h2 className="text-[48px] font-light leading-[1.1] text-white">
                    More <span className="text-[#c5f018]">papers</span>
                  </h2>
                </div>
                <Link
                  href="/leadership-papers"
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
                {recentPapers.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/leadership-papers/${p.slug}`}
                    className="group block rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition duration-300 hover:border-[#c5f018]/70 hover:shadow-[0_0_40px_rgba(197,240,24,0.16)]"
                  >
                    <div className="mb-5 flex items-start justify-end">
                      <span className="rounded-full border border-[#c5f018]/45 bg-[#c5f018]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c5f018]">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-[#e4f98a]">
                      {p.title}
                    </h3>
                    <div className="my-4 h-px w-full bg-zinc-700/70" />
                    <p className="text-xs text-zinc-400">{p.date}</p>
                    <p
                      className="mt-4 min-h-[72px] text-sm leading-relaxed text-zinc-300"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-end">
                      <span className="rounded-full border border-zinc-500 px-4 py-1.5 text-xs font-semibold text-zinc-200 transition group-hover:border-[#c5f018] group-hover:text-[#c5f018]">
                        Read more
                      </span>
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