import MainLayout from "../../components/layout/MainLayout";
import StatCards from "../../components/dashboard/StatCards";
import RoomStatus from "../../components/dashboard/RoomStatus";
import RecentActivity from "../../components/dashboard/RecentActivity";
import PaymentsOverview from "../../components/dashboard/PaymentsOverview";
import ComplaintsPanel from "../../components/dashboard/ComplaintsPanel";
import QuickActions from "../../components/dashboard/QuickActions";

export default function DashboardPage() {
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date());

  return (
    <MainLayout>
      <div className="mb-5">
        <h2 className="text-[22px] font-extrabold text-sidebar dark:text-white">Overview</h2>
        <p className="text-[12px] text-gray-400 font-medium mt-0.5">{today} — All systems operational</p>
      </div>

      <div className="space-y-5">
        <StatCards />
        <RoomStatus />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <RecentActivity />
            <ComplaintsPanel />
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[13px] font-bold text-sidebar dark:text-white">💰 Payments Overview</h3>
                <span className="text-[11px] text-c4 cursor-pointer font-semibold px-2 py-1 rounded-md
                  bg-c4/8 border border-c4/20 hover:bg-c4 hover:text-sidebar transition-all">Details</span>
              </div>
              <PaymentsOverview />
            </div>
            <QuickActions />
          </div>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-sidebar p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[15px] text-white">
              🗓️ Reminder: Collect April rent
            </h3>
            <p className="text-[12px] text-white/50 mt-1">
              15 students have pending dues. Send reminders now.
            </p>
          </div>
          <button className="px-4 py-2 text-[12px] font-bold rounded-xl bg-c4 text-sidebar
            hover:bg-c3 transition-colors shrink-0">
            Go to Payments →
          </button>
        </div>
      </div>
    </MainLayout>
  );
}