import type { RichTextNode } from "@/lib/response";

const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type ChallengeIcon = "trust" | "control" | "standards" | "resilience";

export type ChallengeData = {
  id:    number;
  title: string;
  body:  RichTextNode;
  icon:  ChallengeIcon;
  bars:  number;
};

export type ExploreCardData = {
  heading:         string;
  body:            RichTextNode;
  ctaLabel:        string;
  ctaHref:         string;
  ctaLabel2:       string;
  ctaHref2:        string;
  backgroundImage: string;
};

export type ChallengePayload = {
  badge:         string;
  heading:       string;
  headingAccent: string;
  body:          RichTextNode;
  challenges:    ChallengeData[];
  exploreCard:   ExploreCardData;
};

const FALLBACK: ChallengePayload = {
  badge:         "Challenge",
  heading:       "I Work",
  headingAccent: "How",
  body: {
    root: {
      type: "root", direction: "ltr", format: "", indent: 0, version: 1,
      children: [
        {
          type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Expect systems that work in practice, not just in design." }]
        },
        {
          type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "I bring over 20 years of experience leading data, infrastructure, and transformation across public sector, financial services, and health systems, from technical execution through to large-scale, multi-organisation delivery." }]
        },
        {
          type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "My work is grounded in environments where reliability, control, and accountability are non-negotiable." }]
        },
      ],
    },
  },
  challenges: [
    {
      id: 1, title: "Sovereign Data Infrastructure", icon: "trust", bars: 1,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Control, resilience, and jurisdictional integrity" }] }] } },
    },
    {
      id: 2, title: "Secure Data Environments", icon: "control", bars: 2,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Governed access and controlled data usage" }] }] } },
    },
    {
      id: 3, title: "Cross-Institution Data Exchange", icon: "standards", bars: 3,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Trusted collaboration across organisations" }] }] } },
    },
    {
      id: 4, title: "Regulated Data Platforms", icon: "resilience", bars: 4,
      body: { root: { type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{ type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Systems aligned to policy and operational use" }] }] } },
    },
  ],
  exploreCard: {
    heading:         "Explore My Work",
    body: {
      root: {
        type: "root", direction: "ltr", format: "", indent: 0, version: 1,
        children: [{
          type: "paragraph", version: 1,
          children: [{ type: "text", version: 1, text: "Executive delivery across public sector, financial services, healthcare, and critical infrastructure environments" }]
        }]
      }
    },
    ctaLabel:        "View Case Studies",
    ctaHref:         "/case-studies",
    ctaLabel2:       "Explore Insights",
    ctaHref2:        "/insights",
    backgroundImage:
      "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
};

export async function getChallengesData(): Promise<ChallengePayload> {
  try {
    const res = await fetch(
      `${API_URL}/api/challenge-about?limit=1&depth=1`,
      { cache: "no-store" },
    );
    if (!res.ok) return FALLBACK;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return FALLBACK;

    const d = docs[0];
    const rawBgUrl: string = d.exploreBackgroundImage?.url ?? "";

    return {
      badge:         d.badge         ?? FALLBACK.badge,
      heading:       d.heading       ?? FALLBACK.heading,
      headingAccent: d.headingAccent ?? FALLBACK.headingAccent,
      body:          d.body          ?? FALLBACK.body,
      challenges: Array.isArray(d.items)
        ? d.items.map((item: any, i: number): ChallengeData => ({
            id:    i + 1,
            title: item.title ?? "",
            body:  item.body  ?? FALLBACK.challenges[0].body,
            icon:  (item.icon as ChallengeIcon) ?? "trust",
            bars:  item.bars  ?? 1,
          }))
        : FALLBACK.challenges,
      exploreCard: {
        heading:  d.exploreHeading  ?? FALLBACK.exploreCard.heading,
        body:     d.exploreBody     ?? FALLBACK.exploreCard.body,
        ctaLabel: d.exploreCtaLabel ?? FALLBACK.exploreCard.ctaLabel,
        ctaHref:  d.exploreCtaHref  ?? FALLBACK.exploreCard.ctaHref,
        ctaLabel2: d.exploreCtaLabel2 ?? FALLBACK.exploreCard.ctaLabel2,
        ctaHref2:  d.exploreCtaHref2  ?? FALLBACK.exploreCard.ctaHref2,
        backgroundImage: rawBgUrl
          ? rawBgUrl.startsWith("http") ? rawBgUrl : `${API_URL}${rawBgUrl}`
          : FALLBACK.exploreCard.backgroundImage,
      },
    };
  } catch {
    return FALLBACK;
  }
}