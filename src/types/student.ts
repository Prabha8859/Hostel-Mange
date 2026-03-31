export type StudentStatus = "Active" | "Left";
export type FeeStatus = "Paid" | "Pending";

export interface Student {
  id: number;
  name: string;
  phone: string;
  room: string;
  joiningDate: string;
  fees: number;
  feeStatus: FeeStatus;
  status: StudentStatus;
}