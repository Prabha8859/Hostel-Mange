"use client";
import { Search } from "lucide-react";

type Props = {
  search: string;
  room: string;
  status: string;
  onSearch: (v: string) => void;
  onRoom: (v: string) => void;
  onStatus: (v: string) => void;
  count: number;
  total: number;
};

const statusFilters = ["All", "Active", "Left"];

export default function StudentFilters({
  search, room, status, onSearch, onRoom, onStatus, count, total,
}: Props) {
  return (
    <div className="flex items-center gap-3 mb-6 p-3 bg-white dark:bg-white/5 
      rounded-2xl border border-c3/20 shadow-sm flex-wrap">
      
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-white/5
        border-[1.5px] border-c3/30 rounded-xl flex-1 min-w-[200px] max-w-[280px]
        focus-within:border-c4 focus-within:shadow-md focus-within:shadow-c4/10 transition-all">
        <Search size={14} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search name or phone..."
          className="bg-transparent border-none outline-none text-[13px] text-sidebar
            dark:text-white placeholder:text-gray-400 w-full font-outfit"
        />
      </div>

      {/* Room Filter */}
      <select
        value={room}
        onChange={(e) => onRoom(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-white/5 border-[1.5px] border-c3/30
          rounded-xl text-[13px] font-bold text-gray-500 dark:text-gray-300
          font-outfit cursor-pointer focus:border-c4 focus:outline-none transition-all"
      >
        <option value="">All Rooms</option>
        {["101","102","103","201","202","203","301","302","303"].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <div className="h-8 w-[1px] bg-c3/30 mx-1 hidden sm:block" />

      <div className="flex items-center gap-1.5 bg-c1/30 dark:bg-white/5 p-1 rounded-xl border border-c3/20">
        {statusFilters.map((s) => {
          const val = s === "All" ? "" : s;
          return (
            <button key={s} onClick={() => onStatus(val)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-extrabold transition-all
              ${status === val
                  ? "bg-c4 text-sidebar shadow-md shadow-c4/20"
                  : "text-gray-400 hover:bg-c1 dark:hover:bg-white/10 hover:text-sidebar"
              }`}>
              {s}
            </button>
          );
        })}
      </div>

      <span className="ml-auto text-[11px] font-bold text-gray-400 bg-c1 dark:bg-white/5 px-3 py-1 rounded-full border border-c3/20">
        {count} / {total} <span className="font-medium opacity-70">Students</span>
      </span>
    </div>
  );
}