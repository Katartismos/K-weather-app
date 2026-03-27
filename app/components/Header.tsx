'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'
import { MapPin, Search, BellIcon, Sun, Moon, User2, Menu } from 'lucide-react'
import { useMobileMenu } from '../context/MobileMenuContext';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { toggle } = useMobileMenu();
  const { city, setCity, weatherData } = useWeather();
  const [searchInput, setSearchInput] = useState('');

  // Update search input when city changes (e.g. from initial load)
  useEffect(() => {
    if (city) setSearchInput(city);
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  // Create a state to handle active spans. Default span is 'Weekly'
  const [activeSpanIndex, setActiveSpanIndex] = useState<number | null>(1);

  // Define an array for the forecast spans and define their type.
  const forecastSpans: {
    span: string
  }[] = [
    { span: 'Daily' },
    { span: 'Weekly' },
    { span: 'Monthly' },
  ]

  const currentTemp = weatherData?.current?.main?.temp;
  const displayCity = weatherData?.current?.name || city;

  return (
    <div className="fixed top-0 right-0 left-0 lg:left-65 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] lg:grid-cols-[240px_1fr_auto] items-center text-center h-24 lg:h-35 bg-bg-top px-4 lg:px-10 z-30 transition-all duration-300">
      <div className="h-full flex items-center justify-start gap-3">
        <button onClick={toggle} className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center">
          <MapPin size={18} className="inline mr-2 lg:mr-3 text-accent" />
          <h1 className="inline-block text-lg lg:text-2xl whitespace-nowrap font-medium">
            {displayCity}, {currentTemp !== undefined ? `${Math.round(currentTemp)}°` : '--°'}
          </h1>
        </div>
      </div>

      <div className="h-full flex items-center justify-start gap-4 lg:gap-10 overflow-hidden">
        <form onSubmit={handleSearch} className="gradient-border overflow-hidden w-full max-w-140 h-12 lg:h-18 flex items-center pr-2 lg:pr-5 shadow-sm">
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..."
            className="flex-1 text-sm lg:text-lg px-3 lg:px-5 outline-0 bg-transparent"
          />
          <button type="submit" className="h-8 w-8 lg:h-10 lg:w-10 button-accent shrink-0 transition-transform active:scale-95">
            <Search size={14} />
          </button>
        </form>

        <div className="hidden md:flex items-center">
          {forecastSpans.map((forecastSpan, idx) => {
            function handleClick() {
              setActiveSpanIndex(idx)
            }

            return (
              <button 
                key={forecastSpan.span} 
                className={`text-text-muted mx-2 lg:mx-4 cursor-pointer whitespace-nowrap text-sm lg:text-base transition-all ${idx === activeSpanIndex ? 'underline underline-offset-6 font-bold text-main' : 'hover:text-main/80'}`}
                onClick={() => handleClick()}
              >
                {forecastSpan.span}
              </button>
            )
          })}
        </div>
      </div>

      <div className="h-full hidden md:flex items-center justify-end gap-3 lg:gap-10 pl-4 lg:pl-10">
        <button className={`size-8 lg:size-10 button-accent ${ theme === 'dark' ? 'bg-amber-500' : 'bg-blue-900 text-gray-200'} transition-colors`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          { theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="size-10 lg:size-12.5 button-accent hover:opacity-90 transition-opacity cursor-pointer">
          <BellIcon size={20} />
        </div>
        <div className="size-10 lg:size-12.5 button-accent hover:opacity-90 transition-opacity cursor-pointer">
          <User2 size={20} />
        </div>
      </div>
    </div>
  )
}

export default Header