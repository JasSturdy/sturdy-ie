"use client";

const CAPABILITIES = [
  {
    img: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    img: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function CapabilitiesSection() {
  return (
    <section
      className="mx-auto max-w-8xl"
      style={{ opacity: 0, animation: "fadeUp 0.8s ease-out 0.2s forwards" }}
    >
      {/* Mobile/Tablet: 2-col grid | Desktop: 4-col equal flex */}
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {CAPABILITIES.map((card, index) => (
          <div
            key={index}
            className="group border border-white/15 p-3 sm:p-5 transition-all duration-500 cursor-pointer hover:-translate-y-4"
          >
            <article
              className={`relative w-full overflow-hidden rounded-lg bg-zinc-950/80 h-56 sm:h-72 md:h-80 lg:h-[28rem] ${
                index === 3 || index === 0 ? "pt-32 lg:pt-40" : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">

                {index === 1 && (
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 shrink-0 bg-[#c5f018]" />
                      <span className="text-lg sm:text-2xl text-white">Ireland</span>
                    </div>
                    <div className="self-end text-right">
                      <p className="text-sm sm:text-lg text-white">27 Greenfield Ave,</p>
                      <p className="text-sm sm:text-lg text-white">Dublin, Ireland</p>
                    </div>
                  </div>
                )}

                {(index === 0 || index === 3) && (
                  <>
                    <div className="absolute inset-4 sm:inset-6 border border-white/60 pointer-events-none" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white p-4 sm:p-6 flex justify-end gap-3">
                      <span className="text-2xl sm:text-3xl font-semibold text-black">90%</span>
                      <span className="text-xs sm:text-sm text-black leading-tight">Customer<br />satisfaction</span>
                    </div>
                  </>
                )}

              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}