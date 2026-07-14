import { CONTACTS_DATA, DOCS_DATA, HEALTH_DATA } from "@/data/trip";
import { Icon } from "@/lib/icons";

export function EmergencyScreen({
  copiedKey,
  onCopy,
}: {
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  return (
    <div>
      <div style={{ background: "var(--clay-700)", padding: "28px 20px 24px", position: "relative", overflow: "hidden" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--clay-200)", margin: "0 0 6px" }}>
          Important
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 25, color: "#fff", margin: "0 0 8px" }}>Emergency &amp; key contacts</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>All numbers, refs and health info in one place. Share this screen with your group.</p>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 10px" }}>
          Key contacts
        </p>
        {CONTACTS_DATA.map((c, i) => {
          const key = `c-${i}`;
          const copied = copiedKey === key;
          return (
            <div
              key={key}
              style={{
                background: "var(--card)",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--line)",
                padding: "13px 15px",
                marginBottom: 9,
                display: "flex",
                alignItems: "center",
                gap: 12,
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: c.color }} />
              <div style={{ color: c.color, flexShrink: 0 }}>
                <Icon name={c.icon} size={21} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)" }}>{c.label}</div>
                <div style={{ fontSize: 11, color: "var(--fg3)", marginBottom: 3 }}>{c.sub}</div>
                <div style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.num}</div>
              </div>
              <button
                onClick={() => onCopy(c.num, key)}
                style={{
                  background: copied ? "var(--sage-100)" : "var(--sand)",
                  border: `1px solid ${c.color}`,
                  borderRadius: "var(--r-sm)",
                  padding: "7px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: copied ? "var(--accent)" : c.color,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          );
        })}

        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "20px 0 10px" }}>
          Flight &amp; transfer references
        </p>
        {DOCS_DATA.map((d, i) => {
          const key = `d-${i}`;
          const copied = copiedKey === key;
          return (
            <div
              key={key}
              style={{
                background: "var(--card)",
                borderRadius: "var(--r-sm)",
                border: "1px solid var(--line)",
                padding: "11px 14px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "var(--fg3)", marginBottom: 2 }}>{d.label}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: d.color }}>{d.val}</div>
              </div>
              <button
                onClick={() => onCopy(d.val, key)}
                style={{
                  background: copied ? "var(--sage-100)" : "var(--sand)",
                  border: `1px solid ${d.color}`,
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: copied ? "var(--accent)" : d.color,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          );
        })}

        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "20px 0 10px" }}>
          Health &amp; safety
        </p>
        <div style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", padding: "14px 16px", marginBottom: 28 }}>
          {HEALTH_DATA.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "7px 0",
                borderBottom: i < HEALTH_DATA.length - 1 ? "1px solid var(--line-soft)" : "none",
                fontSize: 13,
                color: "var(--fg1)",
                lineHeight: 1.5,
                alignItems: "flex-start",
              }}
            >
              <span style={{ flexShrink: 0, color: "var(--accent)" }}>
                <Icon name={h.icon} size={16} />
              </span>
              <span>{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
