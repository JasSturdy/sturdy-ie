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
import { getMyInsightsIndex } from "../lib/myInsight";
import { ServicesSection } from "@/components/Services";
import { CaseStudiesTitleSection } from "@/components/CaseStudiesTitleSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default async function Home() {
  const [caseStudies, ventures, myInsights] = await Promise.all([
    getCaseStudiesIndex(),
    getVenturesIndex(),
    getMyInsightsIndex(),
  ]);

  return (
    <main className="relative min-w-0 w-full max-w-full text-sm text-zinc-200">
      <Header />
      <HeroSection />
      <HomeAboutSection />
      <CapabilitiesSection />
      <ExpertiseSection />
      <InsightsPreviewSection myInsights={myInsights} />
      <VenturesSection />
      <ServicesSection />
      <CaseStudiesTitleSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <PricingSection />
      <TestimonialsSection />
      <CollaborationCtaSection />
      <FooterSection />
    </main>
  );
}