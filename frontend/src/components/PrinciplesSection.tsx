const PRINCIPLES = [
  {
    number: "01",
    title: "See Responsibly",
    body: "Understanding data environments, governance risks, and institutional responsibilities through visibility, auditability, and oversight.",
  },
  {
    number: "02",
    title: "Hear Transparently",
    body: "Listening to regulatory, institutional and societal expectations surrounding data use. Governance must integrate ethics, policy and stakeholder accountability into delivery.",
  },
  {
    number: "03",
    title: "Speak Accountably",
    body: "Communicating clearly how data is governed, protected and operationalised. Transparency strengthens trust and enables responsible collaboration.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="border-b border-zinc-900/60 bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20 lg:px-0">
        <div className="grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((item) => (
            <article
              key={item.number}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">
                  {item.number}
                </span>
                <div className="flex items-center gap-1">
                  <span className="h-6 w-[2px] bg-[#c5f018]" />
                  <span className="h-4 w-[2px] bg-zinc-500" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-300">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

