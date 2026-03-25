import type { RichTextNode } from "@/lib/response";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type PrincipleIcon = "trust" | "control" | "standards" | "resilience";

export type PrincipleData = {
  id:    number;
  title: string;
  body:  RichTextNode;        
  icon:  PrincipleIcon;
  bars:  number;
};

export type ExploreCardData = {
  heading:         string;
  body:            RichTextNode;
  ctaLabel:        string;
  ctaHref:         string;
  backgroundImage: string;
};

export type PrinciplesPayload = {
  principles:  PrincipleData[];
  exploreCard: ExploreCardData;
};

const FALLBACK: PrinciplesPayload = {
  principles: [
    {
      id: 1, title: "Trust", icon: "trust", bars: 1,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Systems must embed governance and accountability" }] }] } },
    },
    {
      id: 2, title: "Control", icon: "control", bars: 2,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Clear ownership, access, and data responsibility" }] }] } },
    },
    {
      id: 3, title: "Standards", icon: "standards", bars: 3,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Alignment with regulatory and interoperability frameworks" }] }] } },
    },
    {
      id: 4, title: "Resilience", icon: "resilience", bars: 4,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Systems designed to operate reliably at scale" }] }] } },
    },
  ],
  exploreCard: {
    heading:         "Explore My Work",
    body: {
    root: {
      type: "root", direction: "ltr", format: "", indent: 0, version: 1,
      children: [{
        type: "paragraph", version: 1,
        children: [{ type: "text", version: 1, text: "Examples of systems, platforms, and environments designed for regulated ecosystems" }]
      }]
    }
  },
    ctaLabel:        "View Case Studies",
    ctaHref:         "/case-studies",
    backgroundImage: "/bg-contact.png",
  },
};

export async function getPrinciplesData(): Promise<PrinciplesPayload> {
  try {
    const res = await fetch(
      `${API_URL}/api/principles?limit=1&depth=1`,
      { cache: "no-store" },
    );
    if (!res.ok) return FALLBACK;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return FALLBACK;

    const d = docs[0];

    const rawBgUrl: string = d.exploreBackgroundImage?.url ?? "";

    return {
      principles: Array.isArray(d.items)
        ? d.items.map((item: any, i: number): PrincipleData => ({
            id:    i + 1,
            title: item.title ?? "",
            body:  item.body  ?? "",
            icon:  (item.icon as PrincipleIcon) ?? "trust",
            bars:  item.bars  ?? 1,
          }))
        : FALLBACK.principles,

      exploreCard: {
        heading:  d.exploreHeading  ?? FALLBACK.exploreCard.heading,
        body:     d.exploreBody     ?? FALLBACK.exploreCard.body,
        ctaLabel: d.exploreCtaLabel ?? FALLBACK.exploreCard.ctaLabel,
        ctaHref:  d.exploreCtaHref  ?? FALLBACK.exploreCard.ctaHref,
        backgroundImage: rawBgUrl
          ? rawBgUrl.startsWith("http") ? rawBgUrl : `${API_URL}${rawBgUrl}`
          : FALLBACK.exploreCard.backgroundImage,
      },
    };
  } catch {
    return FALLBACK;
  }
}