import { complaints } from "@/data/dummyData";

const statusStyle: Record<string, string> = {
  Open:        "bg-red-50 text-red-500 border-red-200",
  "In Progress": "bg-amber-50 text-amber-500 border-amber-200",
};

export default function ComplaintsPanel() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[13px] font-bold text-sidebar dark:text-white">🛠️ Complaints Panel</h3>
        <span className="text-[11px] text-c4 cursor-pointer font-semibold px-2 py-1 rounded-md
          bg-c4/8 border border-c4/20 hover:bg-c4 hover:text-sidebar transition-all">View all</span>
      </div>
      <div className="space-y-2">
        {complaints.map((c, i) => (
          <div key={i}
            className="flex items-center gap-3 p-2.5 rounded-xl border-[1.5px] border-c3/25
              bg-white dark:bg-white/5 hover:border-c4 hover:translate-x-0.5 transition-all">
            <span className="text-[11px] font-bold text-c4 bg-c4/10 px-2 py-1 rounded-md shrink-0">
              Rm {c.room}
            </span>
            <span className="text-[12px] font-medium text-sidebar dark:text-white flex-1">{c.issue}</span>
            <span className={`text-[9px] font-bold px-2 py-1 rounded-full border ${statusStyle[c.status]}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}