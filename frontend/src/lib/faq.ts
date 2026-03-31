const API_URL = (process.env.PAYLOAD_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export async function getFAQData(): Promise<FAQItem[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/faq?limit=100&sort=order&depth=0`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const { docs } = await res.json();
    if (!Array.isArray(docs) || !docs.length) return [];

    return docs.map((d: any) => ({
      id:       d.id       ?? "",
      question: d.question ?? "",
      answer:   d.answer   ?? "",
      order:    d.order    ?? 0,
    }));
  } catch {
    return [];
  }
}