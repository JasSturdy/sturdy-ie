const API_URL = process.env.PAYLOAD_API_URL ?? "http://localhost:3001";

export type VentureStatus = "Exploring" | "Active" | "Relaunching";

export interface VentureIndex {
  slug: string;
  title: string;
  status: VentureStatus;
  overview: string; 
}

export interface VentureDetail {
  slug: string;
  title: string;
  status: VentureStatus;
  headerIntro: string;
  ventureOverview: string;
  problemSpace: string;
  innovationDirection: string;
  dataAnalytics: string;
  collaboration: string;
}

export const STATUS_STYLES: Record<VentureStatus, string> = {
  Exploring: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Active: "border-[#c5f018]/40 bg-[#c5f018]/10 text-[#c5f018]",
  Relaunching: "border-sky-400/40 bg-sky-400/10 text-sky-400",
};

export async function getVenturesIndex(): Promise<VentureIndex[]> {
  const res = await fetch(
    `${API_URL}/api/ventures?limit=100&depth=0`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch ventures");

  const { docs } = await res.json();

  return docs.map((v: any): VentureIndex => ({
    slug: v.slug,
    title: v.title,
    status: v.status,
    overview: v.ventureOverview?.split(".")[0]?.trim() ?? "",
  }));
}

// Single detail

export async function getVentureBySlug(slug: string): Promise<VentureDetail | null> {
  const res = await fetch(
    `${API_URL}/api/ventures?where[slug][equals]=${slug}&depth=0&limit=1`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch venture");

  const { docs } = await res.json();
  if (!docs.length) return null;

  const v = docs[0];
  return {
    slug: v.slug,
    title: v.title,
    status: v.status,
    headerIntro: v.headerIntro ?? "",
    ventureOverview: v.ventureOverview ?? "",
    problemSpace: v.problemSpace ?? "",
    innovationDirection: v.innovationDirection ?? "",
    dataAnalytics: v.dataAnalytics ?? "",
    collaboration: v.collaboration ?? "",
  };
}