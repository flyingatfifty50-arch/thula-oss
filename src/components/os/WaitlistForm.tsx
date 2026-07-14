"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/app/os/waitlist-actions";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, null);

  if (state?.success) {
    return <p style={{ color: "var(--accent)", fontSize: "1rem", fontWeight: 600 }}>You&apos;re on the list — we&apos;ll be in touch.</p>;
  }

  return (
    <form action={formAction} style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
      <input
        name="email"
        type="email"
        required
        placeholder="you@youragency.com"
        style={{ flex: 1, border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "12px 18px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit", textAlign: "left" }}
      />
      <button
        type="submit"
        disabled={pending}
        style={{ background: "var(--primary)", color: "#fff", fontSize: "0.9rem", fontWeight: 600, padding: "12px 24px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap", border: "none", cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
      >
        {pending ? "Joining…" : "Join waitlist"}
      </button>
      {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.8rem", position: "absolute" }}>{state.error}</p>}
    </form>
  );
}
