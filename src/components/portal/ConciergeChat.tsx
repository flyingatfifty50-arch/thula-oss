"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { sendConciergeMessage } from "@/app/portal/actions";

const THULAGPT_URL = "https://chatgpt.com/g/g-p-68f0c28c45688191ba31189e2a5f9cc8-thulagpt/project";

type ChatMessage = { id: string; from_role: string; text_value: string };

const SUGGESTED_PROMPTS = [
  "Good dinner near Franschhoek tonight?",
  "Is it safe to walk in Sea Point at night?",
  "What should I wear on the safari drive?",
];

export function ConciergeChat({ tripId, initialMessages }: { tripId: string; initialMessages: ChatMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isThinking]);

  async function send(text: string) {
    setMessages((m) => [...m, { id: `local-${Date.now()}`, from_role: "user", text_value: text }]);
    setIsThinking(true);
    const reply = await sendConciergeMessage(tripId, text);
    setMessages((m) => [...m, { id: `local-${Date.now()}-r`, from_role: "assistant", text_value: reply ?? "" }]);
    setIsThinking(false);
  }

  function submit() {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    send(text);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 68px)" }}>
      <div style={{ padding: "20px 28px 14px", borderBottom: "1px solid var(--line)" }}>
        <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 4px" }}>Your Thula concierge</p>
        <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.5rem", margin: 0, color: "var(--fg1)" }}>Ask me anything</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--fg3)", margin: "6px 0 0" }}>Restaurants, safety, what to wear, local know-how — day or night, while you&apos;re away.</p>
      </div>

      <div style={{ padding: "12px 28px 0" }}>
        <a
          href={THULAGPT_URL}
          target="_blank"
          rel="noopener"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--sand)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "10px 14px", textDecoration: "none" }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--fg2)", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="external-link" size={14} />
            Prefer ThulaGPT directly? Open it here
          </span>
          <span style={{ color: "var(--accent)", fontSize: "0.78rem", fontWeight: 600 }}>Open ›</span>
        </a>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m) => {
          const isUser = m.from_role === "user";
          return (
            <div key={m.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  maxWidth: "80%",
                  background: isUser ? "var(--primary)" : "var(--sand)",
                  color: isUser ? "#fff" : "var(--fg1)",
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "12px 16px",
                  fontSize: "0.9rem",
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text_value}
              </div>
            </div>
          );
        })}
        {isThinking && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "var(--sand)", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", fontSize: "0.9rem", color: "var(--fg3)" }}>Thinking…</div>
          </div>
        )}
      </div>

      <div style={{ padding: "14px 28px 22px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {SUGGESTED_PROMPTS.map((label) => (
            <button
              key={label}
              onClick={() => send(label)}
              style={{ background: "var(--sage-100)", border: "1px solid var(--sage-300)", color: "var(--accent)", fontSize: "0.78rem", fontWeight: 600, padding: "6px 12px", borderRadius: "var(--r-pill)", cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type a question…"
            style={{ flex: 1, border: "1.5px solid var(--line)", borderRadius: "var(--r-pill)", padding: "11px 16px", fontSize: "0.88rem", color: "var(--fg1)", fontFamily: "inherit", outline: "none" }}
          />
          <button
            onClick={submit}
            style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: "50%", width: 42, height: 42, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Icon name="arrow-up" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
