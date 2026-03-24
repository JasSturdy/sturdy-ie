import mockInsights from "./myInsight.mock.json";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export interface MyInsightIndex {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  flagship: boolean;
}

export interface MyInsightDetail extends MyInsightIndex {
  sections: { heading: string; body: any }[];
}

interface MockInsight extends MyInsightDetail {
  date: string;
}

export const CATEGORY_STYLES: Record<string, { active: string; badge: string; tag: string }> = {
  "All":                          { active: "bg-[#c5f018] border-[#c5f018] text-black",    badge: "bg-black/20 text-black",   tag: "" },
  "Governance & Compliance":      { active: "bg-blue-500 border-blue-500 text-white",       badge: "bg-white/20 text-white",   tag: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
  "Research Collaboration":       { active: "bg-emerald-500 border-emerald-500 text-white", badge: "bg-white/20 text-white",   tag: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
  "Interoperability & Standards": { active: "bg-violet-500 border-violet-500 text-white",   badge: "bg-white/20 text-white",   tag: "border-violet-500/40 text-violet-400 bg-violet-500/10" },
  "Preventive Health Innovation": { active: "bg-rose-500 border-rose-500 text-white",       badge: "bg-white/20 text-white",   tag: "border-rose-500/40 text-rose-400 bg-rose-500/10" },
  "AI & Regulated Data":          { active: "bg-amber-500 border-amber-500 text-black",     badge: "bg-black/20 text-black",   tag: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
};

function formatDate(date: string | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getMockInsights(): MockInsight[] {
  return Array.isArray(mockInsights) ? (mockInsights as MockInsight[]) : [];
}

function mapBackendDocToIndex(a: any): MyInsightIndex {
  return {
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: formatDate(a.date),
    author: a.author,
    image: a.img?.url ? `${API_URL}${a.img.url}` : "",
    excerpt: a.excerpt,
    flagship: a.flagship ?? false,
  };
}

export async function getMyInsightsIndex(): Promise<MyInsightIndex[]> {
  const mock = getMockInsights();
  if (mock.length > 0) {
    return mock.map((item) => ({
      slug: item.slug,
      title: item.title,
      category: item.category,
      date: formatDate(item.date),
      author: item.author,
      image: item.image,
      excerpt: item.excerpt,
      flagship: item.flagship,
    }));
  }

  try {
    const url = `${API_URL}/api/myinsights?limit=100&depth=1&sort=-date`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const { docs } = await res.json();
    if (!Array.isArray(docs)) return [];

    return docs.map(mapBackendDocToIndex);
  } catch {
    return [];
  }
}

export async function getMyInsightBySlug(slug: string): Promise<MyInsightDetail | null> {
  const mock = getMockInsights();
  const mockMatch = mock.find((item) => item.slug === slug);
  if (mockMatch) {
    return {
      ...mockMatch,
      date: formatDate(mockMatch.date),
    };
  }

  const url = `${API_URL}/api/myinsights?where[slug][equals]=${slug}&depth=1&limit=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch insight — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  if (!docs.length) return null;

  const a = docs[0];
  return {
    slug:     a.slug,
    title:    a.title,
    category: a.category,
    date:     formatDate(a.date),
    author:   a.author,
    image:    a.img?.url ? `${API_URL}${a.img.url}` : "",
    excerpt:  a.excerpt,
    flagship: a.flagship ?? false,
    sections: a.sections ?? [],
  };
}