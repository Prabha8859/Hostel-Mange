"use client";
import type { Student } from "../../types/student";

type Props = { students: Student[] };

export default function StudentMiniCards({ students }: Props) {
  const cards = [
    {
      label: "Total Students",
      value: students.length,
      sub: "All registered",
      color: "text-c4",
    },
    {
      label: "Active",
      value: students.filter((s) => s.status === "Active").length,
      sub: "Currently staying",
      color: "text-emerald-500",
    },
    {
      label: "Fees Paid",
      value: students.filter((s) => s.feeStatus === "Paid").length,
      sub: "Cleared dues",
      color: "text-emerald-500",
    },
    {
      label: "Pending",
      value: students.filter((s) => s.feeStatus === "Pending").length,
      sub: "Dues remaining",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {cards.map((c) => (
        <div key={c.label}
          className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10
            rounded-xl p-3.5 hover:border-c4 hover:-translate-y-0.5 transition-all cursor-pointer">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.7px]">{c.label}</p>
          <p className={`text-[20px] font-extrabold ${c.color} mt-1`}>{c.value}</p>
          <p className="text-[10px] font-semibold text-gray-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}