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
    <section className="overflow-visible mx-auto max-w-8xl md:justify-center md:px-12">
      <div className=" px-4 py-10 sm:px-6 lg:px-0 lg:overflow-x-auto"
      style={{ opacity: 0, animation: 'fadeUp 0.8s ease-out 0.2s forwards' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row">
          {CAPABILITIES.map((card, index) => (
            <div
              key={index}
              className="group w-full lg:w-87 lg:shrink-0 p-7 border border-white/15 transition-all duration-600 cursor-pointer hover:-translate-y-10"
            >
              <article className={`relative h-56 w-full overflow-hidden rounded-lg bg-zinc-950/80 min-[360px]:h-64 sm:h-80 md:h-96 lg:h-110 ${index === 3 || index === 0 ? 'pt-40' : ''}`}>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 lg:shrink-0 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-5">

                  {index === 1 && (
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center overflow-hidden gap-4">
                        <span className="h-3 w-3 bg-[#c5f018]" />
                        <span className="text-2xl text-white">Ireland</span>
                      </div>
                      <div className="self-end text-right">
                        <p className="text-lg text-white">27 Greenfield Ave,</p>
                        <p className="text-lg text-white">Dublin, Ireland</p>
                      </div>
                    </div>
                  )}

                  {index === 0 && (
                    <>
                      <div className="absolute inset-6 border border-white/60 pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 bg-white p-8 flex justify-end gap-4">
                        <span className="text-3xl font-semibold text-black">90%</span>
                        <span className="text-sm text-black leading-tight">Customer<br />satisfaction</span>
                      </div>
                    </>
                  )}

                  {index === 3 && (
                    <>
                      <div className="absolute inset-6 border border-white/60 pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 bg-white p-8 flex justify-end gap-4">
                        <span className="text-3xl font-semibold text-black">90%</span>
                        <span className="text-sm text-black leading-tight">Customer<br />satisfaction</span>
                      </div>
                    </>
                  )}

                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}