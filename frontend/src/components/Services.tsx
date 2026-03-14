import Link from "next/link";

const SERVICES_ITEMS = [
  {
    title: "Governance & Compliance",
    body: "Operationalising regulatory frameworks into deployable environments with assurance, auditability, and defensible controls.",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Sovereign Data Infrastructure",
    body: "Designing mission-critical platforms aligned to resilience, security, and long-term operational integrity.",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "Secure Collaboration",
    body: "Enabling cross-organisation collaboration through governed access models, secure environments, and trust boundaries.",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Interoperability & Data Exchange",
    body: "Implementing standards-led architectures so data can be securely shared, understood, and reused across ecosystems.",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="bg-black px-4 py-8 sm:px-8 md:px-0 md:py-16">
      <div className="mx-auto max-w-8xl">
        <div
          className="flex flex-col lg:flex-row gap-10 lg:gap-20"
          style={{ opacity: 0, animation: 'fadeUp 0.8s ease-out 0.2s forwards' }}
        >
          {/* Left */}
          <div className="w-full lg:w-1/2">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="h-2 w-2 rounded-full bg-[#c5f018]"
                style={{ animation: 'dotPulse 1s ease-in-out infinite' }} />
              <span className="md:text-lg text-sm">Lorem ipsum</span>
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-[#c5f018] md:text-5xl">
              Discover <span className="text-white font-light">the range of</span>
            </h2>
            <div className="mt-12 h-64 sm:h-120 lg:h-[510px] w-full rounded-2xl bg-[url('https://images.pexels.com/photos/1181567/pexels-photo-1181567.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 space-y-4">
            {SERVICES_ITEMS.map((item) => (
  <div
    key={item.title}
    className="group flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-12 rounded-lg md:rounded-2xl border border-[#677f06] p-6 md:p-0"
  >
    {/* Icon box */}
    <div className="flex-shrink-0 flex h-14 w-14 md:h-38 md:w-40 items-center justify-center rounded-xl md:rounded-l-2xl md:rounded-r-none bg-[#c5f018] text-black">
      <div className="w-7 h-7 md:w-14 md:h-14">
        {item.icon}
      </div>
    </div>
    {/* Text */}
    <div className="space-y-2 md:space-y-4 text-center md:text-left md:px-0 md:pb-0">
      <h3 className="md:text-2xl text-base font-medium text-white">
        {item.title}
      </h3>
      <p className="md:text-sm text-xs leading-relaxed text-zinc-300">
        {item.body}
      </p>
    </div>
  </div>
))}
          </div>

        </div>
      </div>
    </section>
  );
}