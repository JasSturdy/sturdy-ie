import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { getVenturesIndex, STATUS_STYLES } from "../../lib/ventures";
export const dynamic = "force-dynamic";

export default async function VenturesPage() {
  const ventures = await getVenturesIndex();

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-lime-300/80">
              Ventures
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
            Ventures &amp; Initiatives
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Innovation initiatives exploring preventive health, analytics, and
            secure data ecosystems—applying governance-first infrastructure
            principles to emerging platform and optimisation models.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 md:px-10 md:py-16 lg:grid-cols-3 lg:px-0">
          {ventures.map((v) => (
            <Link
              key={v.slug}
              href={`/ventures/${v.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden transition hover:border-zinc-700"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                {v.img?.url ? (
                  <img
                    src={v.img.url}
                    alt={v.img.alt || v.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-700 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 justify-between p-6">
                <div>
                  <span
                    className={`inline-block rounded-full border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${STATUS_STYLES[v.status]}`}
                  >
                    {v.status}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white transition-colors group-hover:text-[#c5f018]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {v.overview}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-[#c5f018]">
                  View details <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}