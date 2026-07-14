import { Wordmark } from "@/components/Wordmark";
import { Icon } from "@/lib/icons";
import { FLIGHTS_DATA, ITINERARY_DATA, TIPS_DATA, PACKING_DATA } from "@/data/trip";

const HOTELS = [
  {
    name: "The Bantry Aparthotel",
    loc: "Cape Town · Western Cape",
    dates: "26 Jun – 1 Jul · 5 nights",
    meta: "5 nights · Breakfast included · 5 × Double Rooms",
    desc: "Your base beneath Table Mountain, well placed for the city, the Atlantic seaboard and the peninsula drives. Spacious apartments, a pool, and easy access to everywhere you'll want to be.",
    url: "https://www.bantryaparthotel.co.za",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    color: "var(--accent)",
  },
  {
    name: "Bellevue Forest Lodge",
    loc: "Addo · Eastern Cape",
    dates: "1 Jul – 3 Jul · 2 nights",
    meta: "2 nights · Dinner & Breakfast included · 5 × Luxury Tents",
    desc: "A luxury tented camp in malaria-free Big Five country, with game drives from the doorstep and dinner under the stars. Addo Elephant National Park on your threshold.",
    url: "https://bellevueforest.co.za",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    color: "var(--primary)",
  },
  {
    name: "Centre-Ville Guest House",
    loc: "Franschhoek · Cape Winelands",
    dates: "3 Jul – 6 Jul · 3 nights",
    meta: "3 nights · Breakfast included · 5 × Double / Twin Rooms",
    desc: "In the heart of the prettiest village in the Cape, walking distance to the restaurants, galleries and the wine tram. Mountain views from the garden, French Huguenot architecture all around.",
    url: "https://www.centre-ville.co.za",
    img: "https://images.unsplash.com/photo-1510077143771-1b4b0fcbbd73?w=800&q=80",
    color: "var(--amber-600)",
  },
];

