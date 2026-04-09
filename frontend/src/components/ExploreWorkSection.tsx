import Link from "next/link";

const cards = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/myinsights" },
  { label: "Leadership Papers", href: "/leadership-papers" },
];

export function ExploreWorkSection() {
  return (
    <section className="relative z-10 overflow-hidden">
      <div className="relative mx-auto max-w-8xl px-4 py-24 sm:px-6 md:px-10 lg:px-4">
        {/* Heading */}
        <h2 className="mb-16 text-center text-2xl font-light text-white lg:text-6xl md:text-6xl">
          Explore My Work
        </h2>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group flex min-h-[11rem] items-center justify-center gap-3 border border-zinc-800 bg-gradient-to-b from-zinc-950/90 to-black px-6 py-10 transition-all duration-300 hover:border-[#c5f018]/45 hover:shadow-[0_0_40px_-8px_rgba(197,240,24,0.2)] sm:min-h-[12rem] md:gap-4"
            >
              <span className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {card.label}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 shrink-0 text-[#c5f018] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-8 sm:w-8 md:h-9 md:w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          ))}
        </div>
        {/* Bottom border line with icon */}
        <div className="mt-16 flex gap-4 items-center">
          <div className="h-px flex-1 bg-zinc-700" />
          <div className="flex h-10 w-10 items-center justify-center text-lime-200">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-[#c5f018]"
              aria-hidden="true"
            >
              <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="12" y1="4" x2="12" y2="20" />
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </g>
            </svg>
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </section>
  );
}