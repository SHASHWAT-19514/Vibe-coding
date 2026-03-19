"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Overview", href: "#overview" },
  { name: "Technology", href: "#technology" },
  { name: "Tracking", href: "#tracking" },
  { name: "Insights", href: "#insights" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer motion transforms for glassmorphism effect
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(4, 4, 4, 0)", "rgba(4, 4, 4, 0.7)"]
  );
  
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter,
        borderBottomWidth: "1px",
        borderBottomColor: borderColor,
        borderBottomStyle: "solid",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-display font-bold tracking-tighter"
        >
          PULSE<span className="text-primary-accent">3D</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-body hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a 
          href="http://localhost:8000"
          className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Start Tracking
        </a>

        {/* Mobile Menu Toggle (Simplified) */}
        <button className="md:hidden text-white p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
