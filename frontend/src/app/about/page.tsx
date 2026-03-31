import { Header } from "../../components/Header";
import { AboutSection } from "../../components/AboutSection";
import { ExecutiveProfileSection } from "../../components/ExecutiveProfileSection";
import { CardAboutSection } from "../../components/CardAboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ExploreWorkSection } from "../../components/ExploreWorkSection";
import { FooterSection } from "../../components/FooterSection";
import { getFooterData } from "@/lib/footer";
import { getChallengesData } from "@/lib/challengeAbout";
import { getExecutiveProfiles } from "@/lib/executiveProfile";
import { PerspectiveSection } from "@/components/PerspectiveSection";
import { getPerspectiveData } from "@/lib/perspective";
import { ImpactSection } from "@/components/ImpactSection";
import { getImpactData } from "@/lib/impact";
import { getCtaData } from "@/lib/cta";
import { ContactUsCtaSection } from "@/components/ContactUsCtaSection";
import { getCardAboutData } from "@/lib/cardAbout";

export default async function AboutPage() {
  const [
    challengesData,
    footerData,
    executiveProfileData,
    perspectiveData,
    impactData,
    ctaData,
    cardAboutData,
  ] = await Promise.all([
    getChallengesData(),
    getFooterData(),
    getExecutiveProfiles(),
    getPerspectiveData(),
    getImpactData(),
    getCtaData(),
    getCardAboutData(),
  ]);

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />
      <AboutSection />
      <ExecutiveProfileSection profiles={executiveProfileData} />
      <TestimonialsSection
        badge={challengesData.badge}
        heading={challengesData.heading}
        headingAccent={challengesData.headingAccent}
        body={challengesData.body}
        challenges={challengesData.challenges}
        exploreCard={challengesData.exploreCard}
      />
      <PerspectiveSection data={perspectiveData} />
      <ImpactSection data={impactData} />
      <CardAboutSection data={cardAboutData} />
      <ContactUsCtaSection data={ctaData} />
      <ExploreWorkSection />
      <FooterSection data={footerData} />
    </main>
  );
}