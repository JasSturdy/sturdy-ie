import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { CapabilitiesSection } from "../components/CapabilitiesSection";
// import { ExpertiseSection } from "../components/ExpertiseSection";
import { InsightsPreviewSection } from "../components/InsightsPreviewSection";
import { VenturesSection } from "../components/VenturesSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { FooterSection } from "../components/FooterSection";
import { getChallengeData } from "@/lib/challenge";
import { getCaseStudiesIndex } from "../lib/caseStudies";
import { ServicesSection } from "@/components/Services";
import { CaseStudiesTitleSection } from "@/components/CaseStudiesTitleSection";
// import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProfileSection } from "@/components/ProfileSection";
import { ContactUsCtaSection } from "@/components/ContactUsCtaSection";
import { ApplicationSection } from "@/components/ApplicationSection";
import { BlogSection } from "@/components/BlogSection";
import { getHeroData } from "../lib/hero";
import { getResponseData } from "../lib/response";
import { getCtaData } from "@/lib/cta";
import { getStandardsData } from "@/lib/standards";
import { getFooterData } from "@/lib/footer";
import { getApplicationData } from "@/lib/application";
import { getIndustriesData } from "@/lib/industries";
import { getMyInsightsIndex } from "@/lib/myInsight";

export default async function Home() {
  const [
    caseStudies,
    challengeData,
    heroData,
    responseData,
    standardsData,
    ctaData,
    applicationData,
    insights,
    footerData,
    industriesData,
  ] = await Promise.all([
    getCaseStudiesIndex(),
    getChallengeData(),
    getHeroData(),
    getResponseData(),
    getStandardsData(),
    getCtaData(),
    getApplicationData(),
    getMyInsightsIndex(),
    getFooterData(),
    getIndustriesData(),
  ]);

  return (
    <main className="relative min-w-0 w-full max-w-full overflow-visible text-sm text-zinc-200">
      <Header />
      <HeroSection data={heroData} />
      <CapabilitiesSection data={industriesData} />
      <ServicesSection data={challengeData} />
      <InsightsPreviewSection data={responseData} />
      <VenturesSection />
      <ProfileSection data={standardsData} />
      <CaseStudiesTitleSection />
      <CaseStudiesSection caseStudies={caseStudies} />
      <ApplicationSection data={applicationData} />
      {/* <BlogSection insights={insights} /> */}
      <ContactUsCtaSection data={ctaData} />
      <FooterSection data={footerData} />
    </main>
  );
}