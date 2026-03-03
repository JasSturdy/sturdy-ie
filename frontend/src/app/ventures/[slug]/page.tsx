import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { FooterSection } from "../../../components/FooterSection";
import { getVentureBySlug, STATUS_STYLES } from "../../../lib/ventures";

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

export default async function VentureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = await getVentureBySlug(slug);
  if (!venture) notFound();

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
          <Link
            href="/ventures"
            className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
          >
            ← Back to ventures
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${STATUS_STYLES[venture.status]}`}
            >
              {venture.status}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
            {venture.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            {venture.headerIntro}
          </p>
        </div>
      </section>

      {/* Content sections */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 md:px-10 md:py-16 lg:px-0">
          <SectionBlock label="Venture Overview"        body={venture.ventureOverview}     />
          <SectionBlock label="Problem Space"           body={venture.problemSpace}         />
          <SectionBlock label="Innovation Direction"    body={venture.innovationDirection}  />
          <SectionBlock label="Data & Analytics Dimension" body={venture.dataAnalytics}    />
          <SectionBlock label="Collaboration Opportunities" body={venture.collaboration}   />
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 md:px-10 md:py-16 lg:px-0">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Interested in collaborating?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
            Open to aligned research and innovation partners exploring pilots,
            co-development, or ecosystem initiatives.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c5f018] px-8 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/30 transition hover:-translate-y-[1px] hover:bg-lime-300"
          >
            Discuss partnership
            <span className="text-xs">→</span>
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}