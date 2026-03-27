'use client';
import Image from 'next/image'
import { CalendarDays, Clock8 } from 'lucide-react'
import TemperatureChart from './TemperatureChart'
import { useWeather } from '../context/WeatherContext'
import { DateTime } from 'luxon'
import { ForecastItem } from '../../types/weather'

const Forecast = () => {
  const { weatherData, loading } = useWeather();

  if (loading || !weatherData) {
    return <div className="bg-card col-span-1 md:col-span-2 rounded-3xl h-full flex items-center justify-center">Loading weather...</div>
  }

  const current = weatherData.current;
  const forecast = weatherData.forecast;

  const getIcon = (iconCode: string) => {
    const map: Record<string, string> = {
      '01': 'sunny.svg',
      '02': 'cloudy-day.svg',
      '03': 'cloudy.svg',
      '04': 'cloudy.svg',
      '09': 'downpour.svg',
      '10': 'downpour.svg',
      '11': 'dark-lightning-storm.svg',
      '13': 'cloudy.svg', // Snow could be added
      '50': 'cloudy.svg', // Mist
    };
    const base = iconCode.substring(0, 2);
    return map[base] || 'cloudy.svg';
  };

  const dt = DateTime.fromSeconds(current.dt + current.timezone, { zone: 'utc' });
  const formattedDate = dt.toFormat('dd LLLL yyyy');
  const formattedTime = dt.toFormat('HH:mm');

  // Prepare chart data from forecast (next 4 intervals)
  const chartData = forecast.list.slice(0, 4).map((item: ForecastItem) => ({
    name: DateTime.fromSeconds(item.dt + forecast.city.timezone, { zone: 'utc' }).toFormat('HH:mm'),
    temp: Math.round(item.main.temp)
  }));

  const periods = [
    { name: 'Now', temp: Math.round(current.main.temp) },
    { name: 'High', temp: Math.round(current.main.temp_max) },
    { name: 'Low', temp: Math.round(current.main.temp_min) },
    { name: 'Feels', temp: Math.round(current.main.feels_like) },
  ];

  return (
    <div className="bg-card col-span-1 md:col-span-2 rounded-3xl text-center grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 lg:gap-10 py-6 lg:py-8 px-6 lg:px-12.5 border border-white/5 shadow-xl transition-all duration-500">
      <div className="flex flex-col items-center md:items-start text-left">
        <Image 
          src={`/assets/${getIcon(current.weather[0].icon)}`} 
          alt={current.weather[0].description} 
          width={80} 
          height={80} 
          className="mb-2 drop-shadow-lg" 
        />
        <div className="text-4xl lg:text-6xl font-intertight-500 my-1 lg:my-2">{Math.round(current.main.temp)}° C</div>
        <div className="text-xl lg:text-2xl opacity-90">{current.name}, {current.sys.country}</div>

        <hr className="h-0.5 w-full border-t border-accent/20 rounded-full my-4"></hr>

        <div className="flex flex-col gap-1 w-full text-sm lg:text-base opacity-80">
          <div className="flex items-center">
            <CalendarDays size={16} className="mr-2 text-accent" />
            <div>{formattedDate}</div>
          </div>
          <div className="flex items-center">
            <Clock8 size={16} className="mr-2 text-accent" />
            <div>{formattedTime}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-left font-semibold opacity-70">Temperature Variation (Coming Hours)</p>
        <div className="w-full h-40 lg:h-55">
          <TemperatureChart data={chartData} />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 lg:pt-6 font-intertight-600 text-sm lg:text-base">
          {periods.map(p => (
            <div key={p.name} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              <span className="opacity-60">{p.name}:</span>
              <span className="text-accent">{p.temp}°C</span>
            </div>
          ))}
        </div>        
      </div>
    </div>
  )
}

export default Forecast