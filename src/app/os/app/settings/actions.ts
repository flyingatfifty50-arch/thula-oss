"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateAgencyName(_prev: { error?: string; success?: boolean } | null, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Agency name can't be empty." };

  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  if (!profile) return { error: "Could not find your agency." };

  const { error } = await supabase.from("agencies").update({ name }).eq("id", profile.agency_id);
  if (error) return { error: error.message };

  revalidatePath("/os/app/settings");
  return { success: true };
}
