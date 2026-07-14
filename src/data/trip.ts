// ── SHELL TEMPLATE NOTE ──────────────────────────────────────────────
// This is a per-client "trip companion" app. To spin up a new client:
//   1. Edit TRIP below (client name, destination, dates, consultant).
//   2. Replace FLIGHTS/HOTELS/TRANSFERS/ITINERARY/TIPS/PACKING/CONTACTS
//      /DOCS/HEALTH/CONFIRMATIONS with the new trip's facts (same shape).
//   3. NAV_TILES / JOURNEY_GLANCE / home stats derive from TRIP elsewhere.
// Everything else (layout, interactions, styling) stays as-is.
// ───────────────────────────────────────────────────────────────────

import type { PillTone } from "@/components/Pill";

export const TRIP = {
  client: "Brid Walsh",
  groupSize: 10,
  destinationLine1: "South",
  destinationLine2: "Africa",
  dateRange: "25 Jun – 7 Jul 2026",
  consultant: "Gillian",
  nights: 10,
  destinationsCount: 3,
  departureDate: "25 Jun",
};

export type TabId =
  | "home"
  | "flights"
  | "hotels"
  | "transfers"
  | "itinerary"
  | "concierge"
  | "tips"
  | "emergency";

export const TABS_DEF: { id: TabId; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "flights", label: "Flights", icon: "plane" },
  { id: "hotels", label: "Hotels", icon: "bed-double" },
  { id: "transfers", label: "Transfers", icon: "bus" },
  { id: "itinerary", label: "Plan", icon: "calendar-days" },
  { id: "concierge", label: "Ask Thula", icon: "sparkles" },
  { id: "tips", label: "Tips", icon: "lightbulb" },
  { id: "emergency", label: "SOS", icon: "life-buoy" },
];

export const NAV_TILES_DEF: {
  id: TabId;
  icon: string;
  label: string;
  sub: string;
  color: string;
}[] = [
  { id: "flights", icon: "plane", label: "Flights", sub: "6 flights · 2 airlines", color: "var(--accent)" },
  { id: "hotels", icon: "bed-double", label: "Hotels", sub: "3 properties", color: "var(--primary)" },
  { id: "itinerary", icon: "calendar-days", label: "Itinerary", sub: "12 days · day by day", color: "var(--secondary)" },
  { id: "transfers", icon: "bus", label: "Transfers", sub: "All ground transport", color: "var(--accent-2)" },
  { id: "tips", icon: "lightbulb", label: "Tips & packing", sub: "9 tips · packing list", color: "var(--clay-600)" },
  { id: "emergency", icon: "life-buoy", label: "Emergency", sub: "Key contacts & docs", color: "var(--primary)" },
];

export const JOURNEY_GLANCE_DEF: {
  icon: string;
  tone: PillTone;
  color: string;
  loc: string;
  nights: string;
  dates: string;
  hotel: string;
}[] = [
  { icon: "waves", tone: "sage", color: "var(--accent)", loc: "Cape Town", nights: "5 nights", dates: "26 Jun – 1 Jul", hotel: "The Bantry Aparthotel" },
  { icon: "map-pin", tone: "clay", color: "var(--primary)", loc: "Addo", nights: "2 nights", dates: "1–3 Jul", hotel: "Bellevue Forest Lodge" },
  { icon: "grape", tone: "amber", color: "var(--amber-600)", loc: "Franschhoek", nights: "3 nights", dates: "3–6 Jul", hotel: "Centre-Ville Guest House" },
];

