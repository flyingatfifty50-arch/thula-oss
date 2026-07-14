"use client";

import { useActionState, useState } from "react";
import { updateClientAction, deleteClientAction } from "@/app/os/app/clients/[id]/actions";

type Client = { id: string; name: string; email: string | null; phone: string | null; stage: string };

export function EditClientForm({ client }: { client: Client }) {
  const [open, setOpen] = useState(false);
  const boundUpdate = updateClientAction.bind(null, client.id);
  const [state, formAction, pending] = useActionState(boundUpdate, null);

  if (!open) {
    return (
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          onClick={() => setOpen(true)}
          style={{ background: "var(--sand)", border: "1px solid var(--line)", color: "var(--fg2)", fontSize: 13, fontWeight: 600, padding: "8px 14px", borderRadius: "var(--r-pill)", cursor: "pointer" }}
        >
          Edit client details
        </button>
        <form
          action={() => {
            if (confirm(`Delete ${client.name}? This removes their trip, invoices and documents too.`)) {
              deleteClientAction(client.id);
            }
          }}
        >
          <button
            type="submit"
            style={{ background: "var(--clay-100)", border: "1px solid var(--clay-300)", color: "var(--primary)", fontSize: 13, fontWeight: 600, padding: "8px 14px", borderRadius: "var(--r-pill)", cursor: "pointer" }}
          >
            Delete client
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "18px 20px", marginBottom: 16, maxWidth: 560, boxShadow: "var(--shadow-sm)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 5 }}>Name</label>
          <input name="name" defaultValue={client.name} required style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 11px", fontSize: "0.85rem", fontFamily: "inherit" }} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 5 }}>Stage</label>
          <select name="stage" defaultValue={client.stage} style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 11px", fontSize: "0.85rem", fontFamily: "inherit" }}>
            <option value="Draft">Draft</option>
            <option value="Live">Live</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 5 }}>Email</label>
          <input name="email" type="email" defaultValue={client.email ?? ""} required style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 11px", fontSize: "0.85rem", fontFamily: "inherit" }} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 5 }}>Phone</label>
          <input name="phone" defaultValue={client.phone ?? ""} style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 11px", fontSize: "0.85rem", fontFamily: "inherit" }} />
        </div>
      </div>
      {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.8rem", margin: "0 0 10px" }}>{state.error}</p>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={pending} style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "8px 16px", fontSize: "0.82rem", fontWeight: 600, cursor: pending ? "default" : "pointer" }}>
          {pending ? "Saving…" : state?.success ? "Saved ✓" : "Save"}
        </button>
        <button type="button" onClick={() => setOpen(false)} style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--fg2)", borderRadius: "var(--r-pill)", padding: "8px 16px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
          Close
        </button>
      </div>
    </form>
  );
}
