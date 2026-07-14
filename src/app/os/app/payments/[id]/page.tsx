import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";
import { Pill, type PillTone } from "@/components/Pill";
import { formatEuros } from "@/lib/money";
import { AddLineItemForm } from "@/components/os/AddLineItemForm";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice } = await supabase.from("invoices").select("*,clients(id,name)").eq("id", id).maybeSingle();
  if (!invoice) notFound();
  const client = Array.isArray(invoice.clients) ? invoice.clients[0] : invoice.clients;

  const { data: lineItems } = await supabase
    .from("invoice_line_items")
    .select("*")
    .eq("invoice_id", id)
    .order("sort_order", { ascending: true });

  return (
    <div>
      <Link href="/os/app/payments" style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
        ← Payments
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.8rem", margin: "0 0 4px", color: "var(--fg1)" }}>{invoice.heading}</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--fg3)", margin: 0 }}>{invoice.number}</p>
          {client && (
            <Link href={`/os/app/clients/${client.id}`} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="user" size={13} />
              View {client.name}&apos;s client record
            </Link>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button disabled title="PDF export is a planned integration — not wired up yet" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--sand)", color: "var(--fg2)", border: "1px solid var(--line)", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: "var(--r-pill)", cursor: "not-allowed", opacity: 0.7, whiteSpace: "nowrap" }}>
            <Icon name="file-down" size={15} />
            <span style={{ whiteSpace: "nowrap" }}>Export PDF</span>
          </button>
          <button disabled title="Email sending is a planned integration — not wired up yet" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--primary)", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: "var(--r-pill)", cursor: "not-allowed", opacity: 0.7, whiteSpace: "nowrap" }}>
            <Icon name="send" size={15} />
            <span style={{ whiteSpace: "nowrap" }}>Send to client</span>
          </button>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "26px 28px", maxWidth: 680, boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Bill to</label>
            <div style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)" }}>{client?.name ?? "—"}</div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Due date</label>
            <div style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)" }}>{invoice.due_date}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 10 }}>Line items</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px 100px", gap: 8, fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, padding: "0 2px 8px", borderBottom: "1px solid var(--line)" }}>
          <div>Description</div>
          <div>Qty</div>
          <div>Unit price</div>
          <div>Line total</div>
        </div>
        {(lineItems ?? []).map((li) => (
          <div key={li.id} style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px 100px", gap: 8, fontSize: "0.86rem", padding: "10px 2px", borderBottom: "1px solid var(--line-soft)", alignItems: "center", color: "var(--fg1)" }}>
            <div>{li.description}</div>
            <div style={{ color: "var(--fg3)" }}>{li.qty}</div>
            <div style={{ color: "var(--fg3)" }}>{li.unit_price}</div>
            <div style={{ fontWeight: 600 }}>{li.line_total}</div>
          </div>
        ))}
        <AddLineItemForm invoiceId={invoice.id} />

        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 6, maxWidth: 280, marginLeft: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", color: "var(--fg2)" }}>
            <span>Subtotal</span>
            <span>{formatEuros(invoice.subtotal_cents)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", color: "var(--fg2)" }}>
            <span>Deposit due now ({invoice.deposit_pct})</span>
            <span>{formatEuros(invoice.deposit_cents)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 700, color: "var(--fg1)", paddingTop: 6, borderTop: "1px dashed var(--line)" }}>
            <span>Total due</span>
            <span style={{ color: "var(--accent)" }}>{formatEuros(invoice.total_due_cents)}</span>
          </div>
        </div>

        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <Pill tone={(invoice.tone as PillTone) ?? "sage"}>{invoice.status}</Pill>
        </div>
      </div>
    </div>
  );
}
