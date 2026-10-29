"use client";

import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Monitor,
  Bell,
  Info,
  Thermometer,
  Clock,
  Ruler,
} from "lucide-react";
import Image from "next/image";
import { motion, LayoutGroup } from "motion/react";
import { useWeather } from "../context/WeatherContext";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

const TEMP_OPTIONS = [
  { value: "celsius", label: "°C" },
  { value: "fahrenheit", label: "°F" },
] as const;

const WIND_OPTIONS = [
  { value: "kmh", label: "km/h" },
  { value: "mph", label: "mph" },
] as const;

const TIME_OPTIONS = [
  { value: "24h", label: "24h" },
  { value: "12h", label: "12h" },
] as const;

const Settings = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const {
    temperatureUnit,
    setTemperatureUnit,
    windUnit,
    setWindUnit,
    timeFormat,
    setTimeFormat,
  } = useWeather();
  const [mounted, setMounted] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);
  const [severeAlerts, setSevereAlerts] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme?: string) => {
    const nextTheme =
      newTheme && (newTheme === "light" || newTheme === "dark")
        ? newTheme
        : resolvedTheme === "dark"
          ? "light"
          : "dark";
    if (nextTheme === resolvedTheme) return;

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

  return (
    <div className="pt-22 sm:pt-26 lg:pt-36 px-3 sm:px-4 lg:pr-10 lg:pl-75 pb-10 min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-archivo mb-1 text-main">
          Settings
        </h1>
        <p className="text-text-muted text-xs sm:text-sm lg:text-base">
          Manage your application preferences, units, and appearance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Appearance Settings */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Monitor size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-main">Appearance</h2>
              <span className="text-xs text-text-muted">
                Interface theme preferences
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-muted">
              Select your preferred color theme for the interface.
            </p>
            <LayoutGroup id="settings-theme">
              <div className="flex items-center gap-2 bg-track-bg border border-track-border p-1.5 rounded-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] relative">
                {THEME_OPTIONS.map((option) => {
                  const isActive = mounted && resolvedTheme === option.value;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleThemeChange(option.value)}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "text-gray-100 dark:text-gray-900"
                          : "text-text-muted hover:text-main hover:bg-surface-hover"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layout
                          layoutId="settings-theme-pill"
                          className="absolute inset-0 bg-accent rounded-xl shadow-sm settings-theme-pill"
                          transition={{
                            type: "spring",
                            duration: 0.35,
                            bounce: 0.2,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={17} /> {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        </div>

        {/* Units & Formats */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Ruler size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-main">Units & Formats</h2>
              <span className="text-xs text-text-muted">
                Meteorological measurements
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Temperature */}
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Thermometer size={18} className="text-text-muted" />
                <span className="text-sm lg:text-base font-medium text-main">
                  Temperature
                </span>
              </div>
              <LayoutGroup id="settings-temperature">
                <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] relative">
                  {TEMP_OPTIONS.map((option) => {
                    const isActive = temperatureUnit === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTemperatureUnit(option.value)}
                        className={`relative px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? "text-gray-100 dark:text-gray-900"
                            : "text-text-muted hover:text-main hover:bg-surface-hover"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layout
                            layoutId="settings-temp-pill"
                            className="absolute inset-0 bg-accent rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              duration: 0.35,
                              bounce: 0.2,
                            }}
                          />
                        )}
                        <span className="relative z-10">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            {/* Wind Speed */}
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Ruler size={18} className="text-text-muted" />
                <span className="text-sm lg:text-base font-medium text-main">
                  Wind Speed
                </span>
              </div>
              <LayoutGroup id="settings-wind">
                <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] relative">
                  {WIND_OPTIONS.map((option) => {
                    const isActive = windUnit === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setWindUnit(option.value)}
                        className={`relative px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? "text-gray-100 dark:text-gray-900"
                            : "text-text-muted hover:text-main hover:bg-surface-hover"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layout
                            layoutId="settings-wind-pill"
                            className="absolute inset-0 bg-accent rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              duration: 0.35,
                              bounce: 0.2,
                            }}
                          />
                        )}
                        <span className="relative z-10">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            {/* Time Format */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-text-muted" />
                <span className="text-sm lg:text-base font-medium text-main">
                  Time Format
                </span>
              </div>
              <LayoutGroup id="settings-time">
                <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] relative">
                  {TIME_OPTIONS.map((option) => {
                    const isActive = timeFormat === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTimeFormat(option.value)}
                        className={`relative px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? "text-gray-100 dark:text-gray-900"
                            : "text-text-muted hover:text-main hover:bg-surface-hover"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layout
                            layoutId="settings-time-pill"
                            className="absolute inset-0 bg-accent rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              duration: 0.35,
                              bounce: 0.2,
                            }}
                          />
                        )}
                        <span className="relative z-10">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-main">Notifications</h2>
              <span className="text-xs text-text-muted">
                Weather briefings and alerts
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm lg:text-base font-semibold text-main">
                  Daily Weather Summary
                </span>
                <span className="text-xs text-text-muted">
                  Receive a morning briefing of the day&apos;s weather forecast.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={dailySummary}
                onClick={() => setDailySummary(!dailySummary)}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  dailySummary
                    ? "bg-accent border-accent/80 shadow-sm"
                    : "bg-slate-200 dark:bg-white/15 border-slate-300/80 dark:border-white/20"
                }`}
              >
                <motion.span
                  animate={{ x: dailySummary ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="inline-block size-5 rounded-full bg-white shadow-md border border-black/5"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm lg:text-base font-semibold text-main">
                  Severe Weather Alerts
                </span>
                <span className="text-xs text-text-muted">
                  Get immediately notified about extreme weather conditions.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={severeAlerts}
                onClick={() => setSevereAlerts(!severeAlerts)}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${
                  severeAlerts
                    ? "bg-rose-500 border-rose-600/80 shadow-sm"
                    : "bg-slate-200 dark:bg-white/15 border-slate-300/80 dark:border-white/20"
                }`}
              >
                <motion.span
                  animate={{ x: severeAlerts ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="inline-block size-5 rounded-full bg-white shadow-md border border-black/5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* About / Info */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                <Info size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-main">About</h2>
                <span className="text-xs text-text-muted">
                  System and build information
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:justify-start gap-4">
                <div className="size-14 bg-pill-bg rounded-2xl flex items-center justify-center shadow-lg border border-border shrink-0">
                  <Image
                    src="/favicon.png"
                    alt="Logo"
                    width={34}
                    height={34}
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-main">K-Weather App</h3>
                  <p className="text-xs text-text-muted">
                    Version 1.2.0 · Production Build
                  </p>
                </div>
              </div>

              <p className="text-text-muted mt-2 text-xs lg:text-sm">
                Designed and developed by{" "}
                <a
                  href="https://katartismos.vercel.app"
                  target="_blank"
                  className="text-main font-semibold hover:underline"
                >
                  Katartismos
                </a>
                .
                <br />
                Powered by Next.js, Recharts & OpenWeatherMap.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-4 border-t border-border justify-center md:justify-start">
            <a
              href="#"
              className="text-accent hover:underline text-xs font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-text-muted opacity-40">•</span>
            <a
              href="#"
              className="text-accent hover:underline text-xs font-medium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
