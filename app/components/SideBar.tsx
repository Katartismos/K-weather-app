'use client';

import { LayoutGrid, ChartColumn, Heart, CalendarDays, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // On mount, read activeIndex from localStorage

  useEffect(() => {
    const savedIndex = localStorage.getItem('activeIndex');
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    } else {
      setActiveIndex(0);
    }
  }, []);

  // Save activeIndex to localStorage whenever it changes
  useEffect(() => {
    if (activeIndex !== null) {
      localStorage.setItem('activeIndex', String(activeIndex));
    }
  }, [activeIndex]);

  const navItems: {
    label: string,
    icon: React.ComponentType<{ size: number }>,
    address: string
  }[] = [
    { label: 'Dashboard', icon: LayoutGrid, address: "/" },
    { label: 'Charts', icon: ChartColumn, address: "/charts" },
    { label: 'Favourites', icon: Heart, address: "/favourites" },
    { label: 'Calendar', icon: CalendarDays, address: "/calendar" },
    { label: 'Settings', icon: Settings, address: "/settings" },
  ];

  // Prevent rendering until activeIndex is set on client
  if (activeIndex === null) return null;

  return (
    <nav className="fixed top-0 left-0 h-full w-65 bg-sidebar rounded-xl p-6 flex flex-col items-start text-lg z-20">
      <div className="mb-10 font-bold text-2xl tracking-wide font-archivonarrow">K-WEATHER</div>
      <ul className="flex flex-col gap-6 w-full mt-5 ml-3 pr-6.5">
        {navItems.map((item, idx) => {
          function handleClick() {
            setActiveIndex(idx);
          }

          return (
            <li key={item.label}>
              <Link href={item.address}>
                <button
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${idx === activeIndex ? 'bg-sidebar-active font-semibold bg-nav-active' : 'hover:bg-sidebar-active'}`}
                  onClick={() => handleClick()}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;