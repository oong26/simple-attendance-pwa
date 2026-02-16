import MobileLayout from "@/components/layout/MobileLayout";

interface MenuItem {
  icon: string;
  label: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: "person",
    label: "Personal Info",
    subtitle: "Name, email, phone",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: "calendar_month",
    label: "Work Schedule",
    subtitle: "Mon - Fri, 9:00 - 17:00",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    icon: "notifications",
    label: "Notifications",
    subtitle: "Push, email alerts",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: "security",
    label: "Security",
    subtitle: "Password, Face ID",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: "help_outline",
    label: "Help & Support",
    subtitle: "FAQ, contact us",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
];

export default function ProfilePage() {
  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Manage your account
        </p>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-4 px-5">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-soft border border-slate-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="material-icons-round text-4xl text-[var(--color-primary)]">
                person
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Alex Morgan</h2>
              <p className="text-sm text-slate-500 font-medium">
                Software Engineer
              </p>
              <p className="text-xs text-[var(--color-primary)] font-semibold mt-1">
                ID: EMP-2024-001
              </p>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-50 transition-colors">
              <span className="material-icons-round text-slate-400">edit</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-card text-center">
            <p className="text-2xl font-bold text-slate-900">248</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Total Days
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-card text-center">
            <p className="text-2xl font-bold text-green-600">96%</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              On Time
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-card text-center">
            <p className="text-2xl font-bold text-[var(--color-primary)]">12</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Leave Days
            </p>
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-2 mb-6">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              className="w-full bg-white rounded-xl p-4 border border-slate-100 shadow-card hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}
              >
                <span className="material-icons-round text-xl">
                  {item.icon}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm text-slate-800">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
              </div>
              <span className="material-icons-round text-slate-300 group-hover:text-slate-500 transition-colors">
                chevron_right
              </span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full bg-red-50 rounded-xl p-4 border border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-red-500 font-semibold mb-6">
          <span className="material-icons-round text-xl">logout</span>
          <span>Log Out</span>
        </button>
      </div>
    </MobileLayout>
  );
}
