'use client';

import { Cloudy, Eye, Droplets } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Cloud = () => {
  const { weatherData } = useWeather();
  const clouds = Math.round(weatherData?.current?.clouds?.all ?? 0);
  const humidity = weatherData?.current?.main?.humidity;
  const rawVisibility = weatherData?.current?.visibility;
  const visibilityKm = rawVisibility !== undefined ? Math.round(rawVisibility / 1000) : null;

  const getCloudCoverage = (pct: number) => {
    if (pct <= 10) {
      return {
        label: 'Clear',
        desc: 'Unobstructed sky',
        badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      };
    }
    if (pct <= 35) {
      return {
        label: 'Mostly Clear',
        desc: 'Scattered clouds',
        badgeBg: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
      };
    }
    if (pct <= 70) {
      return {
        label: 'Partly Cloudy',
        desc: 'Intermittent cloud cover',
        badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      };
    }
    if (pct <= 85) {
      return {
        label: 'Mostly Cloudy',
        desc: 'Substantial cloud blanket',
        badgeBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      };
    }
    return {
      label: 'Overcast',
      desc: 'Complete cloud overcast',
      badgeBg: 'bg-slate-500/20 border-slate-500/30 text-slate-300',
    };
  };

  const coverage = getCloudCoverage(clouds);

  return (
    <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:border-accent/35 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3.5 sm:gap-4 relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute -top-10 -right-10 size-28 rounded-full bg-slate-400/10 blur-2xl group-hover:bg-slate-400/20 transition-all pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-slate-500/15 border border-slate-500/30 flex items-center justify-center text-slate-300">
            <Cloudy size={18} />
          </div>
          <span className="font-semibold text-sm lg:text-base text-main">Cloud Cover</span>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${coverage.badgeBg}`}>
          {coverage.label}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-intertight-600 text-main tracking-tight">
          {clouds}
        </span>
        <span className="text-lg lg:text-xl text-text-muted font-normal">% coverage</span>
      </div>

      {/* Progress Bar & Secondary Telemetry */}
      <div className="flex flex-col gap-1.5">
        <div className="w-full h-2 rounded-full bg-pill-bg border border-border overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-slate-400 via-teal-400 to-accent rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${Math.max(clouds, 4)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-text-muted mt-1">
          <div className="flex items-center gap-1">
            <Eye size={12} className="text-accent shrink-0" />
            <span>{visibilityKm !== null ? `${visibilityKm} km visibility` : coverage.desc}</span>
          </div>
          {humidity !== undefined && (
            <div className="flex items-center gap-1 font-medium text-text-muted">
              <Droplets size={12} className="text-sky-400 shrink-0" />
              <span>{humidity}% hum.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cloud;