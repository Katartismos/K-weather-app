import type { Metadata } from "next";
import { Inter_Tight, Archivo_Narrow } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";

const interTight = Inter_Tight({
  variable: "--font-intertight",
  display: "swap",
  subsets: ["latin"],
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivonarrow",
  display: "swap",
  subsets: ["latin"],
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
        className={`${interTight.className} ${archivoNarrow.variable}`}
      >
        <SideBar />
        {children}
      </body>
    </html>
  );
}
