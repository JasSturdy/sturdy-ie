import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import { InsightsPreviewSection } from "../components/InsightsPreviewSection";
import { VenturesSection } from "../components/VenturesSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { FooterSection } from "../components/FooterSection";
import { getCaseStudiesIndex } from "../lib/caseStudies";
import { getVenturesIndex } from "../lib/ventures";
import { getMyInsightsIndex } from "../lib/myInsight";
import { ServicesSection } from "@/components/Services";
import { CaseStudiesTitleSection } from "@/components/CaseStudiesTitleSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { ContactUsCtaSection } from "@/components/ContactUsCtaSection";
import { BlogSection } from "@/components/BlogSection";

export default async function Home() {
  const [caseStudies, ventures, myInsights] = await Promise.all([
    getCaseStudiesIndex(),
    getVenturesIndex(),
    getMyInsightsIndex(),
  ]);

  return (
    <main className="relative min-w-0 w-full max-w-full overflow-visible text-sm text-zinc-200">
      <Header />
      <HeroSection />
      <CapabilitiesSection />
      <ExpertiseSection />
      <ServicesSection />
      <InsightsPreviewSection myInsights={myInsights} />
      <VenturesSection />
      <CaseStudiesTitleSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TestimonialsSection />
      <ProfileSection />
      <ContactUsCtaSection />
      <BlogSection />
      <FooterSection />
    </main>
  );
}