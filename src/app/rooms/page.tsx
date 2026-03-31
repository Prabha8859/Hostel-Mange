// app/rooms/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import Table from "@/components/ui/Table";

export default function Rooms() {
  const data = [
    [101, 2, 2, "Full"],
    [102, 2, 1, "Available"],
  ];

  return (
    <MainLayout>
      <h1 className="mb-4">Rooms</h1>
      <Table headers={["Room", "Capacity", "Occupied", "Status"]} data={data} />
    </MainLayout>
  );
}