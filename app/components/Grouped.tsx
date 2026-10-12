'use client';

import Image from 'next/image';
import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';
import { ForecastItem } from '../../types/weather';
import { getWeatherIconUrl } from '../utils/weatherIcon';

interface DailyForecast {
  day: string;
  date: string;
  temp: string;
  icon: string;
  dateStr: string;
  desc: string;
}

const Grouped: React.FC = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return (
      <div className="px-6 py-6 opacity-60 flex items-center justify-center gap-2">
        <div className="size-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <span className="text-sm">Loading weekly forecast...</span>
      </div>
    );
  }

  const forecast = weatherData.forecast;
  const dailyData: DailyForecast[] = [];
  const processedDays = new Set();

  forecast.list.forEach((item: ForecastItem) => {
    const dt = DateTime.fromSeconds(item.dt + forecast.city.timezone, { zone: 'utc' });
    const dateStr = dt.toFormat('yyyy-MM-dd');
    const hour = dt.hour;

    // Mid-day forecast representative
    if (!processedDays.has(dateStr) && (hour >= 12 || dailyData.length === 0)) {
      dailyData.push({
        day: dt.toFormat('cccc'),
        date: dt.toFormat('d LLL'),
        temp: `${Math.round(item.main.temp)}°`,
        icon: item.weather[0]?.icon || '02d',
        desc: item.weather[0]?.description || '',
        dateStr,
      });
      processedDays.add(dateStr);
    }
  });

  const forecastGroup = dailyData.slice(1, 6);

  return (
    <div className="pt-2 flex flex-col gap-2">
      {forecastGroup.map((forecast) => (
        <div 
          key={forecast.dateStr} 
          className="flex justify-between items-center px-4 lg:px-6 py-3 rounded-2xl bg-pill-bg border border-border hover:border-accent/35 hover:bg-surface-hover transition-all duration-300 group cursor-default shadow-sm"
        >
          <div className="flex flex-col">
            <h3 className="text-base lg:text-lg font-bold group-hover:text-accent transition-colors text-main">
              {forecast.day}
            </h3>
            <span className="text-xs text-text-muted capitalize">
              {forecast.date} · {forecast.desc}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-base lg:text-lg font-intertight-600 text-main">
              {forecast.temp}
            </p>
            <div className="relative size-10 lg:size-11 transition-transform group-hover:scale-110 drop-shadow-sm shrink-0">
              <Image 
                src={getWeatherIconUrl(forecast.icon, '2x')} 
                alt="weather icon" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grouped;