export const FLIGHTS_DATA = [
  { carrier: "Turkish Airlines", date: "Thu 25 Jun", code: "TK1978", from: "DUB", fromCity: "Dublin", to: "IST", toCity: "Istanbul", dep: "17:05", arr: "23:30", color: "var(--accent)" },
  { carrier: "Turkish Airlines", date: "Fri 26 Jun", code: "TK0044", from: "IST", fromCity: "Istanbul", to: "CPT", toCity: "Cape Town", dep: "01:45", arr: "11:50", color: "var(--accent)" },
  { carrier: "Safair", date: "Wed 1 Jul", code: "FA0136", from: "CPT", fromCity: "Cape Town", to: "PLZ", toCity: "Gqeberha", dep: "06:05", arr: "07:25", color: "var(--secondary)" },
  { carrier: "Safair", date: "Fri 3 Jul", code: "FA0031", from: "PLZ", fromCity: "Gqeberha", to: "CPT", toCity: "Cape Town", dep: "14:30", arr: "15:55", color: "var(--secondary)" },
  { carrier: "Turkish Airlines", date: "Mon 6 Jul", code: "TK0045", from: "CPT", fromCity: "Cape Town", to: "IST", toCity: "Istanbul", dep: "16:40", arr: "+1 04:35", color: "var(--accent-2)" },
  { carrier: "Turkish Airlines", date: "Tue 7 Jul", code: "TK1975", from: "IST", fromCity: "Istanbul", to: "DUB", toCity: "Dublin", dep: "07:00", arr: "09:35", color: "var(--accent-2)" },
];

export const HOTELS_DATA: {
  name: string;
  loc: string;
  dates: string;
  board: string;
  desc: string;
  url: string;
  gradient: string;
  color: string;
  tone: PillTone;
  tags: string[];
  confKey: string | null;
}[] = [
  {
    name: "The Bantry Aparthotel",
    loc: "Cape Town · Western Cape",
    dates: "26 Jun – 1 Jul · 5 nights",
    board: "Breakfast included · 5 × Double Rooms",
    desc: "Your base beneath Table Mountain, well placed for the city, the Atlantic seaboard and the peninsula drives.",
    url: "https://www.bantryaparthotel.co.za",
    gradient: "var(--fig-fynbos)",
    color: "var(--accent)",
    tone: "sage",
    tags: ["Pool", "City access", "Breakfast"],
    confKey: "tropicana",
  },
  {
    name: "Bellevue Forest Lodge",
    loc: "Addo · Eastern Cape",
    dates: "1 Jul – 3 Jul · 2 nights",
    board: "Dinner & Breakfast · 5 × Luxury Tents",
    desc: "Malaria-free Big Five country with game drives from the doorstep and dinner under the stars.",
    url: "https://bellevueforest.co.za",
    gradient: "var(--fig-savanna)",
    color: "var(--primary)",
    tone: "clay",
    tags: ["Big 5", "Game drives", "All meals"],
    confKey: null,
  },
  {
    name: "Centre-Ville Guest House",
    loc: "Franschhoek · Cape Winelands",
    dates: "3 Jul – 6 Jul · 3 nights",
    board: "Breakfast included · 5 × Double / Twin",
    desc: "In the heart of the prettiest village in the Cape, walking distance to restaurants, galleries and the wine tram.",
    url: "https://www.centre-ville.co.za",
    gradient: "var(--fig-sunset)",
    color: "var(--amber-600)",
    tone: "amber",
    tags: ["Wine tram", "Village centre", "Mountain views"],
    confKey: "centreVille",
  },
];

