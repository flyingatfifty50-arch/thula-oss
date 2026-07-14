import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";
import { formatRelativeTime } from "@/lib/money";

export default async function ActivityPage() {
  const supabase = await createClient();
  const { data: activity } = await supabase
    .from("activity_events")
    .select("id,icon,color,text_value,created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 22px", color: "var(--fg1)" }}>Activity</h2>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
        {(activity ?? []).map((a) => (
          <div key={a.id} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center", color: a.color ?? "var(--accent)", flexShrink: 0 }}>
              <Icon name={a.icon ?? "activity"} size={15} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.88rem", color: "var(--fg1)" }}>{a.text_value}</div>
              <div style={{ fontSize: "0.76rem", color: "var(--fg3)", marginTop: 2 }}>{formatRelativeTime(a.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
