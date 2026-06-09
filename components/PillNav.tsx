"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Camera, Home } from "lucide-react";
import "./PillNav.css";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const PillNav = ({
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#c59b27", // Accent gold as base/hover color
  pillColor = "#120F17", // Dark pill color
  hoveredPillTextColor = "#0a0a0a", // Charcoal text when hovered on gold
  pillTextColor = "#f5ebe0", // Cream text by default
  initialLoadAnimation = true,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor;
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useIsomorphicLayoutEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - w * w / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: "auto" }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 8), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.25,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const logoIcon = logoRef.current?.querySelector(".logo-icon");
    if (!logoIcon) return;
    gsap.set(logoIcon, { rotate: 0 });
    gsap.to(logoIcon, {
      rotate: 360,
      duration: 0.5,
      ease,
      overwrite: "auto",
    });
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {/* Brand / Home Link */}
        <Link
          className="pill-logo flex items-center gap-2"
          href="/"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          {/* Desktop brand presentation */}
          <span className="desktop-only flex items-center gap-2">
            <Camera className="logo-icon w-5 h-5 text-warmGold" />
            <span className="font-serif italic text-2xl tracking-[0.15em] text-warmGold font-medium">
              KAVYA
            </span>
          </span>
          {/* Mobile home screen icon */}
          <span className="mobile-only flex items-center justify-center">
            <Home className="logo-icon w-5 h-5 text-warmGold" />
          </span>
        </Link>

        {/* Desktop Navigation Items */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => {
              const isPortfolio = item.label.toLowerCase() === "portfolio";
              const isActive = activeHref === item.href || (item.label.toLowerCase() === "home" && (activeHref === "/" || activeHref === ""));
              return (
                <li key={item.href || `item-${i}`} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill ${isPortfolio ? "pill-highlighted font-semibold" : ""} ${
                      isActive ? "is-active" : ""
                    }`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile-Only Simplified Pill Navigation (Portfolio Pill Only) */}
        <div className="mobile-only">
          <Link
            href="/archive"
            className="pill pill-highlighted text-[11px] tracking-widest font-semibold px-5 py-2 uppercase h-auto rounded-full"
          >
            <span className="pill-label">Portfolio</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
