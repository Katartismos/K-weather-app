'use client';

import React, { useState, useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';
import { Loader2, AlertCircle, Thermometer, Droplets, Wind as WindIcon, CalendarClock, CalendarDays } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Bar, Line, Legend 
} from 'recharts';

export default function ChartsPage() {
  const { weatherData, interpolatedHourly, loading, error, refresh } = useWeather();
  const [viewMode, setViewMode] = useState<'48h' | '5d'>('48h');

  const chartData = useMemo(() => {
    if (viewMode === '48h') {
      if (!interpolatedHourly) return [];
      return interpolatedHourly.map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', weekday: 'short' }),
        temp: Math.round(item.temp),
        feels_like: Math.round(item.feels_like),
        humidity: Math.round(item.humidity),
        pop: Math.round(item.pop * 100),
        wind: Math.round(item.wind.speed * 3.6),
      }));
    } else {
      if (!weatherData?.forecast?.list) return [];
      return weatherData.forecast.list.map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', weekday: 'short' }),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        humidity: Math.round(item.main.humidity),
        pop: Math.round(item.pop * 100),
        wind: Math.round(item.wind.speed * 3.6),
      }));
    }
  }, [viewMode, interpolatedHourly, weatherData]);

  if (loading && !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pl-4 lg:pl-75 pt-20">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-xl font-medium opacity-70">Fetching chart data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pl-4 lg:pl-75 pt-20 text-center px-4">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-lg opacity-70 mb-6">{error}</p>
        <button 
          onClick={refresh}
          className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/80 transition-colors shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      color: string;
      name: string;
      value: number | string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
          <p className="font-bold mb-2 text-white/90">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-white/80 capitalize">{entry.name.replace('_', ' ')}:</span>
              <span className="font-bold text-white">
                {entry.value}
                {entry.name.includes('temp') || entry.name.includes('feels') ? '°C' : ''}
                {entry.name === 'humidity' || entry.name === 'pop' ? '%' : ''}
                {entry.name === 'wind' ? ' km/h' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <main className="text-lg lg:text-xl flex flex-col gap-8 pb-10 pl-4 lg:pl-75 pt-28 lg:pt-40 pr-4 lg:pr-10 min-h-screen transition-all duration-300">
      
      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Weather Charts</h1>
          <p className="opacity-70 text-base lg:text-lg">Detailed meteorological insights</p>
        </div>
        
        <div className="flex bg-card border border-white/10 rounded-2xl p-1 shadow-lg">
          <button
            onClick={() => setViewMode('48h')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm lg:text-base ${
              viewMode === '48h' ? 'bg-accent text-gray-900 font-bold' : 'hover:bg-white/5 opacity-70'
            }`}
          >
            <CalendarClock size={18} />
            48 Hours
          </button>
          <button
            onClick={() => setViewMode('5d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm lg:text-base ${
              viewMode === '5d' ? 'bg-accent text-gray-900 font-bold' : 'hover:bg-white/5 opacity-70'
            }`}
          >
            <CalendarDays size={18} />
            5 Days
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        
        {/* Temperature Chart */}
        <div className="bg-card rounded-3xl border border-white/5 p-6 lg:p-8 shadow-lg hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500/10 p-2 rounded-xl">
              <Thermometer size={24} className="text-orange-500" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold">Temperature & Feels Like</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                  minTickGap={20}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', opacity: 0.8 }} />
                <Area type="monotone" dataKey="temp" name="Temperature" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="feels_like" name="Feels Like" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorFeels)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation & Humidity */}
        <div className="bg-card rounded-3xl border border-white/5 p-6 lg:p-8 shadow-lg hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500/10 p-2 rounded-xl">
              <Droplets size={24} className="text-blue-500" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold">Precipitation & Humidity</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                  minTickGap={20}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                  dx={-10}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', opacity: 0.8 }} />
                <Bar dataKey="pop" name="Precipitation (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} fillOpacity={0.7} />
                <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind Speed Chart */}
        <div className="bg-card rounded-3xl border border-white/5 p-6 lg:p-8 shadow-lg hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-500/10 p-2 rounded-xl">
              <WindIcon size={24} className="text-teal-500" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold">Wind Speed</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                  minTickGap={20}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', opacity: 0.8 }} />
                <Area type="monotone" dataKey="wind" name="Wind Speed (km/h)" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorWind)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </main>
  );
}