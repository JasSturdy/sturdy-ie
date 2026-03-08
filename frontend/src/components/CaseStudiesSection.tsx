import Link from "next/link";
import { CaseStudyIndex } from "../lib/caseStudies";

export function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudyIndex[] }) {
  // Deduplicate by slug, take first 3
  const unique = Array.from(
    new Map(caseStudies.map((c) => [c.slug, c])).values()
  ).slice(0, 3);

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-0">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
            <span>Case Studies</span>
          </div>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Case studies &amp; delivery examples
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            Selected examples of governance-aligned delivery, sovereign
            infrastructure, and secure collaboration across public sector,
            financial services, and health.
          </p>
        </div>

        {unique.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unique.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700"
              >
                <div
                  className="h-40 bg-cover bg-center opacity-80 transition-opacity group-hover:opacity-90"
                  style={
                    c.img?.trim()
                      ? { backgroundImage: `url(${c.img})` }
                      : undefined
                  }
                >
                  {!c.img?.trim() && (
                    <div className="flex h-full items-center justify-center bg-zinc-800">
                      <span className="text-4xl text-zinc-600">◈</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-[#c5f018]">
                    {c.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                    {c.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-sm text-zinc-500">
            No case studies published yet. Check back soon.
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-[#c5f018] bg-transparent px-6 py-3 text-sm font-semibold text-[#c5f018] transition hover:bg-[#c5f018] hover:text-black"
          >
            View all case studies
            <span className="text-xs">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
