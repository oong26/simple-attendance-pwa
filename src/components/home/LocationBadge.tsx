export default function LocationBadge() {
  return (
    <div className="mx-auto w-full max-w-sm mb-10">
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center justify-center gap-3 backdrop-blur-sm shadow-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
        <span className="text-sm font-semibold text-[var(--color-primary)]">
          You are at: HQ Office (Zone A)
        </span>
      </div>
    </div>
  );
}
