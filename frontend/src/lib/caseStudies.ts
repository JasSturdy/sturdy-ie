import { resolveCmsMediaUrl } from "@/lib/cmsUrl";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");
const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_PAYLOAD_API_URL ?? API_URL).replace(/\/$/, "");

export interface CaseStudyIndex {
  slug: string;
  title: string;
  summary: any;
  excerpt: string;
  theme: string;
  period: string;
  date: string;
  img: string;
}

export interface CaseStudySection {
  heading: string;
  body: any;
}

export interface CaseStudyDetail extends CaseStudyIndex {
  sections: CaseStudySection[];
}

function resolveImageUrl(url?: string): string {
  const resolved = resolveCmsMediaUrl(url, PUBLIC_API_URL);
  if (url && !resolved) {
    console.warn("[caseStudies] empty resolved image", {
      rawImageUrl: url,
      publicApiUrl: PUBLIC_API_URL,
    });
  }
  return resolved;
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

function mapBackendDocToIndex(c: any): CaseStudyIndex {
  const summary = c.summary ?? { root: { children: [] } };
  return {
    slug:    c.slug,
    title:   c.title,
    summary,
    excerpt: extractPlainText(summary),
    theme:   c.theme,
    period:  c.period ?? "",
    date:    c.date   ?? "",
    img:     resolveImageUrl(c.image?.url),
  };
}

function mapBackendDocToDetail(c: any): CaseStudyDetail {
  const summary = c.summary ?? { root: { children: [] } };
  return {
    slug:     c.slug,
    title:    c.title,
    summary,
    excerpt:  extractPlainText(summary),
    theme:    c.theme,
    period:   c.period ?? "",
    date:     c.date   ?? "",
    img:      resolveImageUrl(c.image?.url),
    sections: Array.isArray(c.sections) ? c.sections : [],
  };
}

export async function getCaseStudiesIndex(): Promise<CaseStudyIndex[]> {
  const url = `${API_URL}/api/case-studies?limit=100&depth=1`;
  console.log("[caseStudies] fetch index", { endpoint: url, publicApiUrl: PUBLIC_API_URL });
  const res = await fetch(url, { cache: "no-store" });
  console.log("[caseStudies] fetch index status", { ok: res.ok, status: res.status });
  if (!res.ok) return [];
  const { docs } = await res.json();
  if (!Array.isArray(docs)) return [];
  return docs.map(mapBackendDocToIndex);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const url = `${API_URL}/api/case-studies?where[slug][equals]=${slug}&depth=1&limit=1`;
  console.log("[caseStudies] fetch by slug", { slug, endpoint: url });
  const res = await fetch(url, { cache: "no-store" });
  console.log("[caseStudies] fetch by slug status", { slug, ok: res.ok, status: res.status });
  if (!res.ok) throw new Error(`Failed to fetch case study — ${res.status} ${res.statusText}`);
  const { docs } = await res.json();
  if (!docs.length) return null;
  return mapBackendDocToDetail(docs[0]);
}