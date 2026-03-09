const API_URL = process.env.PAYLOAD_API_URL ?? "http://localhost:3001";

export type VentureStatus = "Exploring" | "Active" | "Relaunching";

export interface VentureImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface VentureIndex {
  slug: string;
  title: string;
  status: VentureStatus;
  overview: string;
  img: VentureImage | null;
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
  img: VentureImage | null;
}

export const STATUS_STYLES: Record<VentureStatus, string> = {
  Exploring: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Active: "border-[#c5f018]/40 bg-[#c5f018]/10 text-[#c5f018]",
  Relaunching: "border-sky-400/40 bg-sky-400/10 text-sky-400",
};

function lexicalToPlainText(content: any): string {
  if (!content || !content.root) return '';

  return content.root.children
    .map((node: any) =>
      node.children?.map((child: any) => child.text ?? '').join('') ?? ''
    )
    .join(' ')
    .trim();
}

function parseImage(img: any): VentureImage | null {
  if (!img || typeof img !== 'object') return null;
  return {
    url:    img.url ? `${API_URL}${img.url}` : '',
    alt:    img.alt ?? '',
    width:  img.width ?? 1200,
    height: img.height ?? 630,
  };
}

export async function getVenturesIndex(): Promise<VentureIndex[]> {
  const res = await fetch(
    `${API_URL}/api/ventures?limit=100&depth=1`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch ventures");

  const { docs } = await res.json();

  return docs.map((v: any): VentureIndex => ({
    slug:     v.slug,
    title:    v.title,
    status:   v.status,
    overview: lexicalToPlainText(v.ventureOverview)?.split(".")[0]?.trim() ?? "",
    img:      parseImage(v.img),
  }));
}

export async function getVentureBySlug(slug: string): Promise<VentureDetail | null> {
  const res = await fetch(
    `${API_URL}/api/ventures?where[slug][equals]=${slug}&depth=1&limit=1`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch venture");

  const { docs } = await res.json();
  if (!docs.length) return null;

  const v = docs[0];
  return {
    slug:                v.slug,
    title:               v.title,
    status:              v.status,
    headerIntro:         v.shortOverview ?? "",
    ventureOverview:     lexicalToPlainText(v.ventureOverview),
    problemSpace:        lexicalToPlainText(v.problemSpace),
    innovationDirection: lexicalToPlainText(v.innovationDirection),
    dataAnalytics:       lexicalToPlainText(v.dataAnalytics),
    collaboration:       v.collaboration ?? "",
    img:                 parseImage(v.img),
  };
}