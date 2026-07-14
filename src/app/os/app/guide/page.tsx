import { MessageTemplates } from "@/components/os/MessageTemplates";

const GUIDE_STEPS = [
  { n: "01", title: "Discovery call", body: "Book a 30-minute call to learn the client's dates, budget, group size and the feeling they want the trip to have. Use the Discovery call template below to run it.", color: "var(--accent)" },
  { n: "02", title: "Build the proposal", body: "Draft flights, hotels and a day-by-day plan in Thula OS — use a Trip template to start faster. Generate the client's branded app & site preview to send alongside the quote.", color: "var(--primary)" },
  { n: "03", title: "Send the invoice", body: "Once the client confirms, send the deposit invoice (see template below). Log it under Payments so it's tracked automatically.", color: "var(--amber-600)" },
  { n: "04", title: "Confirm & hand over", body: "Send the Thank you message once the deposit clears, then share the live client app link — this becomes their single source of truth right up to departure.", color: "var(--accent)" },
  { n: "05", title: "Balance & final details", body: "Chase the balance payment ahead of the due date, finalise all bookings with suppliers, and upload final documents to the Document hub.", color: "var(--primary)" },
  { n: "06", title: "Welcome home", body: "A few days after they're back, send the Welcome home message — it's a small touch that turns a good trip into a client who books again and refers friends.", color: "var(--amber-600)" },
];

export default function GuidePage() {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 6px", color: "var(--fg1)" }}>Client journey guide</h2>
      <p style={{ fontSize: "0.92rem", color: "var(--fg2)", margin: "0 0 26px", maxWidth: "64ch", lineHeight: 1.6 }}>
        The step-by-step flow to run every client through, start to finish, plus ready-to-send templates for each key moment.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 34 }}>
        {GUIDE_STEPS.map((g) => (
          <div key={g.n} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 18, background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "16px 20px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontFamily: "var(--font-script)", fontSize: "1.3rem", fontWeight: 700, color: g.color, lineHeight: 1 }}>{g.n}</div>
            <div>
              <h4 style={{ fontSize: "1.02rem", fontWeight: 600, margin: "0 0 4px", color: "var(--fg1)" }}>{g.title}</h4>
              <p style={{ fontSize: "0.86rem", color: "var(--fg2)", margin: 0, lineHeight: 1.55 }}>{g.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.4rem", margin: "0 0 16px", color: "var(--fg1)" }}>Message templates</h3>
      <MessageTemplates />
    </div>
  );
}
