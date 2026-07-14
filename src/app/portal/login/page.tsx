"use client";

import { useActionState } from "react";
import { sendMagicLink, type PortalActionState } from "@/app/portal/actions";
import { Wordmark } from "@/components/Wordmark";

export default function PortalLoginPage() {
  const [state, formAction, pending] = useActionState<PortalActionState, FormData>(sendMagicLink, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--deep)", padding: 20, fontFamily: "var(--font-serif)" }}>
      <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: 400, padding: "40px 36px", textAlign: "center" }}>
        <Wordmark size={28} />
        <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--primary)", margin: "18px 0 4px" }}>Client portal</p>
        <h1 style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", fontWeight: 700, margin: "0 0 22px", color: "var(--fg1)" }}>Welcome back</h1>

        {state?.message ? (
          <p style={{ color: "var(--accent)", fontSize: "0.9rem", lineHeight: 1.6 }}>{state.message}</p>
        ) : (
          <form action={formAction} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Email</label>
              <input
                name="email"
                type="email"
                required
                style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit" }}
              />
            </div>
            {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.82rem", margin: "0 0 14px" }}>{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              style={{ width: "100%", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "13px 0", fontSize: "0.95rem", fontWeight: 600, cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
            >
              {pending ? "Sending…" : "Send me a login link"}
            </button>
          </form>
        )}
        <p style={{ fontSize: "0.78rem", color: "var(--fg3)", margin: "18px 0 0" }}>No password needed — we&apos;ll email a secure link.</p>
      </div>
    </div>
  );
}
