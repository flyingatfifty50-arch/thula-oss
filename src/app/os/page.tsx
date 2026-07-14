import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { Pill } from "@/components/Pill";
import { Icon } from "@/lib/icons";
import { WaitlistForm } from "@/components/os/WaitlistForm";

export default function ThulaOsLandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-serif)", color: "var(--fg1)", background: "var(--paper)" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(251,247,238,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={22} />
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <a href="#features" style={{ fontWeight: 600, fontSize: 13, color: "var(--fg2)", textDecoration: "none" }}>
              Features
            </a>
            <a href="#pricing" style={{ fontWeight: 600, fontSize: 13, color: "var(--fg2)", textDecoration: "none" }}>
              Pricing
            </a>
            <Link href="/os/signup" style={{ background: "var(--primary)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: "var(--r-pill)", textDecoration: "none" }}>
              Join waitlist
            </Link>
          </div>
        </div>
      </nav>

      <header style={{ background: "var(--deep)", color: "var(--fg-on-dark)", padding: "90px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--secondary)", margin: "0 0 22px" }}>
            Thula OS · for boutique travel advisors
          </p>
          <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: "clamp(2.6rem,6vw,4.2rem)", lineHeight: 1.05, margin: "0 0 22px", color: "var(--fg-on-dark)" }}>
            Run your travel business.
            <br />
            Give every client a beautiful trip app.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(251,244,233,0.82)", maxWidth: "56ch", margin: "0 auto 36px", lineHeight: 1.6 }}>
            Clients, payments, suppliers and documents in one console — and a private branded itinerary app for every traveller, generated automatically. No spreadsheets, no PDFs, no code.
          </p>
          <Link href="/os/signup" style={{ display: "inline-block", background: "var(--primary)", color: "#fff", fontSize: "1rem", fontWeight: 600, padding: "15px 32px", borderRadius: "var(--r-pill)", textDecoration: "none" }}>
            Join the waitlist
          </Link>
        </div>
      </header>

      <section style={{ padding: 0, marginTop: -56, position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ background: "var(--card)", borderRadius: "var(--r-lg)", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)", overflow: "hidden", display: "flex", height: 340 }}>
            <div style={{ width: 160, background: "var(--deep)", padding: "18px 14px", flexShrink: 0 }}>
              <div style={{ color: "var(--fg-on-dark)", fontWeight: 700, fontSize: 13, marginBottom: 16 }}>Thula OS</div>
              <div style={{ background: "rgba(251,244,233,0.14)", borderRadius: 8, padding: "8px 10px", color: "var(--fg-on-dark)", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Clients</div>
              <div style={{ padding: "8px 10px", color: "rgba(251,244,233,0.65)", fontSize: 12 }}>Payments</div>
              <div style={{ padding: "8px 10px", color: "rgba(251,244,233,0.65)", fontSize: 12 }}>Suppliers</div>
              <div style={{ padding: "8px 10px", color: "rgba(251,244,233,0.65)", fontSize: 12 }}>Documents</div>
            </div>
            <div style={{ flex: 1, padding: "24px 28px" }}>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--fg1)", marginBottom: 14 }}>Your clients</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--sage-100)", borderRadius: 8, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ color: "var(--accent)" }}>
                  <Icon name="map-pin" size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fg1)" }}>Brid Walsh</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--fg3)" }}>South Africa · departs 25 Jun</div>
                </div>
                <Pill tone="sage">Live</Pill>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--sand)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ color: "var(--fg3)" }}>
                  <Icon name="map-pin" size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--fg1)" }}>The Naidoos</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--fg3)" }}>Vietnam · in planning</div>
                </div>
                <Pill tone="amber">Draft</Pill>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: "120px 0 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", textAlign: "center", margin: "0 0 14px" }}>
            Everything in one place
          </p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "2.2rem", textAlign: "center", margin: "0 0 56px", color: "var(--fg1)" }}>
            One console, three things your business needs
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
            <FeatureCard icon="layout-dashboard" color="var(--accent)" title="A business console" body="Every client, payment, supplier and document in one dashboard — replaces the spreadsheet-and-inbox juggle." />
            <FeatureCard icon="smartphone" color="var(--primary)" title="A branded client portal" body="Every traveller gets their own login to see current and past trips — under your brand, not a generic PDF." />
            <FeatureCard icon="sparkles" color="var(--amber-600)" title="A trip app clients show off" body="Flights, hotels, day-by-day plans and tips — generated per trip, no code, no designer needed." />
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: "100px 0", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
          <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", textAlign: "center", margin: "0 0 14px" }}>Pricing</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "2.2rem", textAlign: "center", margin: "0 0 50px", color: "var(--fg1)" }}>
            Simple, for solo advisors and small teams
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            <PricingCard name="Starter" price="€29" meta="Up to 3 active clients · 1 seat" features={"Business console\nBranded client portal\nPer-trip app builder"} />
            <PricingCard name="Studio" price="€79" meta="Up to 15 active clients · 5 seats" features={"Everything in Starter\nTeam members\nSupplier commission tracking"} featured />
            <PricingCard name="Agency" price="€199" meta="Unlimited clients · unlimited seats" features={"Everything in Studio\nCustom domain for client portal\nPriority support"} />
          </div>
        </div>
      </section>

      <section id="waitlist" style={{ padding: "110px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "2.1rem", margin: "0 0 14px", color: "var(--fg1)" }}>Be first to try it</h2>
          <p style={{ fontSize: "1rem", color: "var(--fg2)", margin: "0 0 28px", lineHeight: 1.6 }}>
            We&apos;re opening Thula OS to a small group of advisors first. Leave your email and we&apos;ll be in touch.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <footer style={{ background: "var(--forest-700)", color: "rgba(251,244,233,0.7)", padding: "36px 0", textAlign: "center", fontSize: "0.85rem" }}>
        Thula OS · a product of Thula Travel
      </footer>
    </div>
  );
}

