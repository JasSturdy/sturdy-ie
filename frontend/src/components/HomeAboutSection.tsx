export function HomeAboutSection() {
  return (
    <section className="relative overflow-visible md:justify-center mx-auto flex max-w-8xl flex-col md:flex-row gap-8 md:gap-30 py-8 md:px-6 md:py-16">
        {/* Hero Profile Card */}
        <div className="space-y-5"
        style={{ opacity: 0, animation: 'fadeUp 0.8s ease-out 0.2s forwards' }}>
          <div className="flex items-center gap-2 px-8">
            <span className="h-2 w-2 rounded-sm bg-[#c5f018]"
              style={{ animation: 'dotPulse 1s ease-in-out infinite' }} />
            <span className="text-sm md:text-lg text-white">
              Focus
            </span>
          </div>
          <h2 className="text-2xl px-8 leading-tight text-white md:text-6xl">
            Current Areas of <span className="text-[#c5f018] font-semibold">Work</span>
          </h2>
        </div>

        {/* About paragraphs */}
        <div className="px-8 md:px-16 space-y-4 text-[0.95rem] leading-relaxed text-zinc-300">
          <p className="text-lg">
            My work focuses on designing trusted digital infrastructure that enables institutions to govern, exchange, and analyse complex data ecosystems.
          </p>
          <p className="text-lg">
            This includes platforms and frameworks that support secure collaboration, regulatory alignment, and responsible data innovation across healthcare, research, financial systems, and the public sector.
          </p>
        </div>
    </section>
  );
}