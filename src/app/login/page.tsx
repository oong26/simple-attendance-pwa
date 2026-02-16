import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-[#f6f6f8] text-slate-900 min-h-screen flex flex-col font-sans">
      {/* Top Navigation / Header */}
      <div className="relative flex h-auto w-full flex-col bg-[#f6f6f8] overflow-x-hidden">
        <div className="flex items-center p-4 justify-between">
          <div className="text-slate-600 flex size-10 shrink-0 items-center justify-center cursor-pointer">
            <span className="material-icons-round">close</span>
          </div>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Attendance Pro
          </h2>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12 max-w-md mx-auto w-full">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#135bec]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#135bec]/20">
            <span className="material-icons-round text-[#135bec] text-5xl">
              domain
            </span>
          </div>
          <h1 className="text-slate-900 tracking-tight text-3xl font-bold leading-tight text-center">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-base font-normal leading-normal mt-2 text-center">
            Sign in to clock your attendance.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full space-y-4">
          {/* ID/Email Input */}
          <div className="flex flex-col w-full">
            <label className="text-slate-700 text-sm font-semibold mb-2 ml-1">
              Employee ID or Email
            </label>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                person
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. EMP-12345"
                type="text"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-slate-700 text-sm font-semibold">
                Password
              </label>
              <Link
                href="#"
                className="text-[#135bec] text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                lock
              </span>
              <input
                className="w-full pl-12 pr-12 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] outline-none transition-all placeholder:text-slate-400"
                placeholder="••••••••"
                type="password"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <span className="material-icons-round text-xl">visibility</span>
              </button>
            </div>
          </div>

          {/* Primary Action: Login */}
          <Link href="/dashboard">
            <button className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#135bec]/20 transition-all flex items-center justify-center gap-2 mt-2">
              <span>Login</span>
            </button>
          </Link>

          {/* Divider */}
          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
              Or secure access
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Secondary Action: Face ID */}
          <button className="w-full bg-[#135bec]/10 border border-[#135bec]/30 hover:bg-[#135bec]/20 text-[#135bec] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3">
            <span className="material-icons-round text-2xl">face</span>
            <span>Sign in with Face ID</span>
          </button>
        </div>

        {/* Illustration / Context Image */}
        <div className="w-full mt-10 px-4">
          <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#135bec]/5 to-[#135bec]/20 border border-[#135bec]/10 flex items-center justify-center overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCycJlNPyUUhcwhhOvhOBMVEFAKZ7j1fyvY-B0WB-06Wa_p6uJ5sJidgKtjAdkr6VFpvTfXv-xxqPHxxAbf2E-zDPG2iIqA7D81C1KM-QFPzG6nBtWQCRoI578Zqz5FZufdPgrqaLW2ATaaZd0rTM3YwMQdU7iWGc0ig6SsZRKMuojiXqy6M_A3y2J1nFLoxTKMmGIchQb4dh7jG2Of9llKzCUKwa7oiMiBXw_5SQPP6wnGhAuXTd_TxkiNBbAq3x1HMSmKdxgAUg')",
              }}
            ></div>
            <div className="flex flex-col items-center z-10">
              <span className="material-icons-round text-[#135bec]/40 text-4xl mb-1">
                verified_user
              </span>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#135bec]/60">
                Secure Enterprise Biometrics
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Support */}
      <footer className="p-8 text-center mt-auto">
        <p className="text-slate-500 text-sm">
          Need help with your account?
          <Link href="#" className="text-[#135bec] font-bold hover:underline ml-1">
            Contact HR
          </Link>
        </p>
        <div className="mt-4 flex justify-center gap-6 opacity-40">
          <span className="text-[10px] font-bold tracking-tighter uppercase">
            Privacy Policy
          </span>
          <span className="text-[10px] font-bold tracking-tighter uppercase">
            Terms of Service
          </span>
        </div>
      </footer>
    </div>
  );
}
