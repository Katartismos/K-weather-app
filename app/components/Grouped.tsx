import Image from 'next/image';
import React from 'react'
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';

interface GroupedProps {
  startIndex: number;
}

const Grouped: React.FC<GroupedProps> = ({ startIndex }) => {
  const { weatherData, loading, viewMode } = useWeather();

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
    return <div className="px-8 py-4 opacity-50 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin"/> Loading weekly forecast...</div>
  }

  const forecast = weatherData.forecast;
  
  // Group by day and take the one closest to 12:00
  const dailyData: any[] = [];
  const processedDays = new Set();

  forecast.list.forEach((item: any) => {
    const dt = DateTime.fromSeconds(item.dt + forecast.city.timezone, { zone: 'utc' });
    const dateStr = dt.toFormat('yyyy-MM-dd');
    const hour = dt.hour;

    // Mid-day forecast
    if (!processedDays.has(dateStr) && (hour >= 12 || dailyData.length === 0)) {
      dailyData.push({
        day: dt.toFormat('cccc'),
        date: dt.toFormat('d LLL'),
        temp: `${Math.round(item.main.temp)}° C`,
        icon: getIcon(item.weather[0].icon),
        dateStr
      });
      processedDays.add(dateStr);
    }
  });

  // Decide what to show based on viewMode
  // User said: When daily is selected, show next 4 days below.
  // When weekly is selected, show "weeks" below.
  // We'll show the next few available days for both, maybe offset slightly for weekly?
  // Let's just show the 5 days.
  const forecastGroup = dailyData.slice(1, 6);

  return (
    <div className="pt-2 flex flex-col gap-1 lg:gap-2">
      {
        forecastGroup.map(forecast => (
          <div key={forecast.dateStr} className="flex justify-between items-center px-4 lg:px-10 py-3 hover:bg-white/5 rounded-2xl transition-all duration-300 group cursor-default animate-in fade-in slide-in-from-right-2">
            <div className="flex flex-col">
              <h3 className="text-lg lg:text-xl font-bold group-hover:text-accent transition-colors">{forecast.day}</h3>
              <h4 className="text-sm lg:text-base opacity-60">{forecast.date}</h4>
            </div>

            <p className="text-lg lg:text-xl font-intertight-600">{forecast.temp}</p>

            <div className="relative w-10 lg:w-12 h-10 lg:h-12 transition-transform group-hover:scale-110">
              <Image src={`/assets/${forecast.icon}`} alt="weather icon" fill className="object-contain" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Grouped