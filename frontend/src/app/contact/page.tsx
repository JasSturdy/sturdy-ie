// No "use client" here
import { getFooterData } from "@/lib/footer";
import { getFAQData } from "@/lib/faq";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { FAQSection } from "../../components/FAQSection";
import { ContactSection } from "../../components/ContactSection";

export default async function ContactPage() {
  const [footerData, faqData] = await Promise.all([
    getFooterData(),
    getFAQData(),
  ]);

  return (
    <main className="relative w-full overflow-x-hidden text-sm text-zinc-200">
      <Header />
      <ContactSection />
      <FAQSection data={faqData} />
      <FooterSection data={footerData} />
    </main>
  );
}