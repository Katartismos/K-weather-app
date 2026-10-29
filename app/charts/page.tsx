"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useWeather } from "../context/WeatherContext";
import {
  Loader2,
  AlertCircle,
  Thermometer,
  Droplets,
  Wind as WindIcon,
  CalendarClock,
  CalendarDays,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Legend,
} from "recharts";

export default function ChartsPage() {
  const {
    weatherData,
    interpolatedHourly,
    loading,
    error,
    refresh,
    convertTemp,
    tempUnitLetter,
    tempUnitSymbol,
    convertWind,
    windUnitSymbol,
    timeFormat,
  } = useWeather();
  const [viewMode, setViewMode] = useState<"48h" | "5d">("48h");

  const chartData = useMemo(() => {
    if (viewMode === "48h") {
      if (!interpolatedHourly) return [];
      return interpolatedHourly.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "numeric",
          hour12: timeFormat === "12h",
          weekday: "short",
        }),
        temp: convertTemp(item.temp),
        feels_like: convertTemp(item.feels_like),
        humidity: Math.round(item.humidity),
        pop: Math.round(item.pop * 100),
        wind: convertWind(item.wind.speed),
      }));
    } else {
      if (!weatherData?.forecast?.list) return [];
      return weatherData.forecast.list.map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "numeric",
          hour12: timeFormat === "12h",
          weekday: "short",
        }),
        temp: convertTemp(item.main.temp),
        feels_like: convertTemp(item.main.feels_like),
        humidity: Math.round(item.main.humidity),
        pop: Math.round(item.pop * 100),
        wind: convertWind(item.wind.speed),
      }));
    }
  }, [
    viewMode,
    interpolatedHourly,
    weatherData,
    convertTemp,
    convertWind,
    timeFormat,
  ]);

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
          className="px-6 py-3 bg-accent text-gray-100 dark:text-gray-900 font-semibold rounded-xl hover:brightness-105 transition-all shadow-lg"
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
        <div className="bg-black/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 shadow-2xl text-xs">
          <p className="font-bold mb-2 text-white/90">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/75 capitalize">
                {entry.name.replace("_", " ")}:
              </span>
              <span className="font-bold text-white">
                {entry.value}
                {entry.name.toLowerCase().includes("temp") ||
                entry.name.toLowerCase().includes("feels")
                  ? `°${tempUnitLetter}`
                  : ""}
                {entry.name === "humidity" || entry.name === "pop" ? "%" : ""}
                {entry.name.toLowerCase().includes("wind")
                  ? ` ${windUnitSymbol}`
                  : ""}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderLegendText = (value: string) => (
    <span className="text-main text-xs font-medium ml-1 capitalize">
      {value.replace("_", " ")}
    </span>
  );

  return (
    <main className="text-lg lg:text-xl flex flex-col gap-6 sm:gap-8 pb-10 px-3 sm:px-4 lg:pr-10 lg:pl-75 pt-22 sm:pt-26 lg:pt-36 min-h-screen transition-all duration-300">
      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 text-main">
            Weather Charts
          </h1>
          <p className="text-text-muted text-xs sm:text-sm lg:text-base">
            Detailed meteorological telemetry and forecasts
          </p>
        </div>

        <div className="flex bg-pill-bg border border-border rounded-full p-1 shadow-sm shrink-0 relative">
          <button
            onClick={() => setViewMode("48h")}
            className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full transition-colors text-xs lg:text-sm cursor-pointer ${
              viewMode === "48h"
                ? "text-gray-100 dark:text-gray-900 font-bold"
                : "text-text-muted hover:text-main"
            }`}
          >
            {viewMode === "48h" && (
              <motion.div
                layoutId="charts-viewMode-pill"
                className="absolute inset-0 bg-accent rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <CalendarClock size={15} />
              48 Hours
            </span>
          </button>
          <button
            onClick={() => setViewMode("5d")}
            className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full transition-colors text-xs lg:text-sm cursor-pointer ${
              viewMode === "5d"
                ? "text-gray-100 dark:text-gray-900 font-bold"
                : "text-text-muted hover:text-main"
            }`}
          >
            {viewMode === "5d" && (
              <motion.div
                layoutId="charts-viewMode-pill"
                className="absolute inset-0 bg-accent rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <CalendarDays size={15} />
              5 Days
            </span>
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        {/* Temperature Chart */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500/15 border border-orange-500/30 p-2 rounded-xl">
              <Thermometer size={22} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-main">
                Temperature & Feels Like
              </h2>
              <span className="text-xs text-text-muted">
                Thermal variance curve
              </span>
            </div>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border-subtle, rgba(255,255,255,0.05))"
                />
                <XAxis
                  dataKey="time"
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  minTickGap={20}
                />
                <YAxis
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  formatter={renderLegendText}
                  wrapperStyle={{ paddingTop: "16px" }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  name={`Temperature (${tempUnitSymbol})`}
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                />
                <Area
                  type="monotone"
                  dataKey="feels_like"
                  name={`Feels Like (${tempUnitSymbol})`}
                  stroke="#fbbf24"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1}
                  fill="url(#colorFeels)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation & Humidity */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500/15 border border-blue-500/30 p-2 rounded-xl">
              <Droplets size={22} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-main">
                Precipitation & Humidity
              </h2>
              <span className="text-xs text-text-muted">
                Moisture and rain probability
              </span>
            </div>
          </div>
          <div className="h-65 sm:h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border-subtle, rgba(255,255,255,0.05))"
                />
                <XAxis
                  dataKey="time"
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  minTickGap={20}
                />
                <YAxis
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  formatter={renderLegendText}
                  wrapperStyle={{ paddingTop: "16px" }}
                />
                <Bar
                  dataKey="pop"
                  name="Precipitation (%)"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                  fillOpacity={0.75}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  name="Humidity (%)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wind Speed Chart */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-500/15 border border-teal-500/30 p-2 rounded-xl">
              <WindIcon size={22} className="text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-main">
                Wind Speed
              </h2>
              <span className="text-xs text-text-muted">
                Aerodynamic velocity tracking
              </span>
            </div>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border-subtle, rgba(255,255,255,0.05))"
                />
                <XAxis
                  dataKey="time"
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  minTickGap={20}
                />
                <YAxis
                  tick={{
                    fill: "var(--color-text-muted, #888)",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  formatter={renderLegendText}
                  wrapperStyle={{ paddingTop: "16px" }}
                />
                <Area
                  type="monotone"
                  dataKey="wind"
                  name={`Wind Speed (${windUnitSymbol})`}
                  stroke="#14b8a6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorWind)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
