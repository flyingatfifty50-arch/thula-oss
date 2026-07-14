import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NewInvoiceForm } from "@/components/os/NewInvoiceForm";

export default async function NewInvoicePage() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id,name").order("name", { ascending: true });

  return (
    <div>
      <Link href="/os/app/payments" style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
        ← Payments
      </Link>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.8rem", margin: "0 0 20px", color: "var(--fg1)" }}>New invoice</h2>
      <NewInvoiceForm clients={clients ?? []} />
    </div>
  );
}
