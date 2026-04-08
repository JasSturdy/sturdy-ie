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
import type { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About", 
  description:
    "Learn about Jason Sturdy — specialising in governance-led data infrastructure, secure interoperable systems, and regulatory strategy for regulated industries.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Jason Sturdy",
    description:
      "Specialising in governance-led data infrastructure and regulatory strategy for healthcare, research, public sector, and defence.",
    url: "https://sturdy.ie/about",
  },
};

export default async function AboutPage() {
  const [
    challengesData,
    footerData,
    executiveProfileData,
    perspectiveData,
    impactData,
    ctaData,
  ] = await Promise.all([
    getChallengesData(),
    getFooterData(),
    getExecutiveProfiles(),
    getPerspectiveData(),
    getImpactData(),
    getCtaData(),
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
      <CardAboutSection />
      <ContactUsCtaSection data={ctaData} />
      <ExploreWorkSection />
      <FooterSection data={footerData} />
    </main>
  );
}