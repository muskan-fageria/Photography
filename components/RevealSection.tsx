"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  id?: string;
}

export default function RevealSection({
  children,
  delay = 0.15,
  duration = 0.8,
  yOffset = 40,
  className = "",
  id,
}: RevealSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExponential for high-end feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
