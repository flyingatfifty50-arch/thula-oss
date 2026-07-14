import { useEffect, useRef, useState } from "react";
import { SUGGESTED_PROMPTS, THULAGPT_URL } from "@/data/trip";
import { Icon } from "@/lib/icons";

type ChatMessage = { from: "user" | "assistant"; text: string };

export function ConciergeScreen({
  messages,
  isThinking,
  onSendPrompt,
}: {
  messages: ChatMessage[];
  isThinking: boolean;
  onSendPrompt: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isThinking]);

  function submit() {
    const text = draft.trim();
    if (!text) return;
    onSendPrompt(text);
    setDraft("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 84px)" }}>
      <div style={{ padding: "22px 20px 12px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
          Your Thula concierge
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 22, color: "var(--fg1)", margin: 0 }}>Ask me anything</h2>
        <p style={{ fontSize: 12.5, color: "var(--fg3)", margin: "6px 0 0" }}>
          Restaurants, safety, what to wear, local know-how — day or night, while you&apos;re away.
        </p>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => {
          const isUser = m.from === "user";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  maxWidth: "82%",
                  background: isUser ? "var(--primary)" : "var(--sand)",
                  color: isUser ? "#fff" : "var(--fg1)",
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "11px 15px",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {isThinking && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "var(--sand)", borderRadius: "16px 16px 16px 4px", padding: "11px 15px", fontSize: 13.5, color: "var(--fg3)" }}>Thinking…</div>
          </div>
        )}
      </div>

      <div style={{ padding: "10px 20px 20px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {SUGGESTED_PROMPTS.map((label) => (
            <button
              key={label}
              onClick={() => onSendPrompt(label)}
              style={{
                background: "var(--sage-100)",
                border: "1px solid var(--sage-300)",
                color: "var(--accent)",
                fontSize: 11.5,
                fontWeight: 600,
                padding: "6px 11px",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Type a question…"
            style={{
              flex: 1,
              border: "1.5px solid var(--line)",
              borderRadius: "var(--r-pill)",
              padding: "10px 15px",
              fontSize: 13,
              color: "var(--fg1)",
              background: "var(--card)",
              fontFamily: "var(--font-serif)",
              outline: "none",
            }}
          />
          <button
            onClick={submit}
            style={{
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 38,
              height: 38,
              flexShrink: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="arrow-up" size={16} />
          </button>
        </div>
        <a
          href={THULAGPT_URL}
          target="_blank"
          rel="noopener"
          style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 11.5, color: "var(--fg3)", textDecoration: "none" }}
        >
          <Icon name="external-link" size={12} />
          Prefer ThulaGPT directly? Open it here
        </a>
      </div>
    </div>
  );
}
