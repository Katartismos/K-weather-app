"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  Sparkles,
  MapPin,
  ArrowRight,
  LayoutGrid,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

export default function FavouritesPage() {
  const upcomingFeatures = [
    {
      icon: MapPin,
      title: "Pinned Locations",
      description:
        "Bookmark home, work, or travel destinations for instant single-tap access.",
    },
    {
      icon: SlidersHorizontal,
      title: "Side-by-Side Comparison",
      description:
        "Contrast precipitation probabilities and thermal curves across multiple regions.",
    },
    {
      icon: Bell,
      title: "Custom Weather Alerts",
      description:
        "Get instant notifications when high-priority locations cross severe weather thresholds.",
    },
  ];

  return (
    <main className="min-h-screen pt-22 sm:pt-26 lg:pt-36 px-3 sm:px-4 lg:pr-10 lg:pl-75 pb-12 flex flex-col items-center">
      {/* Centered container occupying roughly 75% on desktop */}
      <div className="w-full lg:w-[75%] max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-archivo mb-1 text-main">
            Favourites
          </h1>
          <p className="text-text-muted text-xs sm:text-sm lg:text-base">
            Curated personal weather stations and pinned locations
          </p>
        </div>

        {/* Coming Soon Showcase Card */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle Ambient Accent Glows */}
          <div className="absolute -top-20 -right-20 size-60 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="size-16 sm:size-20 rounded-3xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-6 shadow-inner relative group">
            <Heart size={32} className="fill-accent/20 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 size-5 rounded-full bg-accent flex items-center justify-center text-gray-100 dark:text-gray-900">
              <Sparkles size={12} />
            </span>
          </div>

          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/30 mb-4">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Under Active Development
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main mb-3 max-w-lg">
            Personalized Favourites is Coming Soon
          </h2>

          <p className="text-text-muted text-xs sm:text-sm lg:text-base max-w-md mb-8">
            We are designing a dedicated dashboard to let you monitor and compare
            your favorite meteorological locations with synchronized telemetry.
          </p>

          {/* Upcoming Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-10 text-left">
            {upcomingFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-pill-bg border border-border p-4 rounded-2xl hover:border-accent/40 transition-colors shadow-sm"
                >
                  <div className="size-8 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-3">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-main mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-accent text-gray-100 dark:text-gray-900 shadow-md hover:brightness-105 transition-all cursor-pointer"
              >
                <LayoutGrid size={16} />
                Return to Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/charts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-pill-bg hover:bg-surface-hover border border-border text-main transition-colors cursor-pointer"
              >
                View Telemetry Charts
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}