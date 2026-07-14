import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";
import { Pill, type PillTone } from "@/components/Pill";
import { formatEuros } from "@/lib/money";
import { PreviewToggle } from "@/components/os/PreviewToggle";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (!client) notFound();

  const { data: trips } = await supabase.from("trips").select("*").eq("client_id", id);
  const liveTrip = trips?.find((t) => t.status === "live") ?? trips?.[0];

  const { data: checks } = await supabase
    .from("predeparture_checks")
    .select("*")
    .eq("client_id", id)
    .order("sort_order", { ascending: true });

  const { data: vendorCosts } = await supabase
    .from("vendor_costs")
    .select("*")
    .eq("client_id", id)
    .order("sort_order", { ascending: true });
  const vendorTotal = (vendorCosts ?? []).reduce((sum, v) => sum + (v.amount_cents ?? 0), 0);

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id,number,status,tone")
    .eq("client_id", id)
    .order("created_at", { ascending: true });

  return (
    <div>
      <Link href="/os/app/clients" style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
        ← All clients
      </Link>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.8rem", margin: "0 0 6px", color: "var(--fg1)" }}>{client.name}</h2>
      <p style={{ fontSize: "0.95rem", color: "var(--fg3)", margin: "0 0 22px" }}>
        {liveTrip ? `${[liveTrip.destination_line1, liveTrip.destination_line2].filter(Boolean).join(" ")} · ${liveTrip.date_range ?? ""}` : "No trip yet"}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--fg3)", textTransform: "uppercase" }}>Value</div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--fg1)" }}>{formatEuros(client.value_cents)}</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--fg3)", textTransform: "uppercase" }}>Margin</div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent)" }}>{client.margin_pct ?? "—"}</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 16 }}>
          <div style={{ fontSize: 11, color: "var(--fg3)", textTransform: "uppercase" }}>Balance due</div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--primary)" }}>{client.due_label ?? "—"}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <a
          href={client.phone ? `https://wa.me/${client.phone.replace(/[^0-9]/g, "")}` : undefined}
          target="_blank"
          rel="noopener"
          aria-disabled={!client.phone}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#25D366",
            color: "#fff",
            border: "none",
            fontSize: 13,
            fontWeight: 600,
            padding: "10px 16px",
            borderRadius: "var(--r-pill)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            opacity: client.phone ? 1 : 0.55,
            pointerEvents: client.phone ? "auto" : "none",
          }}
        >
          <Icon name="message-circle" size={15} />
          <span style={{ whiteSpace: "nowrap" }}>Send via WhatsApp</span>
        </a>
        <button
          disabled
          title="PDF export is a planned integration — not wired up yet"
          style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sand)", color: "var(--fg2)", border: "1px solid var(--line)", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: "var(--r-pill)", cursor: "not-allowed", whiteSpace: "nowrap", opacity: 0.7 }}
        >
          <Icon name="file-down" size={15} />
          <span style={{ whiteSpace: "nowrap" }}>Export PDF</span>
        </button>
        <PreviewToggle clientId={client.id} enabled={client.preview_enabled} />
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Client DNA profile</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 14 }}>
          <div>
            <span style={{ fontSize: "0.76rem", color: "var(--fg3)", display: "block" }}>Traveller type</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--fg1)" }}>{client.traveller_type ?? "—"}</span>
          </div>
          <div>
            <span style={{ fontSize: "0.76rem", color: "var(--fg3)", display: "block" }}>Lifetime value</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)" }}>{formatEuros(client.lifetime_value_cents ?? 0)}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ fontSize: "0.76rem", color: "var(--fg3)", display: "block", marginBottom: 6 }}>Loves</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(client.likes ?? []).map((l: string) => (
                <Pill key={l} tone="sage">{l}</Pill>
              ))}
            </div>
          </div>
          <div>
            <span style={{ fontSize: "0.76rem", color: "var(--fg3)", display: "block", marginBottom: 6 }}>Avoids</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(client.dislikes ?? []).map((d: string) => (
                <Pill key={d} tone="clay">{d}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Pre-departure AI checks</div>
        {(checks ?? []).map((ck) => (
          <div key={ck.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ color: ck.color ?? "var(--accent)", flexShrink: 0 }}>
              <Icon name={ck.icon ?? "check-circle"} size={16} />
            </div>
            <span style={{ fontSize: "0.88rem", color: "var(--fg1)", flex: 1 }}>{ck.label}</span>
            <Pill tone={(ck.tone as PillTone) ?? "sage"}>{ck.status}</Pill>
          </div>
        ))}
      </div>

      {!!(vendorCosts ?? []).length && (
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Vendor costs &amp; tracking</div>
          {(vendorCosts ?? []).map((vc) => (
            <div key={vc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", padding: "10px 0", borderBottom: "1px solid var(--line-soft)", color: "var(--fg1)" }}>
              <div>
                <span style={{ fontWeight: 600 }}>{vc.vendor}</span>
                <span style={{ color: "var(--fg3)", fontSize: "0.78rem", display: "block" }}>{vc.due_label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "var(--fg2)" }}>{formatEuros(vc.amount_cents)}</span>
                <Pill tone={(vc.tone as PillTone) ?? "sage"}>{vc.status}</Pill>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", color: "var(--fg2)", paddingTop: 12, marginTop: 2 }}>
            <span>Total owed to vendors</span>
            <span style={{ fontWeight: 700, color: "var(--fg1)" }}>{formatEuros(vendorTotal)}</span>
          </div>
        </div>
      )}

      {!!(invoices ?? []).length && (
        <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Invoices</div>
          {(invoices ?? []).map((inv) => (
            <Link
              key={inv.id}
              href={`/os/app/payments/${inv.id}`}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", padding: "10px 0", borderBottom: "1px solid var(--line-soft)", color: "var(--fg1)", textDecoration: "none" }}
            >
              <span>{inv.number}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Pill tone={(inv.tone as PillTone) ?? "sage"}>{inv.status}</Pill>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>View ›</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Linked records</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "10px 0", borderBottom: "1px solid var(--line-soft)", color: "var(--fg1)" }}>
          Client dashboard (app + site)
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>—</span>
        </div>
        <Link href="/os/app/documents" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "10px 0", borderBottom: "1px solid var(--line-soft)", color: "var(--fg1)", textDecoration: "none" }}>
          {client.docs_count} documents on file<span style={{ color: "var(--accent)", fontWeight: 600 }}>View ›</span>
        </Link>
        <Link href="/os/app/suppliers" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "10px 0", color: "var(--fg1)", textDecoration: "none" }}>
          {client.suppliers_count} suppliers booked<span style={{ color: "var(--accent)", fontWeight: 600 }}>View ›</span>
        </Link>
      </div>
    </div>
  );
}