function FeatureCard({ icon, color, title, body }: { icon: string; color: string; title: string; body: string }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 28, boxShadow: "var(--shadow-sm)" }}>
      <div style={{ color, marginBottom: 14 }}>
        <Icon name={icon} size={26} />
      </div>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "0 0 8px", color: "var(--fg1)" }}>{title}</h3>
      <p style={{ fontSize: "0.92rem", color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

function PricingCard({ name, price, meta, features, featured }: { name: string; price: string; meta: string; features: string; featured?: boolean }) {
  const fg = featured ? "var(--fg-on-dark)" : "var(--fg1)";
  return (
    <div style={{ background: featured ? "var(--deep)" : "var(--card)", border: featured ? "none" : "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "32px 26px", boxShadow: featured ? "var(--shadow-lg)" : undefined, position: "relative" }}>
      {featured && (
        <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--secondary)", color: "var(--ink)", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: "var(--r-pill)", whiteSpace: "nowrap" }}>
          Most popular
        </span>
      )}
      <div style={{ fontWeight: 600, fontSize: "1rem", color: fg, marginBottom: 6 }}>{name}</div>
      <div style={{ fontFamily: "var(--font-script)", fontSize: "2rem", fontWeight: 700, color: featured ? "var(--secondary)" : "var(--accent)", marginBottom: 16 }}>
        {price}
        <span style={{ fontSize: "0.8rem", color: featured ? "rgba(251,244,233,0.7)" : "var(--fg3)", fontFamily: "var(--font-serif)" }}>/mo</span>
      </div>
      <p style={{ fontSize: "0.85rem", color: featured ? "rgba(251,244,233,0.75)" : "var(--fg3)", margin: "0 0 20px" }}>{meta}</p>
      <div style={{ height: 1, background: featured ? "rgba(251,244,233,0.2)" : "var(--line)", marginBottom: 20 }} />
      <p style={{ fontSize: "0.88rem", color: featured ? "rgba(251,244,233,0.9)" : "var(--fg2)", lineHeight: 2, margin: 0, whiteSpace: "pre-line" }}>{features}</p>
    </div>
  );
}
