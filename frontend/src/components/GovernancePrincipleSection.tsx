"use client";

import { useEffect, useRef, useState } from "react";

const PRINCIPLES = [
  {
    number: "01",
    title: "See Responsibly",
    body: "Understanding data environments, governance risks, and institutional responsibilities through visibility, auditability, and oversight. Secure collaboration requires environments that are observable and reviewable.",
  },
  {
    number: "02",
    title: "Hear Transparently",
    body: "Listening to regulatory, institutional, and societal expectations surrounding data use. Governance must integrate ethics, policy, and stakeholder accountability into delivery.",
  },
  {
    number: "03",
    title: "Speak Accountably",
    body: "Communicating clearly how data is governed, protected, and operationalised. Transparency strengthens trust and enables responsible collaboration.",
  },
];

export function GovernancePrincipleSection() {
  const [isInView, setIsInView] = useState(false);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-b border-zinc-900/60 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-0">
        {/* Top: text + images */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          {/* Left column */}
          <div className="max-w-lg space-y-5 md:pt-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              The Governance <span className="text-[#c5f018]">Principle</span>
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300">
              The traditional &ldquo;Three Wise Monkeys&rdquo; symbol has often been
              interpreted as ignoring wrongdoing &mdash; see no evil, hear no evil,
              speak no evil.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              In regulated data environments, that philosophy is neither acceptable
              nor responsible.
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              Instead, this analogy is reframed as a governance model for visibility,
              transparency, and accountability &mdash; enabling innovation without
              compromising institutional trust.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-[#c5f018] hover:text-[#c5f018]"
            >
              Contact me
              <span className="text-xs">&#8599;</span>
            </button>
          </div>

          {/* Right column — image stack */}
          <div className="flex min-w-0 flex-1 justify-center">
            <div
              ref={stackRef}
              className="relative mx-auto w-full max-w-[500px]"
              style={{ aspectRatio: "500/320" }}
            >
              {/* Back card — top-left when expanded, bottom-right when collapsed */}
              <div
                className="absolute rounded-2xl bg-cover bg-center shadow-xl transition-all duration-700 ease-out"
                style={{
                  width: "52%",
                  height: "62.5%",
                  top: 0,
                  left: 0,
                  backgroundImage: `url('https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=800')`,
                  transform: isInView
                    ? "translateX(0) translateY(0)"
                    : "translateX(92.3%) translateY(60%)",
                  opacity: isInView ? 0.85 : 0.3,
                }}
              />

              {/* Middle card — center when expanded, bottom-right when collapsed */}
              <div
                className="absolute rounded-2xl bg-cover bg-center shadow-2xl transition-all duration-700 ease-out"
                style={{
                  width: "52%",
                  height: "62.5%",
                  top: "18.75%",
                  left: "24%",
                  backgroundImage: `url('https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800')`,
                  transitionDelay: "150ms",
                  transform: isInView
                    ? "translateX(0) translateY(0)"
                    : "translateX(46.2%) translateY(30%)",
                  opacity: isInView ? 0.92 : 0.3,
                }}
              />

              {/* Front card — bottom-right when expanded, stays bottom-right when collapsed */}
              <div
                className="absolute rounded-2xl bg-cover bg-center shadow-2xl transition-all duration-700 ease-out"
                style={{
                  width: "52%",
                  height: "62.5%",
                  bottom: 0,
                  right: 0,
                  backgroundImage: `url('https://images.pexels.com/photos/1526492/pexels-photo-1526492.jpeg?auto=compress&cs=tinysrgb&w=800')`,
                  transitionDelay: "300ms",
                  transform: "translateX(0) translateY(0)",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom: three principle cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((item) => (
            <article
              key={item.number}
              className="flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold text-white">
                  {item.number}
                </span>
                <div className="flex items-center gap-1">
                  <span className="h-6 w-[3px] rounded-full bg-[#c5f018]" />
                  <span className="h-5 w-[3px] rounded-full bg-[#c5f018]/40" />
                  <span className="h-4 w-[3px] rounded-full bg-zinc-600" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-300">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
