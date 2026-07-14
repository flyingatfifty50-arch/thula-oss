# Handoff: Thula OS — Travel Agency SaaS Platform

## Overview
Thula OS is a multi-tenant SaaS product for boutique travel advisors/agencies. It replaces spreadsheets, email threads and one-off PDFs with: (1) a business console for the agency staff, (2) an auto-generated branded client portal + per-trip app for each traveller, and (3) a public marketing/landing page for acquiring new agency customers. This bundle also includes the original "Thula Travel" single-agency artifacts (a live example: Brid Walsh's South Africa trip) that inspired the product and can serve as the flagship demo tenant.

## About the Design Files
The files in this bundle are **design references created in HTML** (Claude "Design Components" — plain HTML/CSS/JS with a small templating runtime). They are prototypes showing intended look, layout, copy and click-through behavior — **not production code to copy directly**. All data shown (Brid Walsh, The Naidoos, M. Osei, dollar amounts, invoices, etc.) is **hardcoded sample data** for demonstration; nothing persists.

The task is to **recreate these HTML designs in a real product codebase** — recommended stack: React/Next.js frontend, Postgres via Supabase (or similar) for data + auth, Stripe for subscription billing, deployed on Vercel or similar. If the target repo already has an established stack/component library, use that instead and match its patterns; these files are the visual/UX spec, not the implementation.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy and layout are final/production-intent, drawn from the bound "Thula Travel" design system (see Design Tokens below). Recreate pixel-close using the target codebase's component patterns. Interaction flows (which screen a click leads to, what toggles what) are also final intent, not just illustrative — implement the same navigation logic, backed by real state instead of the prototype's local component state.

## Product Architecture (3 surfaces + 1 acquisition page)

### 1. Thula OS — Business Console (`Thula OS.dc.html`)
The core paid product. Multi-tenant: each subscribing agency logs in to their own workspace.

**Screens / Views:**
- **Login** — email + password fields (currently decorative), "Sign in" button, "Start a free trial" link. Full-bleed dark green (`--deep` / #317653) background, centered white card, `--r-lg` radius, `--shadow-lg`.
- **App shell** — persistent left sidebar (220px, dark green `--deep` background) + main content area (flex:1, 36px/44px padding). Sidebar has two grouped nav sections: **Business** (Clients, Templates, Payments, Suppliers, Documents) and **Account** (Billing, Team, Settings), each item an icon (Lucide, 15px) + label button; active item gets `rgba(251,244,233,0.14)` background and bold text. Sign-out pinned to sidebar bottom.
- **Clients** (default landing screen) — page header with "+ New trip" button (navigates to New Trip Builder); a **Command Centre priorities panel** (NEW) — sage-tinted card headed "Today's priorities" surfacing AI-recommended actions (e.g. "Follow up on Vietnam deposit — quote opened 4 times, no reply in 6 days — 87%"), each row clickable straight into that client's record; 4-stat summary row (Live trips, In planning, Pipeline value, Seats used) as cards; a table of clients (Client / Stage / Value / Due / duplicate-icon-button columns) — clicking a row opens Client Detail, clicking the duplicate icon (stopPropagation'd) triggers a "duplicate this trip as a new draft" action.
- **Templates** (NEW) — grid of 3 template cards (South Africa Classic, Kenya Safari, Italy Classic), each with a gradient header swatch, name, meta line, and "Use as template" button that jumps to New Trip Builder. Purpose: let an agency clone a past itinerary structure instead of starting from a blank trip.
- **New Trip Builder** (NEW) — back-link to Clients; form card with Client name + Destination fields, then three "add" sections (Flights / Hotels / Day-by-day plan) each rendered as a dashed-border "+ Add a flight/hotel/day" affordance (in the real product these expand into repeatable row forms), and a primary "Generate client app & site" button at the bottom. This is the auto-generation entry point — filling this form and submitting should programmatically produce that client's Client Portal trip + the standalone White Label Trip App/Website content.
- **Client Detail** — back-link; client name + one-line detail; 3 stat cards (Value, Margin, Balance due); an actions row: "Send via WhatsApp" (green #25D366 pill button, `message-circle` icon — should deep-link to WhatsApp Web/API with a pre-filled message and the client's portal link), "Export PDF" (neutral pill, `file-down` icon — should trigger a server-rendered PDF export of the itinerary), and a toggle pill "Public preview: on/off" (`link` icon — controls whether a no-login public URL for this trip is enabled; toggling flips its own background/text color between sage-tinted-on and neutral-off). A **Client DNA profile card** (NEW) — traveller type, lifetime value, and "Loves"/"Avoids" preference Pills, giving staff instant context before any call or message. A **Pre-departure AI checks card** (NEW) — checklist of automated-style verifications (passport validity, travel insurance on file, visa requirements, outstanding balance) each with a status Pill (Verified/sage, Due/amber, Overdue/clay) — modeled after the "AI Operations Manager" concept of catching what's missing before a trip departs. Below: a "Linked records" card listing the client dashboard link, document count, and supplier count.
- **Client journey guide** (NEW, own sidebar item under Workflow) — a step-by-step 6-stage playbook (Discovery call → Build the proposal → Send the invoice → Confirm & hand over → Balance & final details → Welcome home) for staff to follow with every client, each step as a numbered card with a short description. Below it, a **Message templates** library — four ready-to-send, expandable templates (Discovery call script, Deposit invoice email, Thank you & handover, Welcome home message) with realistic copy and a "Copy template" button — meant to be the actual scripts/emails a consultant sends at each journey stage.
- **Tasks** (NEW, under Workflow) — a 3-column kanban board (To do / In progress / Done) of work items, each card showing title, client Pill, and a due-date label; a Workflow nav badge shows the open task count.
- **Activity** (NEW, under Workflow) — a reverse-chronological feed of business events (payments received, tasks completed, documents uploaded, new clients, itinerary edits), each with an icon, description and relative timestamp — the "what happened while I was away" view.
- **Payments** — table of Client / Amount / Type / Status (Pill component colored by status: sage=Paid, amber=Due/Pending, clay=Overdue), each row's "View" button opening that record in the invoice screen; "+ New invoice" button in the header.
- **Invoice (new/view)** (NEW) — a real invoice generator: back-link to Payments; heading + invoice number, with a link into the related client's record when applicable; action buttons "Export PDF" and "Send to client"; a "Bill to" + "Due date" field pair; a line-items table (Description/Qty/Unit price/Line total) with an "+ Add line item" affordance; a computed summary (Subtotal, Deposit due now at a %, Total due) and a status Pill. This is the piece that closes the CRM-vs-Dubsado invoicing gap — Payments now links to real, itemized invoices instead of just tracking amounts.
- **Suppliers** — 2-column grid of supplier cards: name, type + region, commission %, and (NEW) "Linked to N invoices · €X earned" line — ties commission tracking to actual invoice records rather than being a static reference field.
- **Documents** — table of Document (icon + filename) / Client / Type.
- **Billing** — current plan card (Studio, €79/mo, seats used), Upgrade/Manage-seats buttons, recent invoices list.
- **Team** — list of team members (avatar initial, name, email, role Pill), "+ Invite consultant" button.
- **Settings** — key/value rows for Agency name, Brand palette.

### 2. Thula Client Portal (`Thula Client Portal.dc.html`)
Traveller-facing surface, separate login/chrome from the business console (this is what an agency's own clients use).
- **Login** — passwordless-style: email field + "Send me a login link" button.
- **Trips home** — welcome message, live trip card (click → Trip Detail), "Past trips, kept forever" gallery of prior trips as photo-gradient tiles, each tagged "Journal" and clickable → Trip Journal.
- **Trip Detail** — grid of quick links (Flights/Hotels/Itinerary/Emergency) with icon + label + sub-label; note pointing to the full mobile trip app for complete detail; a "View trip journal" button (sage pill, `map` icon) that opens the Trip Journal for the live trip, noting it "fills in as you travel."
- **Trip Journal** (NEW — Polarsteps-style trip recap) — the product's answer to Polarsteps: back-link to Trips; trip title; a 4-stat row (Regions/Days/Photos/Distance travelled); a simple route map (SVG, dashed path connecting pin markers — in production this should be a real map, e.g. Mapbox/Leaflet, plotting the traveller's actual stops or GPS-logged route); then a vertical "Along the way" timeline of entries, each a photo + place name + date + short caption. For a **live/upcoming** trip this starts empty ("fills in as you travel"); for **past** trips it shows the full recap. This is intended to auto-populate during travel (e.g. from location check-ins or photo uploads via the mobile app) rather than being manually written by the agency.
- **Account** — avatar, name/email, trip-preference Pills, notification toggles (WhatsApp reminders, Email updates).
- **Thula Concierge** (NEW) — an in-trip AI chat screen, reachable via a floating "Ask Thula" button on Trips home and a button on Trip Detail. Shows a welcome message, a scrolling message thread (user bubbles right-aligned/primary color, assistant bubbles left-aligned/sand), 3 tappable suggested prompts (restaurant, safety, packing questions), a message input + send button, and a "Thinking…" state. Also present as its own tab ("Ask Thula") in the mobile `Thula Travel App.dc.html`. **Currently answers from a small hardcoded canned-response set (`CANNED_ANSWERS`/`runFakeConcierge()` in the logic class)** — matches keywords like "dinner", "safe", "wear", "whale" to a scripted reply, falling back to a generic "I'll check and get back to you" message. A "Prefer ThulaGPT directly? Open it here" link deep-links out to the founder's existing ChatGPT project (see ThulaGPT Integration below) as a stopgap.

## ThulaGPT Integration (must resolve before launch)
The founder has an existing custom GPT, **ThulaGPT**, at `https://chatgpt.com/g/g-p-68f0c28c45688191ba31189e2a5f9cc8-thulagpt/project`. That URL is a ChatGPT "project" built for a logged-in human inside the ChatGPT UI — **it has no public API endpoint**, so the in-app Concierge screens cannot call it directly from client-side (or even server-side) code as-is. Two real paths to make the Concierge screen actually work, roughly in order of effort:
1. **Recreate ThulaGPT server-side.** Pull ThulaGPT's system prompt / instructions / custom knowledge (the founder has these, they authored it in the GPT Builder) and re-implement them as a proper API call — either OpenAI's Chat Completions/Assistants API using the same prompt, or Anthropic's Claude API — from a small backend endpoint the Concierge screen calls. Pass that trip's context (destination, dates, hotel, itinerary day, and any Client DNA preferences) as system/context input each turn so answers stay trip-specific rather than generic. This is the only path that gives a genuinely first-party, on-brand, in-app AI experience.
2. **Keep linking out to ChatGPT.** Leave the existing "Open ThulaGPT" deep link as the real interaction, and treat the in-app chat UI as a lightweight FAQ/canned-response layer only (its current state). Lower effort, but travelers leave the branded app to get real answers, and there's no trip-specific context passed automatically.
Recommendation: ship with path 2 live (already wired), and treat path 1 as the concierge's real v1 backend build — it is the single highest-leverage AI feature in the product per the founder's own "AI Operations Manager"/concierge vision, and worth prioritizing early rather than as a "nice-to-have."

**Product positioning for Trip Journal:** this is a genuine differentiator vs. every competitor researched (TravelJoy, Travefy, mTrip, Ezus) — none of them offer a post/during-trip memory-keeping experience, they stop at pre-trip itinerary delivery. Standing this feature up turns the Client Portal from "a place to check your itinerary" into "a place travellers want to return to," which is what drives repeat engagement and word-of-mouth for the agency. It can ship as part of Thula OS itself, or as a lightly-coupled companion app (own URL, shared auth/data) if you'd rather ship it on its own release cadence — either is architecturally fine since it just reads the same Trip data.

**What real GPS/photo capture requires (not modeled in the prototype):** a companion mobile experience (or PWA) that requests location permission and periodically logs coordinates during the trip, plus a photo upload flow (camera roll or in-app camera) tagged with location + timestamp. The web Trip Journal screen above is the *viewer* for that data — the *capture* mechanism is a separate, mobile-native concern to scope as its own workstream.

### 3. Thula OS Landing Page (`Thula OS Landing Page.dc.html`)
Public marketing page for acquiring agency customers (not logged-in product).
- Sticky nav (Wordmark + Features/Pricing links + "Join waitlist" CTA).
- Hero (dark green, centered, headline + subhead + CTA).
- Product screenshot mock (fake browser-less console preview).
- 3-feature grid: Business console / Branded client portal / Trip app.
- Pricing: 3 tiers — Starter €29/mo (3 clients, 1 seat), Studio €79/mo (15 clients, 5 seats, "Most popular" badge), Agency €199/mo (unlimited, custom domain, priority support).
- Waitlist email-capture section.
- Simple footer.

### Reference: Original single-agency artifacts (bundled for context)
These are the flagship demo content Thula OS is built to generalize. Recreate them as the *output* your "Generate client app & site" flow produces, not as separate static pages:
- `Thula Travel App.dc.html` — mobile-first tabbed itinerary app (Home/Flights/Hotels/Transfers/Plan/Tips/SOS) for one specific trip (Brid Walsh, South Africa).
- `Thula Travel Client Website.dc.html` — desktop single-page marketing/handoff site for the same trip.
- `White Label Trip App.dc.html` / `White Label Trip Website.dc.html` — genericized versions of the above with agency name, accent color, consultant/client names, and dates exposed as swappable fields (`agencyName`, `accentColor`, `consultantName`, `clientName`, `groupSize`, `destinationLine1/2`, `dateRange`). **This prop shape is the intended data model for what New Trip Builder should produce per client.**
- `Thula Travel HQ.dc.html` — the original internal Notion-style ops hub this whole system was derived from; useful for cross-referencing any copy/structure not otherwise covered above.

## Interactions & Behavior
- All navigation is client-side, single-page, state-driven (no real routing in the prototype) — implement as real routes (e.g. `/app/clients`, `/app/clients/:id`, `/app/templates`, `/app/new-trip`, `/app/payments`, etc.) in the real app, with the sidebar highlighting the active route.
- Client Detail's "Public preview" toggle is local-only in the prototype; in production this should persist a public/unlisted flag on the trip record and generate/revoke a shareable no-login URL.
- "Send via WhatsApp" should open `https://wa.me/<phone>?text=<encoded itinerary link + short message>` (or the WhatsApp Business API if available) — phone number should come from the client record.
- "Export PDF" should hit a server endpoint that renders the client's itinerary (same content as their portal) to PDF — reuse the `doc_page`-style print layout patterns visible in the itinerary/day-by-day sections.
- "Use as template" / "+ New trip" both land on the same New Trip Builder screen; when launched from a template, the form should pre-fill with that template's flights/hotels/day-plan rather than blank.
- Duplicate-client icon button must stop click propagation so it doesn't also trigger "open client detail" (see `e.stopPropagation()` pattern in the source).
- No animations beyond what's implied by standard hover/press states from the design system tokens (see below) — keep motion subtle (240ms, soft ease-out).

## State Management
Suggested real data model (derived from the prototype's local state + the white-label prop shape):
- `Agency` (tenant): id, name, plan (Starter/Studio/Agency), seat count, brand accent color, custom domain (Agency plan only).
- `User` (staff): id, agency_id, name, email, role (Owner/Consultant).
- `Client` (traveller/customer of the agency): id, agency_id, name, email, phone, preferences (tags), notification settings.
- `Trip`: id, agency_id, client_id, destination_line_1/2, date_range, group_size, status (Draft/Live/Overdue/Completed), value, margin, balance_due, public_preview_enabled (bool), template_source_id (nullable FK to a prior Trip used as template).
- `Flight`, `Hotel`, `ItineraryDay`: child records of Trip, matching the fields already modeled in `Thula Travel App.dc.html`'s data arrays (FLIGHTS_DATA, HOTELS_DATA, ITINERARY_DATA shapes).
- `Document`: id, trip_id, filename, type, file URL.
- `JournalEntry` (NEW): id, trip_id, place_name, lat, lng, entry_date, caption, photo_url(s), source (manual / auto-location / photo-upload).
- `Task` (NEW): id, agency_id, trip_id (nullable), title, status (todo/in_progress/done), due_date, assignee_id.
- `ActivityEvent` (NEW): id, agency_id, trip_id (nullable), type (payment/task/document/client/itinerary), text, created_at — powers the Activity feed; can be a derived/denormalized log table populated by triggers on the other tables rather than hand-written.
- `ClientDNA` (NEW, likely fields on `Client` rather than a separate table): traveller_type, lifetime_value (derived from summed Trip values), preference_tags (likes/dislikes arrays).
- `PredepartureCheck` (NEW): id, trip_id, label, status (verified/due/overdue), due_date — could be computed rules (e.g. passport expiry < trip date + 6 months) rather than a manually-maintained table where possible.
- `ChatMessage` (NEW, for Concierge): id, trip_id, from (user/assistant), text, created_at — once wired to a real model (see ThulaGPT Integration), also store which backend/model answered for auditability.
- `Supplier`: id, agency_id, name, type, region, commission_rate.
- `Invoice`: id, trip_id, supplier_id (nullable), amount, type (Deposit/Balance), status (Paid/Pending/Due/Overdue), due_date.
- `Payment`/billing records for the agency's own subscription (Stripe customer/subscription IDs).

State transitions:
- New Trip Builder submit → creates Trip + child Flight/Hotel/ItineraryDay records → generates a Client Portal entry + a shareable White-Label-style app/site for that trip (reuse the White Label Trip App/Website prop shape as the render input).
- Duplicate action → clones a Trip's flights/hotels/itinerary into a new Draft Trip for a new (or existing) client.
- Public preview toggle → flips `public_preview_enabled` and issues/revokes a signed public URL.

## Design Tokens
Sourced from the bound Thula Travel Design System (`_ds/` folder in this project) — do not invent new values.
- **Primary accent used throughout this SaaS build: `#317653`** (a deep sage green — overrides the design system's default chilli-red primary for this product's own brand identity; the red/gold/blue flag palette remains available via CSS custom properties for the underlying design system if needed elsewhere).
- Type: headings in the script/display face (`--font-script`, substitute "Dancing Script"), body/functional text in `--font-serif` (substitute "Lora").
- Radii: `--r-sm` (small), `--r-md` (cards), `--r-lg` (hero panels/modals), `--r-pill` (999px, all buttons/tags/inputs).
- Shadows: `--shadow-sm` / `--shadow-md` / `--shadow-lg`, warm/espresso-tinted, never grey.
- Borders: `--line` (hairline sand `#E4D5C0`), `--line-soft` (lighter variant for internal row dividers).
- Surfaces: `--paper` (page bg), `--sand` (tonal section bg), `--card` (`#FFFBF4`).
- Status colors via the design system's `Pill` component `tone` prop: `sage` (positive/live/paid), `amber` (pending/draft/due), `clay` (overdue/negative).
- Icons: Lucide (`lucide@0.469.0`), 1.75 stroke, rounded — icon names used are standard Lucide glyph names (e.g. `users`, `credit-card`, `handshake`, `file-text`, `copy`, `message-circle`, `file-down`, `link`, `log-out`, `map-pin`, `plane`, `bed-double`, `calendar-days`, `lightbulb`, `life-buoy`).
- WhatsApp green `#25D366` is a one-off brand-accurate exception used only on the WhatsApp action button, not part of the design system palette.

## Assets
No custom illustrations/photography — hotel imagery in the Client Website uses Unsplash stock photo URLs (should be replaced with each agency's real property photography in production). Gradient placeholder swatches (`var(--fig-fynbos)`, `var(--fig-savanna)`, etc.) are design-system-provided placeholder gradients standing in for real photography; replace with real images per trip/template once available. The `Wordmark` and `Pill`/`Icon` components are design-system components loaded via `_ds_bundle.js` — do not recreate their visuals from scratch, recreate their *appearance* using the target codebase's own component library, matching colors/type/spacing documented above.

## Competitive landscape (as of mid-2026)
Researched for context — do not copy any competitor's UI, only their positioning:
- **TravelJoy** (~$19–32/mo) — CRM + itinerary builder + payments for solo advisors. No white-label mobile app.
- **Travefy** (~$31–49/mo) — the market leader for hosted advisors; itinerary/proposal builder + CRM + website builder. Its **traveler-facing app is multi-tenant and shows the Travefy brand, not the agency's** — a known limitation for advisors who care about brand identity.
- **Ezus** (custom pricing) — fuller CRM/production/financial suite aimed at growing agencies (5–15 people) and DMCs, more complex than Thula OS needs to be at launch.
- **TripCreator** (~$69/mo), **Tourwriter** (~$111/mo) — itinerary/tour-building tools for DMCs and tour operators, priced and scoped above the boutique-solo-advisor market.
- **mTrip** (premium/custom) — the closest true competitor on **white-label branding**: agency's own app name, logo, colors, and web domain, no "powered by" branding visible to the traveler. This is priced and positioned for larger operators, not solo/boutique advisors.
- **Tern, TripSuite, ClientBase, VacationCRM** — narrower point solutions (CRM-only or back-office/accounting-only).

**Where Thula OS should sit:** the gap in this market is a **fully white-label, boutique-affordable** product — TravelJoy/Travefy's price point and ease of use, combined with mTrip's actual brand ownership (not just an accent color). That combination doesn't currently exist below mTrip's enterprise pricing tier. Full white-labeling (below) is the product's core differentiator, not a nice-to-have.

## White-Labeling Requirements (must-build, not optional)
Every subscribing agency must be able to fully rebrand both traveler-facing surfaces so their own clients never see "Thula" anywhere:
- **Business console** (`Thula OS.dc.html`) can stay Thula-branded — it's an internal tool for the agency's own staff, seeing the Thula logo there is fine (like Shopify admin still says "Shopify").
- **Client Portal** (`Thula Client Portal.dc.html`) and **every generated trip app/site** (`White Label Trip App.dc.html` / `White Label Trip Website.dc.html` shape) must be **fully re-skinned per agency**: their own logo/wordmark (image upload, not just a text name), their own accent color (already modeled as `accentColor` in the white-label prop shape — extend to a small palette: accent + a secondary/highlight color), their own business name throughout, and ideally their own custom domain or subdomain (e.g. `trips.acmetravel.com` or `acmetravel.thulaos.com`) so the URL itself carries no Thula branding.
- Add an **Agency Branding** settings screen (extend the existing Settings screen in Thula OS) where an agency admin uploads a logo, picks accent/secondary colors from a small curated set (or a color picker), sets their public-facing business name, and configures their custom domain/subdomain — this should be self-serve, no code or design work required per agency.
- Data model addition: `Agency.branding = { logoUrl, accentColor, secondaryColor, publicName, domain }`, read by the Client Portal and per-trip app renderer at request time.
- The **Landing Page** (`Thula OS Landing Page.dc.html`) is Thula OS's own acquisition page and stays Thula-branded — it is not white-labeled (it's marketing the platform itself to agencies, not shown to travelers).

## Suggested Build Order (for Claude Code / a developer)
1. **Foundation**: repo scaffold (Next.js + Supabase or equivalent), auth (real login/signup, replacing the prototype's decorative fields), multi-tenant data model (Agency/User/Client/Trip + child tables from the State Management section above).
2. **Core console loop**: Clients list → Client Detail → New Trip Builder (even with minimal flight/hotel/day sub-forms at first) → persists a real Trip record.
3. **Agency Branding settings** (see White-Labeling Requirements) — build this early since Client Portal and per-trip apps depend on it.
4. **Client Portal**: real passwordless login (magic link email), trips list, trip detail pulling from the same Trip data New Trip Builder created.
5. **Per-trip generated app/site**: render the White Label Trip App/Website templates using a given Trip's data + its Agency's branding — this is the "generate client app & site" action from New Trip Builder.
6. **Billing**: Stripe subscription integration for the agency's own plan (Starter/Studio/Agency tiers as priced on the Landing Page).
7. **Secondary features**: Templates (clone-trip), duplicate-trip action, Payments/Suppliers/Documents screens, Team invites.
8. **Nice-to-haves**: WhatsApp send integration, PDF export, public preview links, custom domains per agency, Trip Journal (real map + photo/location capture — treat as its own workstream given the mobile-native capture requirement).
9. **Concierge backend**: build the real ThulaGPT-equivalent API integration (see ThulaGPT Integration section) — replace `runFakeConcierge()`'s canned responses with a real model call, passing trip context. Prioritize this soon after step 5 since it's a core differentiator, not launch-blocking polish.
10. **Command Centre intelligence**: the Clients screen's "Today's priorities" panel and the Client Detail "Pre-departure AI checks" are currently hardcoded sample data (`PRIORITIES_DATA`, `CHECKS_DATA` in the logic class) — replace with real rules/triggers (e.g. "no reply in N days on an opened quote", "passport expiry within trip date + 6 months", "balance due date approaching") once real data exists to compute them from.
9. **Landing Page**: connect the waitlist form to a real mailing list/CRM (e.g. simple email capture to start).

Build in roughly this order so there's a working, demoable product (one agency, one client, one trip, branded) as early as step 5 — everything after that is depth and polish, not core-loop risk.

## Files
- `Thula OS.dc.html` — business console (primary product surface to build first)
- `Thula Client Portal.dc.html` — traveller-facing portal
- `Thula OS Landing Page.dc.html` — public marketing/waitlist page
- `Thula Travel App.dc.html` — reference: single-trip mobile app (the per-trip output)
- `Thula Travel Client Website.dc.html` — reference: single-trip desktop site (the per-trip output)
- `White Label Trip App.dc.html` — reference: genericized per-trip app template with the prop/data shape New Trip Builder should target
- `White Label Trip Website.dc.html` — reference: genericized per-trip site template, same prop shape
- `Thula Travel HQ.dc.html` — reference: original internal ops hub this system replaces/formalizes
