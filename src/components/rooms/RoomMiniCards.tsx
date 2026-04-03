import type { Room } from "@/types/room";
import { getRoomStatus } from "@/types/room";

type Props = { rooms: Room[] };

export default function RoomMiniCards({ rooms }: Props) {
  const cards = [
    { label: "Total Rooms", value: rooms.length,                                          sub: "All blocks",    color: "text-c4"          },
    { label: "Available",   value: rooms.filter(r => getRoomStatus(r) === "available").length, sub: "Empty rooms",   color: "text-emerald-500" },
    { label: "Full",        value: rooms.filter(r => getRoomStatus(r) === "full").length,      sub: "No beds left",  color: "text-red-500"     },
    { label: "Partial",     value: rooms.filter(r => getRoomStatus(r) === "partial").length,   sub: "Some beds left",color: "text-amber-500"   },
  ];
  const icons = ["🏠", "🟢", "🔴", "🟡"];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
      {cards.map((c, i) => (
        <div key={c.label}
          className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10
            rounded-xl p-3.5 hover:border-c4 hover:-translate-y-0.5 transition-all cursor-pointer">
          <div className="text-[18px] mb-1.5">{icons[i]}</div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.7px]">{c.label}</p>
          <p className={`text-[20px] font-extrabold ${c.color} mt-1`}>{c.value}</p>
          <p className="text-[10px] font-semibold text-gray-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}