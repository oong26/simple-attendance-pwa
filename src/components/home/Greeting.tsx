"use client";

import { useEffect, useState } from "react";

interface GreetingProps {
  userName?: string;
}

export default function Greeting({ userName = "Guest" }: GreetingProps) {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <p className="text-[var(--color-text-muted)] text-sm font-medium mb-1">
          {greeting},
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {userName}
        </h1>
      </div>
      <button className="relative group">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-surface)] shadow-sm group-hover:border-[var(--color-primary)] transition-colors bg-gradient-to-br from-blue-100 to-blue-200">
          <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)]">
            <span className="material-icons-round text-2xl">person</span>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full ring-1 ring-slate-100" />
      </button>
    </div>
  );
}
