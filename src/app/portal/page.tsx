import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";

export default async function PortalHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: client } = await supabase.from("clients").select("id,name").eq("email", user!.email).single();

  const { data: trips } = await supabase
    .from("trips")
    .select("id,destination_line1,destination_line2,date_range,status")
    .eq("client_id", client!.id)
    .order("created_at", { ascending: true });

  const liveTrip = (trips ?? []).find((t) => t.status === "live");
  const pastTrips = (trips ?? []).filter((t) => t.status === "past");

  const GRADIENTS: Record<string, string> = { Italy: "var(--fig-fynbos)", Kenya: "var(--fig-savanna)" };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ padding: "32px 28px" }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 4px", color: "var(--fg1)" }}>Welcome back, {client!.name.split(" ")[0]}</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--fg3)", margin: "0 0 24px" }}>
          {liveTrip ? `Your ${liveTrip.destination_line1} ${liveTrip.destination_line2} trip is coming up.` : "No live trip right now — check back closer to your next departure."}
        </p>

        {liveTrip && (
          <Link
            href={`/portal/trip/${liveTrip.id}`}
            style={{ background: "var(--sage-100)", border: "1px solid var(--sage-300)", borderRadius: "var(--r-md)", padding: "20px 22px", marginBottom: 26, display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textDecoration: "none" }}
          >
            <div style={{ color: "var(--accent)" }}>
              <Icon name="plane" size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--fg1)" }}>
                {liveTrip.destination_line1} {liveTrip.destination_line2}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--fg3)" }}>{liveTrip.date_range}</div>
            </div>
            <span style={{ background: "var(--primary)", color: "#fff", fontSize: 12.5, fontWeight: 600, padding: "9px 16px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap" }}>Open trip</span>
          </Link>
        )}

        {!!pastTrips.length && (
          <>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 12px", color: "var(--fg1)" }}>Past trips, kept forever</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
              {pastTrips.map((pt) => (
                <Link
                  key={pt.id}
                  href={`/portal/journal/${pt.id}`}
                  style={{ background: GRADIENTS[pt.destination_line1 ?? ""] ?? "var(--fig-fynbos)", borderRadius: "var(--r-md)", height: 100, position: "relative", cursor: "pointer", display: "block" }}
                >
                  <span style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: "0.85rem", fontWeight: 600, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
                    {pt.destination_line1} · {pt.date_range}
                  </span>
                  <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(31,30,26,0.5)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>Journal</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {liveTrip && (
        <Link
          href={`/portal/concierge?trip=${liveTrip.id}`}
          style={{ position: "fixed", bottom: 24, right: 24, background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "13px 20px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 8, zIndex: 20, textDecoration: "none" }}
        >
          <Icon name="sparkles" size={16} />
          Ask Thula
        </Link>
      )}
    </div>
  );
}
