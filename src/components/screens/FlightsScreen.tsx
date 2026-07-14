import { FLIGHTS_DATA } from "@/data/trip";
import { Icon } from "@/lib/icons";
import { Pill } from "@/components/Pill";

export function FlightsScreen() {
  return (
    <div>
      <div style={{ padding: "26px 20px 0" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          Getting there &amp; around
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Flights</h2>
      </div>

      <div style={{ padding: "0 20px 6px", display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
        <Pill tone="sage">Outbound</Pill>
        <Pill tone="amber">Domestic</Pill>
        <Pill tone="plum">Return</Pill>
      </div>

      <div style={{ padding: "0 20px 28px" }}>
        {FLIGHTS_DATA.map((f, i) => (
          <div
            key={i}
            style={{
              background: "var(--card)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line)",
              padding: 15,
              marginBottom: 10,
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: f.color }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg3)" }}>
                {f.carrier} · {f.date}
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 12.5, fontWeight: 700, color: f.color, background: "var(--sand)", padding: "3px 9px", borderRadius: 8 }}>
                {f.code}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, fontWeight: 700, color: "var(--fg1)", lineHeight: 1 }}>{f.from}</div>
                <div style={{ fontSize: 10, color: "var(--fg3)" }}>{f.fromCity}</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 10px" }}>
                <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                <div style={{ color: "var(--primary)", margin: "0 6px" }}>
                  <Icon name="plane" size={16} />
                </div>
                <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, fontWeight: 700, color: "var(--fg1)", lineHeight: 1 }}>{f.to}</div>
                <div style={{ fontSize: 10, color: "var(--fg3)" }}>{f.toCity}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>
              <div>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", display: "block" }}>
                  Departs
                </span>
                <b style={{ fontSize: 14, color: "var(--fg1)" }}>{f.dep}</b>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", display: "block" }}>
                  Arrives
                </span>
                <b style={{ fontSize: 14, color: "var(--fg1)" }}>{f.arr}</b>
              </div>
            </div>
          </div>
        ))}

        <div style={{ background: "var(--amber-100)", borderRadius: "var(--r-md)", padding: "14px 16px", border: "1px solid var(--amber-300)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--amber-600)", margin: "0 0 8px" }}>
            Booking refs
          </p>
          <div style={{ fontSize: 13, color: "var(--fg1)", lineHeight: 1.9 }}>
            <div>
              Turkish Airlines (8 pax) <b>SVIHB7</b>
            </div>
            <div>
              Linda &amp; Rachel <b>SZLHXR</b>
            </div>
            <div style={{ marginTop: 8, color: "var(--fg2)", fontSize: 12 }}>23 kg checked bag per person · all flights included</div>
          </div>
        </div>
      </div>
    </div>
  );
}
