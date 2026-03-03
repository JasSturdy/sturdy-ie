const API_URL = "http://localhost:3001";

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

export async function getCaseStudiesIndex(): Promise<CaseStudyIndex[]> {
  const url = `${API_URL}/api/case-studies?limit=100&depth=0`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch case studies — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  return docs.map((c: any): CaseStudyIndex => ({
    slug:    c.slug,
    title:   c.title,
    summary: c.summary,
    theme:   c.theme,
    context: c.context,
    period:  c.period ?? "",
    img:     c.img,
  }));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const url = `${API_URL}/api/case-studies?where[slug][equals]=${slug}&depth=0&limit=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch case study — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  if (!docs.length) return null;

  const c = docs[0];
  return {
    slug:                    c.slug,
    title:                   c.title,
    summary:                 c.summary,
    theme:                   c.theme,
    context:                 c.context,
    period:                  c.period ?? "",
    img:                     c.img,
    overviewContext:         c.overviewContext ?? "",
    environmentModel:        c.environmentModel ?? "",
    governanceControls:      c.governanceControls ?? "",
    standardsInteroperability: c.standardsInteroperability ?? "",
    outcomesImpact:          c.outcomesImpact ?? "",
    partnershipRelevance:    c.partnershipRelevance ?? "",
  };
}