import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/os/Sidebar";

export default async function OsAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/os/login");

  const { data: profile } = await supabase.from("staff_profiles").select("agency_id").eq("id", user.id).maybeSingle();
  if (!profile) redirect("/os/onboarding");

  const { count: openTaskCount } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .neq("status", "done");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--font-serif)", color: "var(--fg1)" }}>
      <Sidebar openTaskCount={openTaskCount ?? 0} />
      <div style={{ flex: 1, padding: "36px 44px", overflowY: "auto" }}>{children}</div>
    </div>
  );
}
