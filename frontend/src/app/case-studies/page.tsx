import { Header } from "../../components/Header";
import { CaseStudyBlogSection } from "../../components/CaseStudyBlogSection";
import { FooterSection } from "../../components/FooterSection";
import { getCaseStudiesIndex } from "../../lib/caseStudies";
import { getFooterData } from "@/lib/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies by Jason Sturdy showcasing governance-led data infrastructure solutions across healthcare, research, public sector, and defence environments.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Jason Sturdy",
    description:
      "Explore case studies showcasing governance-led data infrastructure solutions across regulated environments.",
    url: "https://sturdy.ie/case-studies",
  },
};

export default async function CaseStudiesPage() {

  const [
    footerData,
  ] = await Promise.all([
    getFooterData(),
  ]);

  const caseStudies = await getCaseStudiesIndex();

  return (
    <main className="relative w-full py-12 text-sm text-zinc-200">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-8xl pt-24 pb-16 sm:px-6 lg:px-0 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="h-2 w-2 rounded-sm bg-[#c5f018]" />
          <span className="text-xs font-semibold text-lime-300/80">
            All case studies
          </span>
        </div>
        <h1 className="text-5xl font-light text-white md:text-6xl lg:text-7xl">
          Case <span className="text-[#c5f018]">Studies</span>
        </h1>
        <p className="mt-6 mx-auto max-w-3xl text-base leading-relaxed text-zinc-300">
          Executive perspectives on sovereign infrastructure, governance-led
          transformation, secure collaboration, and standards-led
          interoperability across regulated ecosystems.
        </p>
      </section>

      <CaseStudyBlogSection caseStudies={caseStudies} />
      <FooterSection data={footerData} />
    </main>
  );
}