import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import { InsightsPreviewSection } from "../components/InsightsPreviewSection";
import { VenturesSection } from "../components/VenturesSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { FooterSection } from "../components/FooterSection";
import { getInfrastructureData } from "@/lib/infrastructure";
import { getCaseStudiesIndex } from "../lib/caseStudies";
import { getChallengeData } from "../lib/challenge";
import { ServicesSection } from "@/components/Services";
import { CaseStudiesTitleSection } from "@/components/CaseStudiesTitleSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { ContactUsCtaSection } from "@/components/ContactUsCtaSection";
import { BlogSection } from "@/components/BlogSection";
import { getHeroData } from "../lib/hero";
import { getResponseData } from "../lib/response";
import { getPrinciplesData } from "../lib/principles";
import { getCtaData } from "@/lib/cta";
import { getStandardsData } from "@/lib/standards";
import { getFooterData } from "@/lib/footer";

export default async function Home() {
  const [
    caseStudies,
    challengeData,
    heroData,
    infrastructureData,
    responseData,
    principlesData,
    standardsData,
    ctaData,
    footerData,
  ] = await Promise.all([
    getCaseStudiesIndex(),
    getChallengeData(),
    getHeroData(),
    getInfrastructureData(),
    getResponseData(),
    getPrinciplesData(),
    getStandardsData(),
    getCtaData(),
    getFooterData(),
  ]);

  return (
    <main className="relative min-w-0 w-full max-w-full overflow-visible text-sm text-zinc-200">
      <Header />
      <HeroSection data={heroData} />
      <CapabilitiesSection />
      {challengeData && <ExpertiseSection data={challengeData} />}
      <ServicesSection data={infrastructureData} />
      <InsightsPreviewSection data={responseData} />
      <VenturesSection />
      <CaseStudiesTitleSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <TestimonialsSection
        principles={principlesData.principles}
        exploreCard={principlesData.exploreCard}
      />
      <ProfileSection data={standardsData}/>
      <ContactUsCtaSection data={ctaData} />
      <BlogSection />
      <FooterSection data={footerData} />
    </main>
  );
}