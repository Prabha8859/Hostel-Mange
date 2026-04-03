"use client";
import type { Room } from "@/types/room";
import { getRoomStatus, getOccupancyPct } from "@/types/room";
import StatusBadge from "@/components/ui/StatusBadge";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  rooms: Room[];
  onView: (r: Room) => void;
  onEdit: (r: Room) => void;
  onDelete: (r: Room) => void;
};

const barColor: Record<string, string> = {
  available: "#00c896", full: "#ff5e5e", partial: "#ffaa00",
};

const statusLabel: Record<string, string> = {
  available: "Available", full: "Full", partial: "Partial",
};

export default function RoomTableView({ rooms, onView, onEdit, onDelete }: Props) {
  if (!rooms.length) {
    return (
      <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 rounded-2xl
        py-16 text-center text-gray-400 text-[13px]">
        No rooms found.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="bg-c1 dark:bg-white/5 border-b-[1.5px] border-c3/30">
              {["Room", "Floor", "Capacity", "Occupied", "Available", "Occupancy", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-extrabold
                  text-gray-400 uppercase tracking-[0.8px]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              const status = getRoomStatus(room);
              const pct = getOccupancyPct(room);
              const avail = room.capacity - room.occupied;

              return (
                <tr key={room.id}
                  className="border-b border-c3/10 last:border-none
                    hover:bg-c4/5 hover:translate-x-0.5 transition-all cursor-pointer">
                  <td className="px-4 py-3">
                    <span className="font-extrabold text-[14px] text-c4">{room.number}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-gray-500">Floor {room.floor} · {room.block}</td>
                  <td className="px-4 py-3 text-[12px] font-semibold">{room.capacity} beds</td>
                  <td className="px-4 py-3 text-[13px] font-bold text-sidebar dark:text-white">{room.occupied}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold text-[13px] ${avail > 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {avail}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: barColor[status] }} />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 w-7 text-right">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={statusLabel[status]} type="status" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => onView(room)}
                        className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                          flex items-center justify-center hover:bg-c1 hover:border-c4
                          hover:scale-110 transition-all">
                        <Eye size={12} className="text-c4" />
                      </button>
                      <button onClick={() => onEdit(room)}
                        className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                          flex items-center justify-center hover:bg-amber-50 hover:border-amber-300
                          hover:scale-110 transition-all">
                        <Pencil size={12} className="text-amber-500" />
                      </button>
                      <button onClick={() => onDelete(room)}
                        className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                          flex items-center justify-center hover:bg-red-50 hover:border-red-300
                          hover:scale-110 transition-all">
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}