"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: "portraits" | "weddings" | "events";
  subtitle: string;
  aspectClass: string;
}

const PHOTOS: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    title: "The Rajput Saree",
    category: "portraits",
    subtitle: "Heritage Portraiture, Jaipur",
    aspectClass: "md:col-span-2 h-[550px]",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=800",
    title: "Lake Palace Unions",
    category: "weddings",
    subtitle: "Udaipur, Rajasthan",
    aspectClass: "md:col-span-1 h-[650px]",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800",
    title: "The Varanasi Diya",
    category: "events",
    subtitle: "Ghats of Varanasi",
    aspectClass: "md:col-span-1 h-[450px]",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
    title: "Imperial Sherwani",
    category: "portraits",
    subtitle: "Bespoke Royal Study",
    aspectClass: "md:col-span-1 h-[550px]",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    title: "The Baraat Waltz",
    category: "weddings",
    subtitle: "Palace Courtyard, Jodhpur",
    aspectClass: "md:col-span-2 h-[500px]",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800",
    title: "Heritage Architecture",
    category: "events",
    subtitle: "Palace Grounds, Agra",
    aspectClass: "md:col-span-1 h-[550px]",
  },
];

const CATEGORIES = ["all", "portraits", "weddings", "events"] as const;
type Category = (typeof CATEGORIES)[number];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredPhotos =
    activeCategory === "all"
      ? PHOTOS
      : PHOTOS.filter((photo) => photo.category === activeCategory);

  // Staggered list container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 md:mb-24">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className="relative px-4 py-2 text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-300 font-medium"
          >
            <span
              className={`relative z-10 transition-colors duration-300 ${
                activeCategory === category ? "text-warmGold" : "text-softCream/60 hover:text-softCream"
              }`}
            >
              {category}
            </span>
            {activeCategory === category && (
              <motion.span
                layoutId="activeCategoryUnderline"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-warmGold"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Asymmetric Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`relative overflow-hidden group cursor-pointer ${photo.aspectClass}`}
            >
              {/* Image Container with smooth transformations */}
              <div className="w-full h-full relative overflow-hidden bg-zinc-900 border border-white/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out brightness-[0.70] group-hover:brightness-[0.95] scale-100 group-hover:scale-105"
                />

                {/* Subtle dark-to-transparent gradient vignette at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-studioBlack via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Captions - Cinematic Reveal */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:bottom-8 md:left-8 md:right-8 transition-all duration-500">
                  <span className="text-xs uppercase tracking-widest text-warmGold mb-1 font-medium transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {photo.subtitle}
                  </span>
                  <h3 className="font-serif italic text-2xl md:text-3xl text-softCream tracking-wide transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
