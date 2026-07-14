import { createClient } from "@/lib/supabase/server";
import { Pill } from "@/components/Pill";
import { signOutPortal } from "@/app/portal/actions";

export default async function PortalAccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: client } = await supabase.from("clients").select("*").eq("email", user!.email).single();

  return (
    <div style={{ padding: "32px 28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--fg1)" }}>{client.name}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>{client.email}</div>
        </div>
      </div>

      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 8 }}>Trip preferences</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
        {(client.likes ?? []).map((l: string) => (
          <Pill key={l} tone="sage">{l}</Pill>
        ))}
      </div>

      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 8 }}>Notifications</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid var(--line-soft)", fontSize: "0.9rem", color: "var(--fg1)" }}>
        WhatsApp trip reminders
        <span style={{ width: 34, height: 18, background: "var(--accent)", borderRadius: 20, display: "inline-block" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", fontSize: "0.9rem", color: "var(--fg1)", marginBottom: 24 }}>
        Email itinerary updates
        <span style={{ width: 34, height: 18, background: "var(--accent)", borderRadius: 20, display: "inline-block" }} />
      </div>

      <form action={signOutPortal}>
        <button type="submit" style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--fg2)", borderRadius: "var(--r-pill)", padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
          Sign out
        </button>
      </form>
    </div>
  );
}
