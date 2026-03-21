"use client";

import { useEffect, useRef, useState } from "react";

type CardVariant = "frameWhite" | "limeSplit" | "frostBand" | "frameAccent";

type FocusCard = {
  img: string;
  title: string;
  description: string;
  variant: CardVariant;
};

const FOCUS_CARDS: FocusCard[] = [
  {
    img: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Data Governance & Compliance",
    description:
      "Translating policy, regulation, and standards into working systems",
    variant: "frameWhite",
  },
  {
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Security Architecture",
    description:
      "Designing environments with control, access, and resilience built in",
    variant: "limeSplit",
  },
  {
    img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Data Infrastructure",
    description:
      "Enabling integration, interoperability, and structured data exchange",
    variant: "frostBand",
  },
  {
    img: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Operating Models & Delivery",
    description:
      "Operating Models & Delivery",
    variant: "frameAccent",
  },
];

function CardInterior({
  card,
  index,
}: {
  card: FocusCard;
  index: number;
}) {
  const { title, description, variant } = card;

  switch (variant) {
    case "frameWhite":
      return (
        <>
          <div className="pointer-events-none absolute inset-4 border border-white/60 sm:inset-6" />
          <div className="absolute bottom-4 left-4 right-4 z-[1] sm:bottom-6 sm:left-6 sm:right-6">
            <div className="bg-white p-3 sm:p-5 md:p-6 transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px]">
              <div className="ml-auto flex max-w-full flex-col items-end gap-2 text-right sm:max-w-[min(100%,22rem)]">
                <span className="text-base font-semibold leading-snug text-black sm:text-lg md:text-2xl lg:text-2xl [overflow-wrap:anywhere]">
                  {title}
                </span>
                <span className="text-[0.7rem] leading-snug text-black/80 sm:text-xs md:text-sm [overflow-wrap:anywhere]">
                  {description}
                </span>
              </div>
            </div>
          </div>
        </>
      );

    case "limeSplit":
      return (
        <div className="relative z-[1] flex h-full min-h-0 flex-col justify-between gap-4 transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px]">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-1.5 h-3 w-3 shrink-0 bg-[#c5f018] transition-transform duration-500 group-hover/card:scale-110" />
            <span className="min-w-0 text-base font-medium leading-snug text-white sm:text-lg md:text-2xl lg:text-2xl [overflow-wrap:anywhere]">
              {title}
            </span>
          </div>
          <p className="mt-auto self-stretch text-right text-xs leading-relaxed text-white/90 sm:self-end sm:max-w-[95%] sm:text-sm md:text-lg [overflow-wrap:anywhere]">
            {description}
          </p>
        </div>
      );

    case "frostBand":
      return (
        <div className="relative z-[1] mt-auto w-full transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px]">
          <div className="border-t border-[#c5f018]/70 bg-zinc-950/80 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
            <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#c5f018] sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mb-2 text-sm font-semibold leading-snug text-white sm:text-base md:text-2xl [overflow-wrap:anywhere]">
              {title}
            </h3>
            <p className="text-[0.7rem] leading-relaxed text-zinc-300 sm:text-xs md:text-sm [overflow-wrap:anywhere]">
              {description}
            </p>
          </div>
        </div>
      );

    case "frameAccent":
      return (
        <>
          <div className="pointer-events-none absolute inset-4 border border-white/40 sm:inset-6" />
          <div className="absolute bottom-4 left-4 right-4 z-[1] sm:bottom-6 sm:left-6 sm:right-6">
            <div className="mr-auto max-w-[min(100%,20rem)] border-l-4 border-[#c5f018] bg-white/95 p-3 shadow-lg transition-transform duration-500 ease-out group-hover/card:translate-y-[-2px] sm:p-5">
              <h3 className="mb-2 text-base font-semibold leading-snug text-black sm:text-lg md:text-2xl lg:text-2xl [overflow-wrap:anywhere]">
                {title}
              </h3>
              <p className="text-left text-[0.7rem] leading-relaxed text-black/75 sm:text-xs md:text-sm [overflow-wrap:anywhere]">
                {description}
              </p>
            </div>
          </div>
        </>
      );

    default:
      return null;
  }
}

export function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="mx-auto max-w-8xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16"
    >
      {/* Focus — intro (replaces former HomeAbout block) */}
      <div
        className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-start md:justify-center md:gap-10 lg:mb-14"
        style={{
          opacity: visible ? undefined : 0,
          animation: visible ? "fadeUp 1s ease forwards" : "none",
        }}
      >
        <div className="space-y-5 md:max-w-xl">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-sm bg-[#c5f018]"
              style={{ animation: "dotPulse 1s ease-in-out infinite" }}
            />
            <span className="text-sm text-white md:text-lg">Focus</span>
          </div>
          <h2 className="text-2xl leading-tight text-white md:text-5xl lg:text-6xl">
            Current Areas of{" "}
            <span className="font-semibold text-[#c5f018]">Work</span>
          </h2>
        </div>
        <div className="space-y-4 text-[0.95rem] leading-relaxed text-zinc-300 md:max-w-xl md:flex-1">
          <p className="text-base md:text-lg">
            Across public sector, financial services, and health systems, organisations operate under increasing regulatory expectations while managing complex data environments.
            The challenge is not a lack of data or policy. It is making both work together in practice.
          </p>
          <p className="text-base md:text-lg">
            My work focuses on bridging that gap, designing systems and operating models that align governance, infrastructure, and day-to-day use.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {FOCUS_CARDS.map((card, index) => {
          const framedTop =
            card.variant === "frameWhite" || card.variant === "frameAccent";

          return (
            <div
              key={card.title}
              className="group border border-white/15 p-3 transition-all duration-500 sm:p-5 cursor-pointer hover:-translate-y-4"
              style={{
                opacity: visible ? undefined : 0,
                animation: visible ? "fadeUp 0.75s ease forwards" : "none",
                animationDelay: visible ? `${120 + index * 95}ms` : "0ms",
              }}
            >
              <article
                className={`group/card relative w-full overflow-hidden rounded-lg bg-zinc-950/80 h-64 sm:h-80 md:h-96 lg:h-[28rem] ${
                  framedTop ? "pt-32 lg:pt-40" : ""
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="relative flex h-full min-h-0 flex-col justify-between p-4 sm:p-5">
                  <CardInterior card={card} index={index} />
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
