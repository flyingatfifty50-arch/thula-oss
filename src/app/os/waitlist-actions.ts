"use server";

import { createClient } from "@/lib/supabase/server";

export async function joinWaitlist(_prev: { error?: string; success?: boolean } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) return { error: "Enter a valid email address." };

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist_signups").insert({ email });
  if (error) return { error: error.message };

  return { success: true };
}
