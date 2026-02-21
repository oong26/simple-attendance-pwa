type AttendanceStatus = "on-time" | "late" | "off-day" | "absent";

interface ActivityEntry {
  id: number;
  employeeName: string;
  month: string;
  day: number;
  dayName: string;
  status: AttendanceStatus;
  totalHours: string;
  inTime?: string;
  outTime?: string;
  inIcon?: string;
  inIconColor?: string;
  inTimeColor?: string;
  errorMessage?: string;
}

interface ActivityLogProps {
  logs: ActivityEntry[];
  loading: boolean;
}

const STATUS_STYLES: Record<AttendanceStatus, string> = {
  "on-time": "text-slate-500 bg-slate-100",
  late: "text-slate-600 bg-slate-200/60",
  "off-day": "text-blue-500 bg-blue-50",
  absent: "text-slate-500 bg-slate-100",
};

const STATUS_LABELS: Record<AttendanceStatus, string> = {
  "on-time": "On Time",
  late: "Late Arrival",
  "off-day": "Off Day",
  absent: "Absent",
};

export default function ActivityLog({ logs, loading }: ActivityLogProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">
          Recent Activity
        </h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl h-32 border border-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">
          Recent Activity
        </h3>
        <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center text-slate-500">
          No attendance recorded for this month.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">
        Recent Activity
      </h3>

      {logs.map((entry) => (
        <div
          key={entry.id}
          className={`group bg-white rounded-2xl p-4 border border-slate-100 hover:border-blue-200 transition-all shadow-card ${
            entry.status === "off-day" ? "opacity-80" : ""
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {entry.month}
                </span>
                <span className="text-lg font-bold text-slate-800 leading-none">
                  {entry.day}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">
                  {entry.employeeName}
                </h4>
                <p className="text-xs text-slate-500 font-medium mb-1">
                    {entry.dayName}
                </p>
                <span
                  className={`text-xs px-2.5 py-1 rounded-md font-medium inline-block mt-0.5 ${
                    STATUS_STYLES[entry.status]
                  }`}
                >
                  {STATUS_LABELS[entry.status]}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs text-slate-400 font-semibold mb-1">
                Total Hours
              </span>
              <span
                className={`font-bold text-sm ${
                  entry.totalHours === "-"
                    ? "text-slate-300"
                    : "text-slate-800 bg-slate-50 px-2 py-1 rounded"
                }`}
              >
                {entry.totalHours}
              </span>
            </div>
          </div>

          {/* Time details */}
          {entry.inTime && entry.outTime && (
            <div className="flex items-center justify-between bg-slate-50/50 rounded-xl p-3 border border-slate-50">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    entry.inIconColor || "bg-blue-50 text-blue-500"
                  }`}
                >
                  <span className="material-icons-round text-sm">
                    {entry.inIcon || "login"}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    In
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      entry.inTimeColor || "text-slate-700"
                    }`}
                  >
                    {entry.inTime}
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <span className="material-icons-round text-sm">logout</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                    Out
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {entry.outTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error message for absent */}
          {entry.errorMessage && (
            <div className="flex items-center justify-start bg-red-50 rounded-xl p-3 border border-red-100">
              <span className="material-icons-round text-red-400 text-sm mr-2">
                error_outline
              </span>
              <p className="text-sm font-medium text-red-500">
                {entry.errorMessage}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
