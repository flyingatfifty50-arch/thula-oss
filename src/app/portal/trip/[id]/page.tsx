import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";

const TRIP_LINKS = [
  { icon: "plane", label: "Flights", sub: "See the app for details", color: "var(--accent)" },
  { icon: "bed-double", label: "Hotels", sub: "See the app for details", color: "var(--primary)" },
  { icon: "calendar-days", label: "Itinerary", sub: "Day by day", color: "var(--secondary)" },
  { icon: "life-buoy", label: "Emergency", sub: "Key contacts", color: "var(--primary)" },
];

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: trip } = await supabase.from("trips").select("*").eq("id", id).maybeSingle();
  if (!trip) notFound();

  return (
    <div style={{ padding: "32px 28px" }}>
      <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 6px" }}>
        {trip.status === "live" ? "Live trip" : "Past trip"}
      </p>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 20px", color: "var(--fg1)" }}>
        {trip.destination_line1} {trip.destination_line2}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
        {TRIP_LINKS.map((l) => (
          <div key={l.label} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ color: l.color }}>
              <Icon name={l.icon} size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fg1)" }}>{l.label}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--fg3)" }}>{l.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--fg3)", margin: "20px 0 0" }}>
        For the full day-by-day view, flights and hotel details, open the trip app on your phone — the same link is in your welcome email.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
        <Link
          href={`/portal/journal/${trip.id}`}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sage-100)", border: "1px solid var(--sage-300)", color: "var(--accent)", fontSize: "0.85rem", fontWeight: 600, padding: "11px 16px", borderRadius: "var(--r-pill)", textDecoration: "none" }}
        >
          <Icon name="map" size={15} />
          View trip journal (fills in as you travel)
        </Link>
        <Link
          href={`/portal/concierge?trip=${trip.id}`}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--primary)", border: "none", color: "#fff", fontSize: "0.85rem", fontWeight: 700, padding: "11px 16px", borderRadius: "var(--r-pill)", textDecoration: "none" }}
        >
          <Icon name="sparkles" size={15} />
          Ask Thula concierge
        </Link>
      </div>
    </div>
  );
}
