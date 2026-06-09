"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

// Safe useLayoutEffect for SSR environments
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Custom useMeasure hook
const useMeasure = (): [React.RefObject<HTMLDivElement>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

// Preload helper
const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

// Item shape interface
export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  subtitle?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) => {
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)] as "top" | "bottom" | "left" | "right" | "center" | "random";
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const isMobile = width < 348;
    const columnWidth = isMobile ? width : 324; // 300px image width + 24px padding (12px each side)
    const columnsCount = isMobile ? 1 : Math.max(1, Math.floor(width / columnWidth));
    const leftOffset = isMobile ? 0 : (width - columnsCount * columnWidth) / 2;

    const colHeights = new Array(columnsCount).fill(0);

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = leftOffset + columnWidth * col;
      
      const scaledHeight = isMobile
        ? Math.round((child.height * (columnWidth - 24)) / 300)
        : child.height;

      const y = colHeights[col];
      colHeights[col] += scaledHeight;

      return { ...child, x, y, w: columnWidth, h: scaledHeight };
    });
  }, [items, width]);

  // Dynamically calculate container height to prevent layout overlapping
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map((item) => item.y + item.h));
  }, [grid]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.4,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list" style={{ height: containerHeight }}>
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper group"
            onClick={() => window.open(item.url, "_blank", "noopener noreferrer")}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            <div
              className="item-img relative w-full h-full"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {/* Subtle overlay is optional; keeping images clean and visual */}

              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(45deg, rgba(197, 155, 39, 0.2), rgba(10, 10, 10, 0.4))",
                    opacity: 0,
                    pointerEvents: "none",
                    borderRadius: "4px",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;
