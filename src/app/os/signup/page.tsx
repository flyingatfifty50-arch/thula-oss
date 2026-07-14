"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, type ActionState } from "@/app/os/actions";
import { Wordmark } from "@/components/Wordmark";

export default function OsSignupPage() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(signUp, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--deep)", padding: 20, fontFamily: "var(--font-serif)" }}>
      <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: 400, padding: "40px 36px", textAlign: "center" }}>
        <Wordmark size={28} />
        <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--primary)", margin: "18px 0 4px" }}>
          Thula OS · start your free trial
        </p>
        <h1 style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", fontWeight: 700, margin: "0 0 22px", color: "var(--fg1)" }}>Create your account</h1>

        {state?.message ? (
          <p style={{ color: "var(--accent)", fontSize: "0.9rem", lineHeight: 1.6 }}>{state.message}</p>
        ) : (
          <form action={formAction} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Your name</label>
              <input
                name="name"
                type="text"
                required
                style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit" }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Email</label>
              <input
                name="email"
                type="email"
                required
                style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit" }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.9rem", color: "var(--fg1)", fontFamily: "inherit" }}
              />
            </div>
            {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.82rem", margin: "0 0 14px" }}>{state.error}</p>}
            <button
              type="submit"
              disabled={pending}
              style={{ width: "100%", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--r-pill)", padding: "13px 0", fontSize: "0.95rem", fontWeight: 600, cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
            >
              {pending ? "Creating account…" : "Start free trial"}
            </button>
          </form>
        )}
        <p style={{ fontSize: "0.8rem", color: "var(--fg3)", margin: "18px 0 0" }}>
          Already have an account?{" "}
          <Link href="/os/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
