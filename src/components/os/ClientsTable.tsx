"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Icon } from "@/lib/icons";
import { Pill, type PillTone } from "@/components/Pill";
import { formatEuros } from "@/lib/money";
import { duplicateClient } from "@/app/os/app/clients/actions";

type ClientRow = {
  id: string;
  name: string;
  stage: string;
  tone: PillTone;
  value_cents: number;
  due_label: string | null;
};

export function ClientsTable({ clients }: { clients: ClientRow[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 0.9fr 0.9fr 0.9fr 0.5fr",
          fontSize: 10.5,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--fg3)",
          fontWeight: 600,
          padding: "0 4px 10px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div>Client</div>
        <div>Stage</div>
        <div>Value</div>
        <div>Due</div>
        <div />
      </div>
      {clients.map((c) => (
        <div
          key={c.id}
          onClick={() => router.push(`/os/app/clients/${c.id}`)}
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 0.9fr 0.9fr 0.9fr 0.5fr",
            fontSize: "0.9rem",
            padding: "14px 4px",
            borderBottom: "1px solid var(--line-soft)",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ fontWeight: 700, color: "var(--fg1)" }}>{c.name}</div>
          <div>
            <Pill tone={c.tone}>{c.stage}</Pill>
          </div>
          <div style={{ color: "var(--fg2)" }}>{formatEuros(c.value_cents)}</div>
          <div style={{ color: "var(--primary)" }}>{c.due_label ?? "—"}</div>
          <div>
            <button
              title="Duplicate as new trip"
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => duplicateClient(c.id));
              }}
              style={{ background: "var(--sand)", border: "none", borderRadius: 6, width: 28, height: 28, color: "var(--fg2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name="copy" size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
