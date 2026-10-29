"use client";

import { CloudSunRain, Droplets } from "lucide-react";
import { motion } from "motion/react";
import { useWeather } from "../context/WeatherContext";

const Rain = () => {
  const { weatherData } = useWeather();
  const rawPop = weatherData?.forecast?.list?.[0]?.pop ?? 0;
  const rainChance = Math.round(rawPop * 100);

  const getRainCategory = (chance: number) => {
    if (chance <= 15) {
      return {
        label: "Low",
        desc: "Dry conditions expected",
        badgeBg: "bg-sky-500/15 border-sky-500/30 text-sky-400",
      };
    }
    if (chance <= 45) {
      return {
        label: "Possible",
        desc: "Passing showers possible",
        badgeBg: "bg-blue-500/15 border-blue-500/30 text-blue-400",
      };
    }
    if (chance <= 75) {
      return {
        label: "Likely",
        desc: "Rain showers anticipated",
        badgeBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
      };
    }
    return {
      label: "High",
      desc: "Heavy rainfall expected",
      badgeBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    };
  };

  const category = getRainCategory(rainChance);

  return (
    <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between gap-3.5 sm:gap-4 relative overflow-hidden group">
      {/* Background subtle glow */}
      <div className="absolute -top-10 -right-10 size-28 rounded-full bg-sky-400/10 blur-2xl group-hover:bg-sky-400/20 transition-all pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <CloudSunRain size={18} />
          </div>
          <span className="font-semibold text-sm lg:text-base text-main">
            Precipitation
          </span>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${category.badgeBg}`}
        >
          {category.label}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-intertight-600 text-main tracking-tight">
          {rainChance}
        </span>
        <span className="text-lg lg:text-xl text-text-muted font-normal">
          % probability
        </span>
      </div>

      {/* Progress Bar & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <div className="w-full h-2 rounded-full bg-pill-bg border border-border overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-sky-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(rainChance, 3)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
          <Droplets size={13} className="text-sky-400 shrink-0" />
          <span className="truncate">{category.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default Rain;
