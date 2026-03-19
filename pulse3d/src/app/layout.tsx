import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse3D - Fitness Intelligence",
  description: "The world's first 3D fitness intelligence platform.",
};

import { Navbar } from "@/components/Navbar";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground selection:bg-primary-accent/30`}
      >
        <Script 
          src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js" 
          strategy="beforeInteractive"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
