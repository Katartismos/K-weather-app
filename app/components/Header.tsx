"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { MapPin, Search, Bell, Sun, Moon, User2, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMobileMenu } from "../context/MobileMenuContext";
import { useWeather, ViewMode } from "../context/WeatherContext";

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { toggle } = useMobileMenu();
  const {
    city,
    setCity,
    weatherData,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    convertTemp,
    tempUnitLetter,
  } = useWeather();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronize search input with global searchQuery
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      setCity(trimmed);
      setSearchQuery(trimmed);
    }
  };

  const handleThemeToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      });
    } else {
      setTheme(nextTheme);
    }
  };

  const forecastSpans: { span: ViewMode }[] = [
    { span: "Daily" },
    { span: "Weekly" },
  ];

  const currentTemp = weatherData?.current?.main?.temp;
  const displayCity = weatherData?.current?.name || city;

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-65 h-18 sm:h-20 lg:h-24 glass-header backdrop-blur-2xl px-3 sm:px-4 lg:px-8 z-30 transition-all duration-300 flex items-center justify-between gap-2 sm:gap-3">
      {/* Left: Mobile Menu & Location */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={toggle}
          aria-label="Open navigation menu"
          className="lg:hidden size-9 sm:size-10 flex items-center justify-center rounded-xl bg-pill-bg hover:bg-surface-hover border border-border text-main transition-colors shrink-0 cursor-pointer active:scale-95"
        >
          <Menu size={19} />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-pill-bg border border-border text-xs sm:text-sm lg:text-base shrink-0">
          <MapPin size={15} className="text-accent shrink-0 animate-pulse" />
          <span className="font-semibold text-main whitespace-nowrap">
            {displayCity}
          </span>
          <span className="text-accent font-bold">
            {currentTemp !== undefined ? `${convertTemp(currentTemp)}°${tempUnitLetter}` : "--°"}
          </span>
        </div>
      </div>

      {/* Center: Search Bar & View Mode Toggle */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-5 flex-1 max-w-2xl px-1 sm:px-2">
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-md h-9 sm:h-10 lg:h-11 rounded-full bg-pill-bg border border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all flex items-center px-3 sm:px-3.5 gap-2"
        >
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..."
            className="flex-1 min-w-0 text-xs sm:text-sm outline-none bg-transparent text-main placeholder:text-text-muted/60"
          />
          <AnimatePresence>
            {searchInput && (
              <motion.button
                key="search-btn"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.15 }}
                type="submit"
                className="text-[11px] font-semibold bg-accent text-gray-100 dark:text-gray-900 px-2 sm:px-2.5 py-1 rounded-full shrink-0 transition-transform active:scale-95 hover:brightness-105 cursor-pointer"
              >
                Search
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        {/* View Mode Segmented Pill */}
        <div className="hidden md:flex items-center bg-pill-bg p-1 rounded-full border border-border shrink-0 relative">
          {forecastSpans.map((forecastSpan) => {
            const isActive = viewMode === forecastSpan.span;
            return (
              <button
                key={forecastSpan.span}
                type="button"
                className={`relative px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-gray-100 dark:text-gray-900 font-semibold"
                    : "text-text-muted hover:text-main"
                }`}
                onClick={() => setViewMode(forecastSpan.span)}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-viewMode-indicator"
                    className="absolute inset-0 bg-accent rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{forecastSpan.span}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Theme Toggle & Quick Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
        <button
          type="button"
          aria-label="Toggle color theme"
          className="size-9 sm:size-9 lg:size-10 rounded-full flex items-center justify-center border border-border bg-pill-bg hover:bg-surface-hover text-main transition-transform cursor-pointer active:scale-95 shrink-0"
          onClick={handleThemeToggle}
        >
          {mounted ? (
            <span className="theme-toggle-icon flex items-center justify-center">
              {resolvedTheme === "dark" ? (
                <Sun size={17} className="text-amber-400" />
              ) : (
                <Moon size={17} className="text-blue-500" />
              )}
            </span>
          ) : (
            <div className="size-4 rounded-full bg-border" />
          )}
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="hidden sm:flex size-9 lg:size-10 rounded-full items-center justify-center border border-border bg-pill-bg hover:bg-surface-hover text-text-muted hover:text-main transition-all cursor-pointer relative shrink-0"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-accent" />
        </button>

        <button
          type="button"
          aria-label="User Profile"
          className="hidden sm:flex size-9 lg:size-10 rounded-full items-center justify-center border border-accent/40 bg-accent/15 text-accent hover:bg-accent/25 transition-all cursor-pointer shrink-0"
        >
          <User2 size={17} />
        </button>
      </div>
    </header>
  );
};

export default Header;
