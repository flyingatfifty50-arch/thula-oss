import { createClient } from "@/lib/supabase/server";

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  const { data: agency } = profile ? await supabase.from("agencies").select("*").eq("id", profile.agency_id).single() : { data: null };
  const { count: clientCount } = await supabase.from("clients").select("id", { count: "exact", head: true });

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 24px", color: "var(--fg1)" }}>Plan &amp; billing</h2>
      <div style={{ background: "var(--sage-100)", border: "1px solid var(--sage-300)", borderRadius: "var(--r-md)", padding: "22px 26px", marginBottom: 20, maxWidth: 560 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--fg1)" }}>{agency?.plan ?? "Studio"} plan</div>
            <div style={{ fontSize: "0.85rem", color: "var(--fg3)" }}>
              {clientCount ?? 0} of {agency?.seats ?? 5} client seats used
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-script)", fontSize: "1.7rem", color: "var(--accent)", fontWeight: 700 }}>
            €79<span style={{ fontSize: "0.75rem", color: "var(--fg3)", fontFamily: "var(--font-serif)" }}>/mo</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 26, maxWidth: 560 }}>
        <button style={{ flex: 1, background: "var(--primary)", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, padding: 11, borderRadius: "var(--r-pill)", cursor: "pointer" }}>Upgrade to Agency</button>
        <button style={{ flex: 1, background: "transparent", border: "1.5px solid var(--line)", color: "var(--fg2)", fontSize: 13.5, fontWeight: 600, padding: 11, borderRadius: "var(--r-pill)", cursor: "pointer" }}>Manage seats</button>
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 10 }}>Recent invoices</div>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", maxWidth: 560, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "12px 18px", borderBottom: "1px solid var(--line-soft)", color: "var(--fg1)" }}>
          <span>This month</span>
          <span style={{ color: "var(--fg3)" }}>€79.00 · paid</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "12px 18px", color: "var(--fg1)" }}>
          <span>Last month</span>
          <span style={{ color: "var(--fg3)" }}>€79.00 · paid</span>
        </div>
      </div>
    </div>
  );
}
