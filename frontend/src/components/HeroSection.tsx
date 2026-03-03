import Image from "next/image";
import jasonPortrait from "@/img/jason.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-900/60 bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(205,255,7,0.35)_0%,rgba(197,240,24,0.18)_35%,transparent_70%)] blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0 lg:py-24">
        {/* outer corner arcs */}
        <div className="pointer-events-none absolute -left-100 top-16 hidden h-88 w-88 rounded-full mr-[50px] border-[50px] border-zinc-700/60 md:block" />
        <div className="pointer-events-none absolute -right-100 -bottom-10 hidden h-88 w-88 rounded-full border-[50px] border-zinc-700/60 md:block" />

        <div className="relative flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left copy */}
          <div className="max-w-xl space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-lime-300/80">
              Data Governance & Compliance
            </p>

            <div className="h-px w-16 bg-zinc-600/70" />

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
              <span>Data Governance &amp;</span>
              <br />
              <span>Regulatory</span>
              <br />
              <span>Compliance Advisor</span>
            </h1>

            <div className="space-y-3 text-[0.95rem] leading-relaxed text-zinc-200">
              <p>
                Designing secure data collaboration environments, regulatory-aligned
                platforms, and trusted research ecosystems across highly regulated
                industries.
              </p>
              <p className="text-zinc-300">
                Operating at the intersection of governance, secure data environments,
                and regulated innovation to enable privacy-first collaboration and
                institutional trust.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-[#c5f018] px-7 py-3 text-sm font-semibold text-black shadow-md shadow-lime-300/40 transition hover:-translate-y-[1px] hover:bg-lime-300"
              >
                <span>Explore Case Studies</span>
                <span className="text-xs">↗</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-lime-400/70 bg-transparent px-7 py-3 text-sm font-semibold text-lime-300 shadow-[0_0_0_1px_rgba(34,197,94,0.3)] transition hover:-translate-y-[1px] hover:border-lime-300 hover:bg-black/40"
              >
                <span>View Ventures</span>
                <span className="text-xs">↗</span>
              </button>
            </div>

            {/* divider line and star accent */}
            <div className="relative mt-10 flex items-center">
              {/* line starts at left of text column and runs into the star */}
              <div className="h-[1px] flex-1 bg-zinc-400/70" />
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
            </div>
          </div>

          {/* Right image */}
          <div className="relative mx-auto mt-10 flex items-center justify-center lg:mt-0 lg:flex-1 lg:justify-end">
            <div className="pointer-events-none absolute inset-0 blur-3xl" />

            <div className="relative h-[280px] w-[220px] min-[400px]:h-[360px] min-[400px]:w-[270px] sm:h-[460px] sm:w-[320px] md:h-[500px] md:w-[360px] lg:h-[520px] lg:w-[380px]">
              <div className="relative object-contain scale-[2] h-full w-full overflow-hidden bg-transparent">
                <Image
                  src={jasonPortrait}
                  alt="Portrait of Jason Sturdy"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-lime-300/80">
                  Jason Sturdy
                </p>
                <p className="mt-1 text-sm text-zinc-100">
                  Data Governance & Compliance Advisor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

