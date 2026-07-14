"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function togglePreviewAction(clientId: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("clients").update({ preview_enabled: !current }).eq("id", clientId);
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function updateClientAction(clientId: string, _prev: { error?: string; success?: boolean } | null, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const stage = String(formData.get("stage") ?? "").trim();
  if (!name || !email) return { error: "Name and email are required." };

  const tone = stage === "Live" ? "sage" : stage === "Overdue" ? "clay" : "amber";

  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({ name, email, phone: phone || null, stage, tone })
    .eq("id", clientId);
  if (error) return { error: error.message };

  revalidatePath(`/os/app/clients/${clientId}`);
  revalidatePath("/os/app/clients");
  return { success: true };
}

export async function deleteClientAction(clientId: string) {
  const supabase = await createClient();
  await supabase.from("clients").delete().eq("id", clientId);
  revalidatePath("/os/app/clients");
  redirect("/os/app/clients");
}
