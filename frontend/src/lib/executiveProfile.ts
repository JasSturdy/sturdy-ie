const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type ProfileParagraph = {
  text: string;
  isBold: boolean;
};

export type ExecutiveProfileData = {
  id: string;
  sectionHeading: string;
  sectionHeadingAccent: string;
  paragraphs: ProfileParagraph[];
  imageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  order: number;
};

export async function getExecutiveProfiles(): Promise<ExecutiveProfileData[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/executive-profile?limit=100&depth=1&sort=order`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const { docs } = await res.json();
    if (!Array.isArray(docs)) return [];

    return docs.map((d: any) => ({
      id:                   d.id                   ?? "",
      title:                d.title                ?? "",
      sectionHeading:       d.sectionHeading       ?? "Executive",
      sectionHeadingAccent: d.sectionHeadingAccent ?? "Profile",
      order:                d.order                ?? 0,
      primaryCtaLabel:      d.primaryCtaLabel      || "View Case Studies",
      primaryCtaHref:       d.primaryCtaHref       || "/case-studies",
      secondaryCtaLabel:    d.secondaryCtaLabel    || "Read Leadership Papers",
      secondaryCtaHref:     d.secondaryCtaHref     || "/leadership-papers",
      paragraphs: Array.isArray(d.paragraphs)
        ? d.paragraphs.map((p: any) => ({
            text:   p.text   ?? "",
            isBold: p.isBold ?? false,
          }))
        : [],
      imageUrl: d.image?.url
        ? d.image.url.startsWith("http")
          ? d.image.url
          : `${API_URL}${d.image.url}`
        : "",
    }));
  } catch {
    return [];
  }
}