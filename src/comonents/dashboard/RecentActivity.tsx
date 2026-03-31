import { recentActivity } from "@/data/dummyData";

const bgMap: Record<string, string> = {
  student: "bg-c4/10", payment: "bg-emerald-50", complaint: "bg-amber-50", room: "bg-c3/15",
};

export default function RecentActivity() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[13px] font-bold text-sidebar dark:text-white">⚡ Recent Activity</h3>
        <span className="text-[11px] text-c4 cursor-pointer font-semibold
          px-2 py-1 rounded-md bg-c4/8 border border-c4/20 hover:bg-c4 hover:text-sidebar transition-all">
          View all
        </span>
      </div>
      <div className="space-y-2">
        {recentActivity.map((a, i) => (
          <div key={i}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-c4/4 border border-c4/10
              hover:bg-c4/10 hover:border-c3 transition-all">
            <div className={`w-[30px] h-[30px] rounded-lg ${bgMap[a.type]} flex items-center
              justify-center text-[13px] shrink-0`}>
              {a.icon}
            </div>
            <span className="text-[12px] font-medium text-sidebar dark:text-white flex-1">{a.text}</span>
            <span className="text-[10px] text-gray-400 whitespace-nowrap">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}