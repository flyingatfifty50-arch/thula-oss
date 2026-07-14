import { createClient } from "@/lib/supabase/server";
import { formatEuros } from "@/lib/money";

export default async function SuppliersPage() {
  const supabase = await createClient();
  const { data: suppliers } = await supabase.from("suppliers").select("*").order("name", { ascending: true });

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 24px", color: "var(--fg1)" }}>Supplier rolodex</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
        {(suppliers ?? []).map((sup) => (
          <div key={sup.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "16px 18px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--fg1)", marginBottom: 3 }}>{sup.name}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--fg3)", marginBottom: 8 }}>
              {sup.type} · {sup.region}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>{sup.commission_pct} commission</div>
            <div style={{ fontSize: "0.74rem", color: "var(--fg3)" }}>
              Linked to {sup.invoice_count} invoices · {formatEuros(sup.earned_cents ?? 0)} earned
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
