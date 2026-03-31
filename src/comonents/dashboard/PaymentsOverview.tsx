"use client";
import { useEffect, useRef } from "react";
import { monthlyRevenue } from "@/data/dummyData";

export default function PaymentsOverview() {
  const barRef = useRef<HTMLDivElement>(null);
  const pct = 84.8;

  useEffect(() => {
    setTimeout(() => {
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    }, 400);
  }, []);

  const max = Math.max(...monthlyRevenue.map((m) => m.amount));

  return (
    <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10
      rounded-2xl p-4 space-y-3">
      <div className="flex justify-between text-[11px] font-bold">
        <span className="text-emerald-500">Paid: ₹2,12,000</span>
        <span className="text-red-500">Pending: ₹38,000</span>
      </div>
      <div className="h-2.5 bg-c4/12 rounded-full overflow-hidden">
        <div ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-c3 to-c4 transition-all duration-1000 ease-out"
          style={{ width: "0%" }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
        <span>105 paid</span><span>{pct}% collected</span><span>15 pending</span>
      </div>

      <p className="text-[11px] font-bold text-gray-400">Monthly Collection</p>
      <div className="flex items-end gap-1.5 h-20">
        {monthlyRevenue.map((m) => (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md bg-c3 hover:bg-c4 transition-colors cursor-pointer"
              style={{ height: `${(m.amount / max) * 100}%` }}
              title={`${m.month}: ₹${(m.amount / 1000).toFixed(0)}k`}
            />
            <span className="text-[9px] text-gray-400 font-semibold">{m.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}