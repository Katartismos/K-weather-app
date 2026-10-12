'use client';

import Forecast from '../components/Forecast';
import Rain from '../components/Rain';
import UV from '../components/UV';
import Cloud from '../components/Cloud';
import WindChart from '../components/Wind';
import { ChevronRight, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import HourlyForecasts from '../components/HourlyForecasts';
import Grouped from '../components/Grouped';
import { useWeather } from '../context/WeatherContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { weatherData, loading, error, refresh, viewMode } = useWeather();
  const [startIndex, setStartIndex] = useState(0);

  // Reset offset when switching modes
  useEffect(() => {
    setStartIndex(0);
  }, [viewMode]);

  if (loading && !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pl-4 lg:pl-75 pt-20">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-xl font-medium opacity-70">Fetching weather data...</p>
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

  const handleNext = () => {
    // 48 interpolated hours. We show 4 at a time. max is 44.
    // 5-6 days. We show 4 at a time. max is 2.
    const max = viewMode === 'Daily' ? 44 : 2; 
    setStartIndex(prev => Math.min(prev + 4, max));
  };

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 4, 0));
  };

  const isNextDisabled = (viewMode === 'Daily' && startIndex >= 44) || (viewMode === 'Weekly' && startIndex >= 2);

  return (
    <main className="text-lg lg:text-xl grid grid-cols-1 xl:grid-cols-[6.5fr_5fr] gap-8 lg:gap-10 pb-10 pl-4 lg:pl-75 pt-28 lg:pt-40 pr-4 lg:pr-10 min-h-screen transition-all duration-300">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[6fr_5fr] gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Forecast />
        <WindChart />
        <Rain />
        <UV />
        <Cloud />
      </section>
      
      <section className="glass-card rounded-3xl flex flex-col gap-5 py-6 px-4 lg:px-6 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
        <div className="flex justify-between items-center px-2 lg:px-4">
          <button 
            type="button"
            onClick={startIndex === 0 ? undefined : handlePrev}
            disabled={startIndex === 0}
            aria-label="Previous forecast intervals"
            className="size-9 rounded-full flex items-center justify-center border border-border bg-pill-bg hover:bg-surface-hover text-main disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>

          <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-main">
            {viewMode === 'Daily' ? 'Today' : 'This Week'}
          </h2>

          <button 
            type="button"
            onClick={isNextDisabled ? undefined : handleNext}
            disabled={isNextDisabled}
            aria-label="Next forecast intervals"
            className="size-9 rounded-full flex items-center justify-center border border-border bg-pill-bg hover:bg-surface-hover text-main disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <HourlyForecasts startIndex={startIndex} />
        <Grouped />
      </section>
    </main>
  );
}
