import React from "react";

const ShieldCheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-10 w-10"
    fill="none"
    stroke="#c5f018"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const cards = [
  {
    title: "Research Collaboration Partnerships",
    description:
      "Engaging with academic institutions and research bodies to design trusted environments enabling secure, compliant data collaboration.",
  },
  {
    title: "Platform & Infrastructure Partnerships",
    description:
      "Collaborating on secure data platforms, federated analytics environments, and interoperability-aligned ecosystems.",
  },
  {
    title: "Venture Co-Development",
    description:
      "Partnering on preventive health and data-driven optimisation initiatives, grounded in secure infrastructure and governance alignment.",
  },
  {
    title: "Standards & Governance Initiatives",
    description:
      "Supporting interoperability, regulatory alignment, and governance frameworks across sensitive data ecosystems.",
  },
];

export function PartnershipsCardSection() {
  return (
    <section className="relative z-10 bg-black overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 lg:px-0">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
          <span className="text-sm font-medium text-white tracking-wide">
            Partnership
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-4xl font-bold text-white md:text-5xl mb-6">
          Partnership Focus Areas
        </h2>

        {/* Subtitle */}
        <p className="mx-auto max-w-5xl text-center text-base leading-relaxed text-white md:text-lg mb-16">
          I collaborate with organisations seeking to design, build, or explore
          secure data environments, research collaboration platforms, and
          governance-aligned innovation initiatives. Partnerships are approached
          strategically, focusing on long-term ecosystem value rather than
          transactional service delivery.
        </p>

        {/* Cards Grid — 4 cards, 2 columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 px-8 py-10 flex flex-col items-center text-center gap-6 hover:border-zinc-600 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-800">
                <ShieldCheckIcon />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}