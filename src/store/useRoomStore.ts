"use client";
import { create } from "zustand";
import type { Room } from "@/types/room";
import { initialRooms } from "@/data/roomsData";

type RoomStore = {
  rooms: Room[];
  addRoom: (r: Omit<Room, "id">) => void;
  updateRoom: (r: Room) => void;
  deleteRoom: (id: number) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: initialRooms,
  addRoom: (r) =>
    set((s) => ({ rooms: [...s.rooms, { ...r, id: Date.now() }] })),
  updateRoom: (updated) =>
    set((s) => ({ rooms: s.rooms.map((r) => (r.id === updated.id ? updated : r)) })),
  deleteRoom: (id) =>
    set((s) => ({ rooms: s.rooms.filter((r) => r.id !== id) })),
}));