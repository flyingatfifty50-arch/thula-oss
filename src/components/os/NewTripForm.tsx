"use client";

import { useActionState } from "react";
import { createTrip } from "@/app/os/app/new-trip/actions";

export function NewTripForm({ defaultDestination }: { defaultDestination: string }) {
  const [state, formAction, pending] = useActionState(createTrip, null);

  return (
    <form action={formAction} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px", maxWidth: 600, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Client name</label>
          <input
            name="clientName"
            required
            placeholder="e.g. Brid Walsh"
            style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Destination</label>
          <input
            name="destination"
            required
            defaultValue={defaultDestination}
            placeholder="e.g. South Africa"
            style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }}
          />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Client email</label>
          <input
            name="clientEmail"
            type="email"
            required
            placeholder="e.g. brid@example.com"
            style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }}
          />
          <p style={{ fontSize: 10.5, color: "var(--fg3)", margin: "4px 0 0" }}>This is what they&apos;ll use to log in to the Client Portal.</p>
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--fg2)", display: "block", marginBottom: 6 }}>Client phone (optional)</label>
          <input
            name="clientPhone"
            placeholder="e.g. +353 87 123 4567"
            style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 8, padding: "9px 13px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit" }}
          />
        </div>
      </div>

      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, margin: "20px 0 10px" }}>Flights</div>
      <div style={{ border: "1px dashed var(--line)", borderRadius: 8, padding: 12, textAlign: "center", color: "var(--fg3)", fontSize: "0.85rem", marginBottom: 8 }}>
        + Add a flight (edit after creating the trip)
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, margin: "20px 0 10px" }}>Hotels</div>
      <div style={{ border: "1px dashed var(--line)", borderRadius: 8, padding: 12, textAlign: "center", color: "var(--fg3)", fontSize: "0.85rem", marginBottom: 8 }}>
        + Add a hotel (edit after creating the trip)
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, margin: "20px 0 10px" }}>Day-by-day plan</div>
      <div style={{ border: "1px dashed var(--line)", borderRadius: 8, padding: 12, textAlign: "center", color: "var(--fg3)", fontSize: "0.85rem", marginBottom: 22 }}>
        + Add a day (edit after creating the trip)
      </div>

      {state?.error && <p style={{ color: "var(--primary)", fontSize: "0.82rem", margin: "0 0 14px" }}>{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        style={{ width: "100%", background: "var(--primary)", color: "#fff", border: "none", fontSize: "0.95rem", fontWeight: 600, padding: "12px 0", borderRadius: "var(--r-pill)", cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}
      >
        {pending ? "Creating…" : "Generate client app & site"}
      </button>
    </form>
  );
}
