import { WritingClient } from "./WritingClient";
import { getArticlesIndex } from "../../lib/articles";

export default async function WritingPage() {
  const articles = await getArticlesIndex();
  return <WritingClient articles={articles} />;
}