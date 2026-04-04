import { WritingClient } from "./WritingClient";
import { getMyInsightsIndex } from "../../lib/myInsight";
import { getFooterData } from "@/lib/footer";

export default async function WritingPage() {
  const [myInsights, footerData] = await Promise.all([
    getMyInsightsIndex(),
    getFooterData(),
  ]);
  return <WritingClient myInsights={myInsights} footerData={footerData} />;
}