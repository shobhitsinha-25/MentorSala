import React from "react";

interface ShinyTextProps {
  children: React.ReactNode;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  intensity?: number;
  className?: string;
}

export function ShinyText({
  children,
  baseColor = "#0F172A",
  shineColor = "#6366F1",
  speed = 2.5,
  intensity = 0.9,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={
        {
          "--base-color": baseColor,
          "--shine-color": shineColor,
          "--shine-speed": `${speed}s`,
          "--shine-intensity": intensity,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}