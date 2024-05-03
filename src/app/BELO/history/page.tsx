import BELOMatchComponent from "@/components/BELOMatchComponent/BELOMatchComponent";

export default async function HistoryPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const matchs = await response.json();

  return <BELOMatchComponent matchs={matchs.matchs} />;
}
