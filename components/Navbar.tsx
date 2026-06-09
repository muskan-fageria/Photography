"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Portfolio", href: "/archive" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Book", href: "/#book" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-studioBlack/85 backdrop-blur-md border-b border-warmGold/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <Camera className="w-5 h-5 text-warmGold transition-transform duration-500 group-hover:rotate-12" />
          <span className="font-serif italic text-2xl tracking-widest text-warmGold font-medium">
            K A V Y A
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm tracking-widest uppercase text-softCream/80 hover:text-warmGold transition-colors duration-300 editorial-link"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#book"
            className="px-5 py-2 text-xs tracking-widest uppercase border border-warmGold/35 hover:border-warmGold text-softCream hover:text-studioBlack bg-transparent hover:bg-warmGold transition-all duration-500 font-medium rounded-sm"
          >
            Inquire
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-softCream hover:text-warmGold transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-studioBlack border-b border-warmGold/10 flex flex-col items-center py-8 gap-6 md:hidden glass-panel"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base tracking-widest uppercase text-softCream hover:text-warmGold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#book"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 text-sm tracking-widest uppercase border border-warmGold text-warmGold hover:bg-warmGold hover:text-studioBlack transition-colors duration-300 rounded-sm w-4/5 text-center mt-2"
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
