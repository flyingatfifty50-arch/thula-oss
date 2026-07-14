"use client";

import { useState } from "react";
import { Icon } from "@/lib/icons";

const COMMS_TEMPLATES = [
  {
    id: "discovery",
    icon: "phone-call",
    title: "Discovery call script",
    meta: "Use on the first call with a new client",
    body: "Thanks so much for making the time today — I'd love to hear a bit about what you're picturing for this trip.\n\n1. What's the occasion, and who's travelling?\n2. Roughly when are you hoping to go, and how many nights?\n3. What does \"the best version\" of this trip feel like — relaxed, adventurous, a mix?\n4. Any places, food, or experiences that are non-negotiable?\n5. What's the budget range you're comfortable with, per person?\n\nGreat — leave it with me. I'll put together a proposal with flights, stays and a day-by-day plan, and send it across in the next few days.",
  },
  {
    id: "invoice",
    icon: "receipt",
    title: "Deposit invoice email",
    meta: "Send once the client confirms they're booking",
    body: "Subject: Your deposit invoice — [Trip name]\n\nHi [Client name],\n\nSo excited to get this trip locked in! Attached is your deposit invoice of [amount] to secure your dates — flights and accommodation are held provisionally until this clears.\n\nPayment details:\n• Amount due: [amount]\n• Due date: [date]\n• Reference: [booking ref]\n\nOnce it's through, I'll send your private trip app so you can start exploring the plan.\n\nThank you!\n[Consultant name] · Thula Travel",
  },
  {
    id: "thanks",
    icon: "heart-handshake",
    title: "Thank you & handover",
    meta: "Send once the deposit clears",
    body: "Subject: You're officially booked! ✈\n\nHi [Client name],\n\nDeposit received — you're locked in for [dates]! Thank you for trusting us with this one.\n\nHere's your private trip app: [link]\nEverything lives there — flights, hotels, the day-by-day plan, and a few tips from us. It'll keep updating right up until you fly.\n\nIf anything comes to mind between now and then, just reply here or message me directly.\n\nCan't wait for you to go.\n[Consultant name] · Thula Travel",
  },
  {
    id: "welcomehome",
    icon: "sunset",
    title: "Welcome home message",
    meta: "Send a few days after they return",
    body: "Subject: Welcome home — how was it?\n\nHi [Client name],\n\nYou've been on my mind since your trip wrapped up — I'd love to hear how it all went!\n\nA few small asks, only if you have a moment:\n• A highlight or two I can share (anonymously) with future clients\n• A quick review, if you're happy to leave one — it means the world to a small business\n• Where to next? Always happy to start dreaming up the next one whenever you're ready\n\nThank you again for travelling with us.\n[Consultant name] · Thula Travel",
  },
];

export function MessageTemplates() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {COMMS_TEMPLATES.map((tm) => {
        const open = openId === tm.id;
        return (
          <div key={tm.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <button
              onClick={() => setOpenId(open ? null : tm.id)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "15px 18px", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}
            >
              <div style={{ color: "var(--accent)", flexShrink: 0 }}>
                <Icon name={tm.icon} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.94rem", color: "var(--fg1)" }}>{tm.title}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--fg3)" }}>{tm.meta}</div>
              </div>
              <span style={{ color: "var(--fg3)", fontSize: 16, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
            </button>
            {open && (
              <div style={{ padding: "0 18px 18px" }}>
                <pre style={{ background: "var(--sand)", borderRadius: 8, padding: "16px 18px", fontFamily: "var(--font-serif)", fontSize: "0.85rem", color: "var(--fg1)", whiteSpace: "pre-wrap", lineHeight: 1.6, margin: "0 0 12px" }}>
                  {tm.body}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(tm.body);
                    setCopiedId(tm.id);
                    setTimeout(() => setCopiedId((c) => (c === tm.id ? null : c)), 1600);
                  }}
                  style={{ background: "var(--primary)", color: "#fff", border: "none", fontSize: 12.5, fontWeight: 600, padding: "8px 16px", borderRadius: "var(--r-pill)", cursor: "pointer" }}
                >
                  {copiedId === tm.id ? "Copied ✓" : "Copy template"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
