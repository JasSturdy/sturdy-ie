import Link from "next/link";

export function HomeContactSection() {
  return (
    <section className="border-b border-zinc-800 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:px-10 md:py-28 lg:px-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#c5f018]">
              <span className="h-2 w-2 rounded-full bg-[#c5f018]" />
              Contact
            </span>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
              Collaboration{" "}
              <span className="text-[#c5f018]">enquiries</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white md:text-base">
              If you are exploring partnerships across sovereign infrastructure,
              secure collaboration, regulated innovation, or aligned venture
              initiatives, I welcome the opportunity to connect.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#c5f018] bg-[#c5f018] px-10 py-5 text-base font-semibold text-black transition hover:border-[#d4ff2a] hover:bg-[#d4ff2a]"
            >
              Get in touch
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
