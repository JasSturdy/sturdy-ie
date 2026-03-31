import { getAboutData } from "@/lib/about";

export async function AboutSection() {
  const items = await getAboutData();
  const data = items[0];

  if (!data) return null;

  return (
    <section className="relative z-10 bg-black overflow-hidden">
      <div className="relative mx-auto max-w-8xl px-6 py-24 md:px-10 md:py-52 lg:px-0">
        <div className="pointer-events-none absolute -left-80 top-4 hidden h-88 w-88 rounded-full mr-[50px] border-[50px] border-zinc-700/60 md:block" />
        <div className="pointer-events-none absolute -right-50 -bottom-6 h-88 w-88 rounded-full border-[50px] border-zinc-700/60 md:block" />

        <div className="mb-16 flex">
          <div className="flex-1" />
          <div className="h-px flex-1 bg-zinc-700" />
        </div>

        <div className="relative mb-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h1 className="text-5xl font-light text-white md:text-6xl lg:text-7xl">
              {data.heading}
            </h1>
          </div>
          <div className="flex items-center justify-end">
            <p className="max-w-xl text-center text-lg leading-relaxed text-white md:text-xl">
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-16 flex gap-4 items-center">
          <div className="h-px flex-1 bg-zinc-700" />
          <div className="flex h-10 w-10 items-center justify-center text-lime-200">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#c5f018]" aria-hidden="true">
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