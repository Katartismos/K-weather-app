import { CloudSun } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] pl-4 lg:pl-75 pt-28">
      <div className="glass-card rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 size-32 rounded-full bg-accent/15 blur-2xl pointer-events-none" />
        <div className="relative size-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <CloudSun size={28} className="text-accent animate-pulse" />
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold text-lg text-main">Loading Weather Data</h2>
          <p className="text-xs text-text-muted mt-1">Connecting to live meteorological service...</p>
        </div>
      </div>
    </div>
  );
}
