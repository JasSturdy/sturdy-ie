"use client";

import { useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  title: string;
  quote: string;
  img: string;
  stars: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Poppy Eleanor",
    title: "Client Manager",
    quote:
      "Their client-focused approach strengthened our communication and trust. Every interaction was smooth, thoughtful, and aligned with our needs, helping our team operate with greater clarity, confidence, and long-lasting momentum.",
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    stars: 4,
  },
  {
    id: 2,
    name: "Michael Harris",
    title: "Programme Director",
    quote:
      "A deep understanding of governance, regulation, and delivery. They consistently translated complex requirements into practical, implementable solutions.",
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    stars: 5,
  },
  {
    id: 3,
    name: "Amrita Patel",
    title: "Chief Data Officer",
    quote:
      "Their work enabled us to accelerate sensitive data collaboration without compromising privacy, ethics, or regulatory obligations.",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    stars: 5,
  },
  {
    id: 4,
    name: "Liam O'Connor",
    title: "Head of Innovation",
    quote:
      "A rare blend of strategic thinking and delivery discipline, helping our teams align on governance while still moving quickly.",
    img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    stars: 4,
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState<Testimonial>(TESTIMONIALS[0]);

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-0">
        {/* Heading */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-white md:mb-16 md:text-5xl">
          What our <em className="not-italic text-[#c5f018]">clients say</em>
        </h2>

        <div className="flex flex-col items-stretch gap-6 md:flex-row">
          {/* Avatars card */}
          <div className="flex items-center justify-center rounded-3xl bg-zinc-900/80 px-6 py-8 sm:px-8 md:px-10 md:py-10">
            <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 md:flex-col md:flex-nowrap">
              {TESTIMONIALS.map((t) => {
                const isActive = t.id === active.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t)}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-300 sm:h-16 sm:w-16 md:h-20 md:w-20 ${
                      isActive
                        ? "border-[#c5f018] shadow-[0_0_12px_rgba(197,240,24,0.4)]"
                        : "border-zinc-700 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View testimonial from ${t.name}`}
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${t.img})` }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Testimonial card */}
          <div className="flex-1 rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-500/10 via-emerald-900/20 to-zinc-950 p-[1px]">
            <div className="flex h-full flex-col justify-between rounded-[1.4rem] bg-gradient-to-br from-zinc-950/80 via-emerald-950/30 to-zinc-950 px-8 py-10 md:px-10 md:py-12">
              <div>
                <h3 className="text-2xl font-semibold text-white md:text-4xl">
                  {active.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#c5f018] md:text-base">
                  {active.title}
                </p>

                <p className="mt-8 text-sm leading-relaxed text-zinc-200 md:text-lg md:leading-relaxed">
                  {active.quote}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block text-2xl ${
                      idx < active.stars ? "text-[#c5f018]" : "text-zinc-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
