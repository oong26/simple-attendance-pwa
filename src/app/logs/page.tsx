"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import ViewToggle from "@/components/logs/ViewToggle";
import MonthNavigator from "@/components/logs/MonthNavigator";
import MonthlySummary from "@/components/logs/MonthlySummary";
import ActivityLog from "@/components/logs/ActivityLog";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

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

interface SummaryData {
  total_hours: number;
  total_minutes: number;
  work_days: number;
  punctuality: number;
  punctuality_label: string;
  trend: string;
}
export default function LogsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [logs, setLogs] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const month = currentDate.getMonth() + 1; // JS months are 0-indexed
        const year = currentDate.getFullYear();
        
        const res = await fetchApi(`/attendance/history?month=${month}&year=${year}`);
        const data = await res.json();
        
        if (data.success) {
          setSummary(data.summary);
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentDate]);
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
        {/* <button className="p-2 rounded-full bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors shadow-sm">
          <span className="material-icons-round text-xl">ios_share</span>
        </button> */}
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 px-5">
        {/* <ViewToggle /> */}
        <MonthNavigator currentDate={currentDate} onDateChange={setCurrentDate} />
        <MonthlySummary summary={summary} />
        <ActivityLog logs={logs} loading={loading} />
        <div className="h-6" />
      </div>
    </MobileLayout>
  );
}
