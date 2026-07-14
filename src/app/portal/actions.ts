"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type PortalActionState = { error?: string; message?: string } | null;

export async function sendMagicLink(_prev: PortalActionState, formData: FormData): Promise<PortalActionState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email address." };

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${proto}://${host}/auth/confirm?next=/portal` },
  });
  if (error) return { error: error.message };

  return { message: "Check your inbox — we've emailed you a secure login link." };
}

export async function signOutPortal() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/portal/login");
}

export async function sendConciergeMessage(tripId: string, text: string) {
  const supabase = await createClient();
  await supabase.from("chat_messages").insert({ trip_id: tripId, from_role: "user", text_value: text });

  const CANNED_ANSWERS: { match: RegExp; reply: string }[] = [
    { match: /dinner|restaurant|eat|food/i, reply: "For tonight, book Foliage or Reuben's in Franschhoek — both walkable from Centre-Ville. Ask for the terrace table if it's clear, it's the best seat in the village.\n\nWant me to have Gillian call ahead and book it for you?" },
    { match: /safe|safety|walk/i, reply: "Sea Point's Beach Road is well-lit and busy with joggers even after dark, so it's generally fine. As anywhere, stick to the main promenade rather than side streets, and keep valuables out of sight in the car.\n\nIf anything feels off, the Emergency tab has local numbers on speed-dial." },
    { match: /wear|pack|clothes|cold/i, reply: "Mornings at Addo are properly cold — layer up, you'll be glad of a fleece and gloves in the open safari vehicle. It warms quickly by mid-morning, so bring something you can peel off too." },
    { match: /whale|wildlife|animal/i, reply: "Great timing — whale season's just starting. Keep an eye on the water during the Chapman's Peak drive, they're often visible from the road this time of year." },
  ];
  const hit = CANNED_ANSWERS.find((a) => a.match.test(text));
  const reply = hit
    ? hit.reply
    : "That's a great question — I'll check with your local guide and get back to you shortly. In the meantime, anything urgent is best sent straight to Gillian via WhatsApp.";

  // Small delay so the "Thinking…" state reads naturally, matching the prototype's demo pacing.
  await new Promise((r) => setTimeout(r, 700));
  await supabase.from("chat_messages").insert({ trip_id: tripId, from_role: "assistant", text_value: reply });
  return reply;
}
