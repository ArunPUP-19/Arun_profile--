import type { Metadata } from "next";
import { Oswald, Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Arun N | Full Stack & AI Engineer",
  description: "Award-winning creative frontend portfolio of Arun N.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${syne.variable} ${space.variable} ${mono.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
