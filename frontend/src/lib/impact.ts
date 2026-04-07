const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

import type { ImpactData } from "@/components/ImpactSection";

interface ImpactCMSResponse {
  badge: string;
  heading: string;
  headingAccent: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  body: unknown;
  image: {
    url: string;
    alt: string;
  };
}

export async function getImpactData(): Promise<ImpactData | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/impact?limit=1&depth=1`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) return null;

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return null;
    const data: ImpactCMSResponse = docs[0];

    const rawImageUrl = data.image?.url ?? "";
    const imageUrl = rawImageUrl
      ? rawImageUrl.startsWith("http")
        ? rawImageUrl
        : `${API_URL}${rawImageUrl}`
      : "";

    return {
      badge: data.badge,
      heading: data.heading,
      headingAccent: data.headingAccent,
      body: data.body,
      primaryCtaLabel:    data.primaryCtaLabel ?? "",
      primaryCtaHref:     data.primaryCtaHref ?? "",
      image: {
        url: imageUrl,
        alt: data.image?.alt ?? "",
      },
    };
  } catch (error) {
    console.error("Failed to fetch impact data:", error);
    return null;
  }
}