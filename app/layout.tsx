import React from "react";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header, SideBar, ThemeProvider } from "./components/NoSSR";
import { MobileMenuProvider } from "./context/MobileMenuContext";
import { WeatherProvider } from "./context/WeatherContext";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "K-Weather App",
  description: "Just a weather app to showcase my skills.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.className} ${archivo.variable} bg-gradient text-main`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
          defaultTheme="dark"
        >
          <WeatherProvider>
            <MobileMenuProvider>
              <Header />
              <div className="min-h-screen overflow-y-auto overflow-x-hidden relative">
                <SideBar />
                {children}
              </div>
            </MobileMenuProvider>
          </WeatherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
