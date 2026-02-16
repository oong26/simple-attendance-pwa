"use client";

import { useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MonthNavigator() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9)); // October 2023

  const goToPrev = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNext = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="flex items-center justify-between mb-5 px-1">
      <button
        onClick={goToPrev}
        className="p-1 rounded-full hover:bg-slate-200 transition-colors"
      >
        <span className="material-icons-round text-slate-500">
          chevron_left
        </span>
      </button>
      <h2 className="text-lg font-bold text-slate-800">
        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <button
        onClick={goToNext}
        className="p-1 rounded-full hover:bg-slate-200 transition-colors"
      >
        <span className="material-icons-round text-slate-500">
          chevron_right
        </span>
      </button>
    </div>
  );
}
