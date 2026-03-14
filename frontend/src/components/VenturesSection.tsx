import Link from "next/link";

const VENTURES = [
  {
    year: "2015",
    title: "Founded",
    body: "Started with a bold vision to transform consulting.",
    href: "/ventures/founded",
    bars: 1,
  },
  {
    year: "2018",
    title: "First Enterprise Client",
    body: "Secured first major enterprise contract in the public sector.",
    href: "/ventures/enterprise",
    bars: 2,
  },
  {
    year: "2021",
    title: "Data Governance Platform",
    body: "Launched a sovereign data infrastructure platform for regulated industries.",
    href: "/ventures/platform",
    bars: 3,
  },
];

export function VenturesSection() {
  return (
    <section className="mx-auto max-w-8xl bg-black py-8 px-4 md:px-0">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VENTURES.map((v) => (
          <Link
            key={v.year}
            href={v.href}
            className="group flex flex-col justify-between rounded-xl bg-zinc-800/80 p-8 transition-all duration-1000 hover:shadow-sm hover:shadow-white border border-transparent hover:border-[#c5f018]"
          >
            <div className="flex justify-between items-start">
              <h3 className="md:text-5xl text-3xl font-light text-white">{v.year}</h3>
              <div className="flex gap-1 pt-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-[3px] h-6 ${i <= v.bars ? 'bg-[#c5f018]' : 'bg-zinc-600'}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 md:mt-12 space-y-2">
              <h4 className="text-xl md:text-2xl text-white transition-colors">
                {v.title}
              </h4>
              <p className="text-xs md:text-sm mt-4 leading-relaxed text-white">{v.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}