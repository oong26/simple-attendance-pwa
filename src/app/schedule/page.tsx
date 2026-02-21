"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";

interface Workday {
  day: string;
  is_working: boolean;
  start_time: string;
  end_time: string;
}

interface ScheduleData {
  id: number;
  name: string;
  workdays: Workday[];
}

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetchApi("/attendance/department");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.department) {
            setScheduleData(data.department);
          }
        }
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const formatTime = (time: string) => time ? time.substring(0, 5) : "";
  const calculateHours = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startTime = new Date(`1970-01-01T${start}Z`);
    const endTime = new Date(`1970-01-01T${end}Z`);
    const diffMs = endTime.getTime() - startTime.getTime();
    return Math.max(0, diffMs / (1000 * 60 * 60));
  };

  const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : scheduleData && scheduleData.workdays ? (
          <div className="space-y-3">
            {DAYS_OF_WEEK.map((dayName) => {
              const workday = scheduleData.workdays.find(w => w.day === dayName);
              const isWorkday = workday && workday.is_working;
              
              if (isWorkday && workday.start_time && workday.end_time) {
                const start = formatTime(workday.start_time);
                const end = formatTime(workday.end_time);
                const hours = calculateHours(workday.start_time, workday.end_time);
                
                return (
                  <div
                    key={dayName}
                    className="bg-white rounded-xl p-4 border border-slate-100 shadow-card flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--color-primary)]">
                        <span className="material-icons-round text-xl">work</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{dayName}</p>
                        <p className="text-xs text-slate-400">Work hours</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-700">
                        {start} - {end}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {hours} hours
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={dayName}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <span className="material-icons-round text-xl">weekend</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-600">{dayName}</p>
                        <p className="text-xs text-slate-400">Day off</p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-500 px-2.5 py-1 rounded-md font-medium">
                      Off
                    </span>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-white rounded-xl border border-slate-100 shadow-card">
            <p className="text-slate-500 text-sm">No schedule data available.</p>
          </div>
        )}
      </div>
            
    </MobileLayout>
  );
}
