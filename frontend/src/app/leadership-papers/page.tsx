import { WritingClient } from "./WritingClient";
import { getLeadershipPapersIndex } from "@/lib/leadershipPapers";
import { getFooterData } from "@/lib/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership Papers",
  description:
    "Leadership papers by Jason Sturdy covering data governance frameworks, regulatory compliance, and infrastructure strategy for healthcare, research, and defence sectors.",
  alternates: {
    canonical: "/leadership-papers",
  },
  openGraph: {
    title: "Leadership Papers | Jason Sturdy",
    description:
      "Leadership papers covering data governance frameworks, regulatory compliance, and infrastructure strategy for regulated sectors.",
    url: "https://sturdy.ie/leadership-papers",
  },
};

export default async function LeadershipPapersPage() {
  const [papers, footerData] = await Promise.all([
    getLeadershipPapersIndex(),
    getFooterData(),
  ]);

  return <WritingClient papers={papers} footerData={footerData} />;
}