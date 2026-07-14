"use client";

import { useTransition } from "react";
import { Icon } from "@/lib/icons";
import { togglePreviewAction } from "@/app/os/app/clients/[id]/actions";

export function PreviewToggle({ clientId, enabled }: { clientId: string; enabled: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => togglePreviewAction(clientId, enabled))}
      disabled={pending}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: enabled ? "var(--sage-100)" : "var(--sand)",
        color: enabled ? "var(--accent)" : "var(--fg2)",
        border: "1px solid var(--line)",
        fontSize: 13,
        fontWeight: 600,
        padding: "10px 16px",
        borderRadius: "var(--r-pill)",
        cursor: pending ? "default" : "pointer",
        whiteSpace: "nowrap",
        opacity: pending ? 0.7 : 1,
      }}
    >
      <Icon name="link" size={15} />
      <span style={{ whiteSpace: "nowrap" }}>{enabled ? "Public preview: on" : "Public preview: off"}</span>
    </button>
  );
}
