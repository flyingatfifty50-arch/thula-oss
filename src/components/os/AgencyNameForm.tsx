"use client";

import { useActionState } from "react";
import { updateAgencyName } from "@/app/os/app/settings/actions";

export function AgencyNameForm({ initialName }: { initialName: string }) {
  const [state, formAction, pending] = useActionState(updateAgencyName, null);

  return (
    <form action={formAction} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--line-soft)", gap: 12 }}>
      <span style={{ fontSize: "0.9rem", color: "var(--fg1)" }}>Agency name</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input name="name" defaultValue={initialName} style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "6px 10px", fontSize: "0.85rem", fontFamily: "inherit", color: "var(--fg1)", width: 200 }} />
        <button type="submit" disabled={pending} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: "0.8rem", fontWeight: 600, cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}>
          {pending ? "Saving…" : state?.success ? "Saved ✓" : "Save"}
        </button>
      </div>
    </form>
  );
}
