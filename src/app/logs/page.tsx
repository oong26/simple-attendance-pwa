import MobileLayout from "@/components/layout/MobileLayout";
import ViewToggle from "@/components/logs/ViewToggle";
import MonthNavigator from "@/components/logs/MonthNavigator";
import MonthlySummary from "@/components/logs/MonthlySummary";
import ActivityLog from "@/components/logs/ActivityLog";

export default function LogsPage() {
  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            History
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track your attendance
          </p>
        </div>
        <button className="p-2 rounded-full bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors shadow-sm">
          <span className="material-icons-round text-xl">ios_share</span>
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 px-5">
        <ViewToggle />
        <MonthNavigator />
        <MonthlySummary />
        <ActivityLog />
        <div className="h-6" />
      </div>
    </MobileLayout>
  );
}
