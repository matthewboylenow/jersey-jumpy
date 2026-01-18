import { cn } from "@/lib/utils";

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ color = "#ffffff", flip = false, className }: WaveDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export function WaveDividerAlt({ color = "#ffffff", flip = false, className }: WaveDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path
          d="M0,60 Q360,0 720,60 T1440,60 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
