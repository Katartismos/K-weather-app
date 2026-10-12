"use client";

import React, { useState, useEffect } from "react";
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

const Settings = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<
    "celsius" | "fahrenheit"
  >("celsius");
  const [windUnit, setWindUnit] = useState<"ms" | "mph">("ms");
  const [timeFormat, setTimeFormat] = useState<"24h" | "12h">("24h");
  const [dailySummary, setDailySummary] = useState(true);
  const [severeAlerts, setSevereAlerts] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pt-28 lg:pt-36 pl-4 lg:pl-75 px-4 lg:pr-10 pb-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold font-archivo mb-2 text-main">
          Settings
        </h1>
        <p className="text-text-muted text-sm lg:text-base">
          Manage your application preferences, units, and appearance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Appearance Settings */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
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
            <div className="flex items-center gap-2 bg-track-bg border border-track-border p-1.5 rounded-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  mounted && resolvedTheme === "light"
                    ? "bg-accent text-accent-contrast shadow-sm"
                    : "text-text-muted hover:text-main hover:bg-surface-hover"
                }`}
              >
                <Sun size={17} /> Light
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  mounted && resolvedTheme === "dark"
                    ? "bg-accent text-accent-contrast shadow-sm"
                    : "text-text-muted hover:text-main hover:bg-surface-hover"
                }`}
              >
                <Moon size={17} /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* Units & Formats */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
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
              <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setTemperatureUnit("celsius")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    temperatureUnit === "celsius"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  °C
                </button>
                <button
                  type="button"
                  onClick={() => setTemperatureUnit("fahrenheit")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    temperatureUnit === "fahrenheit"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  °F
                </button>
              </div>
            </div>

            {/* Wind Speed */}
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Ruler size={18} className="text-text-muted" />
                <span className="text-sm lg:text-base font-medium text-main">
                  Wind Speed
                </span>
              </div>
              <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setWindUnit("ms")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    windUnit === "ms"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  km/h
                </button>
                <button
                  type="button"
                  onClick={() => setWindUnit("mph")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    windUnit === "mph"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  mph
                </button>
              </div>
            </div>

            {/* Time Format */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-text-muted" />
                <span className="text-sm lg:text-base font-medium text-main">
                  Time Format
                </span>
              </div>
              <div className="flex bg-track-bg border border-track-border rounded-xl p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                <button
                  type="button"
                  onClick={() => setTimeFormat("24h")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    timeFormat === "24h"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  24h
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFormat("12h")}
                  className={`px-3.5 py-1 rounded-lg text-xs lg:text-sm font-semibold transition-all cursor-pointer ${
                    timeFormat === "12h"
                      ? "bg-accent text-accent-contrast shadow-sm"
                      : "text-text-muted hover:text-main hover:bg-surface-hover"
                  }`}
                >
                  12h
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
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
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  dailySummary
                    ? "bg-accent border-accent/80 shadow-sm"
                    : "bg-slate-200 dark:bg-white/15 border-slate-300/80 dark:border-white/20"
                }`}
              >
                <span
                  className={`inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-300 border border-black/5 ${
                    dailySummary ? "translate-x-6" : "translate-x-0.5"
                  }`}
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
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${
                  severeAlerts
                    ? "bg-rose-500 border-rose-600/80 shadow-sm"
                    : "bg-slate-200 dark:bg-white/15 border-slate-300/80 dark:border-white/20"
                }`}
              >
                <span
                  className={`inline-block size-5 transform rounded-full bg-white shadow-md transition-transform duration-300 border border-black/5 ${
                    severeAlerts ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* About / Info */}
        <div className="glass-card rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between">
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
                    Version 1.0.0 · Production Build
                  </p>
                </div>
              </div>

              <p className="text-text-muted mt-2 text-xs lg:text-sm">
                Designed and developed by{" "}
                <span className="text-main font-semibold">KING-KARTA</span>.
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
