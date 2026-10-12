'use client';

import { Wind, Compass, Navigation } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const WindChart = () => {
  const { weatherData } = useWeather();
  const windRawSpeed = weatherData?.current?.wind?.speed ?? 0;
  const windKmH = Math.round(windRawSpeed * 3.6);
  const windDeg = weatherData?.current?.wind?.deg ?? 0;
  const windGust = weatherData?.current?.wind?.gust 
    ? Math.round(weatherData.current.wind.gust * 3.6) 
    : null;

  const getCardinalDirection = (deg: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index] || 'N';
  };

  const getBeaufortDescription = (speedKmH: number) => {
    if (speedKmH < 2) return { text: 'Calm', badgeBg: 'bg-teal-500/15 border-teal-500/30 text-teal-400' };
    if (speedKmH <= 11) return { text: 'Light Breeze', badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' };
    if (speedKmH <= 19) return { text: 'Gentle Breeze', badgeBg: 'bg-teal-500/15 border-teal-500/30 text-teal-400' };
    if (speedKmH <= 29) return { text: 'Moderate Breeze', badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' };
    if (speedKmH <= 39) return { text: 'Fresh Breeze', badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400' };
    if (speedKmH <= 50) return { text: 'Strong Breeze', badgeBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400' };
    return { text: 'High Wind', badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-400' };
  };

  const cardinal = getCardinalDirection(windDeg);
  const beaufort = getBeaufortDescription(windKmH);

  return (
    <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:border-accent/35 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3.5 sm:gap-4 relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute -top-10 -right-10 size-28 rounded-full bg-teal-400/10 blur-2xl group-hover:bg-teal-400/20 transition-all pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Wind size={18} />
          </div>
          <span className="font-semibold text-sm lg:text-base text-main">Wind Speed</span>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${beaufort.badgeBg}`}>
          {beaufort.text}
        </span>
      </div>

      {/* Main Metric Value & Compass Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl lg:text-4xl font-intertight-600 text-main tracking-tight">
            {windKmH}
          </span>
          <span className="text-lg lg:text-xl text-text-muted font-normal">km/h</span>
        </div>

        {/* Dynamic Rotating Compass Needle */}
        <div className="flex items-center gap-2 bg-pill-bg px-3 py-1.5 rounded-2xl border border-border shadow-sm">
          <div 
            className="size-5 flex items-center justify-center text-accent transition-transform duration-700 ease-out" 
            style={{ transform: `rotate(${windDeg}deg)` }}
          >
            <Navigation size={15} className="fill-accent text-accent" />
          </div>
          <span className="font-bold text-xs lg:text-sm text-main">{cardinal}</span>
        </div>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between pt-1 border-t border-border text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <Compass size={13} className="text-teal-400 shrink-0" />
          <span>Bearing {windDeg}° {cardinal}</span>
        </div>
        {windGust ? (
          <span className="font-medium text-text-muted">Gusts: {windGust} km/h</span>
        ) : (
          <span className="font-medium opacity-60">Consistent</span>
        )}
      </div>
    </div>
  );
};

export default WindChart;