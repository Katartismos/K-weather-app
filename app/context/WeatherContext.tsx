'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface WeatherData {
  current: any;
  forecast: any;
  uv: any;
}

interface WeatherContextType {
  city: string;
  setCity: (city: string) => void;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('New York');
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

  return (
    <WeatherContext.Provider value={{ city, setCity, weatherData, loading, error, refresh }}>
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
