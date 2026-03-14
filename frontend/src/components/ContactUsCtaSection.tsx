"use client";

import Link from "next/link";

const CARDS = [
  {
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    imgWidth: "w-28 md:w-44 lg:w-55",
    imgHeight: "h-40 md:h-60 lg:h-80",
    animClass: "animate-fan-left",
  },
  {
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    imgWidth: "w-36 md:w-56 lg:w-70",
    imgHeight: "h-52 md:h-72 lg:h-100",
    animClass: "animate-fan-center",
  },
  {
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400",
    imgWidth: "w-28 md:w-44 lg:w-55",
    imgHeight: "h-40 md:h-60 lg:h-80",
    animClass: "animate-fan-right",
  },
];

export function ContactUsCtaSection() {
  return (
    <section className="relative w-full px-4 sm:px-8 md:px-16">
      <div
        className="relative pt-10 sm:pt-16 md:pt-28 pb-0 rounded-xl border border-zinc-600 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, rgba(34, 56, 8, 0.95) 60%, rgba(116, 181, 19, 0.9) 100%)",
        }}
      >
        <div className="relative text-center px-4">
          <Link
            href="/contact"
            className="inline-flex gap-2 items-center justify-center rounded-lg bg-[#c5f018] px-6 sm:px-10 py-3 sm:py-4 text-sm md:text-xl sm:text-lg font-medium text-black transition duration-300 hover:border hover:border-white hover:text-[#c5f018] hover:bg-black"
          >
            Contact Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <h2 className="mt-6 sm:mt-8 text-lg sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
            Let&apos;s find the right solution
            <br />
            together.
          </h2>

          <div className="relative mt-10 sm:mt-16 md:mt-24">

            {/* Divider behind cards */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex items-center px-2 sm:px-4 z-0">
              {/* left star */}
              <div
                className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center shrink-0"
                style={{ opacity: 0, animation: 'fade-in-star-left 4s ease-out infinite' }}
              >
                <div className="relative w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center">
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018]" />
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018] rotate-60" />
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018] -rotate-60" />
                </div>
              </div>

              {/* line */}
              <div
                className="h-[0.5px] flex-1 bg-white origin-left"
                style={{ opacity: 0, transform: 'scaleX(0)', animation: 'slide-in-line 4s ease-out infinite' }}
              />

              {/* right star */}
              <div
                className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center shrink-0"
                style={{ opacity: 0, animation: 'fade-in-star-right 4s ease-out infinite' }}
              >
                <div className="relative w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center">
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018]" />
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018] rotate-60" />
                  <span className="absolute w-full h-[2px] sm:h-[3px] bg-[#c5f018] -rotate-60" />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="relative flex flex-row items-end justify-center overflow-visible z-10">
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  className={`
                    relative flex flex-col shrink-0
                    ${i === 0 ? "-mr-4 sm:-mr-8 md:-mr-12" : i === 2 ? "-ml-4 sm:-ml-8 md:-ml-12" : "z-10 -mx-2 sm:-mx-4 md:-mx-6"}
                    ${i === 1 ? "scale-110" : "scale-100"}
                    ${card.animClass}
                  `}
                >
                  <div className="overflow-hidden rounded-xl md:rounded-2xl" style={{ lineHeight: 0, fontSize: 0 }}>
                    <img
                      src={card.img}
                      alt=""
                      className={`block object-cover object-top ${card.imgWidth} ${card.imgHeight}`}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
