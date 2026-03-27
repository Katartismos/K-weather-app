'use client';
import { Cloudy } from 'lucide-react'
import { useWeather } from '../context/WeatherContext'

const Cloud = () => {
  const { weatherData } = useWeather();
  const clouds = weatherData?.current?.clouds?.all || 0;

  return (
    <div className="bg-card p-6 lg:p-8 rounded-3xl border border-white/5 flex flex-col gap-4 lg:gap-6 hover:bg-white/5 transition-colors shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-accent/10 p-2 rounded-xl">
          <Cloudy size={20} className="text-accent"/>
        </div>
        <div className="font-bold opacity-70 whitespace-nowrap">Cloud cover</div>
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl lg:text-4xl font-intertight-600">{Math.round(clouds)}</div>
        <div className="text-lg lg:text-xl opacity-60 pb-1">%</div>
      </div>
    </div>
  )
}

export default Cloud