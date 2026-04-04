const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export interface LeadershipPaperIndex {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  summary: any;
  excerpt: string;
  img: string;
  flagship: boolean;
}

export interface LeadershipPaperSection {
  heading: string;
  body: any;
}

export interface LeadershipPaperDetail extends LeadershipPaperIndex {
  sections: LeadershipPaperSection[];
}

function resolveImageUrl(url?: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_URL}${url}`;
}

function extractPlainText(lexical: any): string {
  if (!lexical?.root?.children) return "";
  function walk(node: any): string {
    if (node.type === "text") return node.text ?? "";
    if (node.children) return node.children.map(walk).join("");
    return "";
  }
  return lexical.root.children.map(walk).join(" ").trim();
}

function mapToIndex(doc: any): LeadershipPaperIndex {
  const summary = doc.summary ?? { root: { children: [] } };
  return {
    slug:     doc.slug,
    title:    doc.title,
    subtitle: doc.subtitle ?? "",
    category: doc.category ?? "",
    date:     doc.date ?? "",
    summary,
    excerpt:  extractPlainText(summary),
    img:      resolveImageUrl(doc.image?.url),
    flagship: doc.flagship ?? false,
  };
}

function mapToDetail(doc: any): LeadershipPaperDetail {
  return {
    ...mapToIndex(doc),
    sections: Array.isArray(doc.sections) ? doc.sections : [],
  };
}

export async function getLeadershipPapersIndex(): Promise<LeadershipPaperIndex[]> {
  const res = await fetch(`${API_URL}/api/leadership-papers?limit=100&depth=1`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const { docs } = await res.json();
  if (!Array.isArray(docs)) return [];
  return docs.map(mapToIndex);
}

export async function getLeadershipPaperBySlug(
  slug: string
): Promise<LeadershipPaperDetail | null> {
  const res = await fetch(
    `${API_URL}/api/leadership-papers?where[slug][equals]=${slug}&depth=1&limit=1`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch leadership paper — ${res.status}`);
  const { docs } = await res.json();
  if (!docs.length) return null;
  return mapToDetail(docs[0]);
}