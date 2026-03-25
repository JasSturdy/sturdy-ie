const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type SectionPosition =
  | "above-heading"
  | "below-heading"
  | "below-subheading"
  | "below-tagline"
  | "above-cta"
  | "below-cta";

export type RichTextNode = {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any[];
    [key: string]: unknown;
  };
};

export type RichTextSection = {
  blockType: "richTextSection";
  position: SectionPosition;
  content: RichTextNode;
};

export type BulletListSection = {
  blockType: "bulletList";
  position: SectionPosition;
  items: { text: RichTextNode }[];
};

export type HeroSection = RichTextSection | BulletListSection;

export type HeroData = {
  heading: string;
  headingHighlight: string;
  subheading: string;
  tagline: string;
  sections: HeroSection[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  portrait: { url: string; alt: string } | null;
};

export async function getHeroData(): Promise<HeroData | null> {
  try {
    const url = `${API_URL}/api/hero?limit=1&depth=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;

    const h = docs[0];

    return {
      heading:            h.heading ?? "",
      headingHighlight:   h.headingHighlight ?? "",
      subheading:         h.subheading ?? "",
      tagline:            h.tagline ?? "",
      sections:           Array.isArray(h.sections) ? h.sections : [],
      primaryCtaLabel:    h.primaryCtaLabel ?? "",
      primaryCtaHref:     h.primaryCtaHref ?? "/",
      secondaryCtaLabel:  h.secondaryCtaLabel ?? "",
      secondaryCtaHref:   h.secondaryCtaHref ?? "/",
      portrait: h.portrait?.url
        ? {
            url: h.portrait.url.startsWith("http")
              ? h.portrait.url
              : `${API_URL}${h.portrait.url}`,
            alt: h.portrait.alt ?? "",
          }
        : null,
    };
  } catch {
    return null;
  }
}

export function getSectionsForPosition(
  sections: HeroSection[],
  position: SectionPosition
): HeroSection[] {
  return sections.filter((s) => s.position === position);
}