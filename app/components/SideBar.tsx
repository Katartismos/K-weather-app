'use client';

import { LayoutGrid, ChartColumn, Heart, CalendarDays, Settings, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useMobileMenu } from '../context/MobileMenuContext';

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { isOpen, close } = useMobileMenu();

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
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      <nav className={`fixed top-0 left-0 h-full w-65 bg-sidebar rounded-r-xl lg:rounded-xl p-6 flex flex-col items-start text-lg z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center w-full mb-10">
          <div className="font-bold text-2xl tracking-wide font-archivonarrow">K-WEATHER</div>
          <button onClick={close} className="lg:hidden p-1 hover:bg-white/10 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 w-full mt-5 ml-3 pr-6.5">
          {navItems.map((item, idx) => {
            function handleClick() {
              setActiveIndex(idx);
              close(); // Close sidebar on mobile after clicking
            }

            return (
              <li key={item.label}>
                <Link href={item.address}>
                  <button
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all w-full text-left ${idx === activeIndex ? 'bg-sidebar-active font-semibold bg-nav-active' : 'hover:bg-sidebar-active'}`}
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
    </>
  );
};

export default SideBar;