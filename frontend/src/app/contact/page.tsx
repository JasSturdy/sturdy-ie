// No "use client" here
import { getFooterData } from "@/lib/footer";
import { getFAQData } from "@/lib/faq";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { FAQSection } from "../../components/FAQSection";
import { ContactSection } from "../../components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",  
  description:
    "Get in touch to discuss data governance, regulatory compliance, and infrastructure advisory services for healthcare, research, public sector, and defence.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Jason Sturdy",
    description:
      "Get in touch with Jason Sturdy to discuss data governance, regulatory compliance, and infrastructure advisory services.",
    url: "https://sturdy.ie/contact",
  },
};

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