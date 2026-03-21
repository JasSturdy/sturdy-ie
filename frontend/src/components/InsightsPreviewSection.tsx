"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MyInsightIndex } from "../lib/myInsight";

function StackedImages() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lerp = (a: number, b: number) => a + (b - a) * progress;

  return (
    <div ref={ref} className="relative w-full h-[400px] lg:h-[450px]">
      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800')",
          width: '50%', height: '45%',
          left: `${lerp(30, 0)}%`, top: `${lerp(30, 0)}%`,
          zIndex: 5, borderRadius: '10px',
        }}
      />
      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800')",
          width: '50%', height: '45%',
          left: `${lerp(33, 15)}%`, top: `${lerp(33, 22)}%`,
          zIndex: 10, borderRadius: '10px',
        }}
      />
      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800')",
          width: '50%', height: '45%',
          left: `${lerp(36, 38)}%`, top: `${lerp(36, 45)}%`,
          zIndex: 15, borderRadius: '10px',
        }}
      />
    </div>
  );
}

export function InsightsPreviewSection({ myInsights }: { myInsights: MyInsightIndex[] }) {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured = myInsights.slice(0, 3);

  return (
    <section ref={ref} className="mx-auto max-w-8xl justify-center px-4 py-8 md:px-4 lg:px-4 bg-black">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <div className="mb-10 lg:w-1/2">
          {/* Label — animated */}
          <div
            className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300"
            style={{
              opacity: 0,
              animation: visible ? 'fadeUp 2s forwards' : 'none',
            }}
          >
            <span
              className="h-2 w-2 rounded-full bg-[#c5f018]"
              style={{ animation: 'dotPulse 1s ease-in-out infinite' }}
            />
            <span className="text-sm md:text-lg">Response</span>
          </div>

          {/* Heading — no animation */}
          <h2 className="text-2xl font-semibold leading-tight text-[#c5f018] md:text-5xl">
            Designing Systems{" "}
            <span className="font-light text-white">
              That Work in Practice
            </span>
          </h2>

          {/* Description — no animation */}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
            Addressing the gap between policy, systems, and real-world use requires more than technology.
            <br />
            <br />
            It requires approaches that embed governance, standards, and collaboration into how systems are designed and operated.

          </p>

          {/* Button — animated */}
          <div
            className="mt-10"
            style={{
              opacity: 0,
              animation: visible ? 'fadeUp 2s forwards' : 'none',
            }}
          >
            <Link
              href="/myinsights"
              className="inline-flex items-center justify-center gap-2 text-lg md:text-xl rounded-lg border border-[#c5f018] bg-transparent px-6 py-5 text-sm font-semibold text-[#c5f018] transition duration-500 hover:bg-[#c5f018] hover:text-black"
            >
              Explore Insights
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2">
          <StackedImages />
        </div>
      </div>
    </section>
  );
}