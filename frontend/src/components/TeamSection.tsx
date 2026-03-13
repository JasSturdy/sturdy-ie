import { TEAM } from "@/lib/team";

export function TeamSection() {
  return (
    <section id="team" className="border-b border-zinc-900/60 bg-black mx-auto max-w-8xl px-8 py-16 md:px-16 md:py-24">
      {/* Label */}
      <div className="flex items-center justify-center gap-2 py-4">
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-[#c5f018]"
          style={{ animation: "dotPulse 1s ease-in-out infinite" }}
        />
        <span className="text-sm text-zinc-400 md:text-base">Our team</span>
      </div>

      {/* Title */}
      <h2 className="text-center text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
        Trusted consulting{" "}
        <span className="text-[#c5f018]">experts</span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-400 md:text-base">
        Our consulting team brings together industry expertise, strategic
        thinking, and proven leadership to help businesses solve challenges,
        seize opportunities, and achieve lasting success.
      </p>

      {/* Team grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <div
            key={member.slug}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-zinc-800/80 transition-colors hover:border-[#c5f018]/60"
          >
            <img
              src={member.img}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 py-8 pt-16 text-center">
              <h3 className="text-3xl font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm text-[#c5f018]">{member.role}</p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-zinc-900 border-2 border-[#c5f018] bg-zinc-950/95 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold text-white md:text-3xl">{member.name}</h3>
              <p className="mt-2 text-sm font-medium text-[#c5f018]">{member.role}</p>
              <div className="mt-8 flex-1" />
              <p className="text-sm leading-relaxed text-white">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
