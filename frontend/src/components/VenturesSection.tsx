import Link from "next/link";
import { VentureIndex, STATUS_STYLES } from "../lib/ventures";

export function VenturesSection({ ventures }: { ventures: VentureIndex[] }) {
  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Ventures &amp; Initiatives
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            Innovation initiatives exploring preventive health, data ecosystems,
            and next-generation collaboration platforms through secure
            infrastructure and analytics-driven models.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ventures.map((v) => (
            <Link
              key={v.slug}
              href={`/ventures/${v.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 transition hover:border-zinc-700"
            >
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
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/ventures"
            className="inline-flex items-center gap-2 rounded-full border border-[#c5f018] bg-transparent px-6 py-3 text-sm font-semibold text-[#c5f018] transition hover:bg-[#c5f018] hover:text-black"
          >
            Explore all ventures
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}