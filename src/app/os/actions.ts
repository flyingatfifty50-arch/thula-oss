"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { seedDemoAgency } from "@/lib/demo-seed";

export type ActionState = { error?: string; message?: string } | null;

async function origin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host");
  return `${proto}://${host}`;
}

export async function signUp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!name || !email || !password) return { error: "All fields are required." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${await origin()}/auth/confirm?next=/os/onboarding`,
    },
  });
  if (error) return { error: error.message };

  if (data.session) {
    // Email confirmation is disabled on this project - go straight to onboarding.
    redirect("/os/onboarding");
  }

  return { message: "Check your inbox — we sent a confirmation link to finish setting up your account." };
}

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect("/os/app/clients");
}

export async function signOutOs() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/os/login");
}

export async function completeOnboarding(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const agencyName = String(formData.get("agencyName") ?? "").trim() || "My Travel Agency";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/os/login");

  const { data: existing } = await supabase.from("staff_profiles").select("id").eq("id", user!.id).maybeSingle();
  if (existing) redirect("/os/app/clients");

  const { data: agency, error: agencyError } = await supabase
    .from("agencies")
    .insert({ name: agencyName })
    .select()
    .single();
  if (agencyError || !agency) return { error: agencyError?.message ?? "Could not create agency." };

  const { error: profileError } = await supabase.from("staff_profiles").insert({
    id: user!.id,
    agency_id: agency.id,
    name: (user!.user_metadata?.name as string) || user!.email!,
    email: user!.email!,
    role: "Owner",
  });
  if (profileError) return { error: profileError.message };

  await seedDemoAgency(supabase, agency.id, user!.email!);

  redirect("/os/app/clients");
}
