"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";
import { Pill, type PillTone } from "@/components/Pill";

type Props = {
  agencyName: string;
  accentColor: string;
  consultantName: string;
  clientName: string;
  groupSize: string;
  destinationLine1: string;
  destinationLine2: string;
  dateRange: string;
};

const TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "flights", label: "Flights", icon: "plane" },
  { id: "hotels", label: "Hotels", icon: "bed-double" },
  { id: "itinerary", label: "Plan", icon: "calendar-days" },
  { id: "tips", label: "Tips", icon: "lightbulb" },
  { id: "emergency", label: "SOS", icon: "life-buoy" },
];

const NAV_TILES = [
  { id: "flights", icon: "plane", label: "Flights", sub: "Sample flights", color: "var(--accent)" },
  { id: "hotels", icon: "bed-double", label: "Hotels", sub: "Sample properties", color: "var(--primary)" },
  { id: "itinerary", icon: "calendar-days", label: "Itinerary", sub: "Day by day", color: "var(--secondary)" },
  { id: "tips", icon: "lightbulb", label: "Tips", sub: "Local know-how", color: "var(--clay-600)" },
  { id: "emergency", icon: "life-buoy", label: "Emergency", sub: "Key contacts", color: "var(--primary)" },
];

const JOURNEY_GLANCE: { icon: string; tone: PillTone; color: string; loc: string; nights: string; dates: string; hotel: string }[] = [
  { icon: "waves", tone: "sage", color: "var(--accent)", loc: "Coastal City", nights: "4 nights", dates: "Day 1–4", hotel: "Sample Beachfront Hotel" },
  { icon: "map-pin", tone: "clay", color: "var(--primary)", loc: "Countryside", nights: "3 nights", dates: "Day 5–7", hotel: "Sample Lodge" },
];

const FLIGHTS = [
  { carrier: "Sample Airline", date: "Day 1", code: "XX0000", from: "XXX", fromCity: "Home city", to: "YYY", toCity: "Destination city", dep: "09:00", arr: "17:00", color: "var(--accent)" },
  { carrier: "Sample Airline", date: "Day 7", code: "XX0001", from: "YYY", fromCity: "Destination city", to: "XXX", toCity: "Home city", dep: "12:00", arr: "20:00", color: "var(--accent-2)" },
];

const HOTELS = [
  { name: "Sample Beachfront Hotel", loc: "Coastal City", dates: "Day 1–4 · 4 nights", board: "Breakfast included", desc: "Placeholder description — replace with the real property's story and setting.", gradient: "var(--fig-fynbos)", color: "var(--accent)" },
  { name: "Sample Countryside Lodge", loc: "Countryside", dates: "Day 5–7 · 3 nights", board: "Half board", desc: "Placeholder description — replace with the real property's story and setting.", gradient: "var(--fig-savanna)", color: "var(--primary)" },
];

const ITINERARY: { n: string; date: string; tag: string; tone: PillTone; title: string; body: string; color: string }[] = [
  { n: "01", date: "Day 1", tag: "Arrival", tone: "sage", title: "Arrival & settling in", body: "Placeholder itinerary text — describe arrival logistics and first impressions.", color: "var(--accent)" },
  { n: "02", date: "Day 2", tag: "Explore", tone: "clay", title: "A day to explore", body: "Placeholder itinerary text — describe the day's activities.", color: "var(--primary)" },
  { n: "03", date: "Day 3", tag: "Signature", tone: "plum", title: "Signature experience", body: "Placeholder itinerary text — describe the standout excursion for this trip.", color: "var(--accent-2)" },
];

const TIPS = [
  { icon: "shirt", title: "What to pack", body: "Placeholder tip — note seasonal packing guidance for this destination.", color: "var(--accent-2)" },
  { icon: "credit-card", title: "Money & tipping", body: "Placeholder tip — local currency and tipping norms.", color: "var(--amber-600)" },
  { icon: "shield-check", title: "Health & safety", body: "Placeholder tip — vaccination, water safety, or other need-to-knows.", color: "var(--clay-600)" },
];

const CONTACTS = [
  { label: "[Consultant name]", sub: "Your consultant · WhatsApp & calls", num: "[phone number]", color: "var(--accent)", icon: "user" },
  { label: "[Local emergency services]", sub: "Police, ambulance, fire", num: "[local emergency number]", color: "var(--clay-700)", icon: "siren" },
];

