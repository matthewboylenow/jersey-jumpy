"use client";

import { cn } from "@/lib/utils";

interface FloatingBlobsProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

export function FloatingBlobs({ variant = "hero", className }: FloatingBlobsProps) {
  if (variant === "subtle") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute -top-20 -right-20 w-64 h-64 bg-lavender/20 rounded-full animate-float blur-3xl"
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-mint/15 rounded-full animate-float blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-lavender/25 rounded-full animate-float blur-3xl"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-peach/20 rounded-full animate-float blur-3xl"
          style={{ animationDelay: "3s", borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        />
      </div>
    );
  }

  // Hero variant (default)
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Lavender blob - top right */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 bg-lavender/30 animate-float blur-3xl"
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
      />

      {/* Mint blob - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-mint/20 animate-float blur-3xl"
        style={{ animationDelay: "2s", borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
      />

      {/* Peach blob - center right */}
      <div
        className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-peach/15 animate-float blur-3xl"
        style={{ animationDelay: "4s", borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%" }}
      />

      {/* Sky blob - top left */}
      <div
        className="absolute -top-10 left-1/4 w-72 h-72 bg-sky/20 animate-float blur-3xl"
        style={{ animationDelay: "1s", borderRadius: "70% 30% 50% 50% / 50% 50% 50% 50%" }}
      />

      {/* Butter blob - bottom center */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-butter/15 animate-float blur-3xl"
        style={{ animationDelay: "3s", borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%" }}
      />
    </div>
  );
}
