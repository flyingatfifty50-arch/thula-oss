"use client";

import { useActionState } from "react";
import { createInvoice } from "@/app/os/app/payments/actions";

export function NewInvoiceForm({ clients }: { clients: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState(createInvoice, null);

  return (
    <form action={formAction} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "26px 28px", maxWidth: 560, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Bill to</label>
        <select name="clientId" required style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }}>
          <option value="">Select a client…</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Due date</label>
        <input name="dueDate" placeholder="e.g. 20 May 2026" style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }} />
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 10 }}>First line item</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 120px", gap: 8, marginBottom: 18 }}>
        <input name="description" required placeholder="Description" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 10px", fontSize: "0.85rem", fontFamily: "inherit" }} />
        <input name="qty" defaultValue="1" placeholder="Qty" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 10px", fontSize: "0.85rem", fontFamily: "inherit" }} />
        <input name="unitPrice" required placeholder="€0" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 10px", fontSize: "0.85rem", fontFamily: "inherit" }} />
      </div>
      {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.82rem", margin: "0 0 14px" }}>{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        style={{ width: "100%", background: "var(--primary)", color: "#fff", border: "none", fontSize: "0.95rem", fontWeight: 600, padding: "12px 0", borderRadius: "var(--r-pill)", cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
      >
        {pending ? "Creating…" : "Create invoice"}
      </button>
    </form>
  );
}
