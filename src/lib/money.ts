export function formatEuros(cents: number): string {
  const n = cents / 100;
  return "€" + n.toLocaleString("en-IE", { maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
