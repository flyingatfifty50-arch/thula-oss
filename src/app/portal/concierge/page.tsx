import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConciergeChat } from "@/components/portal/ConciergeChat";

export default async function ConciergePage({ searchParams }: { searchParams: Promise<{ trip?: string }> }) {
  const { trip: tripId } = await searchParams;
  const supabase = await createClient();

  let resolvedTripId: string;
  if (tripId) {
    resolvedTripId = tripId;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: client } = await supabase.from("clients").select("id").eq("email", user!.email).single();
    const { data: trip } = await supabase.from("trips").select("id").eq("client_id", client!.id).eq("status", "live").maybeSingle();
    if (!trip) redirect("/portal");
    resolvedTripId = trip.id;
  }

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("id,from_role,text_value")
    .eq("trip_id", resolvedTripId)
    .order("created_at", { ascending: true });

  return <ConciergeChat tripId={resolvedTripId} initialMessages={messages ?? []} />;
}
