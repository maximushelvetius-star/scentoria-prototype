import React from "react";
import { motion } from "motion/react";
import { BottleColor } from "../utils/recommendation";

interface PerfumeBottleProps {
  color: BottleColor;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

export const PerfumeBottle: React.FC<PerfumeBottleProps> = ({
  color,
  name,
  size = "md",
  animated = true,
}) => {
  // Dimensions based on size
  const sizes = {
    xs: { width: 36, height: 50 },
    sm: { width: 48, height: 70 },
    md: { width: 90, height: 130 },
    lg: { width: 140, height: 200 },
    xl: { width: 180, height: 250 },
  };

  const selectedSize = sizes[size] || sizes.md;
  const { width, height } = selectedSize;

  // Animation variants for floating effect
  const floatingVariants = {
    animate: {
      y: [0, -6, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bottleContent = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.12))" }}
    >
      <defs>
        {/* Main Bottle Gradient */}
        <linearGradient id={`bg-${name.replace(/\s+/g, "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.bottle.match(/#\w+/g)?.[0] || "#999"} />
          <stop offset="100%" stopColor={color.bottle.match(/#\w+/g)?.[1] || "#333"} />
        </linearGradient>

        {/* Liquid Gradient */}
        <linearGradient id={`liq-${name.replace(/\s+/g, "")}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color.accent} stopOpacity="0.4" />
          <stop offset="70%" stopColor={color.liquid} stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Cap Metallic Gradient */}
        <linearGradient id={`cap-${name.replace(/\s+/g, "")}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color.cap} />
          <stop offset="30%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor={color.cap} />
        </linearGradient>

        <linearGradient id="nozzle-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cf9f1d" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#9a7109" />
        </linearGradient>

        <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="30%" stopColor="white" stopOpacity="0.0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.2" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 1. Cap (Flakon-Deckel) */}
      <rect
        x="42"
        y="12"
        width="36"
        height="28"
        rx="6"
        fill={`url(#cap-${name.replace(/\s+/g, "")})`}
      />
      {/* Cap border / heavy line */}
      <line x1="42" y1="36" x2="78" y2="36" stroke="#9a7109" strokeWidth="1" />

      {/* 2. Nozzle (Sprüher-Hals) */}
      <rect
        x="50"
        y="38"
        width="20"
        height="12"
        fill="url(#nozzle-grad)"
      />

      {/* 3. Bottle Body (Hauptkörper) */}
      {/* Curved heavy luxury glass body */}
      <rect
        x="20"
        y="48"
        width="80"
        height="100"
        rx="14"
        fill={`url(#bg-${name.replace(/\s+/g, "")})`}
        stroke="#ffffff"
        strokeOpacity="0.15"
        strokeWidth="1"
      />

      {/* Liquid fluid display inside bottle */}
      <rect
        x="26"
        y="58"
        width="68"
        height="84"
        rx="8"
        fill={`url(#liq-${name.replace(/\s+/g, "")})`}
      />

      {/* Glass Inner reflection */}
      <path
        d="M 23 58 C 23 52 30 52 38 52"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* 4. Elegant Product Label */}
      <rect
        x="32"
        y="78"
        width="56"
        height="40"
        rx="4"
        fill="#ffffff"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
      />
      
      {/* Decorative Gold Border on Label */}
      <rect
        x="34"
        y="80"
        width="52"
        height="36"
        rx="2"
        fill="none"
        stroke={color.accent}
        strokeWidth="1"
      />

      {/* Brand text */}
      <text
        x="60"
        y="93"
        fill="#051630"
        fontSize="7"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        SCENTORIA
      </text>

      {/* Fragrance Name under label */}
      <text
        x="60"
        y="108"
        fill="#666666"
        fontSize="6"
        fontFamily="monospace"
        textAnchor="middle"
        letterSpacing="0.2"
      >
        {name.toUpperCase()}
      </text>

      {/* Glass Shine stripe */}
      <rect
        x="23"
        y="52"
        width="16"
        height="92"
        fill="url(#glass-shine)"
        transform="skewX(-6)"
        transformOrigin="31 98"
      />

      {/* Absolute Bottom Reflection */}
      <ellipse cx="60" cy="144" rx="28" ry="3" fill="white" fillOpacity="0.2" />
    </svg>
  );

  return (
    <div
      style={{ width, height }}
      className="flex items-center justify-center relative cursor-pointer"
    >
      {animated ? (
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="w-full h-full"
        >
          {bottleContent}
        </motion.div>
      ) : (
        bottleContent
      )}
    </div>
  );
};
