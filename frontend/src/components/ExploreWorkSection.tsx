import Link from "next/link";

const cards = [
  {
    label: "Explore Case Studies",
    href: "/case-studies",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Read Writing & Insights",
    href: "/writing",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    label: "Discuss Partnership",
    href: "/contact",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export function ExploreWorkSection() {
  return (
    <section className="relative z-10 bg-black overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 lg:px-0">
        {/* Heading */}
        <h2 className="mb-16 text-center text-2xl font-bold text-white md:text-3xl">
          Explore My Work
        </h2>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group block border border-zinc-800 bg-black p-3 aspect-video"
            >
              {/* Inner image wrapper — fills padded area with gap from border */}
              <div className="relative h-full w-full overflow-hidden">
                {/* Background image */}
                <img
                  src={card.image}
                  alt={card.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-100"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

                {/* Centered label */}
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white drop-shadow-lg">
                    {card.label}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-[#c5f018] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                </div>
              </div>
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