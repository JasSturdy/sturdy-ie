import { readFile } from "node:fs/promises";
import path from "node:path";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export interface CaseStudyIndex {
  slug: string;
  title: string;
  summary: string;
  theme: string;
  context: string;
  period: string;
  img: string;
}

export interface CaseStudyDetail extends CaseStudyIndex {
  overviewContext: string;
  environmentModel: string;
  governanceControls: string;
  standardsInteroperability: string;
  outcomesImpact: string;
  partnershipRelevance: string;
}

interface MockCaseStudy extends CaseStudyDetail {}

function lexicalToText(content: any): string {
  if (!content?.root?.children) return "";

  function extractText(node: any): string {
    if (node.type === "text") return node.text ?? "";
    if (node.children) return node.children.map(extractText).join("");
    return "";
  }

  return content.root.children
    .map((block: any) => extractText(block).trim())
    .filter(Boolean)
    .join("\n\n");
}

async function getMockCaseStudies(): Promise<MockCaseStudy[]> {
  try {
    const filePath = path.join(process.cwd(), "src", "lib", "caseStudies.mock.json");
    const raw = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MockCaseStudy[]) : [];
  } catch {
    return [];
  }
}

function mapBackendDocToIndex(c: any): CaseStudyIndex {
  return {
    slug: c.slug,
    title: c.title,
    summary: lexicalToText(c.summary),
    theme: c.theme,
    context: lexicalToText(c.context),
    period: c.period ?? "",
    img: c.img?.url ? `${API_URL}${c.img.url}` : "",
  };
}

function mapBackendDocToDetail(c: any): CaseStudyDetail {
  return {
    slug: c.slug,
    title: c.title,
    summary: lexicalToText(c.summary),
    theme: c.theme,
    context: lexicalToText(c.context),
    period: c.period ?? "",
    img: c.img?.url ? `${API_URL}${c.img.url}` : "",
    overviewContext: lexicalToText(c.overviewContext),
    environmentModel: lexicalToText(c.environmentModel),
    governanceControls: lexicalToText(c.governanceControls),
    standardsInteroperability: lexicalToText(c.standardsInteroperability),
    outcomesImpact: lexicalToText(c.outcomesImpact),
    partnershipRelevance: lexicalToText(c.partnershipRelevance),
  };
}

export async function getCaseStudiesIndex(): Promise<CaseStudyIndex[]> {
  const mock = await getMockCaseStudies();
  if (mock.length > 0) {
    return mock.map(({ slug, title, summary, theme, context, period, img }) => ({
      slug,
      title,
      summary,
      theme,
      context,
      period,
      img,
    }));
  }

  try {
    const url = `${API_URL}/api/case-studies?limit=100&depth=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const { docs } = await res.json();
    if (!Array.isArray(docs)) return [];

    return docs.map(mapBackendDocToIndex);
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const mock = await getMockCaseStudies();
  const mockMatch = mock.find((item) => item.slug === slug);
  if (mockMatch) return mockMatch;

  const url = `${API_URL}/api/case-studies?where[slug][equals]=${slug}&depth=1&limit=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch case study — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  if (!docs.length) return null;

  return mapBackendDocToDetail(docs[0]);
}