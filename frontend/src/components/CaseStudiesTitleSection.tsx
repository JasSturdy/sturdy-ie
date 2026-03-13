export function CaseStudiesTitleSection() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-8 py-8">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-sm bg-[#c5f018]"
          style={{ animation: 'dotPulse 1s ease-in-out infinite' }}
        />
        <span className="text-sm md:text-lg text-white">Case Studies</span>
      </div>
      <p className="text-center pt-4 mb-8 text-2xl md:text-6xl text-white">
        From challenge to <span className="text-[#c5f018]">change</span>
      </p>
    </div>
  );
}