interface MonthlySummaryProps {
  summary: {
    total_hours: number;
    total_minutes: number;
    work_days: number;
    punctuality: number;
    punctuality_label: string;
  } | null;
}

export default function MonthlySummary({ summary }: MonthlySummaryProps) {
  if (!summary) {
    return (
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-soft border border-slate-100 flex items-center justify-center min-h-[140px]">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-5 mb-6 text-slate-800 shadow-soft border border-slate-100 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
              Monthly Summary
            </p>
            <h3 className="text-3xl font-bold text-slate-900">
              {summary.total_hours}h{" "}
              <span className="text-lg font-medium text-slate-400">{summary.total_minutes}m</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-slate-400 text-xs mb-1 font-medium">
              Work Days
            </p>
            <p className="font-bold text-lg text-slate-700">{summary.work_days} Days</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1 font-medium">
              Punctuality
            </p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg text-slate-700">{summary.punctuality}%</p>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">
                {summary.punctuality_label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
