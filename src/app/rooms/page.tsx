"use client";
import { useState, useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import RoomMiniCards from "@/components/rooms/RoomMiniCards";
import RoomFilters from "@/components/rooms/RoomFilters";
import RoomGridView from "@/components/rooms/RoomGridView";
import RoomTableView from "@/components/rooms/RoomTableView";
import RoomFormModal from "@/components/rooms/RoomFormModal";
import RoomViewModal from "@/components/rooms/RoomViewModal";
import DeleteConfirmModal from "@/components/students/DeleteConfirmModal";
import { useRoomStore } from "@/store/useRoomStore";
import type { Room, ViewMode } from "@/types/room";
import { getRoomStatus } from "@/types/room";

export default function RoomsPage() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useRoomStore();

  const [search, setSearch]       = useState("");
  const [statusF, setStatusF]     = useState("");
  const [capF, setCapF]           = useState("");
  const [floorF, setFloorF]       = useState("");
  const [occupancyPctF, setOccupancyPctF] = useState(0); // New state for occupancy percentage filter
  const [viewMode, setViewMode]   = useState<ViewMode>("grid");

  const [addOpen, setAddOpen]     = useState(false);
  const [editRoom, setEditRoom]   = useState<Room | null>(null);
  const [viewRoom, setViewRoom]   = useState<Room | null>(null);
  const [delRoom, setDelRoom]     = useState<Room | null>(null);

  const filtered = useMemo(() => rooms.filter((r) => {
    const st = getRoomStatus(r);
    const q = search.trim().toLowerCase();
    const roomOccupancyPct = getOccupancyPct(r);
    return (
      (!q || String(r.number).toLowerCase().includes(q)) &&
      (!statusF || st === statusF) &&
      (!capF || String(r.capacity) === capF) &&
      (!floorF || String(r.floor) === floorF) &&
      (roomOccupancyPct >= occupancyPctF) // Apply occupancy percentage filter
    );
  }), [rooms, search, statusF, capF, floorF, occupancyPctF]); // Add occupancyPctF to dependencies

  const viewProps = {
    rooms: filtered,
    onView: (r: Room) => setViewRoom(r),
    onEdit: (r: Room) => setEditRoom(r),
    onDelete: (r: Room) => setDelRoom(r),
  };

  return (
    <MainLayout>
      <PageHeader
        title="Rooms Management"
        subtitle="View, manage and track all hostel rooms at a glance"
        breadcrumb="Hostel / Rooms"
        action={
          <button onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-c4 rounded-xl text-[13px]
              font-extrabold text-sidebar hover:bg-c3 hover:-translate-y-px transition-all">
            + Add Room
          </button>
        }
      />

      <RoomMiniCards rooms={rooms} />

      <RoomFilters
        search={search} statusFilter={statusF} capFilter={capF} floorFilter={floorF}
        viewMode={viewMode} occupancyPctFilter={occupancyPctF} // Pass new filter state
        onSearch={setSearch} onStatus={setStatusF} onCap={setCapF} onFloor={setFloorF}
        onViewMode={setViewMode} onOccupancyPct={setOccupancyPctF} // Pass new filter handler
        count={filtered.length} total={rooms.length}
      />

      {viewMode === "grid"
        ? <RoomGridView {...viewProps} />
        : <RoomTableView {...viewProps} />
      }

      <RoomFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(data) => { addRoom(data); setAddOpen(false); }}
      />

      <RoomFormModal
        open={!!editRoom} room={editRoom}
        onClose={() => setEditRoom(null)}
        onSave={(data) => { if (editRoom) updateRoom({ ...data, id: editRoom.id }); setEditRoom(null); }}
      />

      <RoomViewModal
        open={!!viewRoom} room={viewRoom}
        onClose={() => setViewRoom(null)}
        onEdit={(r) => { setViewRoom(null); setEditRoom(r); }}
        onDelete={(r) => { setViewRoom(null); setDelRoom(r); }}
      />

      <DeleteConfirmModal
        open={!!delRoom}
        student={delRoom ? { ...delRoom, name: `Room ${delRoom.number}` } as any : null}
        onConfirm={() => { if (delRoom) deleteRoom(delRoom.id); setDelRoom(null); }}
        onCancel={() => setDelRoom(null)}
      />
    </MainLayout>
  );
}