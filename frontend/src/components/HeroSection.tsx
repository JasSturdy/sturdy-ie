"use client";

import Image from "next/image";
import jasonPortrait from "@/img/jason.png";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-neutral-950">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_90%,rgba(197,240,24,0.55)_0%,rgba(160,210,0,0.55)_20%,transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-8xl px-4 py-34">
        {/* outer corner arcs */}
        <div className="pointer-events-none absolute -left-50 bottom-100 hidden h-90 w-90 rounded-full mr-[50px] border-[50px] border-zinc-700/60 md:block" />
        <div className="pointer-events-none absolute -right-50 top-100 hidden h-90 w-90 rounded-full border-[50px] border-zinc-700/60 md:block" />

        <div className="relative flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">

          {/* Left copy */}
          <div className="w-full space-y-8">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0 }}
              className="text-5xl font-medium leading-tight tracking-tight text-white sm:text-6xl md:text-9xl md:leading-[1.05]"
            >
              Jason <span className="text-[#c5f018]">Sturdy</span>
            </motion.h1>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              className="space-y-3 text-2xl sm:text-3xl md:text-6xl lg:text-3xl leading-relaxed text-zinc-200"
            >
              <p>Building Trusted Systems from Policy to Practice</p>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.22 }}
              className="text-base sm:text-lg text-zinc-300"
            >
              Data Governance • Security Architecture • Operating Models • Digital Infrastructure
            </motion.p>

            {/* Micro line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
              className="text-sm text-zinc-400 max-w-4xl"
            >
              I design systems and operating models that enable organisations to use data in practice, translating policy, regulation, and governance into infrastructure that is secure, usable, and trusted.
            </motion.p>

            {/* Hero paragraphs
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
              className="max-w-2xl space-y-4 text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              <p>
                I design digital platforms and infrastructure that transform fragmented data into trusted intelligence.
              </p>
              <p>
                My work focuses on systems that allow organisations to securely govern, integrate, and collaborate around complex datasets across regulated environments.
              </p>
            </motion.div> */}

            {/* Divider line and star */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
              className="relative mt-6 flex items-center lg:w-3xl w-xs lg:w-2xl"
            >
              <div
                className="h-[1px] flex-1 origin-left bg-zinc-400"
                style={{ animation: isInView ? "grow 1s ease-out forwards" : "none" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
                className="flex h-12 w-12 items-center justify-center"
              >
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute h-[3px] w-full bg-[#c5f018]" />
                  <span className="absolute h-[3px] w-full rotate-60 bg-[#c5f018]" />
                  <span className="absolute h-[3px] w-full -rotate-60 bg-[#c5f018]" />
                </div>
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col flex-wrap gap-4 pt-2 sm:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              >
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-6 py-5 text-lg font-semibold text-black transition duration-500 hover:-translate-y-[1px] hover:border-1 hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
                >
                  View Case Studies
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.58 }}
              >
                <Link
                  href="/myinsights"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-lime-400/70 bg-transparent px-6 py-5 text-lg font-semibold text-lime-300 transition duration-500 hover:-translate-y-[1px] hover:bg-[#CCFF00] hover:text-black"
                >
                  Explore Insights
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right image + floating quote card */}
          <div className="relative mx-auto mt-10 flex w-full max-w-md flex-col items-center justify-center lg:mt-0 md:mr-20 lg:-ml-34 lg:max-w-none lg:flex-1">
            <div className="pointer-events-none absolute inset-0 blur-3xl" />
            <div className="relative h-[280px] w-[220px] min-[400px]:h-[360px] min-[400px]:w-[270px] sm:h-[460px] sm:w-[320px] md:h-[550px] md:w-[400px] lg:h-[430px] lg:w-[280px]">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="relative h-full w-full scale-[2] overflow-hidden bg-transparent object-contain"
              >
                <Image
                  src={jasonPortrait}
                  alt="Portrait of Jason Sturdy"
                  fill
                  className="object-contain -scale-x-100"
                  priority
                />
              </motion.div>
            </div>

           
          </div>

        </div>
      </div>
    </section>
  );
}