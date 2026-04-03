import type { Room } from "@/types/room";

export const initialRooms: Room[] = [
  { id:  1, number: "101", floor: 1, capacity: 2, occupied: 2, block: "A" },
  { id:  2, number: "102", floor: 1, capacity: 3, occupied: 1, block: "A" },
  { id:  3, number: "103", floor: 1, capacity: 3, occupied: 3, block: "A" },
  { id:  4, number: "104", floor: 1, capacity: 2, occupied: 0, block: "A" },
  { id:  5, number: "105", floor: 1, capacity: 4, occupied: 2, block: "B" },
  { id:  6, number: "201", floor: 2, capacity: 2, occupied: 2, block: "B" },
  { id:  7, number: "202", floor: 2, capacity: 2, occupied: 2, block: "B" },
  { id:  8, number: "203", floor: 2, capacity: 3, occupied: 1, block: "B" },
  { id:  9, number: "204", floor: 2, capacity: 4, occupied: 0, block: "C" },
  { id: 10, number: "205", floor: 2, capacity: 3, occupied: 2, block: "C" },
  { id: 11, number: "301", floor: 3, capacity: 3, occupied: 3, block: "C" },
  { id: 12, number: "302", floor: 3, capacity: 2, occupied: 1, block: "C" },
  { id: 13, number: "303", floor: 3, capacity: 4, occupied: 0, block: "D" },
  { id: 14, number: "304", floor: 3, capacity: 2, occupied: 0, block: "D" },
  { id: 15, number: "305", floor: 3, capacity: 3, occupied: 2, block: "D" },
];

export const studentsByRoom: Record<string, string[]> = {
  "101": ["Rahul Sharma", "Aman Verma"],
  "102": ["Priya Singh"],
  "103": ["Divya Joshi", "Rohan Gupta", "Neha Patel"],
  "201": ["Akash Kumar", "Sanjay Mehta"],
  "202": ["Pooja Rao", "Kavya T"],
  "203": ["Ravi Sharma"],
  "301": ["Ankit Jain", "Meena P", "Suresh K"],
  "302": ["Gaurav M"],
};