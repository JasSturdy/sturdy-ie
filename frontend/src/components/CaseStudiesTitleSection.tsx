import Link from "next/link";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H5M13 3V11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function CaseStudiesTitleSection() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-10 md:py-14 lg:px-4 lg:py-14">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-sm bg-[#c5f018]"
          style={{ animation: "dotPulse 1s ease-in-out infinite" }}
        />
        <span className="text-sm md:text-lg text-white">Case Studies</span>
      </div>
      <p className="text-center font-light pt-4 mb-8 text-2xl md:text-6xl text-white">
        From Challenge to Operational Capability
      </p>

      <div className="flex w-full max-w-sm flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
        {/* Primary CTA */}
        <Link
          href="/case-studies"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c5f018] px-5 py-3.5 text-base font-semibold text-black transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:border hover:border-zinc-300 hover:bg-black hover:text-[#CCFF00]"
        >
          View Case Studies
          <ArrowIcon />
        </Link>

        {/* Secondary CTA */}
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-lime-400/70 bg-transparent px-5 py-3.5 text-base font-semibold text-lime-300 transition duration-500 hover:-translate-y-[1px] sm:w-auto sm:gap-2 sm:px-6 sm:py-5 sm:text-lg hover:bg-[#CCFF00] hover:text-black"
        >
          Let&apos;s Connect
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}