import { TRIP, NAV_TILES_DEF, JOURNEY_GLANCE_DEF, type TabId } from "@/data/trip";
import { Icon } from "@/lib/icons";
import { Pill } from "@/components/Pill";

export function HomeScreen({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const homeStats = [
    { n: TRIP.groupSize, l: "Travellers" },
    { n: TRIP.nights, l: "Nights" },
    { n: TRIP.destinationsCount, l: "Destinations" },
    { n: TRIP.departureDate, l: "Departure" },
  ];

  return (
    <div>
      <div style={{ background: "var(--deep)", padding: "40px 22px 30px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--secondary)", margin: "0 0 10px" }}>
            Thula Travel · Private itinerary
          </p>
          <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: 44, color: "var(--fg-on-dark)", lineHeight: 0.95, margin: "0 0 12px" }}>
            {TRIP.destinationLine1} <em style={{ color: "var(--secondary)", fontStyle: "normal" }}>{TRIP.destinationLine2}</em>
          </h1>
          <p style={{ color: "rgba(251,244,233,0.78)", fontSize: 13.5, margin: "0 0 22px", lineHeight: 1.5 }}>
            {TRIP.client} &amp; group of {TRIP.groupSize} · {TRIP.dateRange}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {homeStats.map((st) => (
              <div key={st.l} style={{ background: "rgba(251,244,233,0.12)", borderRadius: 12, padding: "10px 14px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, color: "var(--fg-on-dark)", lineHeight: 1 }}>{st.n}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,244,233,0.6)", marginTop: 4 }}>
                  {st.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", border: "1px solid var(--line)", padding: 18, boxShadow: "var(--shadow-sm)", marginBottom: 6 }}>
          <p style={{ color: "var(--fg2)", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>
            Everything for your {TRIP.destinationLine1} {TRIP.destinationLine2} trip in one place — open it from your phone wherever you are.
          </p>
          <p style={{ color: "var(--fg2)", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>
            Cape Town, Big Five country at Addo, and the winelands of Franschhoek. If anything comes up, message me any time.
          </p>
          <p style={{ fontFamily: "var(--font-script)", fontSize: 19, color: "var(--accent)", margin: "10px 0 2px" }}>{TRIP.consultant}</p>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg3)", margin: 0 }}>
            Thula Travel
          </p>
        </div>

        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", margin: "22px 0 10px" }}>
          Quick nav
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {NAV_TILES_DEF.map((t) => (
            <button
              key={t.id}
              onClick={() => onNavigate(t.id)}
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-md)",
                padding: 14,
                textAlign: "left",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: t.color }} />
              <div style={{ color: t.color, marginBottom: 8 }}>
                <Icon name={t.icon} size={22} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)", display: "block" }}>{t.label}</span>
              <span style={{ fontSize: 11, color: "var(--fg3)" }}>{t.sub}</span>
            </button>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", margin: "24px 0 10px" }}>
          Your journey at a glance
        </p>
        {JOURNEY_GLANCE_DEF.map((s) => (
          <div
            key={s.loc}
            style={{
              background: "var(--card)",
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line)",
              padding: "13px 15px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: s.color }} />
            <div style={{ color: s.color, flexShrink: 0 }}>
              <Icon name={s.icon} size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "var(--fg1)" }}>{s.loc}</span>
                <Pill tone={s.tone}>{s.nights}</Pill>
              </div>
              <div style={{ fontSize: 12, color: "var(--fg3)" }}>{s.hotel}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, color: s.color, marginTop: 3 }}>{s.dates}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
