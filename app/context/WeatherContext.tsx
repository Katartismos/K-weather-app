'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { DateTime } from 'luxon';

import { CurrentWeather, ForecastData, UVData, InterpolatedWeather } from '../../types/weather';

interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastData;
  uv: UVData;
}

export type ViewMode = 'Daily' | 'Weekly';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph';
export type TimeFormat = '24h' | '12h';

interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  weatherData: WeatherData | null;
  interpolatedHourly: InterpolatedWeather[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  // Metric settings & helpers
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  windUnit: WindUnit;
  setWindUnit: (unit: WindUnit) => void;
  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;
  convertTemp: (celsius: number) => number;
  formatTemp: (celsius: number, showUnit?: boolean) => string;
  tempUnitSymbol: string;
  tempUnitLetter: string;
  convertWind: (speedMs: number) => number;
  formatWind: (speedMs: number) => string;
  windUnitSymbol: string;
  formatTime: (dt: DateTime, mode?: 'standard' | 'short') => string;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('Lagos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('Weekly');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Metric preferences with localStorage persistence
  const [temperatureUnit, setTemperatureUnitState] = useState<TemperatureUnit>('celsius');
  const [windUnit, setWindUnitState] = useState<WindUnit>('kmh');
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>('24h');

  useEffect(() => {
    try {
      const savedTemp = localStorage.getItem('k_weather_temp_unit') as TemperatureUnit | null;
      if (savedTemp === 'celsius' || savedTemp === 'fahrenheit') {
        setTemperatureUnitState(savedTemp);
      }
      const savedWind = localStorage.getItem('k_weather_wind_unit') as WindUnit | null;
      if (savedWind === 'kmh' || savedWind === 'mph') {
        setWindUnitState(savedWind);
      }
      const savedTime = localStorage.getItem('k_weather_time_format') as TimeFormat | null;
      if (savedTime === '24h' || savedTime === '12h') {
        setTimeFormatState(savedTime);
      }
    } catch {
      // LocalStorage access may fail in restricted contexts
    }
  }, []);

  const setTemperatureUnit = useCallback((unit: TemperatureUnit) => {
    setTemperatureUnitState(unit);
    try {
      localStorage.setItem('k_weather_temp_unit', unit);
    } catch {}
  }, []);

  const setWindUnit = useCallback((unit: WindUnit) => {
    setWindUnitState(unit);
    try {
      localStorage.setItem('k_weather_wind_unit', unit);
    } catch {}
  }, []);

  const setTimeFormat = useCallback((format: TimeFormat) => {
    setTimeFormatState(format);
    try {
      localStorage.setItem('k_weather_time_format', format);
    } catch {}
  }, []);

  // Conversion Helpers
  const convertTemp = useCallback(
    (celsius: number) => {
      if (celsius === undefined || celsius === null || isNaN(celsius)) return 0;
      if (temperatureUnit === 'fahrenheit') {
        return Math.round((celsius * 9) / 5 + 32);
      }
      return Math.round(celsius);
    },
    [temperatureUnit]
  );

  const formatTemp = useCallback(
    (celsius: number, showUnit = true) => {
      const converted = convertTemp(celsius);
      return showUnit
        ? `${converted}°${temperatureUnit === 'fahrenheit' ? 'F' : 'C'}`
        : `${converted}°`;
    },
    [convertTemp, temperatureUnit]
  );

  const tempUnitSymbol = temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  const tempUnitLetter = temperatureUnit === 'fahrenheit' ? 'F' : 'C';

  const convertWind = useCallback(
    (speedMs: number) => {
      if (speedMs === undefined || speedMs === null || isNaN(speedMs)) return 0;
      if (windUnit === 'mph') {
        return Math.round(speedMs * 2.23694);
      }
      // km/h is standard metric speed (m/s * 3.6)
      return Math.round(speedMs * 3.6);
    },
    [windUnit]
  );

  const windUnitSymbol = windUnit === 'mph' ? 'mph' : 'km/h';

  const formatWind = useCallback(
    (speedMs: number) => {
      return `${convertWind(speedMs)} ${windUnitSymbol}`;
    },
    [convertWind, windUnitSymbol]
  );

  const formatTime = useCallback(
    (dt: DateTime, mode: 'standard' | 'short' = 'standard') => {
      if (timeFormat === '24h') {
        return mode === 'short' ? dt.toFormat('HH:00') : dt.toFormat('HH:mm');
      }
      return mode === 'short' ? dt.toFormat('ha') : dt.toFormat('h:mm a');
    },
    [timeFormat]
  );

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch weather data');
      }
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
    const result: InterpolatedWeather[] = [];
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
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        weatherData,
        interpolatedHourly,
        loading,
        error,
        refresh,
        temperatureUnit,
        setTemperatureUnit,
        windUnit,
        setWindUnit,
        timeFormat,
        setTimeFormat,
        convertTemp,
        formatTemp,
        tempUnitSymbol,
        tempUnitLetter,
        convertWind,
        formatWind,
        windUnitSymbol,
        formatTime,
      }}
    >
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
