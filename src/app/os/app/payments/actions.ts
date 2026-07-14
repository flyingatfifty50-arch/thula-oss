"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function parsePrice(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

export async function createInvoice(_prev: { error?: string } | null, formData: FormData) {
  const clientId = String(formData.get("clientId") ?? "");
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const qty = String(formData.get("qty") ?? "1").trim();
  const unitPrice = String(formData.get("unitPrice") ?? "").trim();
  if (!clientId || !description || !unitPrice) return { error: "Client, description and unit price are required." };

  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  if (!profile) return { error: "Could not find your agency." };

  const lineTotalCents = parsePrice(unitPrice) * (parseInt(qty, 10) || 1);

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      agency_id: profile.agency_id,
      client_id: clientId,
      number: `INV-${Math.floor(1000 + Math.random() * 9000)} · Deposit`,
      heading: "Invoice",
      due_date: dueDate || "Not set",
      status: "Draft",
      tone: "amber",
      subtotal_cents: lineTotalCents,
      deposit_pct: "—",
      deposit_cents: 0,
      total_due_cents: lineTotalCents,
    })
    .select()
    .single();
  if (error || !invoice) return { error: error?.message ?? "Could not create invoice." };

  await supabase.from("invoice_line_items").insert({
    invoice_id: invoice.id,
    description,
    qty,
    unit_price: unitPrice,
    line_total: `€${(lineTotalCents / 100).toLocaleString()}`,
    sort_order: 0,
  });

  revalidatePath("/os/app/payments");
  redirect(`/os/app/payments/${invoice.id}`);
}

export async function addLineItem(invoiceId: string, formData: FormData) {
  const description = String(formData.get("description") ?? "").trim();
  const qty = String(formData.get("qty") ?? "1").trim();
  const unitPrice = String(formData.get("unitPrice") ?? "").trim();
  if (!description || !unitPrice) return;

  const supabase = await createClient();
  const lineTotalCents = parsePrice(unitPrice) * (parseInt(qty, 10) || 1);

  const { count } = await supabase.from("invoice_line_items").select("id", { count: "exact", head: true }).eq("invoice_id", invoiceId);
  await supabase.from("invoice_line_items").insert({
    invoice_id: invoiceId,
    description,
    qty,
    unit_price: unitPrice,
    line_total: `€${(lineTotalCents / 100).toLocaleString()}`,
    sort_order: count ?? 0,
  });

  const { data: invoice } = await supabase.from("invoices").select("subtotal_cents,deposit_cents").eq("id", invoiceId).single();
  if (invoice) {
    const newSubtotal = invoice.subtotal_cents + lineTotalCents;
    await supabase
      .from("invoices")
      .update({ subtotal_cents: newSubtotal, total_due_cents: newSubtotal - invoice.deposit_cents })
      .eq("id", invoiceId);
  }

  revalidatePath(`/os/app/payments/${invoiceId}`);
}
