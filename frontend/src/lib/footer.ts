const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type FooterNavItem = { label: string; href: string };
export type FooterSocial  = { label: string; href: string };

export type FooterData = {
  tagline:   string;
  copyright: string;
  navItems:  FooterNavItem[];
  socials:   FooterSocial[];
};

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const res = await fetch(`${API_URL}/api/globals/footer?depth=0`, { cache: "no-store" });
    if (!res.ok) return null;

    const d = await res.json();

    return {
      tagline:   d.tagline   ?? "",
      copyright: d.copyright ?? "",
      navItems: Array.isArray(d.navItems)
        ? d.navItems.map((item: any) => ({
            label: item.label ?? "",
            href:  item.href  ?? "/",
          }))
        : [],
      socials: Array.isArray(d.socials)
        ? d.socials.map((item: any) => ({
            label: item.label ?? "",
            href:  item.href  ?? "#",
          }))
        : [],
    };
  } catch {
    return null;
  }
}