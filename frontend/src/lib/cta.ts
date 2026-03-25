const API_URL = (process.env.PAYLOAD_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');

export type CtaCard = {
    imageUrl: string;
    alt: string;
};

export type CtaData = {
    headingStart: string;
    headingMiddle: string;
    headingEnd: string;
    subheading: string;
    buttonLabel: string;
    buttonHref: string;
    cards: CtaCard[];
};

export async function getCtaData(): Promise<CtaData | null> {
    try {
        const res = await fetch(`${API_URL}/api/cta?limit=1&depth=1`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;

        const { docs } = await res.json();
        if (!Array.isArray(docs) || !docs.length) return null;

        const d = docs[0];

        return {
            headingStart:  d.headingStart  ?? 'Building',
            headingMiddle: d.headingMiddle ?? 'Trusted Systems',
            headingEnd:    d.headingEnd    ?? 'for Regulated Environments',
            subheading:    d.subheading    ?? '',
            buttonLabel:   d.buttonLabel   ?? 'Explore My Work',
            buttonHref:    d.buttonHref    ?? '/case-studies',
            cards: Array.isArray(d.cards)
                ? d.cards.map((c: any) => ({
                    imageUrl: c.image?.url
                        ? c.image.url.startsWith('http')
                            ? c.image.url
                            : `${API_URL}${c.image.url}`
                        : '',
                    alt: c.alt ?? '',
                }))
                : [],
        };
    } catch {
        return null;
    }
}