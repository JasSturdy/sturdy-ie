const API_URL = "http://localhost:3001";

export interface ArticleIndex {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  flagship: boolean;
}

export interface ArticleDetail extends ArticleIndex {
  sections: { heading: string; body: string }[];
}

export const CATEGORY_STYLES: Record<string, { active: string; badge: string; tag: string }> = {
  "All":                          { active: "bg-[#c5f018] border-[#c5f018] text-black",    badge: "bg-black/20 text-black",   tag: "" },
  "Governance & Compliance":      { active: "bg-blue-500 border-blue-500 text-white",       badge: "bg-white/20 text-white",   tag: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
  "Research Collaboration":       { active: "bg-emerald-500 border-emerald-500 text-white", badge: "bg-white/20 text-white",   tag: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
  "Interoperability & Standards": { active: "bg-violet-500 border-violet-500 text-white",   badge: "bg-white/20 text-white",   tag: "border-violet-500/40 text-violet-400 bg-violet-500/10" },
  "Preventive Health Innovation": { active: "bg-rose-500 border-rose-500 text-white",       badge: "bg-white/20 text-white",   tag: "border-rose-500/40 text-rose-400 bg-rose-500/10" },
  "AI & Regulated Data":          { active: "bg-amber-500 border-amber-500 text-black",     badge: "bg-black/20 text-black",   tag: "border-amber-500/40 text-amber-400 bg-amber-500/10" },
};

export async function getArticlesIndex(): Promise<ArticleIndex[]> {
  const url = `${API_URL}/api/articles?limit=100&depth=0&sort=-date`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch articles — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  return docs.map((a: any): ArticleIndex => ({
    slug:     a.slug,
    title:    a.title,
    category: a.category,
    date:     a.date,
    author:   a.author,
    image:    a.image,
    excerpt:  a.excerpt,
    flagship: a.flagship ?? false,
  }));
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const url = `${API_URL}/api/articles?where[slug][equals]=${slug}&depth=0&limit=1`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch article — ${res.status} ${res.statusText}`);

  const { docs } = await res.json();
  if (!docs.length) return null;

  const a = docs[0];
  return {
    slug:     a.slug,
    title:    a.title,
    category: a.category,
    date:     a.date,
    author:   a.author,
    image:    a.image,
    excerpt:  a.excerpt,
    flagship: a.flagship ?? false,
    sections: a.sections ?? [],
  };
}