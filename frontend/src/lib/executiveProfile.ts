const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type ProfileParagraph = {
  text: string;
  isBold: boolean;
};

export type ExecutiveProfileData = {
  id: string;
  title: string;
  paragraphs: ProfileParagraph[];
  imageUrl: string;
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
      id:    d.id    ?? "",
      title: d.title ?? "",
      order: d.order ?? 0,
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