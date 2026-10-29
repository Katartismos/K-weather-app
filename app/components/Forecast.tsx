'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CalendarDays, Clock, TrendingUp, TrendingDown, Thermometer, MapPin } from 'lucide-react';
import TemperatureChart from './TemperatureChart';
import { useWeather } from '../context/WeatherContext';
import { DateTime, FixedOffsetZone } from 'luxon';
import { ForecastItem } from '../../types/weather';
import { getWeatherIconUrl } from '../utils/weatherIcon';

const Forecast = () => {
  const { weatherData, loading, convertTemp, tempUnitLetter, formatTime } = useWeather();
  const [now, setNow] = useState(() => DateTime.now());

  useEffect(() => {
    // Keep local time synchronized live
    const timer = setInterval(() => {
      setNow(DateTime.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !weatherData) {
    return (
      <div className="glass-card col-span-1 md:col-span-2 rounded-3xl h-80 flex flex-col items-center justify-center gap-3">
        <div className="size-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm opacity-60">Loading meteorological forecast...</span>
      </div>
    );
  }

  const current = weatherData.current;
  const forecast = weatherData.forecast;

  // Calculate true real-time local date and time using location's timezone offset
  const localDt = now.setZone(FixedOffsetZone.instance(current.timezone / 60));
  const formattedDate = localDt.toFormat('dd LLLL yyyy');
  const formattedTime = formatTime(localDt, 'standard');
  const tzOffset = localDt.toFormat('ZZZZ');

  // Prepare chart data from forecast (next 4 intervals)
  const chartData = forecast.list.slice(0, 4).map((item: ForecastItem) => {
    const itemDt = DateTime.fromSeconds(item.dt, { zone: 'utc' }).setZone(FixedOffsetZone.instance(forecast.city.timezone / 60));
    return {
      name: formatTime(itemDt, 'short'),
      temp: convertTemp(item.main.temp),
    };
  });

  const periods = [
    { name: 'Now', temp: convertTemp(current.main.temp), icon: Clock, color: 'text-accent' },
    { name: 'High', temp: convertTemp(current.main.temp_max), icon: TrendingUp, color: 'text-amber-400' },
    { name: 'Low', temp: convertTemp(current.main.temp_min), icon: TrendingDown, color: 'text-sky-400' },
    { name: 'Feels', temp: convertTemp(current.main.feels_like), icon: Thermometer, color: 'text-emerald-400' },
  ];

  const weatherDesc = current.weather[0]?.description || 'Clear';
  const iconCode = current.weather[0]?.icon;

  return (
    <div className="glass-card col-span-1 sm:col-span-2 rounded-2xl sm:rounded-3xl text-center grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-5 sm:gap-6 lg:gap-10 py-5 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-10 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Subtle Atmospheric Lighting Aura */}
      <div className="absolute -top-16 -left-16 size-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Left Column: Hero Condition & Metrics */}
      <div className="flex flex-col items-center md:items-start text-left justify-between z-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
            <div className="relative size-16 sm:size-20 lg:size-24 shrink-0 drop-shadow-xl hover:scale-105 transition-transform">
              <Image 
                src={getWeatherIconUrl(iconCode, '4x')} 
                alt={weatherDesc} 
                fill 
                className="object-contain" 
                priority
              />
            </div>
            <div>
              <span className="capitalize text-[11px] sm:text-xs font-semibold text-accent px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-accent/15 border border-accent/30 inline-block shadow-sm">
                {weatherDesc}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-6xl font-intertight-600 tracking-tight my-0.5 sm:my-1 text-main">
                {convertTemp(current.main.temp)}°<span className="text-xl sm:text-2xl lg:text-3xl text-text-muted font-normal">{tempUnitLetter}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-base sm:text-lg lg:text-xl font-medium opacity-90 mt-1">
            <MapPin size={17} className="text-accent shrink-0" />
            <span>{current.name}, {current.sys.country}</span>
          </div>
        </div>

        <div className="w-full mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border flex flex-wrap gap-2 text-xs sm:text-sm text-text-muted">
          <div className="flex items-center gap-1.5 bg-pill-bg px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border">
            <CalendarDays size={13} className="text-accent shrink-0" />
            <span suppressHydrationWarning>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-pill-bg px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border">
            <Clock size={13} className="text-accent shrink-0" />
            <span suppressHydrationWarning>{formattedTime} ({tzOffset})</span>
          </div>
        </div>
      </div>

      {/* Right Column: Temperature Curve & Key Metrics */}
      <div className="flex flex-col gap-3 sm:gap-4 z-10 justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-left font-semibold text-xs sm:text-sm lg:text-base opacity-85">
              Temperature Variation
            </p>
            <span className="text-[11px] sm:text-xs text-text-muted font-medium bg-pill-bg px-2 sm:px-2.5 py-0.5 rounded-full border border-border">
              Coming Hours
            </span>
          </div>
          <div className="w-full h-32 sm:h-36 lg:h-44 min-w-0">
            <TemperatureChart data={chartData} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1 sm:pt-2 font-intertight-600 text-xs sm:text-sm">
          {periods.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.name} 
                className="flex justify-between items-center bg-pill-bg p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-border hover:bg-surface-hover hover:border-accent/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 opacity-70">
                  <Icon size={14} className={p.color} />
                  <span>{p.name}</span>
                </div>
                <span className="text-accent font-bold text-xs sm:text-sm lg:text-base">{p.temp}°{tempUnitLetter}</span>
              </div>
            );
          })}
        </div>        
      </div>
    </div>
  );
};

export default Forecast;