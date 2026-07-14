import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { Icon } from "@/lib/icons";
import { Pill } from "@/components/Pill";

const SUPPLIERS = [
  { name: "EZ Shuttle", type: "Transfers", region: "Cape Town", tone: "amber" as const, color: "var(--amber-600)", contact: "info@ezshuttle.co.za · +27 21 376610 · WhatsApp available" },
  { name: "Kiff Kombi Tours", type: "Private guide", region: "Cape Town", tone: "clay" as const, color: "var(--primary)", contact: "bookings@kiffkombitours.co.za · private vintage kombi tours" },
  { name: "City Sightseeing South Africa", type: "Hop-on hop-off", region: "Cape Town", tone: "plum" as const, color: "var(--accent-2)", contact: "+27 21 511 6000 · 36 Auckland Street, Paarden Eiland, Cape Town" },
  { name: "Franschhoek Wine Tram", type: "Wine tour", region: "Franschhoek", tone: "blush" as const, color: "var(--clay-600)", contact: "bookings@winetram.co.za · Orange Line departs Franschhoek Terminal" },
  { name: "Tuk Tuk Franschhoek", type: "Wine tour", region: "Franschhoek", tone: "blush" as const, color: "var(--clay-600)", contact: "+27 72 735 3035 · info@tuktukfranschhoek.co.za · Le Petit Manoir, 54 Huguenot Road" },
  { name: "The Bantry Aparthotel", type: "Accommodation", region: "Cape Town", tone: "sage" as const, color: "var(--accent)", contact: "021 035 0921 · tropicana@perchstays.co.za · perchstays.co.za" },
  { name: "Bellevue Forest Lodge", type: "Accommodation", region: "Addo", tone: "clay" as const, color: "var(--primary)", contact: "bellevueforest.co.za · Big Five lodge, malaria-free" },
  { name: "Centre-Ville Guest House", type: "Accommodation", region: "Franschhoek", tone: "amber" as const, color: "var(--amber-600)", contact: "info@centre-ville.co.za · centre-ville.co.za" },
];

