import { Header } from "../../components/Header";
import { PartnershipsHeroSection } from "../../components/PartnershipsHeroSection";
import { PartnershipsCardSection } from "../../components/PartnershipCardSection";
import { CollaborationCtaSection } from "../../components/CollaborationCtaSection";
import { FooterSection } from "../../components/FooterSection";

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />
      <PartnershipsHeroSection />
      <PartnershipsCardSection />
      <CollaborationCtaSection />
      <FooterSection />
    </main>
  );
}

