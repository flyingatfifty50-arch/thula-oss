import Link from "next/link";

const TEMPLATES = [
  { id: "sa", name: "South Africa Classic", meta: "12 days · Cape Town, Addo, Franschhoek", gradient: "var(--fig-fynbos)", destination: "South Africa" },
  { id: "kenya", name: "Kenya Safari", meta: "9 days · Nairobi, Maasai Mara", gradient: "var(--fig-savanna)", destination: "Kenya" },
  { id: "italy", name: "Italy Classic", meta: "10 days · Rome, Florence, Amalfi", gradient: "var(--sage-300)", destination: "Italy" },
];

export default function TemplatesPage() {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 10px", color: "var(--fg1)" }}>Trip templates</h2>
      <p style={{ fontSize: "0.92rem", color: "var(--fg2)", margin: "0 0 22px", maxWidth: "60ch", lineHeight: 1.6 }}>
        Start a new client from a past trip instead of building from scratch — flights, hotels and the day-by-day plan come pre-filled and ready to edit.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {TEMPLATES.map((t) => (
          <div key={t.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ height: 70, background: t.gradient }} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--fg1)", marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--fg3)", marginBottom: 12 }}>{t.meta}</div>
              <Link
                href={`/os/app/new-trip?destination=${encodeURIComponent(t.destination)}`}
                style={{ display: "block", width: "100%", textAlign: "center", background: "var(--primary)", color: "#fff", border: "none", fontSize: 12.5, fontWeight: 600, padding: "8px 0", borderRadius: "var(--r-pill)", textDecoration: "none" }}
              >
                Use as template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
