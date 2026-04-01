"use client";
import { useState } from "react";
import { rooms, type RoomStatus } from "../../data/dummyData";

const tagMap: Record<RoomStatus, string> = {
  full: "Full", available: "Open", partial: "1 Left",
};
const styleMap: Record<RoomStatus, string> = {
  full:      "bg-red-50 border-red-200 hover:border-red-400",
  available: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
  partial:   "bg-amber-50 border-amber-200 hover:border-amber-400",
};
const tagColor: Record<RoomStatus, string> = {
  full: "text-red-500", available: "text-emerald-500", partial: "text-amber-500",
};

type Filter = "all" | RoomStatus;

export default function RoomStatus() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? rooms : rooms.filter((r) => r.status === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "full", label: "Full" },
    { key: "available", label: "Available" },
    { key: "partial", label: "Partial" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-bold text-sidebar dark:text-white">🏠 Room Status</h3>
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border-[1.5px] transition-all
                ${filter === f.key
                  ? "bg-c4 border-c4 text-sidebar"
                  : "bg-white border-c3/50 text-gray-400 hover:border-c4 hover:text-sidebar"
                }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10 rounded-2xl p-4">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {filtered.map((room) => (
            <div key={room.number}
              className={`rounded-[9px] py-2 px-1.5 text-center cursor-pointer
                border-[1.5px] transition-all hover:scale-105 ${styleMap[room.status]}`}>
              <div className="text-[11px] font-bold text-sidebar">{room.number}</div>
              <div className={`text-[9px] font-semibold mt-0.5 ${tagColor[room.status]}`}>
                {tagMap[room.status]}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-3">
          {[
            { color: "bg-emerald-500", label: "Available" },
            { color: "bg-red-500",     label: "Full" },
            { color: "bg-amber-500",   label: "Partial" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[10px] font-semibold text-gray-400">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}