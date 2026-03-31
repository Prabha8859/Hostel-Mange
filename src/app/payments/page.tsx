// app/payments/page.tsx
import MainLayout from "@/components/layout/MainLayout";
import Table from "@/components/ui/Table";

export default function Payments() {
  const data = [
    ["Rahul", 203, "₹8000", "Pending"],
    ["Aman", 101, "₹8000", "Paid"],
  ];

  return (
    <MainLayout>
      <h1 className="mb-4">Payments</h1>
      <Table headers={["Name", "Room", "Amount", "Status"]} data={data} />
    </MainLayout>
  );
}