"use client";
import { UserPlus, DoorOpen, CreditCard, Wrench } from "lucide-react";

const actions = [
  { icon: UserPlus,   label: "Add Student"  },
  { icon: DoorOpen,   label: "Add Room"     },
  { icon: CreditCard, label: "Add Payment"  },
  { icon: Wrench,     label: "Complaint"    },
];

export default function QuickActions() {
  return (
    <div>
      <h3 className="text-[13px] font-bold text-sidebar dark:text-white mb-3">⚡ Quick Actions</h3>
      <div className="grid grid-cols-4 gap-2.5">
        {actions.map((a) => (
          <button key={a.label}
            className="group flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl
              border-[1.5px] border-c3/30 bg-white dark:bg-white/5
              hover:border-c4 hover:bg-c1 hover:-translate-y-0.5 transition-all">
            <div className="w-9 h-9 rounded-[10px] bg-c4/12 flex items-center justify-center
              group-hover:bg-c4 group-hover:scale-110 transition-all">
              <a.icon size={16} className="text-c4 group-hover:text-sidebar transition-colors" />
            </div>
            <span className="text-[10px] font-bold text-sidebar dark:text-white text-center leading-tight">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}