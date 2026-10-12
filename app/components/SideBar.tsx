"use client";

import {
  LayoutGrid,
  ChartColumn,
  Heart,
  CalendarDays,
  Settings,
  X,
  CloudSun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenu } from "../context/MobileMenuContext";

const SideBar = () => {
  const pathname = usePathname();
  const { isOpen, close } = useMobileMenu();

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, address: "/" },
    { label: "Charts", icon: ChartColumn, address: "/charts" },
    { label: "Favourites", icon: Heart, address: "/favourites" },
    { label: "Calendar", icon: CalendarDays, address: "/calendar" },
    { label: "Settings", icon: Settings, address: "/settings" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-0 left-0 h-full w-65 bg-sidebar/95 backdrop-blur-xl border-r border-border rounded-r-2xl lg:rounded-r-2xl p-6 flex flex-col justify-between text-lg z-50 transition-transform duration-300 ease-out lg:translate-x-0 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="flex justify-between items-center w-full mb-8 pl-1">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5 group"
            >
              <div className="size-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                <CloudSun size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight font-archivo leading-none text-main">
                  K-WEATHER
                </span>
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold mt-1">
                  Live Feed
                </span>
              </div>
            </Link>
            <button
              onClick={close}
              aria-label="Close menu"
              className="lg:hidden p-1.5 hover:bg-surface-hover rounded-lg text-text-muted hover:text-main transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col gap-2 w-full">
            {navItems.map((item) => {
              const isActive =
                item.address === "/"
                  ? pathname === "/"
                  : pathname === item.address ||
                    pathname.startsWith(`${item.address}/`);

              return (
                <li key={item.label}>
                  <Link
                    href={item.address}
                    onClick={close}
                    className={`group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-base transition-all duration-200 relative ${
                      isActive
                        ? "bg-nav-active font-semibold text-main shadow-sm"
                        : "text-text-muted hover:text-main hover:bg-sidebar-hover"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-accent rounded-full" />
                    )}
                    <item.icon
                      size={19}
                      className={`transition-colors shrink-0 ${
                        isActive
                          ? "text-accent"
                          : "text-text-muted group-hover:text-main"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer info */}
        <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-text-muted px-1">
          <span className="opacity-70">v1.0</span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent/90 font-medium">Connected</span>
          </span>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
