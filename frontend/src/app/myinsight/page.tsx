import { WritingClient } from "./WritingClient";
import { getMyInsightsIndex } from "../../lib/myInsight";
import { getFooterData } from "@/lib/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Insights",
  description:
    "Read insights and perspectives from Jason Sturdy on data governance, regulatory strategy, and secure infrastructure for regulated industries.",
  alternates: {
    canonical: "/myinsights",
  },
  openGraph: {
    title: "My Insights | Jason Sturdy",
    description:
      "Insights and perspectives on data governance, regulatory strategy, and secure infrastructure for regulated industries.",
    url: "https://sturdy.ie/myinsights",
  },
};

export default async function WritingPage() {
  const [myInsights, footerData] = await Promise.all([
    getMyInsightsIndex(),
    getFooterData(),
  ]);
  return <WritingClient myInsights={myInsights} footerData={footerData} />;
}