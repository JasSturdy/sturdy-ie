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

export async function getCaseStudiesIndex(): Promise<CaseStudyIndex[]> {
  try {
    const url = `${API_URL}/api/case-studies?limit=100&depth=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const { docs } = await res.json();
    if (!Array.isArray(docs)) return [];

    return docs.map((c: any): CaseStudyIndex => ({
    slug:    c.slug,
    title:   c.title,
    summary: lexicalToText(c.summary),
    theme:   c.theme,
    context: lexicalToText(c.context),
    period:  c.period ?? "",
    img:     c.img?.url ? `${API_URL}${c.img.url}` : "",
  }));
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const url = `${API_URL}/api/case-studies?where[slug][equals]=${slug}&depth=1&limit=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch case study — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  if (!docs.length) return null;

  const c = docs[0];
  return {
    slug:                      c.slug,
    title:                     c.title,
    summary:                   lexicalToText(c.summary),
    theme:                     c.theme,
    context:                   lexicalToText(c.context),
    period:                    c.period ?? "",
    img:                       c.img?.url ? `${API_URL}${c.img.url}` : "",
    overviewContext:            lexicalToText(c.overviewContext),
    environmentModel:          lexicalToText(c.environmentModel),
    governanceControls:        lexicalToText(c.governanceControls),
    standardsInteroperability: lexicalToText(c.standardsInteroperability),
    outcomesImpact:             lexicalToText(c.outcomesImpact),
    partnershipRelevance:       lexicalToText(c.partnershipRelevance),
  };
}