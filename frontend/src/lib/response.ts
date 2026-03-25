const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    children: { type: string; [key: string]: unknown }[];
    [key: string]: unknown;
  };
};

export type ResponseImage = {
  url: string;
  alt: string;
};

export type ResponseData = {
  badge: string;
  heading: string;
  headingLight: string;
  body: RichTextNode;
  ctaLabel: string;
  ctaHref: string;
  images: ResponseImage[];
};

export async function getResponseData(): Promise<ResponseData | null> {
  try {
    const res = await fetch(`${API_URL}/api/response?limit=1&depth=1`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      badge:        d.badge        ?? "Response",
      heading:      d.heading      ?? "",
      headingLight: d.headingLight ?? "",
      body:         d.body         ?? { root: { children: [] } },
      ctaLabel:     d.ctaLabel     ?? "Explore Insights",
      ctaHref:      d.ctaHref      ?? "/myinsights",
      images: Array.isArray(d.images)
        ? d.images.map((item: any) => ({
            url: item.image?.url
              ? item.image.url.startsWith("http")
                ? item.image.url
                : `${API_URL}${item.image.url}`
              : "",
            alt: item.alt ?? "",
          })).filter((img: ResponseImage) => img.url)
        : [],
    };
  } catch {
    return null;
  }
}