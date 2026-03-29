// Simple cn — if you already have clsx/tailwind-merge, replace with those
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function encodeStrudelURL(code: string): string {
  try {
    // Match Strudel's format: encodeURIComponent(base64(utf8(code)))
    const bytes = new TextEncoder().encode(code);
    const b64 = btoa(String.fromCharCode(...bytes));
    return `https://strudel.cc/#${encodeURIComponent(b64)}`;
  } catch {
    return "https://strudel.cc/";
  }
}

export function decodeStrudelURL(url: string): string | null {
  try {
    const hash = url.includes("#") ? url.split("#")[1] : url;
    if (!hash) return null;
    // Strudel encodes as: encodeURIComponent(base64(utf8(code)))
    const b64 = decodeURIComponent(hash);
    const bytes = atob(b64);
    // Decode UTF-8 bytes back to string
    const decoded = new TextDecoder().decode(
      Uint8Array.from(bytes, (c) => c.charCodeAt(0))
    );
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

export function timeAgo(ts: number | string): string {
  const ms = typeof ts === "string" ? new Date(ts).getTime() : ts;
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDateYMD(ms);
}
