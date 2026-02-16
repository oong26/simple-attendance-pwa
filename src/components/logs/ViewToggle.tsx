"use client";

import { useState } from "react";

export default function ViewToggle() {
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");

  return (
    <div className="bg-white p-1 rounded-xl flex mb-6 relative shadow-sm border border-slate-100">
      {/* Sliding indicator */}
      <div
        className={`absolute inset-y-1 w-[calc(50%-4px)] bg-slate-100 rounded-lg shadow-sm transition-transform duration-300 border border-slate-200 ${
          activeView === "calendar" ? "translate-x-[calc(100%+4px)]" : "left-1"
        }`}
      />
      <button
        onClick={() => setActiveView("list")}
        className={`flex-1 relative z-10 py-1.5 text-sm text-center transition-colors ${
          activeView === "list"
            ? "font-semibold text-slate-900"
            : "font-medium text-slate-500 hover:text-slate-800"
        }`}
      >
        List View
      </button>
      <button
        onClick={() => setActiveView("calendar")}
        className={`flex-1 relative z-10 py-1.5 text-sm text-center transition-colors ${
          activeView === "calendar"
            ? "font-semibold text-slate-900"
            : "font-medium text-slate-500 hover:text-slate-800"
        }`}
      >
        Calendar
      </button>
    </div>
  );
}
