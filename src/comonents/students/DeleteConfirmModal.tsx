"use client";
import type { Student } from "@/types/student";
import { Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  student: Student | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({ open, student, onConfirm, onCancel }: Props) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 bg-sidebar/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0d2030] rounded-2xl p-7 w-full max-w-[320px]
        border-2 border-red-200 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-[16px] font-extrabold text-sidebar dark:text-white mb-2">
          Delete Student?
        </h3>
        <p className="text-[12px] text-gray-400 mb-5">
          Remove <strong>{student.name}</strong> from Room {student.room}? This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 py-2.5 border-[1.5px] border-gray-200 rounded-xl text-[13px]
              font-bold text-gray-500 hover:border-gray-300 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 border-none rounded-xl text-[13px]
              font-bold text-white hover:bg-red-600 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}