import Image from 'next/image';
import React from 'react'
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';

interface HourlyForecastsProps {
  startIndex: number;
}

const HourlyForecasts: React.FC<HourlyForecastsProps> = ({ startIndex }) => {
  const { weatherData, interpolatedHourly, loading, viewMode } = useWeather();

  const getIcon = (iconCode: string) => {
    const map: Record<string, string> = {
      '01': 'sunny.svg',
      '02': 'cloudy-day.svg',
      '03': 'cloudy.svg',
      '04': 'cloudy.svg',
      '09': 'downpour.svg',
      '10': 'downpour.svg',
      '11': 'dark-lightning-storm.svg',
      '13': 'cloudy.svg',
      '50': 'cloudy.svg',
    };
    const base = iconCode.substring(0, 2);
    return map[base] || 'cloudy.svg';
  };

  if (loading || !weatherData) {
    return <div className="px-8 py-4 opacity-50 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin"/> Loading forecast...</div>
  }

  let displayData: any[] = [];

  if (viewMode === 'Daily') {
    // Show 1-hour steps (Interpolated)
    if (interpolatedHourly) {
      displayData = interpolatedHourly.map((item, idx) => ({
        id: item.dt,
        time: idx === 0 ? "Now" : DateTime.fromSeconds(item.dt + weatherData.forecast.city.timezone, { zone: 'utc' }).toFormat('ha'),
        icon: getIcon(item.weather[0].icon),
        temp: `${Math.round(item.temp)}° C`
      }));
    }
  } else {
    // Show Daily steps (Weekly mode)
    // Group forecast by day
    const dailyData: any[] = [];
    const processedDays = new Set();
    weatherData.forecast.list.forEach((item: any) => {
      const dt = DateTime.fromSeconds(item.dt + weatherData.forecast.city.timezone, { zone: 'utc' });
      const dateStr = dt.toFormat('yyyy-MM-dd');
      const hour = dt.hour;
      if (!processedDays.has(dateStr) && (hour >= 12 || dailyData.length === 0)) {
        dailyData.push({
          id: dateStr,
          time: dt.toFormat('ccc'),
          icon: getIcon(item.weather[0].icon),
          temp: `${Math.round(item.main.temp)}° C`
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
      <div className="px-4 lg:px-8 py-2 grid grid-cols-4 gap-3 lg:gap-8 lg:h-55 overflow-hidden">
        {
          visibleData.map((hour: any) => (
            <div key={hour.id} className="bg-accent/10 border border-white/5 rounded-2xl flex flex-col items-center justify-center py-4 lg:py-0 gap-2 min-w-[80px] hover:bg-accent/20 transition-all duration-300 group cursor-default animate-in fade-in zoom-in-95">
              <p className="text-xs lg:text-base font-medium group-hover:text-accent transition-colors">{hour.time}</p>
              <div className="relative w-10 h-10 lg:w-16 lg:h-16 transition-transform group-hover:scale-110">
                <Image src={`/assets/${hour.icon}`} alt="weather icon" fill className="object-contain" />
              </div>
              <p className="font-bold text-sm lg:text-lg">{hour.temp}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HourlyForecasts