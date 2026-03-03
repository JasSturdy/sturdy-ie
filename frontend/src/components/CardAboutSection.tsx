"use client";

export function CardAboutSection() {
  const cards = [
    {
      title: "Governance & Compliance",
      description:
        "I operationalise regulatory frameworks into governance-aligned systems with built-in assurance, auditability, and defensible technical controls.",
    },
    {
      title: "Product & Innovation Development",
      description:
        "Alongside governance and infrastructure advisory, I lead end-to-end platform and product initiatives, delivering secure data collaboration, controlled analytics, and institution-ready pilots.",
    },
    {
      title: "Research Collaboration",
      description:
        "I enable secure cross-border research collaboration using Trusted Research Environments, federated models, and structured multi-party governance.",
    },
    {
      title: "Venture Alignment",
      description:
        "In parallel, I engage in venture initiatives in precision nutrition and data-driven health optimisation, exploring how secure data infrastructure, biometrics, and personalised analytics enable next-generation preventive health models.",
    },
  ];

  return (
    <section className="relative z-10 bg-black overflow-hidden">
      <style>{`
        .about-card {
          position: relative;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease,
                      background-color 0.35s ease;
          overflow: hidden;
        }

        .about-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(197,240,24,0.07) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          pointer-events: none;
        }

        .about-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c5f018, transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .about-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 60px rgba(197, 240, 24, 0.1), 0 8px 24px rgba(0,0,0,0.4);
          background-color: #1c1c1c;
        }

        .about-card:hover::before {
          opacity: 1;
        }

        .about-card:hover::after {
          transform: scaleX(1);
        }

        .about-card .card-title {
          transition: color 0.3s ease;
        }

        .about-card:hover .card-title {
          color: #c5f018;
        }

        .about-card .card-icon {
          width: 36px;
          height: 2px;
          background: #3f3f46;
          margin: 0 auto;
          border-radius: 2px;
          transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background 0.35s ease;
        }

        .about-card:hover .card-icon {
          width: 56px;
          background: #c5f018;
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-0">
        {/* 4-column card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="about-card rounded-xl bg-zinc-900 p-8 flex flex-col gap-5 border border-zinc-800"
            >
              <h3 className="card-title text-2xl font-bold text-white leading-snug text-center">
                {card.title}
              </h3>

              {/* Animated divider */}
              <div className="card-icon" />

              <p className="text-lg leading-relaxed text-zinc-400 text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}