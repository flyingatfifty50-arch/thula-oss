import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";

export default async function TripJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: trip } = await supabase.from("trips").select("*").eq("id", id).maybeSingle();
  if (!trip) notFound();

  const { data: entries } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("trip_id", id)
    .order("sort_order", { ascending: true });

  const regions = new Set((entries ?? []).map((e) => e.place_name)).size;
  const isLive = trip.status === "live";

  const stats = [
    { n: String(regions), l: "Regions" },
    { n: String(trip.nights ?? entries?.length ?? "—"), l: "Days" },
    { n: isLive ? "0" : "—", l: isLive ? "Photos so far" : "Photos" },
    { n: "—", l: "Travelled" },
  ];

  const pins = (entries ?? []).map((_, i) => ({ x: 60 + i * 130, y: 90 + (i % 2 === 0 ? 80 : 0) }));

  return (
    <div style={{ padding: "32px 28px" }}>
      <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 6px" }}>Trip journal</p>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 18px", color: "var(--fg1)" }}>
        {trip.destination_line1} {trip.destination_line2}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
        {stats.map((st) => (
          <div key={st.l} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-script)", fontSize: "1.15rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{st.n}</div>
            <div style={{ fontSize: 9.5, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 3 }}>{st.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 8, marginBottom: 22, boxShadow: "var(--shadow-sm)" }}>
        <svg style={{ display: "block", width: "100%", height: "auto", borderRadius: 8 }} viewBox="0 0 400 220" aria-label="Route map">
          <rect width="400" height="220" fill="#FFF3D6" />
          {pins.length > 1 && (
            <path d="M60,170 Q160,60 340,110" fill="none" stroke="#DE3831" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="5 5" />
          )}
          {pins.map((pin, i) => (
            <circle key={i} cx={pin.x} cy={pin.y} r={8} fill="var(--accent)" />
          ))}
        </svg>
      </div>

      <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 14px", color: "var(--fg1)" }}>Along the way</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {(entries ?? []).map((en) => (
          <div key={en.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ height: 110, background: en.gradient ?? "var(--fig-fynbos)" }} />
            <div style={{ padding: "12px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ color: "var(--accent)" }}>
                  <Icon name="map-pin" size={13} />
                </div>
                <span style={{ fontSize: 11, color: "var(--fg3)", fontWeight: 600 }}>
                  {en.place_name} · {en.entry_date}
                </span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--fg1)", margin: 0, lineHeight: 1.5 }}>{en.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
