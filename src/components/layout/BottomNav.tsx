"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/logs", icon: "history", label: "Logs" },
  { href: "/schedule", icon: "calendar_month", label: "Schedule" },
  // { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t border-slate-100 px-6 pb-8 pt-3 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.03)]">
      <ul className="flex justify-between items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50"
                      : "group-hover:bg-slate-50"
                  }`}
                >
                  <span className="material-icons-round text-xl">
                    {item.icon}
                  </span>
                </div>
                <span
                  className={`text-[11px] ${
                    isActive ? "font-semibold" : "font-medium"
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
