"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  useEffect(() => {
    setMounted(true);
    // Splash screen duration - 2.5 seconds
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="bg-[#135bec] min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div 
          className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-white blur-3xl" 
        />
        <div 
          className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-white blur-3xl" 
        />
      </div>

      <div className="z-10 flex flex-col items-center animate-[fade-in-up_1s_ease-out]">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/20 animate-[bounce_2s_infinite]">
          <span className="material-icons-round text-[#135bec] text-6xl">
            domain
          </span>
        </div>
        
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
          {appName}
        </h1>
        <p className="text-blue-100 text-sm font-medium tracking-wide uppercase opacity-80">
          Enterprise Solutions
        </p>
      </div>

      <div className="absolute bottom-12 z-10">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
