import Link from "next/link";

const EXPERTISE_ITEMS = [
  {
    title: "Governance & Compliance",
    body: "Operationalising regulatory frameworks into deployable environments with assurance, auditability, and defensible controls.",
  },
  {
    title: "Sovereign Data Infrastructure",
    body: "Designing mission-critical platforms aligned to resilience, security, and long-term operational integrity.",
  },
  {
    title: "Secure Collaboration",
    body: "Enabling cross-organisation collaboration through governed access models, secure environments, and trust boundaries.",
  },
  {
    title: "Interoperability & Data Exchange",
    body: "Implementing standards-led architectures so data can be securely shared, understood, and reused across ecosystems.",
  },
];

export function ExpertiseSection() {
  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          {/* Left: heading and 2x2 grid */}
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              Governance-led transformation in regulated ecosystems
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 md:text-base">
              I design governance-aligned environments that enable organisations to
              modernise securely, collaborate responsibly, and operationalise
              sensitive data at scale.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {EXPERTISE_ITEMS.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/80 px-6 py-7 shadow-[0_0_0_1px_rgba(24,24,27,0.6)]"
                >
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#c5f018]/70 bg-[#c5f018]/10">
                    <span className="h-5 w-5 rounded-full border border-[#c5f018]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-300 md:text-sm">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: image, copy and CTA */}
          <div className="space-y-6 lg:space-y-8">
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
              <div className="h-64 w-full bg-[url('https://images.pexels.com/photos/1181567/pexels-photo-1181567.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center md:h-80" />
            </div>
            <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
              Executive delivery across public sector, financial services, and
              health—bridging innovation ambition with regulator-grade execution.
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5f018] bg-transparent px-7 py-3 text-sm font-semibold text-[#c5f018] transition hover:bg-[#c5f018] hover:text-black"
            >
              Discuss Collaboration
              <span className="text-xs">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

