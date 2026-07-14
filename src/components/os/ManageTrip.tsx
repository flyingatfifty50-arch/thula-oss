"use client";

import { useRef } from "react";
import { Icon } from "@/lib/icons";
import { addFlight, deleteFlight, addHotel, deleteHotel, addItineraryDay, deleteItineraryDay } from "@/app/os/app/clients/[id]/trip-actions";

type Flight = { id: string; carrier: string | null; date_label: string | null; code: string | null; from_code: string | null; from_city: string | null; to_code: string | null; to_city: string | null; dep: string | null; arr: string | null };
type Hotel = { id: string; name: string | null; loc: string | null; dates: string | null; board: string | null; description: string | null; url: string | null };
type ItineraryDay = { id: string; day_number: string | null; date_label: string | null; tag: string | null; title: string | null; body: string | null };

const inputStyle: React.CSSProperties = { border: "1.5px solid var(--line)", borderRadius: 8, padding: "8px 10px", fontSize: "0.83rem", fontFamily: "inherit" };
const smallBtn: React.CSSProperties = { background: "var(--sand)", border: "1px dashed var(--line)", borderRadius: 8, padding: "8px 14px", color: "var(--fg2)", fontSize: "0.82rem", cursor: "pointer", whiteSpace: "nowrap" };
const deleteBtn: React.CSSProperties = { background: "none", border: "none", color: "var(--fg3)", cursor: "pointer", padding: 4, flexShrink: 0 };
const rowStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--line-soft)", fontSize: "0.87rem", color: "var(--fg1)", gap: 10 };

export function ManageFlights({ clientId, tripId, flights }: { clientId: string; tripId: string; flights: Flight[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Flights</div>
      {flights.map((f) => (
        <div key={f.id} style={rowStyle}>
          <span>
            {f.carrier} {f.code} · {f.from_code} → {f.to_code} · {f.date_label} · {f.dep}–{f.arr}
          </span>
          <button onClick={() => deleteFlight(clientId, f.id)} style={deleteBtn} title="Remove">
            <Icon name="x" size={15} />
          </button>
        </div>
      ))}
      <form
        ref={formRef}
        action={async (formData) => {
          await addFlight(clientId, tripId, formData);
          formRef.current?.reset();
        }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 70px 90px 90px 70px 70px auto", gap: 6, marginTop: 10 }}
      >
        <input name="carrier" placeholder="Carrier" style={inputStyle} />
        <input name="date_label" placeholder="Date (e.g. Thu 25 Jun)" style={inputStyle} />
        <input name="code" placeholder="Flight #" style={inputStyle} />
        <input name="from_code" placeholder="From (DUB)" style={inputStyle} />
        <input name="to_code" placeholder="To (CPT)" style={inputStyle} />
        <input name="dep" placeholder="Dep 17:05" style={inputStyle} />
        <input name="arr" placeholder="Arr 23:30" style={inputStyle} />
        <button type="submit" style={smallBtn}>+ Add</button>
        <input name="from_city" placeholder="From city" style={{ ...inputStyle, gridColumn: "span 2" }} />
        <input name="to_city" placeholder="To city" style={{ ...inputStyle, gridColumn: "span 2" }} />
      </form>
    </div>
  );
}

export function ManageHotels({ clientId, tripId, hotels }: { clientId: string; tripId: string; hotels: Hotel[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Hotels</div>
      {hotels.map((h) => (
        <div key={h.id} style={rowStyle}>
          <span>
            <b>{h.name}</b> · {h.loc} · {h.dates}
          </span>
          <button onClick={() => deleteHotel(clientId, h.id)} style={deleteBtn} title="Remove">
            <Icon name="x" size={15} />
          </button>
        </div>
      ))}
      <form
        ref={formRef}
        action={async (formData) => {
          await addHotel(clientId, tripId, formData);
          formRef.current?.reset();
        }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}
      >
        <input name="name" placeholder="Hotel name" style={inputStyle} />
        <input name="loc" placeholder="Location" style={inputStyle} />
        <input name="dates" placeholder="Dates (e.g. 26 Jun – 1 Jul · 5 nights)" style={{ ...inputStyle, gridColumn: "span 2" }} />
        <input name="board" placeholder="Board (e.g. Breakfast included)" style={{ ...inputStyle, gridColumn: "span 2" }} />
        <input name="description" placeholder="Short description" style={{ ...inputStyle, gridColumn: "span 2" }} />
        <input name="url" placeholder="Website URL" style={inputStyle} />
        <button type="submit" style={smallBtn}>+ Add hotel</button>
      </form>
    </div>
  );
}

export function ManageItinerary({ clientId, tripId, days }: { clientId: string; tripId: string; days: ItineraryDay[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "20px 22px", boxShadow: "var(--shadow-sm)", marginBottom: 16 }}>
      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg3)", fontWeight: 600, marginBottom: 12 }}>Day-by-day plan</div>
      {days.map((d) => (
        <div key={d.id} style={rowStyle}>
          <span>
            <b>Day {d.day_number}</b> · {d.date_label} · {d.tag} — {d.title}
          </span>
          <button onClick={() => deleteItineraryDay(clientId, d.id)} style={deleteBtn} title="Remove">
            <Icon name="x" size={15} />
          </button>
        </div>
      ))}
      <form
        ref={formRef}
        action={async (formData) => {
          await addItineraryDay(clientId, tripId, formData);
          formRef.current?.reset();
        }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}
      >
        <input name="date_label" placeholder="Date (e.g. Fri 26 Jun)" style={inputStyle} />
        <input name="tag" placeholder="Tag (e.g. Cape Town)" style={inputStyle} />
        <input name="title" placeholder="Title" style={{ ...inputStyle, gridColumn: "span 2" }} />
        <textarea name="body" placeholder="What happens this day" rows={2} style={{ ...inputStyle, gridColumn: "span 2", resize: "vertical" }} />
        <button type="submit" style={{ ...smallBtn, gridColumn: "span 2" }}>+ Add day (adds next in sequence)</button>
      </form>
    </div>
  );
}
