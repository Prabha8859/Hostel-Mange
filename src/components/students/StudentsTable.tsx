"use client";
import type { Student } from "../../types/student";
import StatusBadge from "../../components/ui/StatusBadge";
import Avatar from "../../components/ui/Avatar";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  students: Student[];
  onView: (s: Student) => void;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
};

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function StudentsTable({ students, onView, onEdit, onDelete }: Props) {
  if (!students.length) {
    return (
      <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 rounded-2xl
        py-14 text-center text-gray-400 text-[13px]">
        No students found. Try changing your filters.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 border-[1.5px] border-c3/30 dark:border-white/10
      rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="bg-c1 dark:bg-white/5 border-b-[1.5px] border-c3/30">
              {["Student", "Room", "Phone", "Joining", "Status", "Fees", "Actions"].map((h) => (
                <th key={h}
                  className="px-4 py-3 text-left text-[10px] font-extrabold text-gray-400
                    uppercase tracking-[0.8px] whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}
                className="border-b border-c3/10 last:border-none
                  hover:bg-c4/5 hover:translate-x-0.5 transition-all cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={s.name} size="sm" />
                    <div>
                      <p className="text-[13px] font-bold text-sidebar dark:text-white">{s.name}</p>
                      <p className="text-[10px] text-gray-400">ID #{s.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-[13px] text-c4">{s.room}</span>
                </td>
                <td className="px-4 py-3 text-[12px] text-gray-500">{s.phone}</td>
                <td className="px-4 py-3 text-[11px] text-gray-400">{fmtDate(s.joiningDate)}</td>
                <td className="px-4 py-3"><StatusBadge value={s.status} type="status" /></td>
                <td className="px-4 py-3"><StatusBadge value={s.feeStatus} type="fees" /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => onView(s)} title="View"
                      className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                        flex items-center justify-center hover:bg-c1 hover:border-c4
                        hover:scale-110 transition-all">
                      <Eye size={13} className="text-c4" />
                    </button>
                    <button onClick={() => onEdit(s)} title="Edit"
                      className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                        flex items-center justify-center hover:bg-amber-50 hover:border-amber-300
                        hover:scale-110 transition-all">
                      <Pencil size={13} className="text-amber-500" />
                    </button>
                    <button onClick={() => onDelete(s)} title="Delete"
                      className="w-7 h-7 rounded-lg border-[1.5px] border-c3/30 bg-white
                        flex items-center justify-center hover:bg-red-50 hover:border-red-300
                        hover:scale-110 transition-all">
                      <Trash2 size={13} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}