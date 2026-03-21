const VENTURES = [
  {
    indexLabel: "01",
    title: "Governance by Design",
    body: "Embedding policy and control into system architecture",
    bars: 1,
  },
  {
    indexLabel: "02",
    title: "Standards-Led Infrastructure",
    body: "Aligning systems with regulatory frameworks",
    bars: 2,
  },
  {
    indexLabel: "03",
    title: "Institutional Collaboration",
    body: "Enabling trusted data exchange across organisations",
    bars: 3,
  },
];

export function VenturesSection() {
  return (
    <section className="mx-auto max-w-8xl bg-black px-4 py-8 md:px-4 lg:px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VENTURES.map((v) => (
          <article
            key={v.title}
            className="group flex flex-col justify-between rounded-xl border border-transparent bg-zinc-800/80 p-8 transition-all duration-1000 hover:border-[#c5f018] hover:shadow-sm hover:shadow-white"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-3xl font-light tabular-nums text-white md:text-5xl">
                {v.indexLabel}
              </h3>
              <div className="flex gap-1 pt-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-6 w-[3px] ${i <= v.bars ? "bg-[#c5f018]" : "bg-zinc-600"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-2 md:mt-12">
              <h4 className="text-xl text-white transition-colors md:text-2xl">
                {v.title}
              </h4>
              <p className="mt-4 text-xs leading-relaxed text-white md:text-sm">
                {v.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
