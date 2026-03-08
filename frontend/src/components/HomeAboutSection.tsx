import Link from "next/link";

export function HomeAboutSection() {
  return (
    <section className="relative z-10 border-b border-zinc-900/60 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:px-10 md:py-20 lg:px-0">
        {/* Hero Profile Card */}
        <div className="max-w-sm space-y-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-lime-300/80">
              Profile
            </span>
          </div>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Jason Sturdy
          </h2>
          <p className="text-sm font-semibold text-lime-300/90">
            Technology, Data &amp; Governance Transformation Executive
          </p>
          <p className="text-base font-semibold text-white">
            Standards-aligned. Audit-ready. Built for regulated delivery.
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            Sovereign infrastructure, secure collaboration, and governance-led
            execution across complex ecosystems.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/30 transition hover:-translate-y-[1px] hover:bg-lime-300"
          >
            Read More
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {/* About paragraphs */}
        <div className="max-w-2xl space-y-4 text-[0.95rem] leading-relaxed text-zinc-300">
          <p>
            I lead large-scale technology, data, and governance transformation
            across regulated environments—focusing on sovereign data infrastructure,
            secure collaboration platforms, and delivery models that stand up to
            regulatory scrutiny.
          </p>
          <p>
            I work at the intersection of executive strategy and operational
            execution, helping organisations modernise platforms, enable trusted
            data use, and collaborate responsibly across public sector, financial
            services, and health ecosystems.
          </p>
        </div>
      </div>
    </section>
  );
}