import challengeMock from "./challenge.mock.json";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

/** Icons for Infrastructure cards — see `Services.tsx` ICONS map */
export type ChallengeCardIcon =
  | "fragmented"
  | "server"
  | "network"
  | "shieldCheck"
  /** legacy keys (Payload / older JSON) */
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
  imageUrl: string;
  imageCaption: string;
  cards: ChallengeCard[];
};

/** Local JSON (edit `challenge.mock.json`). */
export const CHALLENGE_DEFAULT: ChallengeData =
  challengeMock as ChallengeData;

/**
 * Home page Infrastructure / Services section.
 * Defaults to JSON; set `CHALLENGE_SOURCE=payload` to use Payload `/api/challenge`.
 */
export async function getChallengeData(): Promise<ChallengeData | null> {
  if (process.env.CHALLENGE_SOURCE === "payload") {
    try {
      const res = await fetch(`${API_URL}/api/challenge?limit=1&depth=1`, {
        cache: "no-store",
      });
      if (!res.ok) return CHALLENGE_DEFAULT;

      const { docs } = await res.json();
      if (!Array.isArray(docs) || !docs.length) return CHALLENGE_DEFAULT;

      const d = docs[0];

      return {
        badge: d.badge ?? "Challenge",
        heading: d.heading ?? "",
        headingLight: d.headingLight ?? "",
        body: d.body ?? { root: { children: [] } },
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
              icon: c.icon ?? "shield",
            }))
          : [],
      };
    } catch {
      return CHALLENGE_DEFAULT;
    }
  }

  return CHALLENGE_DEFAULT;
}