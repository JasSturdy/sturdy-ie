"use client";
import { useRef, useEffect } from "react";

const CAPABILITIES = [
  {
    title: "20+ years delivering in regulated environments",
    img: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Trusted Research Environment design & operation",
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Federated collaboration and privacy-preserving analytics models",
    img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Federated collaboration and privacy-preserving analytics models",
    img: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Governance automation, assurance, and auditability (RegTech)",
    img: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function CapabilitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="border-b border-zinc-900/60 bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            Capabilities in regulated environments
          </h2>
          <p className="hidden text-xs text-zinc-400 md:block">
            Scroll right to explore more.
          </p>
        </div>
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:overscroll-x-contain md:scroll-touch md:min-w-0 [&::-webkit-scrollbar]:hidden"
        >
          {CAPABILITIES.map((card) => (
            <article
              key={card.title}
              className="relative h-56 w-full shrink-0 overflow-hidden rounded-none border border-zinc-800 bg-zinc-950/80 min-[360px]:h-64 md:h-80 md:w-80"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-5">
                <span className="h-3 w-3 rounded-sm bg-[#c5f018]" />
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}