import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header, SideBar, ThemeProvider } from "./components/NoSSR";

const interTight = localFont({
  src: "../public/fonts/InterTight-VariableFont_wght.ttf",
  variable: "--font-intertight",
  display: "swap",
  weight: "100 900"
});

const archivonarrow = localFont({
  src: "../public/fonts/ArchivoNarrow-VariableFont_wght.ttf",
  variable: "--font-archivonarrow",
  display: "swap"
});

export const metadata: Metadata = {
  title: "K-Weather App",
  description: "Just a weather app to showcase my skills.",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.className} ${archivonarrow.variable} bg-gradient text-main`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Header />
          <div className="min-h-screen overflow-y-auto overflow-x-hidden">
            <SideBar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