export const TRANSFERS_DATA: {
  icon: string;
  title: string;
  date: string;
  from: string;
  to: string;
  ref: string;
  op: string;
  tone: PillTone;
  color: string;
  detail: string;
  confKey: string | null;
}[] = [
  { icon: "bus", title: "Airport arrival transfer", date: "Fri 26 Jun · 12:00", from: "Cape Town International", to: "The Bantry Aparthotel, Sea Point", ref: "EZ Shuttle #1967680", op: "EZ Shuttle", tone: "sage", color: "var(--accent)", detail: "Private minibus for 10 passengers. Driver will meet you in arrivals holding a Thula Travel board. Drop-off directly at the hotel. Estimated journey: 25 minutes.", confKey: "ez1967680" },
  { icon: "bus-front", title: "City Sightseeing hop-on hop-off", date: "Sat 27 Jun · all day", from: "Cape Town city", to: "All major stops", ref: "Ref FWTGDJ25 · 9 adults + 1 junior", op: "City Sightseeing", tone: "plum", color: "var(--accent-2)", detail: "Classic Hop-on-Hop-off Ticket. Ref: FWTGDJ25. 9 adults + 1 junior. Lead guest: Brid Walsh. Board at any stop and ride all day. Key stops: V&A Waterfront, Bo-Kaap, Signal Hill, Camps Bay, Sea Point.", confKey: "citysightseeing" },
  { icon: "car", title: "Cape Peninsula road trip", date: "Sun 28 Jun · 08:00", from: "The Bantry Aparthotel", to: "Table Mountain (return)", ref: "Thula Travel tour", op: "Private guide", tone: "clay", color: "var(--primary)", detail: "Full-day private coach with dedicated guide for all 10 guests. Chapman's Peak, Cape Point, Boulders Beach, Table Mountain cable car. Packed lunch included.", confKey: "kiffkombi" },
  { icon: "car", title: "Urban Safari tour", date: "Mon 29 Jun · 08:30", from: "The Bantry Aparthotel", to: "Various city stops (return)", ref: "Thula Travel tour", op: "Private guide", tone: "clay", color: "var(--primary)", detail: "Full-day private guide and vehicle. Robben Island ferry, Bo-Kaap, District Six Museum, Woodstock, V&A Waterfront cruise. Lunch at Salt River Taproom.", confKey: "kiffkombi" },
  { icon: "plane", title: "CPT → Gqeberha transfer", date: "Wed 1 Jul · 04:30", from: "The Bantry Aparthotel", to: "Cape Town International", ref: "EZ Shuttle #1967680", op: "EZ Shuttle", tone: "amber", color: "var(--secondary)", detail: "Early morning shuttle for 10 guests. Pickup at 04:30 to allow time for check-in before the 06:05 Safair flight FA0136. Driver confirmed.", confKey: "ez1967680" },
  { icon: "car", title: "Gqeberha → Bellevue Lodge", date: "Wed 1 Jul · 07:45", from: "Gqeberha Airport (PLZ)", to: "Bellevue Forest Lodge, Addo", ref: "Lodge transfer", op: "Bellevue Forest Lodge", tone: "clay", color: "var(--primary)", detail: "Lodge vehicle meets you on arrival. Journey approx 1 hour 15 minutes through the Eastern Cape. Scenic drive — keep an eye out for game near the road.", confKey: null },
  { icon: "car", title: "Bellevue → Gqeberha Airport", date: "Fri 3 Jul · 12:30", from: "Bellevue Forest Lodge", to: "Gqeberha Airport (PLZ)", ref: "Lodge transfer", op: "Bellevue Forest Lodge", tone: "clay", color: "var(--primary)", detail: "Lodge vehicle for return journey. Departs 12:30 to arrive in good time for the 14:30 Safair flight FA0031.", confKey: null },
  { icon: "bus", title: "CPT Airport → Franschhoek", date: "Fri 3 Jul · 15:55", from: "Cape Town International", to: "Centre-Ville Guest House", ref: "EZ Shuttle #1967681", op: "EZ Shuttle", tone: "amber", color: "var(--secondary)", detail: "Comfort Minibus (13 pax) with trailer. Meets you after FA0031 lands at 15:55. Drop-off at Centre-Ville Guest House, Franschhoek. Journey approx 1 hour through the winelands.", confKey: "ez1967681" },
  { icon: "train-front", title: "Franschhoek Wine Tram", date: "Sat 4 Jul · 10:05 departure", from: "Franschhoek Terminal", to: "Orange Line wine estates", ref: "Wine Tram #8A43-FDE5", op: "Franschhoek Wine Tram", tone: "blush", color: "var(--clay-600)", detail: "Orange Line. Lead guest: Brid Walsh. 9 adults + 1 child. Departs Franschhoek Terminal 10:05 — arrive 15 mins early. Book estate restaurant lunches in advance. No BYO food or drink on estates.", confKey: "winetram" },
  { icon: "car", title: "Tuk-tuk wine tour", date: "Sun 5 Jul · 10:00", from: "Centre-Ville Guest House", to: "Valley estates (return)", ref: "Thula Travel tour", op: "Local operator", tone: "blush", color: "var(--clay-600)", detail: "Full-day guided tuk-tuk tour visiting hand-picked estates in the Franschhoek valley. Includes curated tasting at each stop and a winelands lunch.", confKey: "tuktuk" },
  { icon: "bus", title: "Franschhoek → CPT Airport", date: "Mon 6 Jul · 12:30", from: "Centre-Ville Guest House", to: "Cape Town International", ref: "EZ Shuttle #1967681", op: "EZ Shuttle", tone: "sage", color: "var(--accent)", detail: "Comfort Minibus (13 pax) departs Centre-Ville at 12:30 for the 16:40 Turkish Airlines TK0045. Allows time for check-in and duty-free.", confKey: "ez1967681" },
];

export const ITINERARY_DATA: {
  n: string;
  date: string;
  tag: string;
  tone: PillTone;
  title: string;
  body: string;
  color: string;
  tl?: { time: string; text: string }[];
}[] = [
  { n: "01", date: "Thu 25 Jun", tag: "Departure", tone: "plum", title: "Leaving Dublin", body: "Evening departure from Dublin (17:05) with Turkish Airlines TK1978, connecting through Istanbul. Arrive Istanbul 23:30.", color: "var(--accent-2)" },
  { n: "02", date: "Fri 26 Jun", tag: "Cape Town", tone: "sage", title: "Arrival & settling in", body: "Arrive Cape Town 11:50 on TK0044. EZ Shuttle transfer to The Bantry Aparthotel. Afternoon at leisure to find your feet — the Waterfront is a short walk away.", color: "var(--accent)" },
  { n: "03", date: "Sat 27 Jun", tag: "Cape Town", tone: "sage", title: "The city, your way", body: "Hop-on hop-off bus and a full-day Cape Town tour included. Explore at your own pace. Sunset harbour cruise in the evening.", color: "var(--accent)" },
  { n: "04", date: "Sun 28 Jun", tag: "Private tour", tone: "clay", title: "The road trip", body: "A full day down the Cape Peninsula with your private guide and coach.", color: "var(--primary)", tl: [{ time: "08:00", text: "Collection from hotel" }, { time: "09:00", text: "Chapman's Peak Drive" }, { time: "09:30", text: "Cape of Good Hope & Cape Point" }, { time: "12:00", text: "Packed lunch at Buffels Bay" }, { time: "13:00", text: "Boulders Beach — penguins" }, { time: "15:00", text: "Table Mountain cable car" }, { time: "17:30", text: "Return to hotel" }] },
  { n: "05", date: "Mon 29 Jun", tag: "Private tour", tone: "clay", title: "Urban Safari", body: "A full day exploring the city's history, culture and harbour with your private guide.", color: "var(--primary)", tl: [{ time: "08:30", text: "Collection from hotel" }, { time: "09:00", text: "Robben Island ferry (weather permitting)" }, { time: "12:30", text: "Lunch at Salt River Taproom" }, { time: "15:00", text: "Bo-Kaap, District Six & Woodstock" }, { time: "16:30", text: "Waterfront cruise (weather permitting)" }, { time: "18:30", text: "Return to hotel" }] },
  { n: "06", date: "Tue 30 Jun", tag: "Cape Town", tone: "sage", title: "Last Cape day", body: "Free time — shop the Old Biscuit Mill, revisit a favourite spot, or finally sit at the hotel pool. Last evening in Cape Town.", color: "var(--accent)" },
  { n: "07", date: "Wed 1 Jul", tag: "Addo", tone: "clay", title: "Into the bush", body: "04:30 shuttle to Cape Town airport. Safair FA0136 departs 06:05, arrives Gqeberha 07:25. Lodge transfer to Bellevue Forest Lodge. First afternoon game drive, dinner under the stars.", color: "var(--primary)" },
  { n: "08", date: "Thu 2 Jul", tag: "Addo", tone: "clay", title: "Full safari day", body: "Morning and evening game drives in search of the Big Five, a giraffe walking safari in between, and time to relax at camp. Elephant sightings almost guaranteed.", color: "var(--primary)" },
  { n: "09", date: "Fri 3 Jul", tag: "Addo → Franschhoek", tone: "amber", title: "To the winelands", body: "Final morning at the lodge. Lodge transfer to Gqeberha Airport at 12:30. Safair FA0031 departs 14:30, arrives CPT 15:55. Private transfer through to Franschhoek, arriving early evening.", color: "var(--amber-600)" },
  { n: "10", date: "Sat 4 Jul", tag: "Franschhoek", tone: "amber", title: "The wine tram", body: "All day on the Franschhoek Wine Tram — hop between estates, do as many or as few tastings as you like. Long winelands lunch is mandatory.", color: "var(--amber-600)" },
  { n: "11", date: "Sun 5 Jul", tag: "Franschhoek", tone: "amber", title: "Tuk-tuk wine tour", body: "Full-day guided tuk-tuk tour visiting hand-picked Franschhoek estates with curated tastings and a winelands lunch. Last evening in the village.", color: "var(--amber-600)" },
  { n: "12", date: "Mon 6 Jul", tag: "Homeward", tone: "plum", title: "Heading home", body: "Private transfer departs Centre-Ville at 13:00 for Cape Town Airport. Turkish Airlines TK0045 departs 16:40 via Istanbul. Arrive Dublin 09:35 Tuesday 7 July.", color: "var(--accent-2)" },
];

