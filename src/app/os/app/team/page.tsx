import { createClient } from "@/lib/supabase/server";
import { Pill } from "@/components/Pill";

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").single();
  const { data: team } = profile
    ? await supabase.from("staff_profiles").select("*").eq("agency_id", profile.agency_id).order("created_at", { ascending: true })
    : { data: [] };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: 0, color: "var(--fg1)" }}>Team</h2>
        <button
          disabled
          title="Team invites need a token-based invite flow — not wired up yet"
          style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, padding: "11px 20px", borderRadius: "var(--r-pill)", cursor: "not-allowed", opacity: 0.7 }}
        >
          + Invite consultant
        </button>
      </div>
      <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)", maxWidth: 640 }}>
        {(team ?? []).map((member) => (
          <div key={member.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--ink)" }}>
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--fg1)" }}>{member.name}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>{member.email}</div>
            </div>
            <Pill tone="sage">{member.role}</Pill>
          </div>
        ))}
      </div>
    </div>
  );
}
