export function Wordmark({ size = 22, color = "var(--accent)" }: { size?: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: size, color, lineHeight: 1 }}>Thula</span>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 600,
          fontSize: size * 0.34,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
          opacity: 0.75,
        }}
      >
        Travel
      </span>
    </span>
  );
}
