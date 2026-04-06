const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

export type IndustryCard = {
  title: string;
  description: string;
  imageUrl: string;
};

export type IndustriesData = {
  sectionLabel: string;
  headingRegular: string;
  headingAccent: string;
  headingLight: string;
  body: RichTextNode;
  cards: IndustryCard[];
  ctaLabel?: string;
  ctaHref?: string;
};

export async function getIndustriesData(): Promise<IndustriesData | null> {
  try {
    const res = await fetch(`${API_URL}/api/industries?limit=1&depth=1`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      sectionLabel:   d.sectionLabel   ?? "Industries",
      headingRegular: d.headingRegular ?? "Operating Across",
      headingAccent:  d.headingAccent  ?? "Regulated",
      headingLight:   d.headingLight   ?? "Environments",
      body:           d.body           ?? { root: { children: [] } },
      ctaLabel:       d.ctaLabel       ?? "View Case Studies", 
      ctaHref:        d.ctaHref        ?? "/case-studies",
      cards: Array.isArray(d.cards)
        ? d.cards.map((c: any) => ({
            title:       c.title       ?? "",
            description: c.description ?? "",
            imageUrl: c.image?.url
              ? c.image.url.startsWith("http")
                ? c.image.url
                : `${API_URL}${c.image.url}`
              : "",
          }))
        : [],
    };
  } catch {
    return null;
  }
}