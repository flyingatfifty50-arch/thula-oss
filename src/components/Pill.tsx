import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";

export type PillTone = "sage" | "clay" | "amber" | "plum" | "blush";

const TONES: Record<PillTone, { bg: string; fg: string }> = {
  sage: { bg: "var(--sage-100)", fg: "var(--sage-700)" },
  clay: { bg: "var(--clay-100)", fg: "var(--clay-700)" },
  amber: { bg: "var(--amber-100)", fg: "var(--amber-600)" },
  plum: { bg: "#F0E5E7", fg: "var(--plum-600)" },
  blush: { bg: "var(--blush-100)", fg: "var(--clay-600)" },
};

export function Pill({
  children,
  tone = "sage",
  icon,
}: {
  children: ReactNode;
  tone?: PillTone;
  icon?: string;
}) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: t.bg,
        color: t.fg,
        borderRadius: "var(--r-pill)",
        padding: "6px 14px",
        fontFamily: "var(--font-serif)",
        fontWeight: 600,
        fontSize: 13.5,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}
