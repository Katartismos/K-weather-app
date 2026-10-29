"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Sun,
  CloudRain,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";
import { useWeather } from "../context/WeatherContext";

export default function CalendarPage() {
  const {
    weatherData,
    city,
    convertTemp,
    tempUnitLetter,
    convertWind,
    windUnitSymbol,
  } = useWeather();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper to switch months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  // Calendar grid computation
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const cells = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const date = new Date(currentYear, currentMonth - 1, dayNum);
      cells.push({
        date,
        dayNum,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      cells.push({
        date,
        dayNum: day,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill a complete 35 or 42 cell grid
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      cells.push({
        date,
        dayNum: day,
        isCurrentMonth: false,
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  // Map forecast data by date string (YYYY-MM-DD)
  const forecastByDate = useMemo(() => {
    const map = new Map<
      string,
      {
        tempMin: number;
        tempMax: number;
        avgTemp: number;
        condition: string;
        humidity: number;
        windSpeed: number;
      }
    >();

    if (!weatherData?.forecast?.list) return map;

    weatherData.forecast.list.forEach((item) => {
      const dateKey = new Date(item.dt * 1000).toDateString();
      const existing = map.get(dateKey);

      if (existing) {
        existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
        existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
      } else {
        map.set(dateKey, {
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          avgTemp: item.main.temp,
          condition: item.weather[0]?.main || "Clear",
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        });
      }
    });

    return map;
  }, [weatherData]);

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Weather icon helper
  const getWeatherIcon = (condition: string, className = "size-3.5") => {
    switch (condition.toLowerCase()) {
      case "rain":
      case "drizzle":
        return <CloudRain className={`${className} text-blue-400`} />;
      case "clouds":
        return <Cloud className={`${className} text-slate-400`} />;
      default:
        return <Sun className={`${className} text-amber-400`} />;
    }
  };

  const selectedDateKey = selectedDate.toDateString();
  const selectedForecast = forecastByDate.get(selectedDateKey);
  const displayCity = weatherData?.current?.name || city;

  return (
    <main className="min-h-screen pt-22 sm:pt-26 lg:pt-36 px-3 sm:px-4 lg:pr-10 lg:pl-75 pb-12 flex flex-col items-center">
      {/* Centered container occupying roughly 75% on desktop */}
      <div className="w-full lg:w-[75%] max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-archivo mb-1 text-main">
              Weather Calendar
            </h1>
            <p className="text-text-muted text-xs sm:text-sm lg:text-base">
              Synchronized meteorological agenda and forecast timeline
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pill-bg border border-border text-xs sm:text-sm shrink-0">
            <MapPin size={15} className="text-accent shrink-0 animate-pulse" />
            <span className="font-semibold text-main">{displayCity}</span>
            {weatherData?.current?.main?.temp !== undefined ? (
              <span className="text-accent font-bold">
                {convertTemp(weatherData.current.main.temp)}°{tempUnitLetter}
              </span>
            ) : null}
          </div>
        </div>

        {/* Main Calendar Card */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <CalendarIcon size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-main">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <span className="text-xs text-text-muted">
                  {calendarCells.filter((c) => c.isCurrentMonth).length} days in
                  month
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleToday}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-pill-bg hover:bg-surface-hover border border-border text-main transition-colors cursor-pointer"
              >
                Today
              </motion.button>
              <div className="flex items-center bg-pill-bg border border-border rounded-full p-0.5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                  className="size-8 sm:size-9 flex items-center justify-center rounded-full hover:bg-surface-hover text-text-muted hover:text-main transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="size-8 sm:size-9 flex items-center justify-center rounded-full hover:bg-surface-hover text-text-muted hover:text-main transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Weekday Column Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {weekDayNames.map((day) => (
              <div
                key={day}
                className="py-1 text-xs sm:text-sm font-semibold text-text-muted uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarCells.map((cell, idx) => {
              const selected = isSelected(cell.date);
              const today = isToday(cell.date);
              const cellDateKey = cell.date.toDateString();
              const forecast = forecastByDate.get(cellDateKey);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedDate(cell.date);
                    if (!cell.isCurrentMonth) {
                      setCurrentDate(
                        new Date(
                          cell.date.getFullYear(),
                          cell.date.getMonth(),
                          1,
                        ),
                      );
                    }
                  }}
                  className={`min-h-16 sm:min-h-20 lg:min-h-22 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl flex flex-col justify-between items-start transition-colors cursor-pointer relative text-left border ${
                    selected
                      ? "text-gray-100 dark:text-gray-900 border-accent font-bold shadow-md z-10"
                      : cell.isCurrentMonth
                        ? "bg-pill-bg hover:bg-surface-hover border-border text-main"
                        : "bg-transparent border-transparent text-text-muted/30 hover:bg-surface-hover/50"
                  }`}
                >
                  {selected && (
                    <motion.div
                      layoutId="calendar-selected-cell"
                      className="absolute inset-0 bg-accent rounded-xl sm:rounded-2xl z-0 shadow-md border border-accent"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Top: Day Number and Today Indicator */}
                  <div className="w-full flex justify-between items-center relative z-10">
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        selected
                          ? "text-gray-100 dark:text-gray-900"
                          : today
                            ? "text-accent font-bold"
                            : ""
                      }`}
                    >
                      {cell.dayNum}
                    </span>
                    {today && !selected ? (
                      <span className="size-1.5 sm:size-2 rounded-full bg-accent" />
                    ) : null}
                  </div>

                  {/* Bottom: Forecast indicator chip if available */}
                  {forecast ? (
                    <div
                      className={`w-full mt-auto pt-1 flex items-center justify-between text-[10px] sm:text-xs relative z-10 ${
                        selected
                          ? "text-gray-100 dark:text-gray-900"
                          : "text-text-muted"
                      }`}
                    >
                      <span className="truncate">
                        {convertTemp(forecast.avgTemp)}°
                      </span>
                      <span>{getWeatherIcon(forecast.condition)}</span>
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Selected Date Detail Drawer */}
          <div className="mt-2 pt-5 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-track-bg/40 p-4 sm:p-5 rounded-2xl border border-track-border">
            <div className="flex flex-col">
              <span className="text-xs text-text-muted">Selected Date</span>
              <span className="text-base sm:text-lg font-bold text-main">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {selectedForecast ? (
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <Thermometer size={16} className="text-amber-400 shrink-0" />
                  <span className="text-main font-semibold">
                    {convertTemp(selectedForecast.tempMin)}° /{" "}
                    {convertTemp(selectedForecast.tempMax)}°{tempUnitLetter}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplets size={16} className="text-blue-400 shrink-0" />
                  <span className="text-main font-semibold">
                    {Math.round(selectedForecast.humidity)}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind size={16} className="text-teal-400 shrink-0" />
                  <span className="text-main font-semibold">
                    {convertWind(selectedForecast.windSpeed)} {windUnitSymbol}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-text-muted italic">
                Standard seasonal climate conditions for this date
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
