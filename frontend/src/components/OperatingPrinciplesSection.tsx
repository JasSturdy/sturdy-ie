const PRINCIPLES = [
  {
    title: "Governance by Design",
    description:
      "Embedding governance and compliance into architecture, delivery, and operations from the outset.",
  },
  {
    title: "Privacy-First Collaboration",
    description:
      "Enabling secure, governed collaboration that protects sensitive data and preserves institutional control.",
  },
  {
    title: "Standards-Led Interoperability",
    description:
      "Designing for interoperability using established standards so data can be shared and understood across boundaries.",
  },
  {
    title: "Institutional Trust",
    description:
      "Building platforms and processes that earn and sustain trust through transparency, auditability, and accountability.",
  },
  {
    title: "Responsible Innovation",
    description:
      "Advancing innovation in alignment with regulatory expectations, ethics, and long-term operational resilience.",
  },
];

export function OperatingPrinciplesSection() {
  return (
    <section className="relative z-10 border-t border-zinc-800 bg-black overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 lg:px-0">
        <h2 className="mb-12 text-2xl font-bold text-white md:text-3xl">
          Operating <span className="text-[#c5f018]">Principles</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <h3 className="text-base font-semibold text-white md:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
