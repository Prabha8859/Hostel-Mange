"use client";
import type { Student } from "@/types/student";
import StatusBadge from "@/comonents/ui/StatusBadge";
import Avatar from "@/comonents/ui/Avatar";
import { X, Pencil, Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
};

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

export default function StudentViewModal({ open, student, onClose, onEdit, onDelete }: Props) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-sidebar/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0d2030] rounded-2xl p-6 w-full max-w-[400px]
        border-2 border-c3">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[17px] font-extrabold text-sidebar dark:text-white">Student Details</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-c1 border-[1.5px] border-c3 flex items-center
              justify-center hover:bg-c4 transition-all">
            <X size={14} className="text-sidebar" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-full bg-c4 flex items-center justify-center
            font-extrabold text-sidebar text-[18px]">
            <Avatar name={student.name} size="lg" />
          </div>
          <div>
            <p className="text-[17px] font-extrabold text-sidebar dark:text-white">{student.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Student ID #{student.id}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {[
            { label: "Room No.", value: student.room, accent: true },
            { label: "Phone",    value: student.phone },
            { label: "Joining",  value: fmtDate(student.joiningDate) },
            { label: "Monthly Fees", value: `₹${student.fees.toLocaleString()}` },
            { label: "Status",   value: <StatusBadge value={student.status} type="status" /> },
            { label: "Fees",     value: <StatusBadge value={student.feeStatus} type="fees" /> },
          ].map((row, i) => (
            <div key={i} className="bg-c1 border border-c3/30 rounded-xl p-3">
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">
                {row.label}
              </p>
              <div className={`text-[13px] font-bold mt-1 ${
                row.accent ? "text-c4" : "text-sidebar dark:text-white"
              }`}>
                {row.value}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button onClick={() => { onClose(); onEdit(student); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-c1
              border-[1.5px] border-c3 rounded-xl text-[12px] font-bold text-sidebar
              hover:bg-c3 transition-all">
            <Pencil size={13} /> Edit
          </button>
          <button onClick={() => { onClose(); onDelete(student); }}
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