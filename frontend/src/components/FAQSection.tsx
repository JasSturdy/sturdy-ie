"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { FAQItem } from "@/lib/faq";

function FAQItemCard({
  faq,
  isOpen,
  onClick,
  index,
  sectionInView,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  index: number;
  sectionInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.12 }}
      className="rounded-2xl bg-zinc-900 px-8 py-12 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-2xl font-light text-white md:text-4xl">
          {faq.question}
        </span>
        <span
          className="shrink-0 text-2xl font-light text-white transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>

      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mt-4 pb-4 font-light text-lg leading-relaxed text-white">
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQSection({ data }: { data?: FAQItem[] | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  if (!data?.length) return null;

  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-8xl px-10 md:px-20 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-light text-white md:text-6xl">
          Collaboration &amp; Engagement{" "}
          <span className="text-[#c5f018] font-semibold">FAQs</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white">
          Questions about collaboration, research environments, ventures, and
          partnerships are
          <br className="hidden sm:block" /> addressed below.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {data.map((faq, i) => (
          <FAQItemCard
            key={faq.id}
            faq={faq}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            index={i}
            sectionInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}