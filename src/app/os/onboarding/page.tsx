"use client";

import { useActionState } from "react";
import { completeOnboarding, type ActionState } from "@/app/os/actions";
import { Wordmark } from "@/components/Wordmark";

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(completeOnboarding, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--deep)", padding: 20, fontFamily: "var(--font-serif)" }}>
      <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: 440, padding: "40px 36px", textAlign: "center" }}>
        <Wordmark size={26} />
        <h1 style={{ fontFamily: "var(--font-script)", fontSize: "1.7rem", fontWeight: 700, margin: "18px 0 10px", color: "var(--fg1)" }}>Name your agency</h1>
        <p style={{ color: "var(--fg2)", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 24px" }}>
          We&apos;ll set up your workspace and drop in a sample client (a South Africa trip) so you can see how everything fits together before adding your own.
        </p>
        <form action={formAction} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Agency name</label>
            <input
              name="agencyName"
              type="text"
              required
              placeholder="e.g. Thula Travel"
              style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit" }}
            />
          </div>
          {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.82rem", margin: "0 0 14px" }}>{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            style={{ width: "100%", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "13px 0", fontSize: "0.95rem", fontWeight: 600, cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
          >
            {pending ? "Setting up your workspace…" : "Create workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}
