"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function togglePreviewAction(clientId: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("clients").update({ preview_enabled: !current }).eq("id", clientId);
  revalidatePath(`/os/app/clients/${clientId}`);
}
