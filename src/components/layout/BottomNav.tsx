"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/home", icon: "home", label: "Home" },
  { href: "/logs", icon: "history", label: "Logs" },
  { href: "/schedule", icon: "calendar_month", label: "Schedule" },
  // { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-t border-slate-100 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] shadow-soft z-50">
      <ul className="flex justify-around items-center max-w-sm mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isActive
                      ? "bg-blue-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span className="material-icons-round text-2xl">
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
