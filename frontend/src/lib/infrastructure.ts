const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

export type InfrastructureCard = {
  title: string;
  body: string;
  icon: "shield" | "layers" | "activity" | "globe";
};

export type InfrastructureData = {
  badge: string;
  heading: string;
  headingLight: string;
  body: RichTextNode;
  imageUrl: string;
  imageCaption: string;
  cards: InfrastructureCard[];
};

export async function getInfrastructureData(): Promise<InfrastructureData | null> {
  try {
    const res = await fetch(`${API_URL}/api/infrastructure?limit=1&depth=1`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      badge:        d.badge        ?? "Infrastructure",
      heading:      d.heading      ?? "",
      headingLight: d.headingLight ?? "",
      body:         d.body         ?? { root: { children: [] } },
      imageUrl: d.image?.url
        ? d.image.url.startsWith("http")
          ? d.image.url
          : `${API_URL}${d.image.url}`
        : "",
      imageCaption: d.imageCaption ?? "",
      cards: Array.isArray(d.cards)
        ? d.cards.map((c: any) => ({
            title: c.title ?? "",
            body:  c.body  ?? "",
            icon:  c.icon  ?? "shield",
          }))
        : [],
    };
  } catch {
    return null;
  }
}