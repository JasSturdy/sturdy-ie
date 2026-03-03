import Link from "next/link";

export function CollaborationCtaSection() {
  return (
    <section className="border-b border-zinc-900/60">
      <div className="relative overflow-hidden bg-zinc-950">
        {/* Diagonal stripes background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 42px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-0">
          <div className="max-w-2xl space-y-5">
            <h2 className="text-3xl font-semibold leading-tight text-[#c5f018] md:text-4xl">
              Exploring
              <br />
              <span className="font-bold text-white">Collaboration</span>?
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
              Open to partnerships across research, regulated innovation, and
              venture initiatives where secure environments, governance, and
              standards-aligned exchange are critical.
            </p>
            <button
               ><Link
               type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#c5f018] px-7 py-3.5 text-sm font-semibold text-black shadow-md shadow-lime-300/20 transition hover:-translate-y-[1px] hover:bg-lime-300"
              href="/contact"
            >
              <span>Get in touch</span>
              <span className="text-xs">&#8599;</span>
            </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
