import BottomNav from "./BottomNav";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="bg-white min-h-screen h-screen overflow-hidden flex flex-col selection:bg-[var(--color-primary)] selection:text-white max-w-md mx-auto">
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
