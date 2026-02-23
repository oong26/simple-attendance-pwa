import BottomNav from "./BottomNav";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="bg-slate-50 min-h-screen flex justify-center selection:bg-[var(--color-primary)] selection:text-white">
      <div className="bg-white w-full max-w-md h-[100dvh] flex flex-col relative overflow-hidden shadow-2xl border-x border-slate-100">
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full relative">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
