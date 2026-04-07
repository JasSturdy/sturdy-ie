const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

export type ApplicationCard = {
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

export type ApplicationData = {
  badge: string;
  heading: string;
  headingAccent: string;
  body: RichTextNode;
  ctaLabel: string;
  ctaHref: string;
  cards: ApplicationCard[];
};

export async function getApplicationData(): Promise<ApplicationData | null> {
  try {
    const res = await fetch(`${API_URL}/api/application?limit=1&depth=1`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      badge:         d.badge         ?? "Application",
      heading:       d.heading       ?? "",
      headingAccent: d.headingAccent ?? "",
      body:          d.body          ?? { root: { children: [] } },
      ctaLabel: d.ctaLabel ?? "",
      ctaHref: d.ctaHref ?? "",
      cards: Array.isArray(d.cards)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          d.cards.map((c: any) => ({
            slug:     c.slug    ?? "",
            title:    c.title   ?? "",
            tagline:  c.tagline ?? "",
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