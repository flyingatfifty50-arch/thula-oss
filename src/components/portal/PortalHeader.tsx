"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/Wordmark";

export function PortalHeader({ initial }: { initial: string }) {
  const pathname = usePathname();
  const showBack = pathname !== "/portal";

  return (
    <div style={{ background: "var(--deep)", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Wordmark size={19} color="var(--fg-on-dark)" />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack && (
          <Link href="/portal" style={{ background: "none", border: "none", color: "var(--fg-on-dark)", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            ← Trips
          </Link>
        )}
        <Link href="/portal/account" style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
            {initial}
          </div>
        </Link>
      </div>
    </div>
  );
}