export const TIPS_DATA: { icon: string; title: string; body: string; color: string }[] = [
  { icon: "shirt", title: "Pack for winter", body: "June–July are Cape winter. Days are bright and clear but mornings and nights get cold — especially dawn drives at Addo. Layers are everything.", color: "var(--accent-2)" },
  { icon: "plug", title: "Bring the right plug", body: "South Africa uses its own large three-pin plug. Pack a universal adapter. A power bank is handy for load-shedding — your hotels have backup power.", color: "var(--primary)" },
  { icon: "mountain", title: "Time Table Mountain well", body: "The cable car closes in high wind. Go on the clearest, calmest morning rather than saving it for last. Blue sky and still air? Go immediately.", color: "var(--accent)" },
  { icon: "droplet", title: "Tap water is fine", body: "Safe to drink straight from the tap across Cape Town and the winelands — no need for bottled water.", color: "var(--accent)" },
  { icon: "credit-card", title: "Cards everywhere, cash for tips", body: "Tap-to-pay is standard everywhere. Keep some rand for tips: 10–15% in restaurants, a bit extra for guides and drivers.", color: "var(--amber-600)" },
  { icon: "waves", title: "Watch for whales", body: "From June, Southern Right whales arrive along the Cape coast. Keep an eye on the water during the peninsula drive.", color: "var(--accent-2)" },
  { icon: "shield-check", title: "No malaria at Addo", body: "Addo Elephant National Park is malaria-free — no antimalarials needed. Do carry your travel insurance details.", color: "var(--clay-600)" },
  { icon: "car", title: "They drive on the left", body: "Same as Ireland. Local SIMs and eSIMs are cheap and easy if you want mobile data.", color: "var(--ink-mute)" },
  { icon: "sun", title: "The winter sun deceives", body: "Even in July the Cape sun is strong. Pack high-SPF sunscreen — you'll be surprised how quickly you burn on a clear day.", color: "var(--primary)" },
];

export const PACKING_DATA: { name: string; icon: string; color: string; items: string[] }[] = [
  { name: "Documents", icon: "clipboard-list", color: "var(--accent)", items: ["Passport, valid well beyond travel", "This itinerary & e-tickets", "Travel insurance details", "Payment card + rand for tips"] },
  { name: "Clothing", icon: "shirt", color: "var(--accent-2)", items: ["Warm jacket or coat", "Jumpers & long-sleeve layers", "Scarf, hat and gloves — early mornings", "Comfortable walking shoes", "Smart-casual for winelands evenings"] },
  { name: "Safari (Addo)", icon: "binoculars", color: "var(--primary)", items: ["Neutral, earthy colours only", "Extra warm layer for dawn & dusk drives", "Binoculars", "Sunglasses & brimmed hat", "Camera with a spare battery"] },
  { name: "Health & tech", icon: "pill", color: "var(--amber-600)", items: ["Universal adapter (SA three-pin)", "Power bank", "High-SPF sunscreen", "Personal medication in original packaging", "Phone with offline maps or eSIM"] },
];

