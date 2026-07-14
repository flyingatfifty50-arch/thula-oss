"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addFlight(clientId: string, tripId: string, formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("flights").select("id", { count: "exact", head: true }).eq("trip_id", tripId);
  await supabase.from("flights").insert({
    trip_id: tripId,
    carrier: String(formData.get("carrier") ?? "").trim(),
    date_label: String(formData.get("date_label") ?? "").trim(),
    code: String(formData.get("code") ?? "").trim(),
    from_code: String(formData.get("from_code") ?? "").trim().toUpperCase(),
    from_city: String(formData.get("from_city") ?? "").trim(),
    to_code: String(formData.get("to_code") ?? "").trim().toUpperCase(),
    to_city: String(formData.get("to_city") ?? "").trim(),
    dep: String(formData.get("dep") ?? "").trim(),
    arr: String(formData.get("arr") ?? "").trim(),
    color: "var(--accent)",
    sort_order: count ?? 0,
  });
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function deleteFlight(clientId: string, flightId: string) {
  const supabase = await createClient();
  await supabase.from("flights").delete().eq("id", flightId);
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function addHotel(clientId: string, tripId: string, formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("hotels").select("id", { count: "exact", head: true }).eq("trip_id", tripId);
  await supabase.from("hotels").insert({
    trip_id: tripId,
    name: String(formData.get("name") ?? "").trim(),
    loc: String(formData.get("loc") ?? "").trim(),
    dates: String(formData.get("dates") ?? "").trim(),
    board: String(formData.get("board") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
    color: "var(--primary)",
    sort_order: count ?? 0,
  });
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function deleteHotel(clientId: string, hotelId: string) {
  const supabase = await createClient();
  await supabase.from("hotels").delete().eq("id", hotelId);
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function addItineraryDay(clientId: string, tripId: string, formData: FormData) {
  const supabase = await createClient();
  const { count } = await supabase.from("itinerary_days").select("id", { count: "exact", head: true }).eq("trip_id", tripId);
  const n = (count ?? 0) + 1;
  await supabase.from("itinerary_days").insert({
    trip_id: tripId,
    day_number: String(n).padStart(2, "0"),
    date_label: String(formData.get("date_label") ?? "").trim(),
    tag: String(formData.get("tag") ?? "").trim(),
    tone: "sage",
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    color: "var(--accent)",
    sort_order: count ?? 0,
  });
  revalidatePath(`/os/app/clients/${clientId}`);
}

export async function deleteItineraryDay(clientId: string, dayId: string) {
  const supabase = await createClient();
  await supabase.from("itinerary_days").delete().eq("id", dayId);
  revalidatePath(`/os/app/clients/${clientId}`);
}
