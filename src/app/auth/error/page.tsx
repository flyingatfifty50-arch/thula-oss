import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--deep)",
        fontFamily: "var(--font-serif)",
        padding: 20,
      }}
    >
      <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)", padding: "40px 36px", maxWidth: 400, textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", color: "var(--fg1)", margin: "0 0 10px" }}>Link expired</h1>
        <p style={{ color: "var(--fg2)", fontSize: "0.9rem", margin: "0 0 20px" }}>
          That confirmation link is invalid or has expired. Please try signing in or requesting a new link.
        </p>
        <Link
          href="/os/login"
          style={{ display: "inline-block", background: "var(--primary)", color: "#fff", borderRadius: "var(--r-pill)", padding: "11px 24px", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
