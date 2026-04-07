const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

export type ChallengeCardIcon =
  | "fragmented"
  | "server"
  | "network"
  | "shieldCheck"
  | "shield"
  | "layers"
  | "activity"
  | "globe";

export type ChallengeCard = {
  title: string;
  body: string;
  icon: ChallengeCardIcon;
};

export type ChallengeData = {
  badge: string;
  heading: string;
  headingLight: string;
  body: RichTextNode;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  imageCaption: string;
  cards: ChallengeCard[];
};

export async function getChallengeData(): Promise<ChallengeData | null> {
  try {
    const res = await fetch(`${API_URL}/api/challenge?limit=1&depth=1`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[challenge] Payload returned ${res.status}`);
      return null;
    }

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const d = docs[0];

    return {
      badge: d.badge ?? "Infrastructure",
      heading: d.heading ?? "",
      headingLight: d.headingLight ?? "",
      body: d.body ?? { root: { children: [] } },
      ctaLabel: d.ctaLabel ?? "",
      ctaHref: d.ctaHref ?? "",
      imageUrl: d.image?.url
        ? d.image.url.startsWith("http")
          ? d.image.url
          : `${API_URL}${d.image.url}`
        : "",
      imageCaption: d.imageCaption ?? "",
      cards: Array.isArray(d.cards)
        ? d.cards.map((c: any) => ({
            title: c.title ?? "",
            body: c.body ?? "",
            icon: (c.icon ?? "shield") as ChallengeCardIcon,
          }))
        : [],
    };
  } catch (err) {
    console.warn("[challenge] Failed to fetch from Payload.", err);
    return null;
  }
}