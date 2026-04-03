"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Room } from "@/types/room";
import { X } from "lucide-react";

type FormData = Omit<Room, "id">;
type Props = { open: boolean; room?: Room | null; onClose: () => void; onSave: (d: FormData) => void };

const inputCls = `w-full px-3 py-2.5 border-[1.5px] border-c3/30 rounded-[9px] text-[13px]
  font-outfit text-sidebar dark:text-white bg-white dark:bg-white/5 outline-none
  focus:border-c4 focus:bg-c1 transition-all placeholder:text-gray-300`;

export default function RoomFormModal({ open, room, onClose, onSave }: Props) {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();
  const cap = Number(watch("capacity") || 2);

  useEffect(() => {
    if (room) {
      reset({ number: room.number, floor: room.floor, capacity: room.capacity, occupied: room.occupied, block: room.block });
    } else {
      reset({ floor: 1, capacity: 2, occupied: 0, block: "A" });
    }
  }, [room, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-sidebar/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0d2030] rounded-2xl p-6 w-full max-w-[420px]
        border-2 border-c3">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[17px] font-extrabold text-sidebar dark:text-white">
            {room ? "Edit Room" : "Add New Room"}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-c1 border-[1.5px] border-c3 flex items-center
              justify-center hover:bg-c4 transition-all">
            <X size={14} className="text-sidebar" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="space-y-3">
          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
              Room Number *
            </label>
            <input {...register("number", { required: true })} placeholder="e.g. 101"
              className={`${inputCls} ${errors.number ? "border-red-400" : ""}`} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">Floor</label>
              <select {...register("floor", { valueAsNumber: true })} className={inputCls}>
                {[1, 2, 3, 4].map((f) => <option key={f} value={f}>Floor {f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">Block</label>
              <select {...register("block")} className={inputCls}>
                {["A", "B", "C", "D"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">Capacity (Beds)</label>
              <select {...register("capacity", { valueAsNumber: true })} className={inputCls}>
                {[2, 3, 4].map((c) => <option key={c} value={c}>{c} Beds</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-1.5">
                Occupied (max {cap})
              </label>
              <input type="number" min={0} max={cap}
                {...register("occupied", { valueAsNumber: true, min: 0, max: cap })}
                placeholder="0" className={inputCls} />
            </div>
          </div>

          <button type="submit"
            className="w-full py-3 bg-c4 rounded-xl text-[14px] font-extrabold
              text-sidebar hover:bg-c3 transition-all font-outfit mt-2">
            {room ? "Update Room" : "Save Room"}
          </button>
        </form>
      </div>
    </div>
  );
}