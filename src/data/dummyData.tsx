// data/dummyData.ts
import type { Student } from "@/types/student";

export const students: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    room: "203",
    phone: "9876543210",
    joiningDate: "2024-01-10",
    fees: 8000,
    feeStatus: "Pending",
    status: "Active",
  },
  {
    id: 2,
    name: "Aman Verma",
    room: "101",
    phone: "9123456780",
    joiningDate: "2023-12-05",
    fees: 8500,
    feeStatus: "Paid",
    status: "Active",
  },
];

export const dashboardStats = {
  totalStudents: 120,
  totalRooms: 50,
  availableBeds: 20,
  revenue: 250000,
  pendingPayments: 15,
  complaints: 5,
};

export type RoomStatus = "full" | "available" | "partial";
export type Room = { number: number; status: RoomStatus; beds: number; occupied: number };

export const rooms: Room[] = [
  { number: 101, status: "full",      beds: 4, occupied: 4 },
  { number: 102, status: "available", beds: 4, occupied: 0 },
  { number: 103, status: "partial",   beds: 4, occupied: 3 },
  { number: 104, status: "full",      beds: 4, occupied: 4 },
  { number: 105, status: "available", beds: 4, occupied: 0 },
  { number: 201, status: "available", beds: 2, occupied: 0 },
  { number: 202, status: "full",      beds: 2, occupied: 2 },
  { number: 203, status: "partial",   beds: 2, occupied: 1 },
  { number: 204, status: "available", beds: 2, occupied: 0 },
  { number: 205, status: "full",      beds: 2, occupied: 2 },
  { number: 301, status: "partial",   beds: 3, occupied: 2 },
  { number: 302, status: "available", beds: 3, occupied: 0 },
  { number: 303, status: "full",      beds: 3, occupied: 3 },
  { number: 304, status: "available", beds: 3, occupied: 0 },
  { number: 305, status: "partial",   beds: 3, occupied: 2 },
];

export const recentActivity = [
  { icon: "👨‍🎓", text: "Rahul added to Room 203",        time: "2m ago",  type: "student" },
  { icon: "💳", text: "Aman paid ₹8,000 for April",      time: "15m ago", type: "payment" },
  { icon: "🛠️", text: "WiFi complaint in Room 101",      time: "1h ago",  type: "complaint" },
  { icon: "🏠", text: "Room 402 marked available",        time: "3h ago",  type: "room" },
  { icon: "💳", text: "Priya paid ₹7,500",               time: "5h ago",  type: "payment" },
];

export const complaints = [
  { room: 101, issue: "Water leakage in bathroom", status: "Open",        urgency: "high" },
  { room: 205, issue: "Broken window latch",       status: "In Progress", urgency: "medium" },
  { room: 303, issue: "WiFi not working",           status: "Open",        urgency: "high" },
  { room: 102, issue: "Fan making noise",           status: "In Progress", urgency: "low" },
];

export const monthlyRevenue = [
  { month: "Jul", amount: 195000 },
  { month: "Aug", amount: 210000 },
  { month: "Sep", amount: 225000 },
  { month: "Oct", amount: 198000 },
  { month: "Nov", amount: 240000 },
  { month: "Dec", amount: 250000 },
];