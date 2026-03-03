import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";

export default function InsightsPage() {
  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />
      <section className="border-b border-zinc-900/60 bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-0">
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            Insights
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
            Short-form notes, patterns, and observations from building and
            operating trusted data-enabled systems in regulated environments.
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}

