import { WhiteLabelApp } from "@/components/white-label/WhiteLabelApp";

export default async function WhiteLabelAppPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <WhiteLabelApp
      agencyName={sp.agencyName ?? "Your Travel Co"}
      accentColor={sp.accentColor ?? "#317653"}
      consultantName={sp.consultantName ?? "[Consultant name]"}
      clientName={sp.clientName ?? "[Client name]"}
      groupSize={sp.groupSize ?? "2"}
      destinationLine1={sp.destinationLine1 ?? "Sample"}
      destinationLine2={sp.destinationLine2 ?? "Destination"}
      dateRange={sp.dateRange ?? "[Date range]"}
    />
  );
}
