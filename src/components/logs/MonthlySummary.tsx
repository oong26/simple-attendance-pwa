export default function MonthlySummary() {
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
              168h{" "}
              <span className="text-lg font-medium text-slate-400">20m</span>
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
              <span className="material-icons-round text-sm text-green-600">
                trending_up
              </span>
              <span className="text-xs font-bold text-green-700">+4.2%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <p className="text-slate-400 text-xs mb-1 font-medium">
              Work Days
            </p>
            <p className="font-bold text-lg text-slate-700">22 Days</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1 font-medium">
              Punctuality
            </p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg text-slate-700">95%</p>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">
                Excellent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
