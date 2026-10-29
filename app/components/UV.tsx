"use client";

import { Sun, ShieldAlert, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useWeather } from "../context/WeatherContext";

const UV = () => {
  const { weatherData } = useWeather();
  const uvIndex = weatherData?.uv?.value ?? 0;
  const roundedUv = Math.round(uvIndex);

  const getUvInfo = (uv: number) => {
    if (uv <= 2) {
      return {
        level: "Low",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
        advice: "Safe for outdoor activities",
        tier: 1,
      };
    }
    if (uv <= 5) {
      return {
        level: "Moderate",
        color: "text-amber-400",
        badgeBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
        advice: "Wear sunscreen outdoors",
        tier: 2,
      };
    }
    if (uv <= 7) {
      return {
        level: "High",
        color: "text-orange-400",
        badgeBg: "bg-orange-500/15 border-orange-500/30 text-orange-400",
        advice: "Seek shade during midday",
        tier: 3,
      };
    }
    if (uv <= 10) {
      return {
        level: "Very High",
        color: "text-rose-400",
        badgeBg: "bg-rose-500/15 border-rose-500/30 text-rose-400",
        advice: "Extra sun protection needed",
        tier: 4,
      };
    }
    return {
      level: "Extreme",
      color: "text-purple-400",
      badgeBg: "bg-purple-500/15 border-purple-500/30 text-purple-400",
      advice: "Avoid midday direct sun",
      tier: 5,
    };
  };

  const info = getUvInfo(roundedUv);

  return (
    <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3.5 sm:gap-4 relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute -top-10 -right-10 size-28 rounded-full bg-amber-400/10 blur-2xl group-hover:bg-amber-400/20 transition-all pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sun size={18} />
          </div>
          <span className="font-semibold text-sm lg:text-base text-main">
            UV Index
          </span>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${info.badgeBg}`}
        >
          {info.level}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-intertight-600 text-main tracking-tight">
          {roundedUv}
        </span>
        <span className="text-xs text-text-muted font-medium">/ 11+ max</span>
      </div>

      {/* 5-tier Segmented WHO Meter */}
      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-5 gap-1.5 w-full">
          {[1, 2, 3, 4, 5].map((tier) => {
            const isActive = tier <= info.tier;
            const colors = [
              "bg-emerald-400",
              "bg-amber-400",
              "bg-orange-400",
              "bg-rose-400",
              "bg-purple-400",
            ];
            return (
              <motion.div
                key={tier}
                initial={{ scaleX: 0, opacity: 0.5 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: tier * 0.08, duration: 0.3 }}
                className={`h-1.5 rounded-full origin-left transition-colors duration-500 ${
                  isActive
                    ? colors[tier - 1]
                    : "bg-pill-bg border border-border"
                }`}
              />
            );
          })}
        </div>

        {/* Footer Guidance */}
        <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
          {roundedUv <= 2 ? (
            <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert size={13} className="text-amber-400 shrink-0" />
          )}
          <span className="truncate">{info.advice}</span>
        </div>
      </div>
    </div>
  );
};

export default UV;
