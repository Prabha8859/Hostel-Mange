// app/complaints/page.tsx
import MainLayout from "@/comonents/layout/MainLayout";
import Table from "@/comonents/ui/Table";

export default function Complaints() {
  const data = [
    ["Rahul", 203, "WiFi Issue", "Open"],
    ["Aman", 101, "Cleaning", "Resolved"],
  ];

  return (
    <MainLayout>
      <h1 className="mb-4">Complaints</h1>
      <Table headers={["Name", "Room", "Issue", "Status"]} data={data} />
    </MainLayout>
  );
}