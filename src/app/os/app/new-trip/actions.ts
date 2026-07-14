"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createTrip(_prev: { error?: string } | null, formData: FormData) {
  const clientName = String(formData.get("clientName") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();
  if (!clientName || !destination) return { error: "Client name and destination are required." };

  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  if (!profile) return { error: "Could not find your agency." };

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .insert({ agency_id: profile.agency_id, name: clientName, stage: "Draft", tone: "amber" })
    .select()
    .single();
  if (clientError || !client) return { error: clientError?.message ?? "Could not create client." };

  const [line1, ...rest] = destination.split(" ");
  const { error: tripError } = await supabase.from("trips").insert({
    agency_id: profile.agency_id,
    client_id: client.id,
    destination_line1: line1,
    destination_line2: rest.join(" "),
    status: "planning",
  });
  if (tripError) return { error: tripError.message };

  revalidatePath("/os/app/clients");
  redirect(`/os/app/clients/${client.id}`);
}
