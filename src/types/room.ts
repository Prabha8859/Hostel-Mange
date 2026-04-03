export type RoomStatus = "available" | "full" | "partial";
export type ViewMode = "grid" | "table";

export type Room = {
  id: number;
  number: string;
  floor: number;
  capacity: number;
  occupied: number;
  block: string;
};

export function getRoomStatus(room: Room): RoomStatus {
  if (room.occupied === 0) return "available";
  if (room.occupied >= room.capacity) return "full";
  return "partial";
}

export function getOccupancyPct(room: Room): number {
  return Math.round((room.occupied / room.capacity) * 100);
}