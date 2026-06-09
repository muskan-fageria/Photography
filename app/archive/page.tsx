"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Masonry, { MasonryItem } from "@/components/Masonry";
import RevealSection from "@/components/RevealSection";

const DEFAULT_ARCHIVE_PHOTOS: MasonryItem[] = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 450,
    title: "The Saree",
    subtitle: "Heritage Portraiture",
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 600,
    title: "Lake Palace Unions",
    subtitle: "Udaipur, Rajasthan",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 400,
    title: "The Serene Nature",
    subtitle: "Ghats of Varanasi",
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 500,
    title: "Imperials",
    subtitle: "Bespoke Royal Study",
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 550,
    title: "The Waltz",
    subtitle: "Palace Courtyard",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800",
    url: "#book",
    height: 450,
    title: "Heritage Architecture",
    subtitle: "Palace Grounds, Agra",
  },
];

export default function ArchivePage() {
  const [items, setItems] = useState<MasonryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioImages = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        const images: string[] = data.images || [];

        if (images.length === 0) {
          setItems(DEFAULT_ARCHIVE_PHOTOS);
          setLoading(false);
          return;
        }

        // Measure images dynamically to get heights for 300px width
        const measuredItems = await Promise.all(
          images.map((src, index) => {
            return new Promise<MasonryItem>((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => {
                const height = Math.round((img.naturalHeight * 300) / img.naturalWidth);
                const filename = src.split("/").pop() || "";
                const titleWithoutExt = filename.substring(0, filename.lastIndexOf("."));
                const formattedTitle = titleWithoutExt
                  .replace(/[_-]/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase());

                resolve({
                  id: `dynamic-${index}`,
                  img: src,
                  url: src,
                  height: height,
                  title: formattedTitle || "Heritage Image",
                  subtitle: "Visual Archive",
                });
              };
              img.onerror = () => {
                resolve({
                  id: `dynamic-${index}`,
                  img: src,
                  url: src,
                  height: 450, // default fallback
                  title: "Heritage Image",
                  subtitle: "Visual Archive",
                });
              };
            });
          })
        );

        setItems(measuredItems);
      } catch (err) {
        console.error("Error loading portfolio folder images:", err);
        setItems(DEFAULT_ARCHIVE_PHOTOS);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5ebe0] selection:bg-[#c59b27] selection:text-[#0a0a0a] flex flex-col justify-between">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 pb-24 md:pt-40 md:pb-36 px-6 md:px-12 max-w-7xl mx-auto w-full relative flex-grow">
        {/* Decorative Blur */}
        <div className="absolute -left-20 top-40 w-80 h-80 rounded-full bg-warmGold/5 blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <RevealSection yOffset={35}>
            <span className="text-xs tracking-[0.3em] uppercase text-warmGold mb-3 block font-medium">
              The Curated Chronology
            </span>
            <h1 className="font-serif italic text-5xl md:text-7xl text-softCream font-light">
              Visual Archive
            </h1>
          </RevealSection>

          <RevealSection delay={0.2} yOffset={20}>
            <p className="text-sm text-softCream/50 max-w-md leading-relaxed font-light">
              A dynamically rendered, living registry of our finest frames. Built on organic reflows and cinematic reveals to let each story breathe.
            </p>
          </RevealSection>
        </div>

        {/* GSAP Masonry Grid */}
        <RevealSection delay={0.2} yOffset={30}>
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <span className="font-serif italic text-xl text-warmGold animate-pulse">
                Summoning the Visual Archive...
              </span>
            </div>
          ) : (
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.96}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          )}
        </RevealSection>
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-studioBlack border-t border-white/[0.01] w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-lg tracking-widest text-warmGold font-medium">
              KAVYA
            </span>
            <span className="text-[10px] tracking-widest text-softCream/30 uppercase">
              / © {new Date().getFullYear()}
            </span>
          </div>

          <div className="text-[10px] tracking-[0.2em] uppercase text-softCream/40 font-light">
            Crafted for Cinematic Artistry & Spatial Presence
          </div>

          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://vsco.co"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              VSCO
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-widest text-softCream/50 hover:text-warmGold transition-colors duration-300"
            >
              Pinterest
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
