const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    children: unknown[];
    [key: string]: unknown;
  };
};

export type StandardsCard = {
  slug: string;
  title: string;
  tagline: string;
  imageUrl: string;
  icon:
    | "data-governance"
    | "security-architecture"
    | "regulatory-systems"
    | "institutional-infrastructure"
    | "health"
    | "research"
    | "financial"
    | "european-data";
};

export type StandardsData = {
  badge: string;
  heading: string;
  body: RichTextNode;
  cards: StandardsCard[];
};

export async function getStandardsData(): Promise<StandardsData | null> {
  try {
    const res = await fetch(`${API_URL}/api/standards?limit=1&depth=1`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      badge:   d.badge   ?? "Standards",
      heading: d.heading ?? "",
      body:         d.body         ?? { root: { children: [] } },
      cards: Array.isArray(d.cards)
        ? d.cards.map((c: any) => ({
            slug:     c.slug     ?? "",
            title:    c.title    ?? "",
            tagline:  c.tagline  ?? "",
            imageUrl: c.image?.url
              ? c.image.url.startsWith("http")
                ? c.image.url
                : `${API_URL}${c.image.url}`
              : "",
            icon: c.icon ?? "data-governance",
          }))
        : [],
    };
  } catch {
    return null;
  }
}