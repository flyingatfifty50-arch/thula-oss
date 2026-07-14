"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function duplicateClient(clientId: string) {
  const supabase = await createClient();
  const { data: original } = await supabase.from("clients").select("*").eq("id", clientId).single();
  if (!original) return;

  const { data: copy } = await supabase
    .from("clients")
    .insert({
      agency_id: original.agency_id,
      name: `${original.name} (copy)`,
      stage: "Draft",
      tone: "amber",
      traveller_type: original.traveller_type,
      likes: original.likes,
      dislikes: original.dislikes,
    })
    .select()
    .single();
  if (!copy) return;

  const { data: trips } = await supabase.from("trips").select("*").eq("client_id", clientId);
  for (const trip of trips ?? []) {
    const { data: newTrip } = await supabase
      .from("trips")
      .insert({
        agency_id: trip.agency_id,
        client_id: copy.id,
        destination_line1: trip.destination_line1,
        destination_line2: trip.destination_line2,
        date_range: trip.date_range,
        group_size: trip.group_size,
        nights: trip.nights,
        destinations_count: trip.destinations_count,
        departure_date: trip.departure_date,
        consultant_name: trip.consultant_name,
        status: "planning",
      })
      .select()
      .single();
    if (!newTrip) continue;

    const { data: flights } = await supabase.from("flights").select("*").eq("trip_id", trip.id);
    if (flights?.length) {
      await supabase.from("flights").insert(
        flights.map((f) => ({
          trip_id: newTrip.id,
          carrier: f.carrier,
          date_label: f.date_label,
          code: f.code,
          from_code: f.from_code,
          from_city: f.from_city,
          to_code: f.to_code,
          to_city: f.to_city,
          dep: f.dep,
          arr: f.arr,
          color: f.color,
          sort_order: f.sort_order,
        }))
      );
    }
    const { data: hotels } = await supabase.from("hotels").select("*").eq("trip_id", trip.id);
    if (hotels?.length) {
      await supabase.from("hotels").insert(
        hotels.map((h) => ({
          trip_id: newTrip.id,
          name: h.name,
          loc: h.loc,
          dates: h.dates,
          board: h.board,
          description: h.description,
          url: h.url,
          color: h.color,
          sort_order: h.sort_order,
        }))
      );
    }
    const { data: days } = await supabase.from("itinerary_days").select("*").eq("trip_id", trip.id);
    for (const day of days ?? []) {
      const { data: newDay } = await supabase
        .from("itinerary_days")
        .insert({
          trip_id: newTrip.id,
          day_number: day.day_number,
          date_label: day.date_label,
          tag: day.tag,
          tone: day.tone,
          title: day.title,
          body: day.body,
          color: day.color,
          sort_order: day.sort_order,
        })
        .select()
        .single();
      if (!newDay) continue;
      const { data: items } = await supabase.from("itinerary_timeline_items").select("*").eq("itinerary_day_id", day.id);
      if (items?.length) {
        await supabase.from("itinerary_timeline_items").insert(
          items.map(({ time_label, text_value, sort_order }) => ({ itinerary_day_id: newDay.id, time_label, text_value, sort_order }))
        );
      }
    }
  }

  revalidatePath("/os/app/clients");
}

export async function togglePreview(clientId: string, current: boolean) {
  const supabase = await createClient();
  await supabase.from("clients").update({ preview_enabled: !current }).eq("id", clientId);
  revalidatePath(`/os/app/clients/${clientId}`);
}
