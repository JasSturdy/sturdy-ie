const FOCUS_ITEMS = [
  {
    title: "Governance & Compliance",
    body: "Regulation-aligned design through delivery.",
  },
  {
    title: "Security & Privacy Architecture",
    body: "Enabling innovation through privacy-preserving collaboration.",
  },
  {
    title: "Research Collaboration",
    body: "Federated environments enabling trusted research at scale.",
  },
  {
    title: "Interoperability & Data Exchange",
    body: "Standards-driven frameworks for secure data interoperability.",
  },
];

export function GovernanceFocusSection() {
  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-0">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            <span className="text-[#c5f018]">Governance &amp; Collaboration</span>{" "}
            Focus
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">
            My work focuses on designing secure, governance-aligned environments
            that enable institutions to collaborate and innovate responsibly across
            regulated ecosystems.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FOCUS_ITEMS.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-gradient-to-tr from-zinc-950 to-slate-950/60 p-6"
            >
              <div className="mb-1 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-lime-400/70 bg-lime-400/10">
                  <span className="h-3 w-3 rotate-45 border border-lime-300" />
                </div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-zinc-300">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