export function WhiteLabelApp(props: Props) {
  const [tab, setTab] = useState("home");
  const [itinOpen, setItinOpen] = useState<number | null>(null);
  const { agencyName, accentColor, consultantName, clientName, groupSize, destinationLine1, destinationLine2, dateRange } = props;

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        background: "var(--paper)",
        position: "relative",
        fontFamily: "var(--font-serif)",
        boxShadow: "0 0 60px rgba(30,36,28,0.12)",
        ["--accent" as string]: accentColor,
        ["--deep" as string]: accentColor,
      }}
    >
      <div style={{ height: "100vh", overflowY: "auto", paddingBottom: 84 }}>
        <div style={{ background: "var(--amber-100)", borderBottom: "1px solid var(--amber-300)", padding: "8px 20px", textAlign: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.05em", color: "var(--amber-600)" }}>
            White-label template · sample data · duplicate &amp; rebrand per client
          </span>
        </div>

        {tab === "home" && (
          <div>
            <div style={{ background: "var(--deep)", padding: "40px 22px 30px" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(251,244,233,0.75)", margin: "0 0 10px" }}>
                {agencyName} · Private itinerary
              </p>
              <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: 44, color: "var(--fg-on-dark)", lineHeight: 0.95, margin: "0 0 12px" }}>
                {destinationLine1} <em style={{ color: "var(--secondary)", fontStyle: "normal" }}>{destinationLine2}</em>
              </h1>
              <p style={{ color: "rgba(251,244,233,0.78)", fontSize: 13.5, margin: "0 0 22px", lineHeight: 1.5 }}>
                {clientName} &amp; group of {groupSize} · {dateRange}
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ n: groupSize, l: "Travellers" }, { n: "7", l: "Nights" }, { n: "2", l: "Destinations" }, { n: "Day 1", l: "Departure" }].map((st) => (
                  <div key={st.l} style={{ background: "rgba(251,244,233,0.12)", borderRadius: 12, padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fg-on-dark)", lineHeight: 1 }}>{st.n}</div>
                    <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,244,233,0.6)", marginTop: 4 }}>{st.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "22px 20px 0" }}>
              <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", border: "1px solid var(--line)", padding: 18, boxShadow: "var(--shadow-sm)", marginBottom: 6 }}>
                <p style={{ color: "var(--fg2)", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>
                  Everything for your {destinationLine1} {destinationLine2} trip in one place — open it from your phone wherever you are.
                </p>
                <p style={{ color: "var(--fg2)", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>If anything comes up, message me any time.</p>
                <p style={{ fontFamily: "var(--font-script)", fontSize: 19, color: "var(--accent)", margin: "10px 0 2px" }}>{consultantName}</p>
                <p style={{ fontWeight: 600, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg3)", margin: 0 }}>{agencyName}</p>
              </div>

              <p style={{ fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", margin: "22px 0 10px" }}>Quick nav</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {NAV_TILES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 14, textAlign: "left", cursor: "pointer", position: "relative", overflow: "hidden" }}
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

              <p style={{ fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", margin: "24px 0 10px" }}>Your journey at a glance</p>
              {JOURNEY_GLANCE.map((s) => (
                <div key={s.loc} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", padding: "13px 15px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}>
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
                    <div style={{ fontWeight: 600, fontSize: 11, color: s.color, marginTop: 3 }}>{s.dates}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "flights" && (
          <div>
            <div style={{ padding: "26px 20px 0" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>Getting there</p>
              <h2 style={{ fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Flights</h2>
            </div>
            <div style={{ padding: "0 20px 28px" }}>
              {FLIGHTS.map((f, i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", padding: 15, marginBottom: 10, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: f.color }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg3)" }}>
                      {f.carrier} · {f.date}
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: f.color, background: "var(--sand)", padding: "3px 9px", borderRadius: 8 }}>{f.code}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center", minWidth: 56 }}>
                      <div style={{ fontSize: 23, fontWeight: 700, color: "var(--fg1)", lineHeight: 1 }}>{f.from}</div>
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
                      <div style={{ fontSize: 23, fontWeight: 700, color: "var(--fg1)", lineHeight: 1 }}>{f.to}</div>
                      <div style={{ fontSize: 10, color: "var(--fg3)" }}>{f.toCity}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", display: "block" }}>Departs</span>
                      <b style={{ fontSize: 14, color: "var(--fg1)" }}>{f.dep}</b>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontWeight: 600, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", display: "block" }}>Arrives</span>
                      <b style={{ fontSize: 14, color: "var(--fg1)" }}>{f.arr}</b>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ background: "var(--amber-100)", borderRadius: "var(--r-md)", padding: "14px 16px", border: "1px solid var(--amber-300)" }}>
                <p style={{ fontWeight: 700, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--amber-600)", margin: "0 0 8px" }}>Booking refs</p>
                <div style={{ fontSize: 13, color: "var(--fg1)", lineHeight: 1.9 }}>
                  Sample booking reference <b>XXXXXX</b>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "hotels" && (
          <div>
            <div style={{ padding: "26px 20px 0" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>Where you&apos;ll stay</p>
              <h2 style={{ fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Hotels</h2>
            </div>
            <div style={{ padding: "0 20px 28px" }}>
              {HOTELS.map((h) => (
                <div key={h.name} style={{ background: "var(--card)", borderRadius: "var(--r-lg)", border: "1px solid var(--line)", marginBottom: 20, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                  <div style={{ position: "relative", height: 150, overflow: "hidden", background: h.gradient }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(31,30,26,0.55))" }} />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(31,30,26,0.75)", backdropFilter: "blur(4px)", borderRadius: 20, padding: "5px 12px" }}>
                      <span style={{ fontWeight: 600, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-on-dark)" }}>{h.dates}</span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <p style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: h.color, margin: "0 0 3px" }}>{h.loc}</p>
                    <h3 style={{ fontWeight: 600, fontSize: 19, color: "var(--fg1)", margin: "0 0 3px" }}>{h.name}</h3>
                    <p style={{ fontSize: 11.5, color: "var(--fg3)", margin: "0 0 10px" }}>{h.board}</p>
                    <p style={{ fontSize: 13.5, color: "var(--fg2)", lineHeight: 1.6, margin: "0 0 12px" }}>{h.desc}</p>
                    <a href="#" style={{ display: "block", background: "var(--primary)", color: "var(--fg-on-clay)", textAlign: "center", padding: "11px 0", borderRadius: "var(--r-pill)", fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>
                      Website ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "itinerary" && (
          <div>
            <div style={{ padding: "26px 20px 0" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>Your journey, day by day</p>
              <h2 style={{ fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Itinerary</h2>
            </div>
            <div style={{ padding: "0 20px 28px" }}>
              {ITINERARY.map((d, i) => {
                const isOpen = itinOpen === i;
                return (
                  <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", marginBottom: 10, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                    <button
                      onClick={() => setItinOpen(isOpen ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "13px 15px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}
                    >
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sand)", border: `1.5px solid ${d.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.n}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                          <Pill tone={d.tone}>{d.tag}</Pill>
                          <span style={{ fontSize: 10.5, color: "var(--fg3)" }}>{d.date}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)" }}>{d.title}</span>
                      </div>
                      <span style={{ color: "var(--fg3)", fontSize: 18, flexShrink: 0 }}>›</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 15px 15px", borderTop: "1px solid var(--line)" }}>
                        <p style={{ color: "var(--fg2)", fontSize: 13, lineHeight: 1.65, margin: "12px 0 0" }}>{d.body}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "tips" && (
          <div>
            <div style={{ padding: "26px 20px 0" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>From us to you</p>
              <h2 style={{ fontWeight: 600, fontSize: 26, color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.1 }}>Travel tips</h2>
            </div>
            <div style={{ padding: "0 20px 28px" }}>
              {TIPS.map((t, i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", padding: "13px 15px", marginBottom: 9, display: "flex", gap: 12, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: t.color, opacity: 0.5 }} />
                  <div style={{ color: t.color, flexShrink: 0 }}>
                    <Icon name={t.icon} size={21} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)", margin: "0 0 4px" }}>{t.title}</h4>
                    <p style={{ fontSize: 13, color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "emergency" && (
          <div>
            <div style={{ background: "var(--clay-700)", padding: "28px 20px 24px" }}>
              <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--clay-200)", margin: "0 0 6px" }}>Important</p>
              <h2 style={{ fontWeight: 600, fontSize: 25, color: "#fff", margin: "0 0 8px" }}>Emergency &amp; key contacts</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>All numbers in one place. Share this screen with your group.</p>
            </div>
            <div style={{ padding: "20px 20px 28px" }}>
              {CONTACTS.map((c, i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: "var(--r-md)", border: "1px solid var(--line)", padding: "13px 15px", marginBottom: 9, display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: c.color }} />
                  <div style={{ color: c.color, flexShrink: 0 }}>
                    <Icon name={c.icon} size={21} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--fg1)" }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: "var(--fg3)", marginBottom: 3 }}>{c.sub}</div>
                    <div style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.num}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(255,253,248,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 4px 10px", overflowX: "auto" }}>
          {TABS.map((tb) => {
            const active = tab === tb.id;
            const color = active ? "var(--accent)" : "var(--fg3)";
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 6px", borderRadius: 10, flexShrink: 0, color }}
              >
                <Icon name={tb.icon} size={active ? 21 : 18} />
                <span style={{ fontSize: 9, letterSpacing: "0.04em", color, fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>{tb.label}</span>
                {active && <div style={{ width: 16, height: 2.5, background: "var(--primary)", borderRadius: 2 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
