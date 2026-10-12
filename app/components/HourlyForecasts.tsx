'use client';

import Image from 'next/image';
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';
import { ForecastItem } from '../../types/weather';
import { getWeatherIconUrl } from '../utils/weatherIcon';

interface DisplayHour {
  id: number | string;
  time: string;
  icon: string;
  temp: string;
  isNow?: boolean;
}

interface HourlyForecastsProps {
  startIndex: number;
}

const HourlyForecasts: React.FC<HourlyForecastsProps> = ({ startIndex }) => {
  const { weatherData, interpolatedHourly, loading, viewMode } = useWeather();

  if (loading || !weatherData) {
    return (
      <div className="px-6 py-8 opacity-60 flex items-center justify-center gap-2.5">
        <div className="size-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm">Loading forecast intervals...</span>
      </div>
    );
  }

  const currentIntervals = weatherData.forecast;
  let displayData: DisplayHour[] = [];

  if (viewMode === 'Daily') {
    if (interpolatedHourly) {
      displayData = interpolatedHourly.map((item, idx) => ({
        id: item.dt,
        time: idx === 0 ? 'Now' : DateTime.fromSeconds(item.dt + currentIntervals.city.timezone, { zone: 'utc' }).toFormat('ha'),
        icon: item.weather[0]?.icon || '02d',
        temp: `${Math.round(item.temp)}°`,
        isNow: idx === 0,
      }));
    }
  } else {
    // Show Daily steps (Weekly mode)
    const dailyData: DisplayHour[] = [];
    const processedDays = new Set();
    currentIntervals.list.forEach((item: ForecastItem) => {
      const dt = DateTime.fromSeconds(item.dt + currentIntervals.city.timezone, { zone: 'utc' });
      const dateStr = dt.toFormat('yyyy-MM-dd');
      const hour = dt.hour;
      if (!processedDays.has(dateStr) && (hour >= 12 || dailyData.length === 0)) {
        dailyData.push({
          id: dateStr,
          time: dt.toFormat('ccc'),
          icon: item.weather[0]?.icon || '02d',
          temp: `${Math.round(item.main.temp)}°`,
          isNow: dailyData.length === 0,
        });
        processedDays.add(dateStr);
      }
    });
    displayData = dailyData;
  }

  // Slice based on startIndex
  const visibleData = displayData.slice(startIndex, startIndex + 4);

  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 lg:px-4 py-2 grid grid-cols-4 gap-2.5 lg:gap-4 overflow-hidden">
        {visibleData.map((hour: DisplayHour) => (
          <div 
            key={hour.id} 
            className={`border rounded-2xl flex flex-col items-center justify-between py-3 px-1 min-w-[70px] transition-all duration-300 group cursor-default hover:-translate-y-1 shadow-sm ${
              hour.isNow 
                ? 'bg-accent/15 border-accent/40 shadow-accent/10' 
                : 'bg-pill-bg border-border hover:bg-surface-hover hover:border-accent/30'
            }`}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className={`text-xs font-semibold ${hour.isNow ? 'text-accent' : 'text-text-muted group-hover:text-main'}`}>
                {hour.time}
              </span>
              {hour.isNow && (
                <span className="size-1 rounded-full bg-accent animate-ping" />
              )}
            </div>

            <div className="relative size-11 lg:size-14 transition-transform group-hover:scale-110 drop-shadow-md my-1">
              <Image 
                src={getWeatherIconUrl(hour.icon, '2x')} 
                alt="weather icon" 
                fill 
                className="object-contain" 
              />
            </div>

            <p className="font-bold text-sm lg:text-base text-main group-hover:text-accent transition-colors">
              {hour.temp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecasts;