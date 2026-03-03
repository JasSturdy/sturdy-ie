import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getCaseStudyBySlug } from "../../../lib/caseStudies";

interface SectionBlockProps {
  label: string;
  body: string;
}

function SectionBlock({ label, body }: SectionBlockProps) {
  return (
    <div className="border-t border-zinc-800/60 pt-8">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
        {label}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{body}</p>
    </div>
  );
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
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

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-0">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition hover:text-zinc-200"
          >
            ← Back to case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-[#c5f018]/40 bg-[#c5f018]/10 px-3 py-0.5 font-semibold text-[#c5f018]">
              {study.theme}
            </span>
            <span className="text-zinc-500">Environment: {study.context}</span>
            {study.period && (
              <span className="text-zinc-600">Period: {study.period}</span>
            )}
          </div>

          <h1 className="mt-5 max-w-3xl text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
            {study.summary}
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-0">
          <SectionBlock label="Overview & Context"          body={study.overviewContext}           />
          <SectionBlock label="Environment Model"           body={study.environmentModel}          />
          <SectionBlock label="Governance & Controls"       body={study.governanceControls}        />
          <SectionBlock label="Standards & Interoperability" body={study.standardsInteroperability} />
          <SectionBlock label="Outcomes & Impact"           body={study.outcomesImpact}            />
          <SectionBlock label="Partnership Relevance"       body={study.partnershipRelevance}      />
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 md:px-10 md:py-16 lg:px-0">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Interested in a similar initiative?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            Open to discussions with institutions exploring governance-aligned
            collaboration, secure environments, or regulated innovation partnerships.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c5f018] px-8 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/30 transition hover:-translate-y-[1px] hover:bg-lime-300"
          >
            Discuss collaboration
            <span className="text-xs">→</span>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}