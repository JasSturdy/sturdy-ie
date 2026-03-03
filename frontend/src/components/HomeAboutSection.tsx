export function HomeAboutSection() {
  return (
    <section className="relative z-10 border-b border-zinc-900/60 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:px-10 md:py-20 lg:px-0">
        <div className="max-w-sm space-y-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-lime-300/80">
              About
            </span>
          </div>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Standards-aligned. Audit-ready. Collaboration-enabled.
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#c5f018] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/30 transition hover:-translate-y-[1px] hover:bg-lime-300"
          >
            <span>Read More</span>
            <span className="text-xs">↗</span>
          </button>
        </div>

        <div className="max-w-2xl space-y-4 text-[0.95rem] leading-relaxed text-zinc-300">
          <p>
            I operate at the intersection of data governance, regulatory compliance,
            and secure infrastructure design, focusing on how sensitive data can be
            shared, analysed and operationalised within highly regulated environments.
          </p>
          <p>
            With over two decades of experience delivering enterprise data and digital
            transformation initiatives, my work centres on enabling privacy-first
            collaboration across institutional ecosystems — supporting innovation
            without compromising regulatory obligations or public trust.
          </p>
        </div>
      </div>
    </section>
  );
}