"use client";
import { Grid2X2, List } from "lucide-react";
import type { ViewMode } from "@/types/room";

type Props = {
  search: string; statusFilter: string; capFilter: string; floorFilter: string;
  viewMode: ViewMode;
  occupancyPctFilter: number; // New prop for occupancy percentage
  onSearch: (v: string) => void; onStatus: (v: string) => void;
  onCap: (v: string) => void; onFloor: (v: string) => void;
  onViewMode: (v: ViewMode) => void;
  count: number; total: number;
};

const selCls = `px-3 py-2 bg-white dark:bg-white/5 border-[1.5px] border-c3/30
  rounded-full text-[12px] font-semibold text-gray-500 font-outfit
  focus:border-c4 focus:outline-none transition-all cursor-pointer`;

export default function RoomFilters({
  search, statusFilter, capFilter, floorFilter, viewMode,
  onSearch, onStatus, onCap, onFloor, onViewMode, count, total,
}: Props) {
  return (
    <div className="flex items-center gap-2.5 mb-4 flex-wrap">
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-white/5
        border-[1.5px] border-c3/30 rounded-full flex-1 min-w-[160px] md:max-w-[240px]
        focus-within:border-c4 transition-all">
        <span className="text-gray-400 text-[14px]">🔍</span>
        <input value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search room no..."
          className="bg-transparent border-none outline-none text-[12px] text-sidebar
            dark:text-white placeholder:text-gray-400 w-full font-outfit" />
      </div>

      <select value={statusFilter} onChange={(e) => onStatus(e.target.value)} className={selCls}>
        <option value="">All Status</option>
        <option value="available">Available</option>
        <option value="full">Full</option>
        <option value="partial">Partial</option>
      </select>

      <select value={capFilter} onChange={(e) => onCap(e.target.value)} className={selCls}>
        <option value="">All Capacity</option>
        <option value="2">2 Beds</option>
        <option value="3">3 Beds</option>
        <option value="4">4 Beds</option>
      </select>

      <select value={floorFilter} onChange={(e) => onFloor(e.target.value)} className={selCls}>
        <option value="">All Floors</option>
        <option value="1">Floor 1</option>
        <option value="2">Floor 2</option>
        <option value="3">Floor 3</option>
      </select>

      {/* Occupancy Percentage Slider */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-white/5
        border-[1.5px] border-c3/30 rounded-full flex-1 min-w-[180px] md:max-w-[200px]
        focus-within:border-c4 transition-all">
        <label htmlFor="occupancy-slider" className="text-[12px] font-semibold text-gray-500 font-outfit whitespace-nowrap">
          Occupancy: {occupancyPctFilter}%
        </label>
        <input
          id="occupancy-slider"
          type="range"
          min="0"
          max="100"
          step="5"
          value={occupancyPctFilter}
          onChange={(e) => onOccupancyPct(Number(e.target.value))}
          className="w-full h-1 bg-c4/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-c4"
        />
      </div>

      {/* View Toggle */}
      <div className="flex bg-white dark:bg-white/5 border-[1.5px] border-c3/30 rounded-full
        overflow-hidden ml-auto">
        {(["grid", "table"] as ViewMode[]).map((m) => (
          <button key={m} onClick={() => onViewMode(m)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold
              transition-all ${viewMode === m ? "bg-c4 text-sidebar" : "text-gray-400 hover:text-sidebar"}`}>
            {m === "grid" ? <Grid2X2 size={13} /> : <List size={13} />}
            {m === "grid" ? "Grid" : "Table"}
          </button>
        ))}
      </div>

      <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap bg-white dark:bg-white/5 px-3 py-2 rounded-full border border-c3/10">
        {count} of {total} rooms
      </span>
    </div>
  );
}