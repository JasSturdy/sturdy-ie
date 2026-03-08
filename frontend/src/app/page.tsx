import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import { InsightsPreviewSection } from "../components/InsightsPreviewSection";
import { VenturesSection } from "../components/VenturesSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { CollaborationCtaSection } from "../components/CollaborationCtaSection";
import { FooterSection } from "../components/FooterSection";
import { HomeAboutSection } from "../components/HomeAboutSection";
import { getCaseStudiesIndex } from "../lib/caseStudies";
import { getVenturesIndex } from "../lib/ventures";
import { getArticlesIndex } from "../lib/articles";

export default async function Home() {
  const [caseStudies, ventures, articles] = await Promise.all([
    getCaseStudiesIndex(),
    getVenturesIndex(),
    getArticlesIndex(),
  ]);

  return (
    <main className="relative min-w-0 w-full max-w-full text-sm text-zinc-200">
      <Header />
      <HeroSection />
      <HomeAboutSection />
      <CapabilitiesSection />
      <ExpertiseSection />
      <InsightsPreviewSection articles={articles} />
      <VenturesSection ventures={ventures} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <CollaborationCtaSection />
      <FooterSection />
    </main>
  );
}