export const CONTACTS_DATA: { label: string; sub: string; num: string; color: string; icon: string }[] = [
  { label: "Gillian · Thula Travel", sub: "Your consultant · WhatsApp & calls", num: "[+44 xxx xxx xxxx]", color: "var(--accent)", icon: "user" },
  { label: "EZ Shuttle", sub: "All airport & city transfers · WhatsApp", num: "+27 21 376610", color: "var(--amber-600)", icon: "bus" },
  { label: "The Bantry Aparthotel", sub: "Cape Town · 26 Jun – 1 Jul", num: "021 035 0921", color: "var(--accent-2)", icon: "waves" },
  { label: "Bellevue Forest Lodge", sub: "Addo · 1–3 Jul", num: "[+27 42 xxx xxxx]", color: "var(--primary)", icon: "map-pin" },
  { label: "Centre-Ville Guest House", sub: "Franschhoek · 3–6 Jul", num: "[+27 21 xxx xxxx]", color: "var(--amber-600)", icon: "grape" },
  { label: "SA Emergency Services", sub: "Police, ambulance, fire", num: "112", color: "var(--clay-700)", icon: "siren" },
  { label: "SA Police (SAPS)", sub: "Non-emergency", num: "10111", color: "var(--clay-700)", icon: "shield" },
  { label: "Netcare 911", sub: "Private ambulance", num: "082 911", color: "var(--clay-700)", icon: "heart-pulse" },
  { label: "Irish Embassy · Pretoria", sub: "Consular assistance", num: "+27 12 452 1158", color: "var(--ink-mute)", icon: "landmark" },
];

export const DOCS_DATA: { label: string; val: string; color: string }[] = [
  { label: "Turkish Airlines ref (8 pax)", val: "SVIHB7", color: "var(--accent)" },
  { label: "Turkish Airlines ref (Linda & Rachel)", val: "SZLHXR", color: "var(--accent)" },
  { label: "EZ Shuttle ref · CPT arrival", val: "#1967680", color: "var(--amber-600)" },
  { label: "EZ Shuttle ref · CPT ↔ Franschhoek", val: "#1967681", color: "var(--amber-600)" },
  { label: "Kiff Kombi Tours · Private tour 28–29 Jun", val: "bookings@kiffkombitours.co.za", color: "var(--primary)" },
  { label: "Safair · CPT→PLZ", val: "FA0136", color: "var(--accent-2)" },
  { label: "Safair · PLZ→CPT", val: "FA0031", color: "var(--accent-2)" },
];

export const HEALTH_DATA: { icon: string; text: string }[] = [
  { icon: "check-circle", text: "Addo is malaria-free — no antimalarials needed" },
  { icon: "pill", text: "Keep personal medication in original packaging" },
  { icon: "cross", text: "Nearest hospital to Bantry: Netcare Christiaan Barnard Memorial" },
  { icon: "cross", text: "Nearest hospital to Addo: Netcare Port Elizabeth Hospital" },
  { icon: "cross", text: "Nearest hospital to Franschhoek: Stellenbosch Hospital" },
  { icon: "credit-card", text: "Keep travel insurance details accessible at all times" },
  { icon: "sun", text: "Use sunscreen daily — the Cape sun is deceptively strong" },
  { icon: "droplet", text: "Tap water is safe to drink throughout the trip" },
];

export type Confirmation = {
  title: string;
  supplier: string;
  contact: string;
  trips: { label: string; details: string[] }[];
};

