'use client';
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Bell, Info, Thermometer, Clock, Ruler } from 'lucide-react';
import Image from 'next/image';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [windUnit, setWindUnit] = useState<'ms' | 'mph'>('ms');
  const [timeFormat, setTimeFormat] = useState<'24h' | '12h'>('24h');
  const [dailySummary, setDailySummary] = useState(true);
  const [severeAlerts, setSevereAlerts] = useState(true);

  return (
    <div className="pt-28 lg:pt-40 pl-4 lg:pl-75 px-4 lg:pr-10 pb-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-intertight-600 mb-2">Settings</h1>
        <p className="text-muted text-sm lg:text-base">Manage your application preferences and appearance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        
        {/* Appearance Settings */}
        <div className="bg-card rounded-3xl p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="text-accent" size={24} />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted">Select your preferred theme for the application.</p>
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl">
              <button 
                onClick={() => setTheme('light')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${theme === 'light' ? 'bg-accent text-gray-900 font-bold shadow-md' : 'hover:bg-white/10'}`}
              >
                <Sun size={18} /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-accent text-gray-900 font-bold shadow-md' : 'hover:bg-white/10'}`}
              >
                <Moon size={18} /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* Units & Formats */}
        <div className="bg-card rounded-3xl p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="text-accent" size={24} />
            <h2 className="text-xl font-semibold">Units & Formats</h2>
          </div>
          
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Thermometer size={18} className="text-muted" />
                <span className="text-sm lg:text-base">Temperature</span>
              </div>
              <div className="flex bg-white/5 rounded-xl p-1">
                <button 
                  onClick={() => setTemperatureUnit('celsius')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${temperatureUnit === 'celsius' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >°C</button>
                <button 
                  onClick={() => setTemperatureUnit('fahrenheit')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${temperatureUnit === 'fahrenheit' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >°F</button>
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Ruler size={18} className="text-muted" />
                <span className="text-sm lg:text-base">Wind Speed</span>
              </div>
              <div className="flex bg-white/5 rounded-xl p-1">
                <button 
                  onClick={() => setWindUnit('ms')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${windUnit === 'ms' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >m/s</button>
                <button 
                  onClick={() => setWindUnit('mph')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${windUnit === 'mph' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >mph</button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-muted" />
                <span className="text-sm lg:text-base">Time Format</span>
              </div>
              <div className="flex bg-white/5 rounded-xl p-1">
                <button 
                  onClick={() => setTimeFormat('24h')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${timeFormat === '24h' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >24h</button>
                <button 
                  onClick={() => setTimeFormat('12h')} 
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${timeFormat === '12h' ? 'bg-accent text-gray-900 font-semibold' : 'hover:bg-white/10'}`}
                >12h</button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-3xl p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-accent" size={24} />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm lg:text-base font-medium">Daily Weather Summary</span>
                <span className="text-xs text-muted">Receive a morning brief of the day's weather.</span>
              </div>
              <button 
                onClick={() => setDailySummary(!dailySummary)} 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dailySummary ? 'bg-accent' : 'bg-white/20'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dailySummary ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm lg:text-base font-medium">Severe Weather Alerts</span>
                <span className="text-xs text-muted">Get notified about extreme weather conditions.</span>
              </div>
              <button 
                onClick={() => setSevereAlerts(!severeAlerts)} 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${severeAlerts ? 'bg-red-500' : 'bg-white/20'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${severeAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* About / Info */}
        <div className="bg-card rounded-3xl p-6 lg:p-8 border border-white/5 shadow-xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <Info className="text-accent" size={24} />
            <h2 className="text-xl font-semibold">About</h2>
          </div>
          
          <div className="flex flex-col gap-4 text-sm text-center md:text-left h-full justify-center">
            <div className="flex flex-col md:flex-row items-center md:justify-start gap-4">
              <div className="size-16 bg-gradient rounded-2xl flex items-center justify-center shadow-lg border border-white/10 shrink-0">
                <Image src="/favicon.png" alt="Logo" width={40} height={40} className="object-contain drop-shadow-sm" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-intertight-600">K-Weather App</h3>
                <p className="text-muted">Version 1.0.0</p>
              </div>
            </div>
            
            <p className="text-muted mt-2">
              Designed and developed by <span className="text-main font-semibold">KING-KARTA</span>. 
              <br />Powered by Next.js & TailwindCSS.
            </p>
            
            <div className="flex gap-4 mt-2 justify-center md:justify-start">
              <a href="#" className="text-accent hover:underline text-xs">Privacy Policy</a>
              <span className="text-white/20">•</span>
              <a href="#" className="text-accent hover:underline text-xs">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings