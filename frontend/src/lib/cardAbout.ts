const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type CardAboutIcon =
  | 'governance'
  | 'security'
  | 'infrastructure'
  | 'operating'
  | 'regulatory'
  | 'collaboration';

export interface CardAboutItem {
  icon: CardAboutIcon;
  title: string;
  description: string;
}

export interface CardAboutData {
  badge: string;
  headingAccent: string;
  heading: string;
  cards: CardAboutItem[];
}

export async function getCardAboutData(): Promise<CardAboutData | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/focus?limit=1`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) return null;

    const { docs } = await res.json();
    const data = docs[0];

    if (!data) return null;

    return {
      badge:         data.badge         ?? 'Focus',
      headingAccent: data.headingAccent ?? 'Core',
      heading:       data.heading       ?? '',
      cards: (data.cards ?? []).map((c: CardAboutItem) => ({
        icon:        c.icon,
        title:       c.title,
        description: c.description,
      })),
    };
  } catch (error) {
    console.error('Failed to fetch card-about data:', error);
    return null;
  }
}