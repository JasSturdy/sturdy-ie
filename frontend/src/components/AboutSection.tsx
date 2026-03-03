import Link from "next/link";

export function AboutSection() {
  return (
    <section className="relative z-10 bg-black overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-52 lg:px-0">
        {/* outer corner arcs */}
        <div className="pointer-events-none absolute -left-100 top-4 hidden h-88 w-88 rounded-full mr-[50px] border-[50px] border-zinc-700/60 md:block" />
        <div className="pointer-events-none absolute -right-100 -bottom-6 hidden h-88 w-88 rounded-full border-[50px] border-zinc-700/60 md:block" />

        {/* Top border line - right half only */}
        <div className="mb-16 flex">
          <div className="flex-1" />
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        {/* Main Content Grid */}
        <div className="relative mb-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - About Heading */}
          <div>
            <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              About
            </h1>
          </div>

          {/* Right - Subtitle */}
          <div className="flex items-center justify-end">
            <p className="max-w-xl text-center text-lg leading-relaxed text-white md:text-xl">
              Building trusted environments for secure data collaboration and
              regulated innovation.
            </p>
          </div>
        </div>

        {/* Bottom border line - left half only */}
        <div className="mt-16 flex gap-4 items-center">
          <div className="h-px flex-1 bg-zinc-700" />
          <div className="flex h-10 w-10 items-center justify-center text-lime-200">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-[#c5f018]"
                  aria-hidden="true"
                >
                  <g
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
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

