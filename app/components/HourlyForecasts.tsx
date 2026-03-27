import Image from 'next/image';
import React from 'react'
import { useWeather } from '../context/WeatherContext';
import { DateTime } from 'luxon';

const HourlyForecasts = () => {
  const { weatherData, loading } = useWeather();

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
    return <div className="px-8 py-4">Loading hourly forecast...</div>
  }

  const forecast = weatherData.forecast;
  // Take the next 4 intervals (next 12 hours)
  const hourly = forecast.list.slice(0, 4).map((item: any, idx: number) => ({
    time: idx === 0 ? "Now" : DateTime.fromSeconds(item.dt + forecast.city.timezone, { zone: 'utc' }).toFormat('ha'),
    icon: getIcon(item.weather[0].icon),
    temp: `${Math.round(item.main.temp)}° C`
  }));

  return (
    <div className="flex flex-col gap-4">
      <p className="px-4 lg:px-8 font-semibold opacity-70">Hourly Forecast</p>
      <div className="px-4 lg:px-8 py-2 grid grid-cols-4 gap-3 lg:gap-8 lg:h-55 overflow-x-auto">
        {
          hourly.map((hour: any) => (
            <div key={hour.time} className="bg-accent/10 border border-white/5 rounded-2xl flex flex-col items-center justify-center py-4 lg:py-0 gap-2 min-w-[80px] hover:bg-accent/20 transition-colors group cursor-default">
              <p className="text-xs lg:text-base font-medium group-hover:text-accent transition-colors">{hour.time}</p>
              <Image src={`/assets/${hour.icon}`} alt="weather icon" width={40} height={40} className="lg:w-[50px] lg:h-[50px] transition-transform group-hover:scale-110" />
              <p className="font-bold text-sm lg:text-lg">{hour.temp}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HourlyForecasts