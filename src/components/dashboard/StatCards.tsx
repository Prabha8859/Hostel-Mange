import { dashboardStats } from "../../data/dummyData";

const cards = [
  { label: "Total Students",    key: "totalStudents",    icon: "👨‍🎓", sub: "↑ +3 this week",    subColor: "text-green-500",  accent: "bg-c4/10"      },
  { label: "Total Rooms",       key: "totalRooms",       icon: "🏠",   sub: "↑ 80% occupied",    subColor: "text-green-500",  accent: "bg-c3/15"      },
  { label: "Available Beds",    key: "availableBeds",    icon: "🛏️",   sub: "⌄ 10 pending",      subColor: "text-amber-500",  accent: "bg-amber-50"   },
  { label: "Monthly Revenue",   key: "revenue",          icon: "💰",   sub: "↑ ₹18k vs last mo", subColor: "text-green-500",  accent: "bg-emerald-50" },
  { label: "Pending Payments",  key: "pendingPayments",  icon: "⚠️",   sub: "↓ 3 overdue",       subColor: "text-red-500",    accent: "bg-red-50"     },
  { label: "Complaints",        key: "complaints",       icon: "🛠️",   sub: "● 2 urgent",         subColor: "text-purple-500", accent: "bg-purple-50"  },
] as const;

function fmt(key: string, val: number) {
  if (key === "revenue") return `₹${(val / 100000).toFixed(1)}L`;
  return val.toString();
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((c) => (
        <div key={c.key}
          className={`${c.accent} border-[1.5px] border-c3/40 rounded-2xl p-3.5
            hover:-translate-y-1 hover:border-c4 transition-all duration-200 cursor-pointer
            dark:bg-white/5 dark:border-white/10 relative overflow-hidden`}>
          <div className="text-[20px] mb-2">{c.icon}</div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.8px]">{c.label}</p>
          <p className="text-[22px] font-extrabold text-sidebar dark:text-white mt-0.5">
            {fmt(c.key, dashboardStats[c.key])}
          </p>
          <p className={`text-[10px] mt-1 font-semibold ${c.subColor}`}>{c.sub}</p>
        </div>
      ))}
    </div>
  );
}