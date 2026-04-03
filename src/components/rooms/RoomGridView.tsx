"use client";
import type { Room, RoomStatus } from "@/types/room";
import { getRoomStatus, getOccupancyPct } from "@/types/room";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  rooms: Room[];
  onView: (r: Room) => void;
  onEdit: (r: Room) => void;
  onDelete: (r: Room) => void;
};

const statusConfig: Record<RoomStatus, { border: string; topBar: string; badge: string; badgeText: string; label: string; barColor: string }> = {
  available: { border: "border-emerald-200 hover:border-emerald-400", topBar: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", badgeText: "", label: "Available", barColor: "#00c896" },
  full:      { border: "border-red-200 hover:border-red-400",         topBar: "bg-red-400",     badge: "bg-red-50 text-red-600 border-red-200",           badgeText: "", label: "Full",      barColor: "#ff5e5e" },
  partial:   { border: "border-amber-200 hover:border-amber-400",     topBar: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 border-amber-200",     badgeText: "", label: "Partial",   barColor: "#ffaa00" },
};

function BedDots({ room }: { room: Room }) {
  return (
    <div className="flex gap-1 my-2.5">
      {Array.from({ length: room.capacity }).map((_, i) => (
        <div key={i}
          className={`w-4 h-4 rounded-[4px] ${i < room.occupied ? "bg-red-400" : "bg-emerald-400"}`} />
      ))}
    </div>
  );
}

export default function RoomGridView({ rooms, onView, onEdit, onDelete }: Props) {
  if (!rooms.length) {
    return (
      <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 rounded-2xl
        py-16 text-center text-gray-400 text-[13px]">
        No rooms match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {rooms.map((room) => {
        const status = getRoomStatus(room);
        const cfg = statusConfig[status];
        const pct = getOccupancyPct(room);

        return (
          <div key={room.id}
            className={`bg-white dark:bg-white/5 border-2 ${cfg.border}
              rounded-2xl p-4 cursor-pointer transition-all duration-200
              hover:-translate-y-1 relative overflow-hidden group`}>
            {/* Top color bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${cfg.topBar}`} />

            <p className="text-[18px] font-extrabold text-sidebar dark:text-white mt-1">
              Room {room.number}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              Floor {room.floor} · Block {room.block}
            </p>

            <BedDots room={room} />

            <p className="text-[11px] text-gray-400 font-semibold">
              {room.occupied}/{room.capacity} occupied
            </p>

            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border
              inline-block mt-1.5 ${cfg.badge}`}>
              {cfg.label}
            </span>

            {/* Occupancy bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: cfg.barColor }} />
            </div>

            {/* Actions */}
            <div className="flex gap-1.5 mt-3">
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
          </div>
        );
      })}
    </div>
  );
}