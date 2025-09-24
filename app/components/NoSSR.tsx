'use client';

import dynamic from 'next/dynamic'

export const Header = dynamic(() => import('./Header'), { ssr: false });
export const SideBar = dynamic(() => import('./SideBar'), { ssr: false });
export const ThemeProvider = dynamic(() => import('next-themes').then(mod => mod.ThemeProvider), { ssr: false});