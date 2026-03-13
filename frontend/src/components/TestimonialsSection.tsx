"use client";

import { useState } from "react";
import Link from "next/link";

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
    <section className="py-8 px-8 md:px-16 mx-auto max-w-8xl">
      <div className="flex justify-center items-center gap-2 py-4">
        <span
          className="h-2 w-2 rounded-sm bg-[#c5f018]"
          style={{ animation: 'dotPulse 1s ease-in-out infinite' }}
        />
        <span className="text-sm md:text-lg text-white">Testimonials</span>
      </div>
      <h2 className="mb-12 text-center text-3xl font-light text-white md:mb-16 md:text-6xl">
        What our <span className="font-semibold text-[#c5f018]">clients say</span>
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
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-300 sm:h-16 sm:w-16 md:h-20 md:w-20 ${isActive
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
        <div className="flex-[1] rounded-3xl border border-[#c5f018] p-[1px]">
          <div className="flex h-full flex-col justify-between rounded-[1.4rem] bg-[#395407] px-8 py-10 md:px-10 md:py-12 relative overflow-hidden">
            {/* top center glow */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-48 bg-[radial-gradient(circle,rgba(197,240,24,0.65)_0%,transparent_70%)] blur-2xl" />
            <div className="relative p-4 md:p-10">
              <h3 className="text-2xl font-light text-white md:text-4xl">
                {active.name}
              </h3>
              <p className="mt-2 md:mt-4 text-sm font-light text-[#c5f018] md:text-base">
                {active.title}
              </p>
              <p className="mt-8 text-sm leading-relaxed text-zinc-200 md:text-lg md:leading-relaxed">
                {active.quote}
              </p>
            </div>
            <div className="relative mt-10 flex px-8 md:px-10 items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`inline-block text-4xl ${idx < active.stars ? "text-[#c5f018]" : "text-zinc-600"
                    }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Need consulting card */}
        <div
          className="flex-[1] max-w-sm flex flex-col justify-between rounded-3xl px-8 py-10 md:px-10 md:py-12 relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-contact.png')" }}
        >
          <div className="pointer-events-none absolute inset-0" />
          <div className="relative space-y-6">
            {/* Icon */}
            <div className="flex items-center">
              <img src="/contact.svg" alt="Contact icon" className="h-16 w-16" />
            </div>
            <div>
              <h3 className="text-2xl font-light text-white md:text-3xl">
                Need consulting?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white">
                Get expert guidance with clear direction to choose the right solution.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="relative flex gap-2 justify-center rounded-lg bg-[#c5f018] px-6 py-4 text-lg font-medium text-black transition duration-300 hover:border hover:border-white hover:text-[#c5f018] hover:bg-black"
          >
            Contact Us ↗
          </Link>
        </div>
      </div>
    </section>
  );
}