import { ITINERARY_DATA } from "@/data/trip";
import { Pill } from "@/components/Pill";

export function ItineraryScreen({
  openIndex,
  onToggle,
}: {
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  return (
    <div>
      <div style={{ padding: "26px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          Your journey, day by day
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Itinerary</h2>
      </div>

      <div style={{ padding: "0 20px 28px" }}>
        {ITINERARY_DATA.map((d, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", marginBottom: 10, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <button
                onClick={() => onToggle(i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "13px 15px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--sand)",
                    border: `1.5px solid ${d.color}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.n}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                    <Pill tone={d.tone}>{d.tag}</Pill>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: 10.5, color: "var(--fg3)" }}>{d.date}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)" }}>{d.title}</span>
                </div>
                <span style={{ color: "var(--fg3)", fontSize: 18, flexShrink: 0, transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                  &rsaquo;
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 15px 15px", borderTop: "1px solid var(--line)" }}>
                  <p style={{ color: "var(--fg2)", fontSize: 13, lineHeight: 1.65, margin: "12px 0 0" }}>{d.body}</p>
                  {d.tl && (
                    <div style={{ marginTop: 14, borderLeft: "2px solid var(--line)", paddingLeft: 14 }}>
                      {d.tl.map((tl, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, padding: "5px 0", position: "relative" }}>
                          <div style={{ position: "absolute", left: -19, top: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--secondary)", border: "2px solid var(--card)" }} />
                          <span style={{ fontSize: 11, color: d.color, fontWeight: 600, minWidth: 44 }}>{tl.time}</span>
                          <span style={{ fontSize: 13, color: "var(--fg1)" }}>{tl.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