export default function HqPage() {
  return (
    <div style={{ fontFamily: "var(--font-serif)", color: "var(--fg1)", background: "var(--paper)" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(251,247,238,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <Wordmark size={24} />
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {[
              ["tracker", "Client tracker"],
              ["payments", "Payments"],
              ["suppliers", "Suppliers"],
              ["documents", "Documents"],
              ["destinations", "Destinations"],
              ["template", "Dashboard template"],
              ["countdown", "Pre-trip countdown"],
              ["welcomehome", "Welcome home"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg2)", textDecoration: "none", whiteSpace: "nowrap" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header style={{ background: "var(--deep)", color: "var(--fg-on-dark)", padding: "70px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--secondary)", margin: "0 0 16px" }}>Private · internal use only</p>
          <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: "clamp(2.6rem,6vw,4.2rem)", lineHeight: 1, margin: "0 0 14px", color: "var(--fg-on-dark)" }}>Thula HQ</h1>
          <p style={{ fontSize: "1.08rem", color: "rgba(251,244,233,0.82)", maxWidth: "60ch", margin: 0, lineHeight: 1.6 }}>
            Your single front door. Everything that runs Thula Travel lives here — live client trips, and the systems and templates behind them. Keep this page private.
          </p>
        </div>
      </header>

      <section style={{ padding: "60px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 12px" }}>Client dashboards (live)</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.6rem,3vw,2.2rem)", margin: "0 0 10px", color: "var(--fg1)" }}>The trips your clients are looking at right now</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 24px", marginTop: 20, maxWidth: 640, boxShadow: "var(--shadow-sm)" }}>
            <div style={{ color: "var(--accent)" }}>
              <Icon name="map-pin" size={26} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--fg1)" }}>Brid Walsh</div>
              <div style={{ fontSize: "0.9rem", color: "var(--fg3)" }}>South Africa · departs 25 June 2026</div>
            </div>
            <Link href="/" style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)", background: "var(--sage-100)", border: "1px solid var(--sage-300)", padding: "9px 16px", borderRadius: "var(--r-pill)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Open app
            </Link>
            <Link href="/site" style={{ fontWeight: 600, fontSize: 13, color: "var(--primary)", background: "var(--clay-100)", border: "1px solid var(--clay-300)", padding: "9px 16px", borderRadius: "var(--r-pill)", textDecoration: "none", whiteSpace: "nowrap" }}>
              Open site
            </Link>
          </div>
        </div>
      </section>

      <section id="tracker" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="clipboard-list" color="var(--accent)" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Client tracker</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 8px", lineHeight: 1.6 }}>
            Your command centre. Every client, every trip, every stage, in one place. Real client data now lives in{" "}
            <Link href="/os/app/clients" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Thula OS
            </Link>{" "}
            — this page stays as a quick reference.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", boxShadow: "var(--shadow-sm)", marginTop: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.2fr", padding: "14px 20px", background: "var(--sage-100)", fontWeight: 600, fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--sage-700)" }}>
              <div>Client</div>
              <div>Destination</div>
              <div>Travellers</div>
              <div>Stage</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.2fr", padding: "16px 20px", borderTop: "1px solid var(--line)", alignItems: "center", fontSize: "0.95rem" }}>
              <div style={{ fontWeight: 600 }}>Brid Walsh</div>
              <div style={{ color: "var(--fg2)" }}>South Africa</div>
              <div style={{ color: "var(--fg2)" }}>10</div>
              <div>
                <Pill tone="sage">Live · travelling</Pill>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="payments" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="credit-card" color="var(--amber-600)" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Payments &amp; deposits</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 8px", lineHeight: 1.6 }}>
            Money in, money out. Real invoices and deposits are tracked in{" "}
            <Link href="/os/app/payments" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Thula OS Payments
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="suppliers" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="book-user" color="var(--accent)" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Supplier rolodex</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 20px", lineHeight: 1.6 }}>
            Your little black book. Lodges, transfer companies, DMCs, guides — the contacts and booking refs you reuse trip after trip.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
            {SUPPLIERS.map((s) => (
              <div key={s.name} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "18px 20px", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: s.color }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--fg1)" }}>{s.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--fg3)", marginTop: 2 }}>
                      {s.type} · {s.region}
                    </div>
                  </div>
                  <Pill tone={s.tone}>{s.type}</Pill>
                </div>
                <div style={{ fontSize: "0.88rem", color: "var(--fg2)", marginTop: 10, lineHeight: 1.5 }}>{s.contact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="documents" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="folder" color="var(--primary)" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Document hub</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 20px", lineHeight: 1.6 }}>
            Where every client&apos;s documents live: booking confirmations, passports, insurance, visas. Real records are tracked in{" "}
            <Link href="/os/app/documents" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Thula OS Documents
            </Link>
            .
          </p>
          <div style={{ background: "var(--clay-100)", border: "1px solid var(--clay-300)", borderRadius: "var(--r-md)", padding: "16px 20px", maxWidth: "70ch" }}>
            <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 6 }}>Security note</div>
            <div style={{ fontSize: "0.92rem", color: "var(--fg1)" }}>This hub holds sensitive personal documents. Keep sharing tightly scoped — internal only.</div>
          </div>
        </div>
      </section>

      <section id="destinations" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="globe" color="var(--accent)" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Destination knowledge base</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 20px", lineHeight: 1.6 }}>
            Your expertise, banked. Build a reusable tip sheet for each destination once, then pull from it every time you plan a trip there.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "28px 30px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Destination entry</div>
            <h3 style={{ fontSize: "1.5rem", margin: "0 0 14px", color: "var(--fg1)" }}>South Africa · Cape Town, Addo &amp; Franschhoek</h3>
            <p style={{ fontSize: "0.98rem", color: "var(--fg2)", lineHeight: 1.65, margin: "0 0 20px", maxWidth: "70ch" }}>
              Cape winters (late June – early July) are mild by day, cold by night, and on the wet side. The safari side at Addo runs drier with chilly dawns. Pack warm layers, a waterproof, and something cosy for early game drives.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              <div style={{ background: "var(--sage-100)", borderRadius: "var(--r-md)", padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--sage-700)", marginBottom: 6 }}>Cape Town</div>
                <div style={{ fontSize: "0.88rem", color: "var(--fg2)", lineHeight: 1.5 }}>City, ocean and Table Mountain — the peninsula drive, the Waterfront, and whale season starting in June.</div>
              </div>
              <div style={{ background: "var(--clay-100)", borderRadius: "var(--r-md)", padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--primary)", marginBottom: 6 }}>Addo</div>
                <div style={{ fontSize: "0.88rem", color: "var(--fg2)", lineHeight: 1.5 }}>Malaria-free Big Five country — game drives from the doorstep, dinner under the stars.</div>
              </div>
              <div style={{ background: "var(--amber-100)", borderRadius: "var(--r-md)", padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--amber-600)", marginBottom: 6 }}>Franschhoek</div>
                <div style={{ fontSize: "0.88rem", color: "var(--fg2)", lineHeight: 1.5 }}>The wine tram, estate lunches, and French Huguenot village charm in the Cape winelands.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="template" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="layout-template" color="var(--accent)" label="Templates" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 16px", color: "var(--fg1)" }}>Client dashboard — master template</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "64ch", margin: "0 0 24px", lineHeight: 1.65 }}>
            This is a client&apos;s home base while they&apos;re away: their day-by-day plan, all bookings, where to eat, local know-how, and a space to capture memories. In Thula OS, use{" "}
            <Link href="/os/app/new-trip" style={{ color: "var(--accent)", fontWeight: 600 }}>
              New trip
            </Link>{" "}
            or{" "}
            <Link href="/os/app/templates" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Templates
            </Link>{" "}
            to spin one up for a real client.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: "28px 30px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--fg1)", marginBottom: 14 }}>How this maps to Thula OS</div>
            <ol style={{ margin: 0, padding: "0 0 0 22px", color: "var(--fg2)", fontSize: "0.95rem", lineHeight: 2 }}>
              <li>Start from a template or a blank trip in Thula OS.</li>
              <li>Name it for the client + trip (e.g. &quot;The Naidoos, Vietnam, March 2026&quot;).</li>
              <li>Fill in flights, hotels and the day-by-day plan.</li>
              <li>Turn on public preview to share a clean, login-free mini-site with the client.</li>
              <li>The client also gets a login to the Client Portal automatically.</li>
            </ol>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 24 }}>
              {["Day-by-Day Itinerary", "Bookings & Confirmations", "Restaurant Recommendations", "Packing & Pre-Trip Checklist"].map((c) => (
                <div key={c} style={{ background: "var(--sand)", borderRadius: "var(--r-sm)", padding: 14, textAlign: "center", fontSize: "0.85rem", fontWeight: 600, color: "var(--fg1)" }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="countdown" style={{ padding: "80px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="hourglass" color="var(--amber-600)" label="Templates · reusable section" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 10px", color: "var(--fg1)" }}>Your countdown to take-off</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "64ch", margin: "0 0 24px", lineHeight: 1.65 }}>
            Drop this section into any client dashboard. It calms pre-trip nerves by telling clients exactly what to do, and when.
          </p>
          <div style={{ background: "var(--card)", borderLeft: "4px solid var(--amber-500)", borderRadius: "var(--r-md)", padding: "22px 26px", maxWidth: "70ch", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--amber-600)", marginBottom: 8 }}>The day before</div>
            <p style={{ fontSize: "0.98rem", color: "var(--fg1)", margin: 0, lineHeight: 1.6 }}>
              Charge everything, pack chargers and adapter, double-check passport and documents are in your hand luggage, and get an early night. You&apos;ve got this.
            </p>
          </div>
        </div>
      </section>

      <section id="welcomehome" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <SectionEyebrow icon="home" color="var(--accent)" label="Templates · post-trip page" />
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", margin: "0 0 10px", color: "var(--fg1)" }}>Welcome home</h2>
          <p style={{ fontSize: "1.02rem", color: "var(--fg2)", maxWidth: "64ch", margin: "0 0 24px", lineHeight: 1.65 }}>
            Drop this into a client&apos;s dashboard once they&apos;re home, or send it as its own page. The end of a trip is your best moment to earn a review and a repeat booking.
          </p>
          <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", padding: 30, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.3rem", margin: "0 0 10px", color: "var(--fg1)" }}>Your trip, kept forever</h3>
            <p style={{ fontSize: "0.96rem", color: "var(--fg2)", margin: 0, lineHeight: 1.6, maxWidth: "64ch" }}>
              A space to gather photos, memories and reflections after landing home — see the Client Portal&apos;s Trip Journal for the live version of this idea.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ background: "var(--forest-700)", color: "rgba(251,244,233,0.84)", padding: "50px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
          <Wordmark size={26} color="var(--fg-on-dark)" />
          <div style={{ fontSize: "0.85rem", color: "rgba(251,244,233,0.6)" }}>Internal operations hub · private &amp; confidential</div>
        </div>
      </footer>
    </div>
  );
}

function SectionEyebrow({ icon, color, label = "Run the business" }: { icon: string; color: string; label?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ color }}>
        <Icon name={icon} size={22} />
      </div>
      <p style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--primary)", margin: 0 }}>{label}</p>
    </div>
  );
}
