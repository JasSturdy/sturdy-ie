const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

import type { ImpactData } from "@/components/ImpactSection";

interface ImpactCMSResponse {
  badge: string;
  heading: string;
  headingAccent: string;
  body: unknown;
  image: {
    url: string;
    alt: string;
  };
}

export async function getImpactData(): Promise<ImpactData | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/globals/impact`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) return null;

    const data: ImpactCMSResponse = await res.json();

    return {
      badge: data.badge,
      heading: data.heading,
      headingAccent: data.headingAccent,
      body: data.body,
      image: {
        url: data.image?.url ?? "",
        alt: data.image?.alt ?? "",
      },
    };
  } catch (error) {
    console.error("Failed to fetch impact data:", error);
    return null;
  }
}