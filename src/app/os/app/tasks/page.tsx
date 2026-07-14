import { createClient } from "@/lib/supabase/server";
import { Pill } from "@/components/Pill";

const COLUMNS = [
  { id: "todo", label: "To do", dot: "var(--amber-600)" },
  { id: "inprogress", label: "In progress", dot: "var(--accent)" },
  { id: "done", label: "Done", dot: "var(--fg3)" },
];

export default async function TasksPage() {
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id,title,status,due_label,due_color,clients(name,tone)")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: 0, color: "var(--fg1)" }}>Tasks</h2>
        <button style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, padding: "11px 20px", borderRadius: "var(--r-pill)", cursor: "pointer" }}>
          + New task
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
        {COLUMNS.map((col) => {
          const colTasks = (tasks ?? []).filter((t) => t.status === col.id);
          return (
            <div key={col.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: col.dot, display: "inline-block" }} />
                <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg2)" }}>{col.label}</span>
                <span style={{ fontSize: 11.5, color: "var(--fg3)" }}>{colTasks.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {colTasks.map((t) => {
                  const client = Array.isArray(t.clients) ? t.clients[0] : t.clients;
                  return (
                    <div key={t.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "13px 15px", boxShadow: "var(--shadow-sm)" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--fg1)", marginBottom: 6, lineHeight: 1.35 }}>{t.title}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {client && <Pill tone={client.tone ?? "sage"}>{client.name}</Pill>}
                        <span style={{ fontSize: 11, color: t.due_color ?? "var(--fg3)", fontWeight: 600 }}>{t.due_label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
