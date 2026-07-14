import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { signOutPortal } from "@/app/portal/actions";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data: client } = await supabase.from("clients").select("id,name").eq("email", user.email).maybeSingle();

  if (!client) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", minHeight: "100vh", background: "var(--paper)", fontFamily: "var(--font-serif)", padding: "60px 28px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", color: "var(--fg1)" }}>No trips found</h2>
        <p style={{ color: "var(--fg2)", fontSize: "0.92rem", margin: "10px 0 20px" }}>
          We couldn&apos;t find a trip linked to {user.email}. If you think this is a mistake, get in touch with your travel consultant.
        </p>
        <form action={signOutPortal}>
          <button type="submit" style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "10px 22px", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", minHeight: "100vh", background: "var(--paper)", boxShadow: "0 0 60px rgba(30,36,28,0.08)", fontFamily: "var(--font-serif)" }}>
      <PortalHeader initial={client.name.charAt(0).toUpperCase()} />
      {children}
    </div>
  );
}
