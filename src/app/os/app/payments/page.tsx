import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Pill, type PillTone } from "@/components/Pill";
import { formatEuros } from "@/lib/money";

export default async function PaymentsPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id,number,total_due_cents,status,tone,clients(name)")
    .order("created_at", { ascending: true });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: 0, color: "var(--fg1)" }}>Payments &amp; deposits</h2>
        <Link href="/os/app/payments/new" style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, padding: "11px 20px", borderRadius: "var(--r-pill)", textDecoration: "none" }}>
          + New invoice
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.9fr 0.9fr 0.6fr", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, padding: "0 4px 10px", borderBottom: "1px solid var(--line)" }}>
        <div>Client</div>
        <div>Amount</div>
        <div>Type</div>
        <div>Status</div>
        <div />
      </div>
      {(invoices ?? []).map((p) => {
        const client = Array.isArray(p.clients) ? p.clients[0] : p.clients;
        const type = p.number?.split("·").pop()?.trim() ?? "";
        return (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.9fr 0.9fr 0.6fr", fontSize: "0.9rem", padding: "13px 4px", borderBottom: "1px solid var(--line-soft)", alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: "var(--fg1)" }}>{client?.name ?? "—"}</div>
            <div style={{ color: "var(--fg2)" }}>{formatEuros(p.total_due_cents)}</div>
            <div style={{ color: "var(--fg3)" }}>{type}</div>
            <div>
              <Pill tone={(p.tone as PillTone) ?? "sage"}>{p.status}</Pill>
            </div>
            <div>
              <Link href={`/os/app/payments/${p.id}`} style={{ background: "var(--sand)", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11.5, fontWeight: 600, color: "var(--fg2)", textDecoration: "none" }}>
                View
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
