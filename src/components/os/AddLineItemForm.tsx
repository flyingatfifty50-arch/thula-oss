"use client";

import { useRef } from "react";
import { addLineItem } from "@/app/os/app/payments/actions";

export function AddLineItemForm({ invoiceId }: { invoiceId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addLineItem(invoiceId, formData);
        formRef.current?.reset();
      }}
      style={{ display: "grid", gridTemplateColumns: "1fr 70px 100px auto", gap: 8, marginTop: 10 }}
    >
      <input name="description" required placeholder="Description" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 10px", fontSize: "0.83rem", fontFamily: "inherit" }} />
      <input name="qty" defaultValue="1" placeholder="Qty" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 10px", fontSize: "0.83rem", fontFamily: "inherit" }} />
      <input name="unitPrice" required placeholder="€0" style={{ border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 10px", fontSize: "0.83rem", fontFamily: "inherit" }} />
      <button type="submit" style={{ background: "var(--sand)", border: "1px dashed var(--line)", borderRadius: 8, padding: "8px 14px", color: "var(--fg2)", fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap" }}>
        + Add
      </button>
    </form>
  );
}
