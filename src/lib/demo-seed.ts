import type { SupabaseClient } from "@supabase/supabase-js";

// Seeds a brand-new agency (tenant) with the same flagship demo data the
// original Thula OS / Client Portal / Travel App designs shipped with —
// Brid Walsh's South Africa trip plus two pipeline clients (the Naidoos,
// M. Osei) — so a new Thula OS signup isn't staring at an empty console.
// Runs once, right after the founding staff_profile row is created.

const euros = (n: number) => Math.round(n * 100);

export async function seedDemoAgency(
  supabase: SupabaseClient,
  agencyId: string,
  ownerEmail: string
) {
  // ---------------- CLIENTS ----------------
  const { data: brid } = await supabase
    .from("clients")
    .insert({
      agency_id: agencyId,
      name: "Brid Walsh",
      email: ownerEmail,
      stage: "Live",
      tone: "sage",
      value_cents: euros(18400),
      margin_pct: "22%",
      due_label: "2 Jul",
      traveller_type: "Group & family traveller",
      lifetime_value_cents: euros(41200),
      likes: ["Wildlife", "Wine & food", "Boutique stays"],
      dislikes: ["Long transfers", "Early departures"],
      preview_enabled: true,
      docs_count: 8,
      suppliers_count: 6,
    })
    .select()
    .single();

  const { data: naidoo } = await supabase
    .from("clients")
    .insert({
      agency_id: agencyId,
      name: "The Naidoos",
      stage: "Draft",
      tone: "amber",
      value_cents: euros(9100),
      margin_pct: "—",
      due_label: "—",
      traveller_type: "First-time luxury traveller",
      lifetime_value_cents: euros(9100),
      likes: ["Culture", "Food tours"],
      dislikes: ["Large group tours"],
      preview_enabled: false,
      docs_count: 2,
      suppliers_count: 0,
    })
    .select()
    .single();

  const { data: osei } = await supabase
    .from("clients")
    .insert({
      agency_id: agencyId,
      name: "M. Osei",
      stage: "Overdue",
      tone: "clay",
      value_cents: euros(4600),
      margin_pct: "18%",
      due_label: "30 Jun",
      traveller_type: "Repeat safari client",
      lifetime_value_cents: euros(12700),
      likes: ["Safari", "Private guides"],
      dislikes: ["City stays"],
      preview_enabled: false,
      docs_count: 5,
      suppliers_count: 3,
    })
    .select()
    .single();

  if (!brid || !naidoo || !osei) throw new Error("Failed to seed clients");

  // ---------------- TRIPS ----------------
  const { data: saTrip } = await supabase
    .from("trips")
    .insert({
      agency_id: agencyId,
      client_id: brid.id,
      destination_line1: "South",
      destination_line2: "Africa",
      date_range: "25 Jun – 7 Jul 2026",
      group_size: 10,
      nights: 10,
      destinations_count: 3,
      departure_date: "25 Jun",
      consultant_name: "Gillian",
      status: "live",
    })
    .select()
    .single();

  const { data: italyTrip } = await supabase
    .from("trips")
    .insert({
      agency_id: agencyId,
      client_id: brid.id,
      destination_line1: "Italy",
      destination_line2: "",
      date_range: "2024",
      group_size: 4,
      nights: 10,
      destinations_count: 3,
      departure_date: "2024",
      consultant_name: "Gillian",
      status: "past",
    })
    .select()
    .single();

  const { data: kenyaTrip } = await supabase
    .from("trips")
    .insert({
      agency_id: agencyId,
      client_id: brid.id,
      destination_line1: "Kenya",
      destination_line2: "",
      date_range: "2022",
      group_size: 2,
      nights: 9,
      destinations_count: 2,
      departure_date: "2022",
      consultant_name: "Gillian",
      status: "past",
    })
    .select()
    .single();

  const { data: vietnamTrip } = await supabase
    .from("trips")
    .insert({
      agency_id: agencyId,
      client_id: naidoo.id,
      destination_line1: "Vietnam",
      destination_line2: "",
      date_range: "planning",
      group_size: 4,
      status: "planning",
    })
    .select()
    .single();

  const { data: kenyaOseiTrip } = await supabase
    .from("trips")
    .insert({
      agency_id: agencyId,
      client_id: osei.id,
      destination_line1: "Kenya",
      destination_line2: "Safari",
      date_range: "30 Jun",
      group_size: 2,
      status: "live",
    })
    .select()
    .single();

  if (!saTrip || !italyTrip || !kenyaTrip || !vietnamTrip || !kenyaOseiTrip) {
    throw new Error("Failed to seed trips");
  }

  // ---------------- FLIGHTS / HOTELS / ITINERARY for the SA trip ----------------
  const FLIGHTS = [
    { carrier: "Turkish Airlines", date_label: "Thu 25 Jun", code: "TK1978", from_code: "DUB", from_city: "Dublin", to_code: "IST", to_city: "Istanbul", dep: "17:05", arr: "23:30", color: "var(--accent)" },
    { carrier: "Turkish Airlines", date_label: "Fri 26 Jun", code: "TK0044", from_code: "IST", from_city: "Istanbul", to_code: "CPT", to_city: "Cape Town", dep: "01:45", arr: "11:50", color: "var(--accent)" },
    { carrier: "Safair", date_label: "Wed 1 Jul", code: "FA0136", from_code: "CPT", from_city: "Cape Town", to_code: "PLZ", to_city: "Gqeberha", dep: "06:05", arr: "07:25", color: "var(--secondary)" },
    { carrier: "Safair", date_label: "Fri 3 Jul", code: "FA0031", from_code: "PLZ", from_city: "Gqeberha", to_code: "CPT", to_city: "Cape Town", dep: "14:30", arr: "15:55", color: "var(--secondary)" },
    { carrier: "Turkish Airlines", date_label: "Mon 6 Jul", code: "TK0045", from_code: "CPT", from_city: "Cape Town", to_code: "IST", to_city: "Istanbul", dep: "16:40", arr: "+1 04:35", color: "var(--accent-2)" },
    { carrier: "Turkish Airlines", date_label: "Tue 7 Jul", code: "TK1975", from_code: "IST", from_city: "Istanbul", to_code: "DUB", to_city: "Dublin", dep: "07:00", arr: "09:35", color: "var(--accent-2)" },
  ];
  await supabase.from("flights").insert(FLIGHTS.map((f, i) => ({ ...f, trip_id: saTrip.id, sort_order: i })));

  const HOTELS = [
    { name: "The Bantry Aparthotel", loc: "Cape Town · Western Cape", dates: "26 Jun – 1 Jul · 5 nights", board: "Breakfast included · 5 × Double Rooms", description: "Your base beneath Table Mountain, well placed for the city, the Atlantic seaboard and the peninsula drives.", url: "https://www.bantryaparthotel.co.za", color: "var(--accent)" },
    { name: "Bellevue Forest Lodge", loc: "Addo · Eastern Cape", dates: "1 Jul – 3 Jul · 2 nights", board: "Dinner & Breakfast · 5 × Luxury Tents", description: "Malaria-free Big Five country with game drives from the doorstep and dinner under the stars.", url: "https://bellevueforest.co.za", color: "var(--primary)" },
    { name: "Centre-Ville Guest House", loc: "Franschhoek · Cape Winelands", dates: "3 Jul – 6 Jul · 3 nights", board: "Breakfast included · 5 × Double / Twin", description: "In the heart of the prettiest village in the Cape, walking distance to restaurants, galleries and the wine tram.", url: "https://www.centre-ville.co.za", color: "var(--amber-600)" },
  ];
  await supabase.from("hotels").insert(HOTELS.map((h, i) => ({ ...h, trip_id: saTrip.id, sort_order: i })));

  const ITINERARY: { n: string; date_label: string; tag: string; tone: string; title: string; body: string; color: string; tl?: { time: string; text: string }[] }[] = [
    { n: "01", date_label: "Thu 25 Jun", tag: "Departure", tone: "plum", title: "Leaving Dublin", body: "Evening departure from Dublin (17:05) with Turkish Airlines TK1978, connecting through Istanbul. Arrive Istanbul 23:30.", color: "var(--accent-2)" },
    { n: "02", date_label: "Fri 26 Jun", tag: "Cape Town", tone: "sage", title: "Arrival & settling in", body: "Arrive Cape Town 11:50 on TK0044. EZ Shuttle transfer to The Bantry Aparthotel. Afternoon at leisure to find your feet.", color: "var(--accent)" },
    { n: "03", date_label: "Sat 27 Jun", tag: "Cape Town", tone: "sage", title: "The city, your way", body: "Hop-on hop-off bus and a full-day Cape Town tour included. Explore at your own pace. Sunset harbour cruise in the evening.", color: "var(--accent)" },
    { n: "04", date_label: "Sun 28 Jun", tag: "Private tour", tone: "clay", title: "The road trip", body: "A full day down the Cape Peninsula with your private guide and coach.", color: "var(--primary)", tl: [{ time: "08:00", text: "Collection from hotel" }, { time: "09:30", text: "Cape of Good Hope & Cape Point" }, { time: "13:00", text: "Boulders Beach — penguins" }, { time: "15:00", text: "Table Mountain cable car" }] },
    { n: "05", date_label: "Mon 29 Jun", tag: "Private tour", tone: "clay", title: "Urban Safari", body: "A full day exploring the city's history, culture and harbour with your private guide.", color: "var(--primary)" },
    { n: "06", date_label: "Tue 30 Jun", tag: "Cape Town", tone: "sage", title: "Last Cape day", body: "Free time — shop the Old Biscuit Mill, revisit a favourite spot, or finally sit at the hotel pool.", color: "var(--accent)" },
    { n: "07", date_label: "Wed 1 Jul", tag: "Addo", tone: "clay", title: "Into the bush", body: "04:30 shuttle to Cape Town airport. Safair FA0136 to Gqeberha. Lodge transfer to Bellevue Forest Lodge. First afternoon game drive.", color: "var(--primary)" },
    { n: "08", date_label: "Thu 2 Jul", tag: "Addo", tone: "clay", title: "Full safari day", body: "Morning and evening game drives in search of the Big Five, a giraffe walking safari in between.", color: "var(--primary)" },
    { n: "09", date_label: "Fri 3 Jul", tag: "Addo → Franschhoek", tone: "amber", title: "To the winelands", body: "Lodge transfer to Gqeberha Airport. Safair FA0031 to CPT. Private transfer through to Franschhoek.", color: "var(--amber-600)" },
    { n: "10", date_label: "Sat 4 Jul", tag: "Franschhoek", tone: "amber", title: "The wine tram", body: "All day on the Franschhoek Wine Tram — hop between estates, do as many or as few tastings as you like.", color: "var(--amber-600)" },
    { n: "11", date_label: "Sun 5 Jul", tag: "Franschhoek", tone: "amber", title: "Tuk-tuk wine tour", body: "Full-day guided tuk-tuk tour visiting hand-picked Franschhoek estates with curated tastings and a winelands lunch.", color: "var(--amber-600)" },
    { n: "12", date_label: "Mon 6 Jul", tag: "Homeward", tone: "plum", title: "Heading home", body: "Private transfer departs Centre-Ville at 13:00. Turkish Airlines TK0045 departs 16:40 via Istanbul. Arrive Dublin 09:35 Tuesday.", color: "var(--accent-2)" },
  ];
  for (let i = 0; i < ITINERARY.length; i++) {
    const { n, date_label, tag, tone, title, body, color, tl } = ITINERARY[i];
    const { data: day } = await supabase
      .from("itinerary_days")
      .insert({ trip_id: saTrip.id, day_number: n, date_label, tag, tone, title, body, color, sort_order: i })
      .select()
      .single();
    if (day && tl) {
      await supabase
        .from("itinerary_timeline_items")
        .insert(tl.map((t, j) => ({ itinerary_day_id: day.id, time_label: t.time, text_value: t.text, sort_order: j })));
    }
  }

  // ---------------- TRIP JOURNALS (Client Portal) ----------------
  await supabase.from("journal_entries").insert([
    { trip_id: saTrip.id, place_name: "Cape Town", entry_date: "Day 1", caption: "Trip hasn't started yet — entries and photos will appear here automatically as you travel.", gradient: "var(--fig-fynbos)", sort_order: 0 },
  ]);
  await supabase.from("journal_entries").insert([
    { trip_id: italyTrip.id, place_name: "Rome", entry_date: "Day 1–3", caption: "Arrived in Rome — first gelato within the hour.", gradient: "var(--fig-fynbos)", sort_order: 0 },
    { trip_id: italyTrip.id, place_name: "Florence", entry_date: "Day 4–6", caption: "Sunset over the Arno from Piazzale Michelangelo.", gradient: "var(--sage-300)", sort_order: 1 },
    { trip_id: italyTrip.id, place_name: "Amalfi Coast", entry_date: "Day 7–10", caption: "Last few days on the coast — the drive down was the highlight.", gradient: "var(--fig-savanna)", sort_order: 2 },
  ]);
  await supabase.from("journal_entries").insert([
    { trip_id: kenyaTrip.id, place_name: "Nairobi", entry_date: "Day 1–2", caption: "Settling in before heading out to the Mara.", gradient: "var(--fig-savanna)", sort_order: 0 },
    { trip_id: kenyaTrip.id, place_name: "Maasai Mara", entry_date: "Day 3–9", caption: "Lion sighting on the very first game drive.", gradient: "var(--fig-fynbos)", sort_order: 1 },
  ]);

  await supabase.from("chat_messages").insert({
    trip_id: saTrip.id,
    from_role: "assistant",
    text_value:
      "Hi Brid! I'm your Thula concierge — ask me anything while you're away: restaurants, safety, what to pack for tomorrow, whatever comes up.",
  });

  // ---------------- SUPPLIERS ----------------
  const SUPPLIERS = [
    { name: "EZ Shuttle", type: "Ground transport", region: "Western Cape", commission_pct: "10%", tone: "amber", color: "var(--amber-600)", contact: "info@ezshuttle.co.za · +27 21 376610 · WhatsApp available", invoice_count: 4, earned_cents: euros(210) },
    { name: "Bellevue Forest Lodge", type: "Lodge", region: "Addo", commission_pct: "12%", tone: "clay", color: "var(--primary)", contact: "bellevueforest.co.za · Big Five lodge, malaria-free", invoice_count: 2, earned_cents: euros(640) },
    { name: "Centre-Ville Guest House", type: "Guest house", region: "Franschhoek", commission_pct: "10%", tone: "amber", color: "var(--amber-600)", contact: "info@centre-ville.co.za", invoice_count: 2, earned_cents: euros(310) },
    { name: "Franschhoek Wine Tram", type: "Tour operator", region: "Franschhoek", commission_pct: "15%", tone: "blush", color: "var(--clay-600)", contact: "bookings@winetram.co.za · Orange Line departs Franschhoek Terminal", invoice_count: 1, earned_cents: euros(95) },
    { name: "Kiff Kombi Tours", type: "Private guide", region: "Cape Town", commission_pct: "—", tone: "clay", color: "var(--primary)", contact: "bookings@kiffkombitours.co.za · private vintage kombi tours", invoice_count: 0, earned_cents: 0 },
    { name: "City Sightseeing South Africa", type: "Hop-on hop-off", region: "Cape Town", commission_pct: "—", tone: "plum", color: "var(--accent-2)", contact: "+27 21 511 6000 · 36 Auckland Street, Paarden Eiland, Cape Town", invoice_count: 0, earned_cents: 0 },
    { name: "Tuk Tuk Franschhoek", type: "Wine tour", region: "Franschhoek", commission_pct: "—", tone: "blush", color: "var(--clay-600)", contact: "+27 72 735 3035 · info@tuktukfranschhoek.co.za", invoice_count: 0, earned_cents: 0 },
    { name: "The Bantry Aparthotel", type: "Accommodation", region: "Cape Town", commission_pct: "—", tone: "sage", color: "var(--accent)", contact: "021 035 0921 · tropicana@perchstays.co.za", invoice_count: 0, earned_cents: 0 },
  ];
  await supabase.from("suppliers").insert(SUPPLIERS.map((s) => ({ ...s, agency_id: agencyId })));

  // ---------------- INVOICES ----------------
  const { data: invBridDep } = await supabase
    .from("invoices")
    .insert({ agency_id: agencyId, client_id: brid.id, number: "INV-1042 · Deposit", heading: "Invoice", due_date: "20 May 2026", status: "Paid", tone: "sage", subtotal_cents: euros(47000), deposit_pct: "20%", deposit_cents: euros(9200), total_due_cents: euros(9200) })
    .select()
    .single();
  if (invBridDep) {
    await supabase.from("invoice_line_items").insert([
      { invoice_id: invBridDep.id, description: "South Africa 2026 — land package (10 travellers)", qty: "1", unit_price: "€36,800", line_total: "€36,800", sort_order: 0 },
      { invoice_id: invBridDep.id, description: "Flights — Dublin / Cape Town return", qty: "10", unit_price: "€1,020", line_total: "€10,200", sort_order: 1 },
    ]);
  }

  const { data: invBridBal } = await supabase
    .from("invoices")
    .insert({ agency_id: agencyId, client_id: brid.id, number: "INV-1058 · Balance", heading: "Invoice", due_date: "2 Jul 2026", status: "Due 2 Jul", tone: "amber", subtotal_cents: euros(37800), deposit_pct: "already paid", deposit_cents: euros(9200), total_due_cents: euros(9200) })
    .select()
    .single();
  if (invBridBal) {
    await supabase.from("invoice_line_items").insert([
      { invoice_id: invBridBal.id, description: "South Africa 2026 — remaining balance", qty: "1", unit_price: "€37,800", line_total: "€37,800", sort_order: 0 },
    ]);
  }

  const { data: invOsei } = await supabase
    .from("invoices")
    .insert({ agency_id: agencyId, client_id: osei.id, number: "INV-1049 · Balance", heading: "Invoice", due_date: "30 Jun 2026", status: "Overdue", tone: "clay", subtotal_cents: euros(4600), deposit_pct: "already paid", deposit_cents: 0, total_due_cents: euros(4600) })
    .select()
    .single();
  if (invOsei) {
    await supabase.from("invoice_line_items").insert([
      { invoice_id: invOsei.id, description: "Kenya Safari — remaining balance", qty: "1", unit_price: "€4,600", line_total: "€4,600", sort_order: 0 },
    ]);
  }

  const { data: invNaidoo } = await supabase
    .from("invoices")
    .insert({ agency_id: agencyId, client_id: naidoo.id, number: "INV-1061 · Deposit", heading: "Invoice", due_date: "25 Jul 2026", status: "Pending", tone: "amber", subtotal_cents: euros(10000), deposit_pct: "20%", deposit_cents: euros(2000), total_due_cents: euros(2000) })
    .select()
    .single();
  if (invNaidoo) {
    await supabase.from("invoice_line_items").insert([
      { invoice_id: invNaidoo.id, description: "Vietnam — land package (4 travellers)", qty: "1", unit_price: "€9,400", line_total: "€9,400", sort_order: 0 },
      { invoice_id: invNaidoo.id, description: "Domestic flights", qty: "4", unit_price: "€150", line_total: "€600", sort_order: 1 },
    ]);
  }

  // ---------------- DOCUMENTS ----------------
  await supabase.from("documents").insert([
    { agency_id: agencyId, client_id: brid.id, name: "Flight e-tickets.pdf", type: "Flights" },
    { agency_id: agencyId, client_id: brid.id, name: "Bantry Aparthotel voucher.pdf", type: "Hotel" },
    { agency_id: agencyId, client_id: brid.id, name: "Travel insurance.pdf", type: "Insurance" },
    { agency_id: agencyId, client_id: naidoo.id, name: "Deposit invoice.pdf", type: "Payment" },
  ]);

  // ---------------- TASKS ----------------
  await supabase.from("tasks").insert([
    { agency_id: agencyId, client_id: brid.id, title: "Confirm Franschhoek dinner booking", status: "todo", due_label: "Due today", due_color: "var(--primary)", sort_order: 0 },
    { agency_id: agencyId, client_id: naidoo.id, title: "Chase deposit from The Naidoos", status: "todo", due_label: "Due tomorrow", due_color: "var(--fg3)", sort_order: 1 },
    { agency_id: agencyId, client_id: osei.id, title: "Draft Kenya safari itinerary", status: "inprogress", due_label: "Due 18 Jul", due_color: "var(--fg3)", sort_order: 0 },
    { agency_id: agencyId, client_id: brid.id, title: "Request updated hotel rates", status: "inprogress", due_label: "Due 20 Jul", due_color: "var(--fg3)", sort_order: 1 },
    { agency_id: agencyId, client_id: brid.id, title: "Send welcome pack", status: "done", due_label: "Completed", due_color: "var(--fg3)", sort_order: 0 },
  ]);

  // ---------------- ACTIVITY (staggered real timestamps) ----------------
  const now = Date.now();
  const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString();
  await supabase.from("activity_events").insert([
    { agency_id: agencyId, client_id: brid.id, icon: "credit-card", color: "var(--accent)", text_value: "Deposit paid by Brid Walsh (€9,200)", created_at: hoursAgo(2) },
    { agency_id: agencyId, client_id: brid.id, icon: "check-square", color: "var(--primary)", text_value: "Task completed: Send welcome pack", created_at: hoursAgo(5) },
    { agency_id: agencyId, client_id: brid.id, icon: "file-text", color: "var(--fg2)", text_value: "Travel insurance.pdf uploaded to Brid Walsh", created_at: hoursAgo(22) },
    { agency_id: agencyId, client_id: naidoo.id, icon: "user-plus", color: "var(--accent)", text_value: "New client added: The Naidoos", created_at: hoursAgo(48) },
    { agency_id: agencyId, client_id: osei.id, icon: "map-pin", color: "var(--primary)", text_value: "Itinerary updated for M. Osei's Kenya trip", created_at: hoursAgo(72) },
  ]);

  // ---------------- COMMAND CENTRE PRIORITIES ----------------
  await supabase.from("priorities").insert([
    { agency_id: agencyId, client_id: brid.id, text_value: "Chase Franschhoek dinner confirmation", reason: "Booking window closes this week", confidence: "High", sort_order: 0 },
    { agency_id: agencyId, client_id: naidoo.id, text_value: "Follow up on Vietnam deposit", reason: "Quote opened 4 times, no reply in 6 days", confidence: "87%", sort_order: 1 },
    { agency_id: agencyId, client_id: osei.id, text_value: "Call M. Osei re: overdue balance", reason: "Balance was due 30 Jun", confidence: "High", sort_order: 2 },
  ]);

  // ---------------- PRE-DEPARTURE AI CHECKS ----------------
  await supabase.from("predeparture_checks").insert([
    { client_id: brid.id, label: "Passport validity (all 10 travellers)", status: "Verified", tone: "sage", icon: "check-circle", color: "var(--accent)", sort_order: 0 },
    { client_id: brid.id, label: "Travel insurance on file", status: "Verified", tone: "sage", icon: "check-circle", color: "var(--accent)", sort_order: 1 },
    { client_id: brid.id, label: "Visa requirements (SA — Irish passport)", status: "Not required", tone: "sage", icon: "check-circle", color: "var(--accent)", sort_order: 2 },
    { client_id: brid.id, label: "Final balance payment", status: "Due 2 Jul", tone: "amber", icon: "alert-triangle", color: "var(--amber-600)", sort_order: 3 },
    { client_id: naidoo.id, label: "Passport validity", status: "Awaiting docs", tone: "amber", icon: "alert-triangle", color: "var(--amber-600)", sort_order: 0 },
    { client_id: naidoo.id, label: "Visa requirements (Vietnam)", status: "Action needed", tone: "clay", icon: "alert-triangle", color: "var(--primary)", sort_order: 1 },
    { client_id: osei.id, label: "Passport validity", status: "Verified", tone: "sage", icon: "check-circle", color: "var(--accent)", sort_order: 0 },
    { client_id: osei.id, label: "Yellow fever certificate", status: "Verified", tone: "sage", icon: "check-circle", color: "var(--accent)", sort_order: 1 },
    { client_id: osei.id, label: "Overdue balance", status: "Overdue", tone: "clay", icon: "alert-triangle", color: "var(--primary)", sort_order: 2 },
  ]);

  // ---------------- VENDOR COSTS ----------------
  await supabase.from("vendor_costs").insert([
    { client_id: brid.id, vendor: "Bantry Aparthotel", amount_cents: euros(6400), status: "Paid", tone: "sage", due_label: "Paid 2 Jun", sort_order: 0 },
    { client_id: brid.id, vendor: "Bellevue Forest Lodge", amount_cents: euros(5100), status: "Paid", tone: "sage", due_label: "Paid 10 Jun", sort_order: 1 },
    { client_id: brid.id, vendor: "EZ Shuttle", amount_cents: euros(420), status: "Due", tone: "amber", due_label: "Due 18 Jun", sort_order: 2 },
    { client_id: brid.id, vendor: "Centre-Ville Guest House", amount_cents: euros(3900), status: "Due", tone: "amber", due_label: "Due 20 Jun", sort_order: 3 },
    { client_id: naidoo.id, vendor: "Vietnam ground operator", amount_cents: euros(4200), status: "Awaiting deposit", tone: "amber", due_label: "On booking", sort_order: 0 },
    { client_id: osei.id, vendor: "Maasai Mara camp", amount_cents: euros(3100), status: "Overdue", tone: "clay", due_label: "Was due 28 Jun", sort_order: 0 },
    { client_id: osei.id, vendor: "Nairobi transfers", amount_cents: euros(180), status: "Paid", tone: "sage", due_label: "Paid 15 Jun", sort_order: 1 },
  ]);
}
