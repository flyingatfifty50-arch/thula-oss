import type { Confirmation } from "@/data/trip";

export function ConfirmationModal({
  confirmation,
  onClose,
}: {
  confirmation: Confirmation;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(31,30,26,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 420,
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "24px 20px 40px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 4px" }}>
              Booking confirmation
            </p>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 18, color: "var(--fg1)", margin: 0, lineHeight: 1.2 }}>
              {confirmation.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--sage-100)",
              border: "none",
              borderRadius: 20,
              width: 32,
              height: 32,
              cursor: "pointer",
              color: "var(--fg1)",
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            &times;
          </button>
        </div>

        {confirmation.trips.map((tr, i) => (
          <div key={i} style={{ background: "var(--sage-100)", borderRadius: "var(--r-md)", padding: "14px 16px", margin: "14px 0", border: "1px solid var(--sage-300)" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 11, color: "var(--sage-700)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {tr.label}
            </p>
            {tr.details.map((dt, j) => (
              <div key={j} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: "1px solid var(--sage-300)", fontSize: 13, color: "var(--fg1)", alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>&rsaquo;</span>
                <span>{dt}</span>
              </div>
            ))}
          </div>
        ))}

        <div style={{ background: "var(--amber-100)", borderRadius: "var(--r-md)", padding: "12px 14px", marginTop: 14, border: "1px solid var(--amber-300)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--amber-600)", margin: "0 0 5px" }}>
            Supplier contact
          </p>
          <p style={{ fontSize: 13, color: "var(--fg1)", margin: 0, lineHeight: 1.6 }}>
            <b>{confirmation.supplier}</b>
            <br />
            {confirmation.contact}
          </p>
        </div>
      </div>
    </div>
  );
}
