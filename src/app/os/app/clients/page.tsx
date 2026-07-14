import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";
import { formatEuros } from "@/lib/money";
import { ClientsTable } from "@/components/os/ClientsTable";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id,name,stage,tone,value_cents,due_label")
    .order("created_at", { ascending: true });

  const { data: priorities } = await supabase
    .from("priorities")
    .select("id,client_id,text_value,reason,confidence,clients(name)")
    .order("sort_order", { ascending: true });

  const { data: trips } = await supabase.from("trips").select("status,group_size,client_id");
  const liveTrips = trips?.filter((t) => t.status === "live").length ?? 0;
  const planningTrips = trips?.filter((t) => t.status === "planning").length ?? 0;
  const pipelineValue = (clients ?? []).reduce((sum, c) => sum + (c.value_cents ?? 0), 0);
  const seatsUsed = new Set((clients ?? []).map((c) => c.id)).size;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: 0, color: "var(--fg1)" }}>Your clients</h2>
        <Link
          href="/os/app/new-trip"
          style={{ background: "var(--primary)", color: "#fff", fontSize: 13.5, fontWeight: 600, padding: "11px 20px", borderRadius: "var(--r-pill)", textDecoration: "none" }}
        >
          + New trip
        </Link>
      </div>

      <div style={{ background: "var(--sage-100)", border: "1px solid var(--sage-300)", borderRadius: "var(--r-md)", padding: "18px 22px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Icon name="sparkles" size={16} />
          <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--accent)" }}>Today&apos;s priorities</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(priorities ?? []).map((p) => (
            <Link
              key={p.id}
              href={`/os/app/clients/${p.client_id}`}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--card)", borderRadius: 8, padding: "10px 14px", cursor: "pointer", textDecoration: "none" }}
            >
              <div>
                <span style={{ fontSize: "0.86rem", color: "var(--fg1)", fontWeight: 600 }}>{p.text_value}</span>
                <span style={{ fontSize: "0.76rem", color: "var(--fg3)", display: "block", marginTop: 1 }}>{p.reason}</span>
              </div>
              <span style={{ color: "var(--accent)", fontSize: "0.78rem", fontWeight: 700 }}>{p.confidence}</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 26 }}>
        <StatCard label="Live trips" value={String(liveTrips)} color="var(--accent)" />
        <StatCard label="In planning" value={String(planningTrips)} color="var(--amber-600)" />
        <StatCard label="Pipeline value" value={formatEuros(pipelineValue)} color="var(--primary)" />
        <StatCard label="Seats used" value={`${seatsUsed} / 5`} color="var(--fg1)" />
      </div>

      <ClientsTable clients={clients ?? []} />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 16, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", color, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}
