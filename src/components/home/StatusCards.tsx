interface StatusCardsProps {
  checkInTime: string | null;
  totalHours: string;
  overtime: string;
}

export default function StatusCards({
  checkInTime,
  totalHours,
  overtime,
}: StatusCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 mt-4">
      {/* Check In */}
      <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border-subtle)] flex flex-col items-center justify-center shadow-card hover:border-slate-300 transition-colors">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
          Check In
        </span>
        <span className="text-lg font-bold text-slate-900">
          {checkInTime || "--:--"}
        </span>
      </div>

      {/* Total Hours */}
      <div className="bg-white rounded-xl p-4 border-2 border-blue-100/50 flex flex-col items-center justify-center shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-blue-50 rounded-bl-xl -mr-2 -mt-2" />
        <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-1">
          Total Hrs
        </span>
        <span className="text-lg font-bold text-[var(--color-primary)]">
          {totalHours}
        </span>
      </div>

      {/* Overtime */}
      <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border-subtle)] flex flex-col items-center justify-center shadow-card hover:border-slate-300 transition-colors">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
          Overtime
        </span>
        <span className="text-lg font-bold text-slate-900">{overtime}</span>
      </div>
    </div>
  );
}
