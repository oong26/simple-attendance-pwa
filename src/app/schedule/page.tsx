import MobileLayout from "@/components/layout/MobileLayout";

export default function SchedulePage() {
  return (
    <MobileLayout>
      <header className="px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Schedule
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Your work schedule
        </p>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 px-5">
        {/* Weekly schedule */}
        <div className="space-y-3">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <div
                key={day}
                className="bg-white rounded-xl p-4 border border-slate-100 shadow-card flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                    <span className="material-icons-round text-xl">
                      work
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">
                      {day}
                    </p>
                    <p className="text-xs text-slate-400">Regular shift</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">
                    09:00 - 17:00
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    8 hours
                  </p>
                </div>
              </div>
            )
          )}
          {["Saturday", "Sunday"].map((day) => (
            <div
              key={day}
              className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between opacity-60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <span className="material-icons-round text-xl">
                    weekend
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-600">
                    {day}
                  </p>
                  <p className="text-xs text-slate-400">Day off</p>
                </div>
              </div>
              <span className="text-xs bg-blue-50 text-blue-500 px-2.5 py-1 rounded-md font-medium">
                Off
              </span>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
