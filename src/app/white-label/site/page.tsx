const ITINERARY = [
  { n: "01", date: "Day 1", tag: "Arrival", title: "Arrival & settling in", body: "Placeholder itinerary text — describe arrival logistics and first impressions." },
  { n: "02", date: "Day 2", tag: "Explore", title: "A day to explore", body: "Placeholder itinerary text — describe the day's activities." },
  { n: "03", date: "Day 3", tag: "Signature", title: "Signature experience", body: "Placeholder itinerary text — describe the standout excursion for this trip." },
];

export default async function WhiteLabelSitePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const agencyName = sp.agencyName ?? "Your Travel Co";
  const accentColor = sp.accentColor ?? "#317653";
  const consultantName = sp.consultantName ?? "[Consultant name]";
  const clientName = sp.clientName ?? "[Client name]";
  const groupSize = sp.groupSize ?? "2";
  const destinationLine1 = sp.destinationLine1 ?? "Sample";
  const destinationLine2 = sp.destinationLine2 ?? "Destination";
  const dateRange = sp.dateRange ?? "[Date range]";

  return (
    <div
      style={{
        fontFamily: "var(--font-serif)",
        color: "var(--fg1)",
        background: "var(--paper)",
        ["--accent" as string]: accentColor,
        ["--deep" as string]: accentColor,
      }}
    >
      <div style={{ background: "var(--amber-100)", borderBottom: "1px solid var(--amber-300)", padding: "8px 20px", textAlign: "center" }}>
        <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.05em", color: "var(--amber-600)" }}>
          White-label template · sample data · duplicate &amp; rebrand per client
        </span>
      </div>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(251,247,238,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: 24, color: "var(--accent)" }}>{agencyName}</span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {["welcome", "trip", "daytoday", "info"].map((id) => (
              <a key={id} href={`#${id}`} style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg2)", textDecoration: "none" }}>
                {id === "daytoday" ? "Day to day" : id === "info" ? "Good to know" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header style={{ background: "var(--deep)", color: "var(--fg-on-dark)", padding: "80px 0 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--secondary)", margin: "0 0 30px" }}>
            {agencyName} · Private itinerary
          </p>
          <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: "clamp(3.4rem,10vw,6.5rem)", lineHeight: 0.92, letterSpacing: "-0.02em", margin: "0 0 6px", color: "var(--fg-on-dark)" }}>
            {destinationLine1}
            <br />
            <em style={{ fontStyle: "normal", color: "var(--secondary)" }}>{destinationLine2}</em>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(251,244,233,0.82)", maxWidth: "50ch", margin: "18px 0 40px", lineHeight: 1.6 }}>
            Placeholder hero copy — describe the trip&apos;s arc in two warm sentences. Prepared for {clientName}.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 38, padding: "26px 0 64px", borderTop: "1px solid rgba(251,244,233,0.2)" }}>
            {[[groupSize, "Travellers"], ["7", "Nights"], ["2", "Destinations"], [dateRange, "Departure"]].map(([n, l]) => (
              <div key={l}>
                <b style={{ display: "block", fontFamily: "var(--font-script)", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>{n}</b>
                <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,244,233,0.62)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <svg style={{ display: "block", width: "100%", height: "auto", marginBottom: -6 }} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,80 L0,40 C200,20 400,60 600,38 C800,18 1000,52 1200,36 L1200,80 Z" fill="var(--paper)" />
        </svg>
      </header>

      <section id="welcome" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Welcome</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Welcome, {clientName}</h2>
          <div style={{ maxWidth: "60ch" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.7 }}>
              Placeholder welcome note — write two or three warm paragraphs about the trip and what to expect.
            </p>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "1.4rem", color: "var(--accent)", margin: "26px 0 2px" }}>{consultantName}</p>
            <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg3)", margin: 0 }}>{agencyName}</p>
          </div>
        </div>
      </section>

      <section id="trip" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Your trip</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 30px" }}>Two stops, one story</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", maxWidth: 640 }}>
            <div style={{ background: "var(--card)", padding: "20px 22px" }}>
              <b style={{ fontFamily: "var(--font-script)", fontSize: "1.5rem", fontWeight: 700, display: "block", color: "var(--accent)" }}>4 nights</b>
              <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg3)" }}>Coastal City</span>
            </div>
            <div style={{ background: "var(--card)", padding: "20px 22px" }}>
              <b style={{ fontFamily: "var(--font-script)", fontSize: "1.5rem", fontWeight: 700, display: "block", color: "var(--accent)" }}>3 nights</b>
              <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg3)" }}>Countryside</span>
            </div>
          </div>
        </div>
      </section>

      <section id="daytoday" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Your journey, day by day</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Day to day</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ITINERARY.map((d) => (
              <div key={d.n} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 24, background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 28px" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-script)", fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{d.n}</div>
                  <span style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginTop: 7, display: "block" }}>{d.date}</span>
                </div>
                <div>
                  <span style={{ display: "inline-block", fontWeight: 600, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", background: "var(--sage-100)", padding: "4px 10px", borderRadius: 20, marginBottom: 9 }}>
                    {d.tag}
                  </span>
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 6px", color: "var(--fg1)" }}>{d.title}</h4>
                  <p style={{ color: "var(--fg2)", fontSize: "0.95rem", maxWidth: "62ch", margin: 0, lineHeight: 1.6 }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="info" style={{ padding: "100px 0", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>The details</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Good to know</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px" }}>
              <h4 style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 14px" }}>Booking references</h4>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: 0 }}>Placeholder booking ref field</p>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px" }}>
              <h4 style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 14px" }}>Money &amp; time</h4>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: 0 }}>Placeholder currency &amp; timezone notes</p>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px" }}>
              <h4 style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 14px" }}>Your consultant</h4>
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>
                {consultantName} · {agencyName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "var(--forest-700)", color: "rgba(251,244,233,0.84)", padding: "50px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: 26, color: "var(--fg-on-dark)" }}>{agencyName}</span>
          <div style={{ fontSize: "0.85rem", color: "rgba(251,244,233,0.6)" }}>Prepared for {clientName} · private &amp; confidential</div>
        </div>
      </footer>
    </div>
  );
}
