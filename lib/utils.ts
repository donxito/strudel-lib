// Simple cn — if you already have clsx/tailwind-merge, replace with those
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function encodeStrudelURL(code: string): string {
  try {
    return `https://strudel.cc/#${btoa(code)}`;
  } catch {
    return "https://strudel.cc/";
  }
}

export function decodeStrudelURL(url: string): string | null {
  try {
    const hash = url.includes("#") ? url.split("#")[1] : url;
    if (!hash) return null;
    const decoded = atob(hash);
    return decoded || null;
  } catch {
    return null;
  }
}

function formatDateYMD(ts: number): string {
  const d = new Date(ts);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDateYMD(ts);
}
