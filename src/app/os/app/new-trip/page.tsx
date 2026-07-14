import Link from "next/link";
import { NewTripForm } from "@/components/os/NewTripForm";

export default async function NewTripPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const { destination } = await searchParams;
  return (
    <div>
      <Link href="/os/app/clients" style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 16 }}>
        ← All clients
      </Link>
      <h2 style={{ fontFamily: "var(--font-script)", fontWeight: 600, fontSize: "1.9rem", margin: "0 0 6px", color: "var(--fg1)" }}>New trip</h2>
      <p style={{ fontSize: "0.9rem", color: "var(--fg3)", margin: "0 0 26px" }}>
        Fill in the basics and Thula OS builds the client&apos;s branded app and site automatically — no code, no design work.
      </p>
      <NewTripForm defaultDestination={destination ?? ""} />
    </div>
  );
}
