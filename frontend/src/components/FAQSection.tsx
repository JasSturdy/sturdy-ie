"use client";

import { useState, useRef, useEffect } from "react";

const FAQS = [
  {
    question: "1. What types of organisations do you collaborate with?",
    answer:
      "I collaborate with research institutions, healthcare organisations, regulated industry partners, and innovation stakeholders exploring secure data environments, governance frameworks, and collaborative platform initiatives.",
  },
  {
    question: "2. Are you offering consulting services through this site?",
    answer:
      "This site is not positioned as a services platform. It exists to share my work, initiatives, and thinking, and to enable partnership and collaboration discussions where relevant.",
  },
  {
    question: '3. What are "Case Studies" referring to?',
    answer:
      "Case studies highlight real-world environments and initiatives across secure data collaboration, governance, and regulated innovation.",
  },
  {
    question: "4. What stage are your ventures at?",
    answer:
      "Ventures range from exploratory innovation initiatives through to active platform development. Each is presented to share direction and invite aligned collaboration where appropriate.",
  },
  {
    question: "5. Can organisations collaborate on ventures or research environments?",
    answer:
      "Yes — collaboration across research, innovation, and platform initiatives is welcomed where alignment exists.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-2xl bg-zinc-900 px-8 py-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-xl font-semibold text-white md:text-2xl">
          {faq.question}
        </span>
        <span
          className="shrink-0 text-2xl font-light text-white transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>

      {/* Animated answer */}
      <div
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <p className="mt-4 pb-2 text-sm leading-relaxed text-white">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:px-10 lg:px-0">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-xl font-bold text-white md:text-3xl">
            Collaboration &amp; Engagement{" "}
            <span className="text-[#c5f018]">FAQs</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white">
            Questions about collaboration, research environments, ventures, and
            partnerships are
            <br className="hidden sm:block" /> addressed below.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}