export const CONFIRMATIONS: Record<string, Confirmation> = {
  ez1967680: {
    title: "EZ Shuttle · Reservation #1967680",
    supplier: "EZ Shuttle (Pty) Ltd",
    contact: "info@ezshuttle.co.za · +27 21 376610 · WhatsApp available",
    trips: [
      { label: "Trip 1 · PNR E5AE3QZL", details: ["Pickup: Friday 26 Jun @ 11:50", "From: Cape Town International Airport", "To: The Bantry Aparthotel", "Flight: TK0044", "Vehicle: Comfort Minibus (13 pax) + Trailer"] },
      { label: "Trip 2 · PNR 0TQ4ODMG", details: ["Pickup: Wednesday 1 Jul @ 04:30", "From: The Bantry Aparthotel", "To: Cape Town International Airport", "Vehicle: Comfort Minibus (13 pax) + Trailer"] },
    ],
  },
  ez1967681: {
    title: "EZ Shuttle · Reservation #1967681",
    supplier: "EZ Shuttle (Pty) Ltd",
    contact: "info@ezshuttle.co.za · +27 21 376610 · WhatsApp available",
    trips: [
      { label: "Trip 1 · PNR FL3RPH2Z", details: ["Pickup: Friday 3 Jul @ 15:55", "From: Cape Town International Airport", "To: Centre-Ville Guest House, Franschhoek", "Flight: FA31", "Vehicle: Comfort Minibus (13 pax) + Trailer"] },
      { label: "Trip 2 · PNR TEFZTC73", details: ["Pickup: Monday 6 Jul @ 12:30", "From: Centre-Ville Guest House", "To: Cape Town International Airport", "Vehicle: Comfort Minibus (13 pax) + Trailer"] },
    ],
  },
  kiffkombi: {
    title: "Kiff Kombi Tours · Private tour",
    supplier: "Kiff Kombi Tours",
    contact: "bookings@kiffkombitours.co.za",
    trips: [
      { label: "Day 1 · Sunday 28 Jun", details: ["Private tour for 9 adults + 1 child", "Route: Chapman's Peak → Cape of Good Hope → Cape Point → Boulders Beach → Table Mountain", "Private vintage kombi — no shared transport"] },
      { label: "Day 2 · Monday 29 Jun", details: ["Private tour for 9 adults + 1 child", "Route: Robben Island ferry → Bo-Kaap → District Six → Woodstock → V&A Waterfront cruise", "Private vintage kombi — no shared transport"] },
    ],
  },
  citysightseeing: {
    title: "City Sightseeing Cape Town",
    supplier: "City Sightseeing South Africa",
    contact: "+27 21 511 6000 · 36 Auckland Street, Paarden Eiland, Cape Town",
    trips: [
      { label: "Classic Hop-on-Hop-off · Ref FWTGDJ25", details: ["Date: Saturday 27 Jun", "9 adults + 1 junior", "Lead guest: Brid Walsh", "Valid all day — board at any stop", "Key stops: V&A Waterfront, Bo-Kaap, Signal Hill, Camps Bay, Sea Point"] },
    ],
  },
  winetram: {
    title: "Franschhoek Wine Tram",
    supplier: "Franschhoek Wine Tram",
    contact: "bookings@winetram.co.za",
    trips: [
      { label: "Orange Line · Ref #8A43-FDE5", details: ["Date: Sunday 5 Jul · Departs 10:05", "Lead guest: Brid Walsh", "9 adults + 1 child", "Starts & ends: Franschhoek Terminal", "Complimentary shuttle to Groot Drakenstein Terminal included", "Arrive 15 mins early to collect tickets", "No BYO food or drink on estates", "Book estate restaurant lunches in advance"] },
    ],
  },
  tuktuk: {
    title: "Tuk Tuk Franschhoek · Half day wine tour",
    supplier: "Tuk Tuk Franschhoek (Le Tuksi Bleu Pty Ltd)",
    contact: "+27 72 735 3035 · info@tuktukfranschhoek.co.za · Le Petit Manoir, 54 Huguenot Road, Franschhoek",
    trips: [
      { label: "Half Day Tour · Booking ID 2394558", details: ["Date: Saturday 4 Jul · Pickup 14:00", "Pickup from: Centre-Ville Guesthouse", "9 adults + 1 child (10–16)", "Visits 3 estates of your choice (1 hour each)", "Tastings, lunch and drinks NOT included — pay at each estate", "Keep your Tuk Tuk sticker visible for discounts", "Booked by: Thula Travel on behalf of Brid Walsh"] },
    ],
  },
  tropicana: {
    title: "The Bantry Aparthotel · Reservation #8739",
    supplier: "The Bantry Aparthotel (Perch Stays)",
    contact: "tropicana@perchstays.co.za · 021 035 0921 · perchstays.co.za",
    trips: [
      {
        label: "Accommodation · 26 Jun – 1 Jul",
        details: [
          "Property: The Bantry Aparthotel",
          "Address: Kloof Road 6, Sea Point 8005",
          "Check-in: 26 June 2026 · Check-out: 1 July 2026",
          "1 × Studio Superior B&B + 4 × Studio Standard B&B",
          "Reservation: #8739",
          "Note: No parking on site — street parking surrounds the hotel",
        ],
      },
      {
        label: "Rooming list",
        details: [
          "Room 1: Brid Walsh & Louise Heffron",
          "Room 2: Siobhan & Vincent Buckley",
          "Room 3: Gavin Walsh (12) & Ellie Munnelly — Twin Beds",
          "Room 4: Harry & Bernadette Dickinson",
          "Room 5: Linda & Rachel Ryan — Twin Beds",
        ],
      },
    ],
  },
  centreVille: {
    title: "Centre-Ville Guest House",
    supplier: "Centre-Ville Guest House · Morné",
    contact: "info@centre-ville.co.za",
    trips: [
      {
        label: "Accommodation · 3–6 July",
        details: ["Property: Centre-Ville Guest House, Franschhoek", "Check-in: 3 July 2026 · Check-out: 6 July 2026", "5 rooms · Bed & Breakfast"],
      },
      {
        label: "Rooming list",
        details: [
          "Room 1: Brid Walsh & Louise Heffron",
          "Room 2: Siobhan & Vincent Buckley",
          "Room 3: Gavin Walsh (12) & Ellie Munnelly — Twin Beds",
          "Room 4: Harry & Bernadette Dickinson",
          "Room 5: Linda & Rachel Ryan — Twin Beds",
        ],
      },
      {
        label: "Restaurant reservation confirmed",
        details: ["Frank's Corner — Sunday 5 July at 19:00", "Booked directly by Centre-Ville"],
      },
    ],
  },
};

