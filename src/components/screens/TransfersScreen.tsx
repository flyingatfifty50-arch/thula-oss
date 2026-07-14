import { TRANSFERS_DATA } from "@/data/trip";
import { Icon } from "@/lib/icons";
import { Pill } from "@/components/Pill";

export function TransfersScreen({
  openIndex,
  onToggle,
  onOpenModal,
}: {
  openIndex: number | null;
  onToggle: (i: number) => void;
  onOpenModal: (key: string) => void;
}) {
  return (
    <div>
      <div style={{ padding: "26px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          Ground transport
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Transfers &amp; tours</h2>
      </div>

      <div style={{ padding: "0 20px 4px" }}>
        <div style={{ background: "var(--sage-100)", border: "1px solid var(--sage-300)", borderRadius: "var(--r-md)", padding: "12px 14px", marginBottom: 16, fontSize: 13, color: "var(--fg2)", lineHeight: 1.6 }}>
          All transfers are pre-booked and included in your package unless noted. Tap any card for full details.
        </div>
      </div>

      <div style={{ padding: "0 20px 28px" }}>
        {TRANSFERS_DATA.map((t, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", marginBottom: 10, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <button
                onClick={() => onToggle(i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "13px 15px", display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--sand)",
                    border: `1.5px solid ${t.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: t.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon name={t.icon} size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: t.color, marginBottom: 2 }}>
                    {t.date}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)", marginBottom: 3 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "var(--fg3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.from} &rarr; {t.to}
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 10.5, color: "var(--fg3)", marginTop: 3 }}>{t.ref}</div>
                </div>
                <span style={{ color: "var(--fg3)", fontSize: 18, flexShrink: 0, marginTop: 2, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                  &rsaquo;
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 15px 15px", borderTop: "1px solid var(--line)" }}>
                  <p style={{ fontSize: 13, color: "var(--fg2)", lineHeight: 1.65, margin: "12px 0 10px" }}>{t.detail}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <Pill tone={t.tone}>{t.op}</Pill>
                    {t.confKey && (
                      <button
                        onClick={() => onOpenModal(t.confKey!)}
                        style={{
                          background: "var(--accent)",
                          color: "var(--fg-on-dark)",
                          border: "none",
                          borderRadius: "var(--r-pill)",
                          padding: "6px 14px",
                          fontSize: 11.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          letterSpacing: "0.03em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Icon name="mail" size={13} /> View confirmation
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
