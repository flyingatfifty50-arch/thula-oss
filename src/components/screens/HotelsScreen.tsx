import { HOTELS_DATA } from "@/data/trip";
import { Icon } from "@/lib/icons";
import { Pill } from "@/components/Pill";

export function HotelsScreen({ onOpenModal }: { onOpenModal: (key: string) => void }) {
  return (
    <div>
      <div style={{ padding: "26px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          Where you&apos;ll stay
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Hotels</h2>
      </div>

      <div style={{ padding: "0 20px 28px" }}>
        {HOTELS_DATA.map((h) => (
          <div
            key={h.name}
            style={{
              background: "var(--card)",
              borderRadius: "var(--r-lg)",
              border: "1px solid var(--line)",
              marginBottom: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={{ position: "relative", height: 160, overflow: "hidden", background: h.gradient }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(31,30,26,0.55))" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(31,30,26,0.75)", backdropFilter: "blur(4px)", borderRadius: 20, padding: "5px 12px" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-on-dark)" }}>
                  {h.dates}
                </span>
              </div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: h.color, margin: "0 0 3px" }}>
                {h.loc}
              </p>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 19, color: "var(--fg1)", margin: "0 0 3px" }}>{h.name}</h3>
              <p style={{ fontSize: 11.5, color: "var(--fg3)", margin: "0 0 10px" }}>{h.board}</p>
              <p style={{ fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.6, margin: "0 0 12px" }}>{h.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {h.tags.map((tg) => (
                  <Pill key={tg} tone={h.tone}>
                    {tg}
                  </Pill>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener"
                  style={{
                    flex: 1,
                    display: "block",
                    background: "var(--primary)",
                    color: "var(--fg-on-clay)",
                    textAlign: "center",
                    padding: "11px 0",
                    borderRadius: "var(--r-pill)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    textDecoration: "none",
                    minWidth: 110,
                  }}
                >
                  Website &#8599;
                </a>
                {h.confKey && (
                  <button
                    onClick={() => onOpenModal(h.confKey!)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: `1.5px solid ${h.color}`,
                      color: h.color,
                      borderRadius: "var(--r-pill)",
                      padding: "11px 0",
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      minWidth: 110,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Icon name="mail" size={15} /> Confirmation
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
