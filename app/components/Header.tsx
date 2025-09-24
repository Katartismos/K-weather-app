'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'
import { MapPin, Search, BellIcon, Sun, Moon, User2 } from 'lucide-react'

const Header = () => {
  const { theme, setTheme } = useTheme();

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

  return (
    <div className="fixed top-0 right-0 left-65 grid grid-cols-[240px_1fr_280px] items-center text-center h-35 bg-bg-top">
      <div className="ml-10 h-full flex items-center justify-start">
        <MapPin size={18} className="inline mr-3" />
        <p className="inline-block text-2xl">New York, 1°</p>
      </div>

      <div className="h-full flex items-center justify-start">
        <div className="gradient-border overflow-hidden w-140 h-18 flex items-center pr-5 mr-25">
          <input 
            type="text"
            placeholder="Search location, city, postalcode or place"
            className="flex-1 text-lg px-5 outline-0 bg-transparent"
          />
          <button className="h-10 w-10 button-accent">
            <Search size={15} />
          </button>
        </div>

        {forecastSpans.map((forecastSpan, idx) => {
          function handleClick() {
            setActiveSpanIndex(idx)
          }

          return (
            <button 
              key={forecastSpan.span} 
              className={`text-text-muted mx-5 cursor-pointer ${idx === activeSpanIndex ? 'underline underline-offset-6 font-bold' : ''}`}
              onClick={() => handleClick()}
            >
              {forecastSpan.span}
            </button>
          )
        })}
      </div>

      <div className="mr-15 h-full rounded-xl flex items-center justify-end gap-10">
        <button className={`size-10 button-accent ${ theme === 'dark' ? 'bg-amber-500' : 'bg-blue-900 text-gray-200'}`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          { theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </button>
        <div className="size-12.5 button-accent">
          <BellIcon size={22} />
        </div>
        <div className="size-12.5 button-accent">
          <User2 size={22} />
        </div>
      </div>
    </div>
  )
}

export default Header