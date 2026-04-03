"use client";
import type { Room } from "@/types/room";
import { getRoomStatus, getOccupancyPct } from "@/types/room";
import { X, Pencil, Trash2 } from "lucide-react";
import { studentsByRoom } from "@/data/roomsData";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";

type Props = { open: boolean; room: Room | null; onClose: () => void; onEdit: (r: Room) => void; onDelete: (r: Room) => void };

const statusLabel: Record<string, string> = { available: "Available", full: "Full", partial: "Partial" };
const barColor: Record<string, string> = { available: "#00c896", full: "#ff5e5e", partial: "#ffaa00" };

export default function RoomViewModal({ open, room, onClose, onEdit, onDelete }: Props) {
  if (!open || !room) return null;
  const status = getRoomStatus(room);
  const pct = getOccupancyPct(room);
  const students = studentsByRoom[room.number] || [];

  return (
    <div className="fixed inset-0 bg-sidebar/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0d2030] rounded-2xl p-6 w-full max-w-[400px] border-2 border-c3">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[17px] font-extrabold text-sidebar dark:text-white">Room Details</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-c1 border-[1.5px] border-c3 flex items-center
              justify-center hover:bg-c4 transition-all">
            <X size={14} className="text-sidebar" />
          </button>
        </div>

        {/* Room Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-c1 border-2 border-c3 flex items-center
            justify-center font-extrabold text-[18px] text-c4">
            {room.number}
          </div>
          <div>
            <p className="text-[16px] font-extrabold text-sidebar dark:text-white">Room {room.number}</p>
            <p className="text-[12px] text-gray-400">Floor {room.floor} · Block {room.block}</p>
          </div>
          <div className="ml-auto">
            <StatusBadge value={statusLabel[status]} type="status" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Capacity",  value: `${room.capacity} Beds` },
            { label: "Occupied",  value: room.occupied, color: "text-red-500" },
            { label: "Available", value: room.capacity - room.occupied, color: "text-emerald-500" },
            { label: "Occupancy", value: `${pct}%` },
          ].map((item) => (
            <div key={item.label} className="bg-c1 border border-c3/30 rounded-xl p-3">
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">{item.label}</p>
              <p className={`text-[14px] font-extrabold mt-1 ${"color" in item ? item.color : "text-sidebar dark:text-white"}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Occupancy Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor[status] }} />
        </div>

        {/* Students */}
        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
          Students in this room
        </p>
        <div className="space-y-2 mb-4">
          {students.length ? students.map((name) => (
            <div key={name} className="flex items-center gap-2.5 p-2.5 rounded-xl
              bg-c1 border border-c3/30 hover:border-c4 transition-all">
              <Avatar name={name} size="sm" />
              <span className="text-[12px] font-semibold text-sidebar dark:text-white">{name}</span>
            </div>
          )) : (
            <p className="text-[12px] text-gray-400 py-2">No students assigned yet.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={() => { onClose(); onEdit(room); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-c1
              border-[1.5px] border-c3 rounded-xl text-[12px] font-bold text-sidebar
              hover:bg-c3 transition-all">
            <Pencil size={13} /> Edit Room
          </button>
          <button onClick={() => { onClose(); onDelete(room); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50
              border-[1.5px] border-red-200 rounded-xl text-[12px] font-bold text-red-600
              hover:bg-red-100 transition-all">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}