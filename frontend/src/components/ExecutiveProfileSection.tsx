export function ExecutiveProfileSection() {
  return (
    <div className="mt-24 space-y-12 px-4 md:px-6 lg:px-30 overflow-hidden bg-black">
      {/* Section Header */}
      <div>
        <h2 className="px-6 text-3xl font-bold text-[#c5f018] md:text-4xl">
          Executive
          <span className="text-white"> Profile</span>
        </h2>
      </div>

      {/* Two Column Layout - Text Left, Image Right */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-96">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-center justify-center space-y-8 z-10 px-6">
            <div className="relative w-full max-w-xl bg-[#222222] p-10 md:p-12 overflow-hidden">
              <div className="space-y-6 text-sm leading-relaxed text-zinc-300 md:text-base">
                <p>
                  I am a technology, data, and governance transformation
                  executive leading large-scale digital, platform, and AI
                  modernisation initiatives across public sector, financial
                  services, and health ecosystems. My work focuses on delivering
                  sovereign data infrastructures and secure collaboration
                  environments within highly regulated contexts where
                  resilience, compliance, and operational integrity are
                  non-negotiable.
                </p>
                <p>
                  Operating at board and executive level, I advise on digital
                  sovereignty, governance strategy, and regulator-aligned
                  transformation—bridging innovation ambition with structured
                  execution. I have led complex programmes, modernised
                  enterprise operating models, and embedded governance and
                  security into mission-critical platforms that support
                  long-term trust and performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-80 lg:h-96 overflow-hidden -ml-20 lg:-ml-40">
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Executive Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
