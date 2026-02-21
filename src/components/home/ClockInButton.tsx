"use client";

import { useState } from "react";

interface ClockInButtonProps {
  onClockIn: () => void;
  disabled?: boolean;
}

export default function ClockInButton({ onClockIn, disabled = false }: ClockInButtonProps) {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    if (!isClockedIn) {
      onClockIn();
    } else {
      setIsClockedIn(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[280px]">
      {/* Decorative rings */}
      <div className="absolute w-64 h-64 rounded-full border border-slate-100 opacity-60 pointer-events-none" />
      <div className="absolute w-80 h-80 rounded-full border border-slate-50 opacity-50 pointer-events-none" />

      {/* Main button */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`group relative w-56 h-56 rounded-full shadow-xl flex flex-col items-center justify-center text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] animate-pulse-subtle z-20 ${
          disabled
            ? "bg-slate-300 shadow-none cursor-not-allowed opacity-80"
            : isClockedIn
            ? "bg-orange-500 shadow-orange-200 hover:bg-orange-600"
            : "bg-[var(--color-primary)] shadow-blue-200 hover:bg-[var(--color-primary-hover)]"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        <span className="material-icons-round text-6xl mb-3 group-hover:scale-110 transition-transform drop-shadow-md">
          fingerprint
        </span>
        <span className="text-xl font-bold tracking-wide drop-shadow-sm">
          {"Attendance"}
        </span>
        <span className="text-xs text-blue-100 mt-1 opacity-90 font-medium">
          Tap to verify face ID
        </span>
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </div>
  );
}
