import { Header } from "../../components/Header";
import { AboutSection } from "../../components/AboutSection";
import { ExecutiveProfileSection } from "../../components/ExecutiveProfileSection";
import { OperatingPrinciplesSection } from "../../components/OperatingPrinciplesSection";
import { CardAboutSection } from "../../components/CardAboutSection";
import { ExploreWorkSection } from "../../components/ExploreWorkSection";
import { FooterSection } from "../../components/FooterSection";

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />
      <AboutSection />
      <ExecutiveProfileSection />
      <OperatingPrinciplesSection />
      <CardAboutSection />
      <ExploreWorkSection />
      <FooterSection />
    </main>
  );
}

