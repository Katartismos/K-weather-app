'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

interface WeatherData {
  current: any;
  forecast: any;
  uv: any;
}

export type ViewMode = 'Daily' | 'Weekly';

interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  weatherData: WeatherData | null;
  interpolatedHourly: any[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('New York');
  const [viewMode, setViewMode] = useState<ViewMode>('Weekly');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/weather?city=${encodeURIComponent(cityName)}`);
      setWeatherData(response.data);
    } catch (err: any) {
      console.error('Error fetching weather:', err);
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const refresh = () => fetchWeather(city);

  const interpolatedHourly = useMemo(() => {
    if (!weatherData?.forecast) return null;
    
    const list = weatherData.forecast.list;
    const result: any[] = [];
    const nowEpoch = Math.floor(Date.now() / 1000);
    
    // Average weather mapping helper
    const getInterpolatedIcon = (code1: string, code2: string, weight: number) => {
      return weight < 0.5 ? code1 : code2;
    };

    // Interpolate for the first 48 hours
    for (let i = 0; i < list.length - 1; i++) {
      const p1 = list[i];
      const p2 = list[i + 1];
      const t1 = p1.dt;
      const t2 = p2.dt;

      if (t2 - t1 > 3600 * 4) break;

      for (let t = t1; t < t2; t += 3600) {
        if (t < nowEpoch - 3600) continue; // Skip past hours (allow 1h overlap)

        const weight = (t - t1) / (t2 - t1);
        result.push({
          dt: t,
          temp: p1.main.temp + (p2.main.temp - p1.main.temp) * weight,
          feels_like: p1.main.feels_like + (p2.main.feels_like - p1.main.feels_like) * weight,
          humidity: Math.round(p1.main.humidity + (p2.main.humidity - p1.main.humidity) * weight),
          pop: (p1.pop + (p2.pop - p1.pop) * weight),
          weather: [{
            icon: getInterpolatedIcon(p1.weather[0].icon, p2.weather[0].icon, weight),
            description: p1.weather[0].description
          }],
          wind: {
            speed: p1.wind.speed + (p2.wind.speed - p1.wind.speed) * weight
          }
        });
        
        if (result.length >= 48) break;
      }
      if (result.length >= 48) break;
    }
    
    return result;
  }, [weatherData]);

  return (
    <WeatherContext.Provider value={{ 
      city, setCity, viewMode, setViewMode, weatherData, interpolatedHourly, loading, error, refresh 
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
