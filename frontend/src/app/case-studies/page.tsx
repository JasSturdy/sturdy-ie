import { Header } from "../../components/Header";
import { CaseStudyCarousel } from "../../components/CaseStudyCarousel";
import { CaseStudyBlogSection } from "../../components/CaseStudyBlogSection";
import { FooterSection } from "../../components/FooterSection";
import { getCaseStudiesIndex } from "../../lib/caseStudies";

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudiesIndex();

  return (
    <main className="relative w-full text-sm text-zinc-200">
      <Header />
      <CaseStudyCarousel caseStudies={caseStudies} />
      <CaseStudyBlogSection caseStudies={caseStudies} />
      <FooterSection />
    </main>
  );
}