export const SUGGESTED_PROMPTS = [
  "Good dinner near Franschhoek tonight?",
  "Is it safe to walk in Sea Point at night?",
  "What should I wear on the safari drive?",
];

// Canned demo answers standing in for the live ThulaGPT integration.
// ThulaGPT lives at: https://chatgpt.com/g/g-p-68f0c28c45688191ba31189e2a5f9cc8-thulagpt/project
// That's a ChatGPT "project" URL, built for a logged-in human in the ChatGPT
// UI — it has no public API endpoint, so this in-app chat can't call it
// directly from client-side code. Two real integration paths:
//  1) Recreate ThulaGPT's system prompt/knowledge as a call to the OpenAI
//     Assistants/Chat Completions API (or Claude) from a small backend,
//     passing this trip's context (dates, destinations, hotel, itinerary)
//     each turn so answers stay trip-specific.
//  2) Keep ThulaGPT as-is and deep-link out to it (done below) for
//     clients happy to use ChatGPT directly.
// Until wired to a real model, runFakeConcierge() below stands in.
const CANNED_ANSWERS: { match: RegExp; reply: string }[] = [
  { match: /dinner|restaurant|eat|food/i, reply: "For tonight, book Foliage or Reuben's in Franschhoek — both walkable from Centre-Ville. Ask for the terrace table if it's clear.\n\nWant me to have Gillian call ahead and book it for you?" },
  { match: /safe|safety|walk/i, reply: "Sea Point's Beach Road is well-lit and busy even after dark, so it's generally fine. Stick to the main promenade rather than side streets, and keep valuables out of sight in the car." },
  { match: /wear|pack|clothes|cold/i, reply: "Mornings at Addo are properly cold — layer up, you'll be glad of a fleece and gloves in the open safari vehicle. It warms quickly by mid-morning." },
  { match: /whale|wildlife|animal/i, reply: "Great timing — whale season's just starting. Keep an eye on the water during the Chapman's Peak drive." },
];

export function runFakeConcierge(question: string): string {
  const hit = CANNED_ANSWERS.find((a) => a.match.test(question));
  return hit
    ? hit.reply
    : "Great question — I'll check with your local guide and get back to you shortly. Anything urgent is best sent straight to Gillian via WhatsApp.";
}

export const THULAGPT_URL = "https://chatgpt.com/g/g-p-68f0c28c45688191ba31189e2a5f9cc8-thulagpt/project";
