/**
 * Normalize Payload media URLs for the browser.
 * Relative paths are prefixed with publicBase (e.g. NEXT_PUBLIC_PAYLOAD_API_URL).
 * Absolute URLs whose path is under /api/media/ are rewritten to use publicBase
 * so stored localhost or stale hosts still load in production.
 */
export function resolveCmsMediaUrl(
  raw: string | undefined | null,
  publicBase: string,
): string {
  if (!raw || typeof raw !== "string") return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const base = publicBase.replace(/\/$/, "");

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const u = new URL(trimmed);
      if (u.pathname.startsWith("/api/media/")) {
        return `${base}${u.pathname}${u.search}`;
      }
      return trimmed;
    } catch {
      return trimmed;
    }
  }

  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${base}${path}`;
}
