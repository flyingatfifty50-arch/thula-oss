"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/lib/icons";
import { Wordmark } from "@/components/Wordmark";
import { signOutOs } from "@/app/os/actions";

const BUSINESS_NAV = [
  { href: "/os/app/clients", label: "Clients", icon: "users" },
  { href: "/os/app/templates", label: "Templates", icon: "copy" },
  { href: "/os/app/payments", label: "Payments", icon: "credit-card" },
  { href: "/os/app/suppliers", label: "Suppliers", icon: "handshake" },
  { href: "/os/app/documents", label: "Documents", icon: "file-text" },
];

const ACCOUNT_NAV = [
  { href: "/os/app/billing", label: "Billing", icon: "receipt" },
  { href: "/os/app/team", label: "Team", icon: "user-plus" },
  { href: "/os/app/settings", label: "Settings", icon: "settings" },
];

function NavGroup({
  title,
  items,
  pathname,
  badges,
}: {
  title: string;
  items: { href: string; label: string; icon: string }[];
  pathname: string;
  badges?: Record<string, number>;
}) {
  return (
    <>
      <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,244,233,0.45)", fontWeight: 600, margin: "16px 0 6px 12px" }}>
        {title}
      </div>
      {items.map((n) => {
        const active = pathname === n.href || pathname.startsWith(n.href + "/");
        const badge = badges?.[n.href];
        return (
          <Link
            key={n.href}
            href={n.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: "var(--r-sm)",
              background: active ? "rgba(251,244,233,0.14)" : "transparent",
              color: active ? "var(--fg-on-dark)" : "rgba(251,244,233,0.7)",
              fontSize: 13,
              fontWeight: active ? 700 : 400,
              textDecoration: "none",
              position: "relative",
            }}
          >
            <Icon name={n.icon} size={15} />
            {n.label}
            {!!badge && (
              <span style={{ marginLeft: "auto", background: "var(--primary)", color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 20, padding: "1px 6px" }}>
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar({ openTaskCount }: { openTaskCount: number }) {
  const pathname = usePathname();
  const workflowNav = [
    { href: "/os/app/guide", label: "Client journey guide", icon: "list-checks" },
    { href: "/os/app/tasks", label: "Tasks", icon: "check-square" },
    { href: "/os/app/activity", label: "Activity", icon: "activity" },
  ];

  return (
    <div style={{ width: 220, background: "var(--deep)", padding: "24px 18px", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0, minHeight: "100vh" }}>
      <Wordmark size={20} color="var(--fg-on-dark)" />
      <div style={{ height: 22 }} />
      <NavGroup title="Business" items={BUSINESS_NAV} pathname={pathname} />
      <NavGroup title="Workflow" items={workflowNav} pathname={pathname} badges={{ "/os/app/tasks": openTaskCount }} />
      <NavGroup title="Account" items={ACCOUNT_NAV} pathname={pathname} />
      <div style={{ flex: 1 }} />
      <form action={signOutOs}>
        <button
          type="submit"
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--r-sm)", color: "rgba(251,244,233,0.6)", fontSize: 12.5, border: "none", background: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
        >
          <Icon name="log-out" size={15} />
          Sign out
        </button>
      </form>
    </div>
  );
}
