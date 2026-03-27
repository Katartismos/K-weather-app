'use client';
import { Sun } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'

const UV = () => {
  const { weatherData } = useWeather();
  const uvIndex = weatherData?.uv?.value || 0;

  const getUvLevel = (uv: number) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="bg-card p-6 lg:p-8 rounded-3xl border border-white/5 flex flex-col gap-4 lg:gap-6 hover:bg-white/5 transition-colors shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-accent/10 p-2 rounded-xl">
          <Sun size={20} className="text-accent"/>
        </div>
        <div className="font-bold opacity-70 whitespace-nowrap">UV Index</div>
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl lg:text-4xl font-intertight-600">{Math.round(uvIndex)}</div>
        <div className="text-lg lg:text-xl opacity-60 pb-1">{getUvLevel(uvIndex)}</div>
      </div>
    </div>
  )
}

export default UV