import { createClient } from "@/lib/supabase/server";
import { Icon } from "@/lib/icons";

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from("documents")
    .select("id,name,type,clients(name)")
    .order("created_at", { ascending: true });

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 24px", color: "var(--fg1)" }}>Document hub</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.9fr", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, padding: "0 4px 10px", borderBottom: "1px solid var(--line)" }}>
        <div>Document</div>
        <div>Client</div>
        <div>Type</div>
      </div>
      {(documents ?? []).map((d) => {
        const client = Array.isArray(d.clients) ? d.clients[0] : d.clients;
        return (
          <div key={d.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr 0.9fr", fontSize: "0.9rem", padding: "13px 4px", borderBottom: "1px solid var(--line-soft)", alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: "var(--fg1)", display: "flex", alignItems: "center", gap: 9 }}>
              <Icon name="file-text" size={16} />
              {d.name}
            </div>
            <div style={{ color: "var(--fg2)" }}>{client?.name ?? "—"}</div>
            <div style={{ color: "var(--fg3)" }}>{d.type}</div>
          </div>
        );
      })}
    </div>
  );
}
