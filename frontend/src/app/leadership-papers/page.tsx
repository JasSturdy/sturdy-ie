import { WritingClient } from "./WritingClient";
import { getLeadershipPapersIndex } from "@/lib/leadershipPapers";
import { getFooterData } from "@/lib/footer";

export default async function LeadershipPapersPage() {
  const [papers, footerData] = await Promise.all([
    getLeadershipPapersIndex(),
    getFooterData(),
  ]);

  return <WritingClient papers={papers} footerData={footerData} />;
}