export default function ClientWebsitePage() {
  return (
    <div style={{ fontFamily: "var(--font-serif)", color: "var(--fg1)", background: "var(--paper)" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(251,247,238,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={24} />
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            {["welcome", "trip", "flights", "hotels", "daytoday", "tips", "packing", "info"].map((id) => (
              <a key={id} href={`#${id}`} style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg2)", textDecoration: "none", whiteSpace: "nowrap" }}>
                {id === "daytoday" ? "Day to day" : id === "info" ? "Good to know" : id === "tips" ? "Thula tips" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header style={{ background: "var(--deep)", color: "var(--fg-on-dark)", padding: "80px 0 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--secondary)", display: "flex", alignItems: "center", gap: 14, margin: "0 0 30px" }}>
            <span style={{ width: 30, height: 1, background: "var(--secondary)", display: "inline-block" }} />
            Thula Travel · Private itinerary
          </p>
          <h1 style={{ fontFamily: "var(--font-script)", fontWeight: 700, fontSize: "clamp(3.4rem,10vw,6.5rem)", lineHeight: 0.92, letterSpacing: "-0.02em", margin: "0 0 6px", color: "var(--fg-on-dark)" }}>
            South
            <br />
            <em style={{ fontStyle: "normal", color: "var(--primary)" }}>Africa</em>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(251,244,233,0.82)", maxWidth: "50ch", margin: "18px 0 40px", lineHeight: 1.6 }}>
            A handcrafted journey through the Cape, Big Five country at Addo, and the winelands of Franschhoek. Prepared by hand for Brid Walsh and her group of ten.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 38, padding: "26px 0 64px", borderTop: "1px solid rgba(251,244,233,0.2)" }}>
            {[["10", "Travellers"], ["10", "Nights"], ["3", "Destinations"], ["25 Jun", "2026 · Departure"]].map(([n, l]) => (
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
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Welcome, Brid</h2>
          <div style={{ maxWidth: "60ch" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.7 }}>
              Everything for your South Africa trip lives here, in one place you can open from your phone wherever you are. Your flights, hotels, a day-by-day plan, a few of our own tips, and a packing list for a Cape winter.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--fg1)", margin: "0 0 18px", lineHeight: 1.7 }}>
              We&apos;ve planned this one carefully for your group of ten, from the top of Table Mountain to the elephants at Addo to the vineyards of Franschhoek. If anything comes up before you fly, or while you&apos;re away, message me any time.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--fg1)", margin: 0, lineHeight: 1.7 }}>Have the best time.</p>
            <p style={{ fontFamily: "var(--font-script)", fontSize: "1.4rem", color: "var(--accent)", margin: "26px 0 2px" }}>Gillian</p>
            <p style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg3)", margin: 0 }}>Thula Travel</p>
          </div>
        </div>
      </section>

      <section id="trip" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Your trip</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 18px" }}>
            Cape Town to the bush, to the vines
          </h2>
          <p style={{ fontSize: "1.06rem", color: "var(--fg2)", maxWidth: "56ch", lineHeight: 1.6 }}>
            Five nights beneath Table Mountain with private touring across the peninsula, a flight east into Big Five country at Addo, then back to the oak-lined estates of Franschhoek to wind down.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden", marginTop: 30 }}>
            {[["5 nights", "Cape Town"], ["2 nights", "Addo · Eastern Cape"], ["3 nights", "Franschhoek"], ["23 kg", "Baggage · per person"]].map(([n, l]) => (
              <div key={l} style={{ background: "var(--card)", padding: "20px 22px" }}>
                <b style={{ fontFamily: "var(--font-script)", fontSize: "1.5rem", fontWeight: 700, display: "block", color: "var(--accent)" }}>{n}</b>
                <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg3)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="flights" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Getting there &amp; around</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Flights</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {FLIGHTS_DATA.map((f, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px", position: "relative", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: f.color }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                  <small style={{ fontWeight: 600, fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg3)" }}>
                    {f.carrier} · {f.date}
                  </small>
                  <span style={{ fontWeight: 700, fontSize: "1rem", color: f.color, background: "var(--sand)", padding: "3px 10px", borderRadius: 6 }}>{f.code}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ textAlign: "center" }}>
                    <b style={{ fontFamily: "var(--font-script)", fontSize: "1.7rem", fontWeight: 700, display: "block", lineHeight: 1, color: "var(--fg1)" }}>{f.from}</b>
                    <span style={{ fontSize: "0.78rem", color: "var(--fg3)" }}>{f.fromCity}</span>
                  </div>
                  <div style={{ flex: 1, height: 1, background: "var(--line)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ background: "var(--card)", padding: "0 8px", color: "var(--primary)", display: "inline-flex" }}>
                      <Icon name="plane" size={16} />
                    </span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <b style={{ fontFamily: "var(--font-script)", fontSize: "1.7rem", fontWeight: 700, display: "block", lineHeight: 1, color: "var(--fg1)" }}>{f.to}</b>
                    <span style={{ fontSize: "0.78rem", color: "var(--fg3)" }}>{f.toCity}</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg3)", display: "block" }}>Departs</span>
                    <b style={{ fontWeight: 600, fontSize: "0.96rem", color: "var(--fg1)" }}>{f.dep}</b>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: 600, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", display: "block" }}>Arrives</span>
                    <b style={{ fontWeight: 600, fontSize: "0.96rem", color: "var(--fg1)" }}>{f.arr}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hotels" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Where you&apos;ll stay</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Hotels</h2>
          {HOTELS.map((h) => (
            <article key={h.name} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 30, boxShadow: "var(--shadow-md)", display: "grid", gridTemplateColumns: "360px 1fr" }}>
              <div style={{ position: "relative", minHeight: 300 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.img} alt={h.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(49,118,83,0.25),rgba(222,56,49,0.1))", mixBlendMode: "multiply" }} />
                <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(31,30,26,0.78)", color: "var(--fg-on-dark)", fontWeight: 600, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 30, backdropFilter: "blur(4px)" }}>
                  {h.dates}
                </div>
              </div>
              <div style={{ padding: "32px 36px" }}>
                <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: h.color, marginBottom: 10 }}>{h.loc}</div>
                <h3 style={{ fontSize: "1.7rem", lineHeight: 1.05, margin: "0 0 8px", color: "var(--fg1)" }}>{h.name}</h3>
                <div style={{ fontSize: "0.85rem", color: "var(--fg3)", marginBottom: 16 }}>{h.meta}</div>
                <p style={{ color: "var(--fg2)", fontSize: "0.98rem", margin: "0 0 22px", maxWidth: "58ch", lineHeight: 1.6 }}>{h.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a href={h.url} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13.5, color: "var(--accent)", background: "var(--sage-100)", border: "1px solid var(--sage-300)", padding: "10px 18px", borderRadius: "var(--r-pill)", textDecoration: "none" }}>
                    <Icon name="external-link" size={15} />
                    Visit website
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="daytoday" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Your journey, day by day</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Day to day</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ITINERARY_DATA.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 24, background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 28px" }}>
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
                  {d.tl && (
                    <ul style={{ listStyle: "none", margin: "14px 0 0", borderLeft: "1px solid var(--line)", padding: "0 0 0 18px" }}>
                      {d.tl.map((tl, j) => (
                        <li key={j} style={{ display: "grid", gridTemplateColumns: "54px 1fr", gap: 12, padding: "6px 0", position: "relative" }}>
                          <div style={{ position: "absolute", left: -23, top: 12, width: 8, height: 8, borderRadius: "50%", background: "var(--secondary)", boxShadow: "0 0 0 3px var(--card)" }} />
                          <time style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>{tl.time}</time>
                          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--fg1)" }}>{tl.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tips" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)", background: "var(--sand)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>From us to you</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 40px" }}>Thula tips</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {TIPS_DATA.slice(0, 6).map((t, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: 26, boxShadow: "var(--shadow-sm)" }}>
                <div style={{ color: t.color, marginBottom: 12 }}>
                  <Icon name={t.icon} size={24} />
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 600, margin: "0 0 7px", color: "var(--fg1)" }}>{t.title}</h4>
                <p style={{ fontSize: "0.92rem", color: "var(--fg2)", margin: 0, lineHeight: 1.6 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packing" style={{ padding: "100px 0", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
          <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", margin: "0 0 14px" }}>Be ready</p>
          <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "clamp(1.9rem,4vw,2.9rem)", lineHeight: 1.05, color: "var(--fg1)", margin: "0 0 14px" }}>Packing list</h2>
          <p style={{ fontSize: "1.06rem", color: "var(--fg2)", maxWidth: "62ch", margin: "0 0 40px", lineHeight: 1.6 }}>
            Tuned for a Cape winter, a bush safari, and smart-casual nights in the winelands.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "30px 40px" }}>
            {PACKING_DATA.map((cat) => (
              <div key={cat.name}>
                <h4 style={{ fontWeight: 600, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 12px", paddingBottom: 8, borderBottom: "2px solid var(--secondary)" }}>
                  {cat.name}
                </h4>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {cat.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid var(--line-soft)", fontSize: "0.94rem", color: "var(--fg1)" }}>
                      <span style={{ flexShrink: 0, marginTop: 2, color: "var(--accent)" }}>
                        <Icon name="check" size={15} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
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
            <InfoCard title="Booking references">
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: 0 }}>Turkish Airlines — 8 passengers</p>
              <p style={{ margin: "6px 0 0" }}>
                <span style={{ fontSize: "0.9rem", background: "var(--amber-100)", padding: "2px 8px", borderRadius: 5, color: "var(--fg1)" }}>SVIHB7</span>
              </p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "14px 0 0" }}>Linda &amp; Rachel</p>
              <p style={{ margin: "6px 0 0" }}>
                <span style={{ fontSize: "0.9rem", background: "var(--amber-100)", padding: "2px 8px", borderRadius: 5, color: "var(--fg1)" }}>SZLHXR</span>
              </p>
            </InfoCard>
            <InfoCard title="Baggage">
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>23 kg checked bag per person, included on all flights.</p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "10px 0 0" }}>Soft bags are best for the light aircraft and game vehicles.</p>
            </InfoCard>
            <InfoCard title="Money & time">
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>Currency is the South African Rand (ZAR).</p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "10px 0 0" }}>South Africa is 1 hour ahead of Ireland in summer.</p>
            </InfoCard>
            <InfoCard title="Health & safety">
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>Addo is malaria-free, so no antimalarials are needed.</p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "10px 0 0" }}>Do carry your travel insurance details with you.</p>
            </InfoCard>
            <InfoCard title="Drive & connect">
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>They drive on the left, the same as home.</p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "10px 0 0" }}>Local SIMs and eSIMs are cheap and easy if you want data.</p>
            </InfoCard>
            <InfoCard title="Your consultant">
              <p style={{ fontSize: "0.94rem", color: "var(--fg1)", margin: 0 }}>Gillian · Thula Travel</p>
              <p style={{ fontSize: "0.94rem", color: "var(--fg3)", margin: "6px 0 0" }}>With you throughout, for anything you need.</p>
              <p style={{ margin: "10px 0 0" }}>
                <span style={{ fontSize: "0.9rem", background: "var(--amber-100)", padding: "2px 8px", borderRadius: 5, color: "var(--fg1)" }}>[your phone / WhatsApp]</span>
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      <footer style={{ background: "var(--forest-700)", color: "rgba(251,244,233,0.84)", padding: "60px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 30, alignItems: "flex-end" }}>
          <div>
            <Wordmark size={32} color="var(--fg-on-dark)" />
            <p style={{ fontSize: "0.95rem", maxWidth: "40ch", marginTop: 10, color: "rgba(251,244,233,0.6)" }}>Done-for-you travel, planned by hand. Rooted in South Africa, at home in the world.</p>
          </div>
          <div style={{ fontSize: "0.85rem", letterSpacing: "0.02em", lineHeight: 2, textAlign: "right" }}>
            <div>hello@thula.travel</div>
            <div style={{ color: "var(--secondary)" }}>thula.travel</div>
            <div>Prepared for Brid Walsh · Private &amp; confidential 🇿🇦</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "24px 26px" }}>
      <h4 style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 14px" }}>{title}</h4>
      {children}
    </div>
  );
}
