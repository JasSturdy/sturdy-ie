import { WritingClient } from "@/app/myinsight/WritingClient";
import { getMyInsightsIndex } from "../../lib/myInsight";
import { getFooterData } from "@/lib/footer";

export default async function InsightsPage() {
  const [myInsights, footerData] = await Promise.all([
    getMyInsightsIndex(),
    getFooterData(),
  ]);
  return <WritingClient myInsights={myInsights} footerData={footerData} />;
}