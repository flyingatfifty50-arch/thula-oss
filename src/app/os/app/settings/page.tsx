import { createClient } from "@/lib/supabase/server";
import { AgencyNameForm } from "@/components/os/AgencyNameForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  const { data: agency } = profile ? await supabase.from("agencies").select("*").eq("id", profile.agency_id).single() : { data: null };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 24px", color: "var(--fg1)" }}>Settings</h2>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "22px 26px", maxWidth: 560, boxShadow: "var(--shadow-sm)" }}>
        <AgencyNameForm initialName={agency?.name ?? ""} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", fontSize: "0.9rem", color: "var(--fg1)" }}>
          Brand palette
          <span style={{ color: "var(--fg3)" }}>Bold flag ({agency?.accent_color ?? "#317653"})</span>
        </div>
      </div>
    </div>
  );
}
