import { useId } from "react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

/**
 * Official-style Birustock mark: three stacked parallelograms forming a
 * geometric B — cyan top bar, mid blue bar, navy triangle — with a soft shadow.
 */
export function BrandMark({ className }: BrandMarkProps) {
  const uid = useId().replace(/:/g, "");
  const top = `gTop-${uid}`;
  const mid = `gMid-${uid}`;
  const bot = `gBot-${uid}`;
  const shadow = `sh-${uid}`;

  return (
    <svg
      className={cn("brand-mark", className)}
      viewBox="0 0 68 86"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5AC8FA" />
          <stop offset="1" stopColor="#1A7CFF" />
        </linearGradient>
        <linearGradient id={mid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2B7BFF" />
          <stop offset="1" stopColor="#0D4FD8" />
        </linearGradient>
        <linearGradient id={bot} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1A5FE8" />
          <stop offset="1" stopColor="#0836B8" />
        </linearGradient>
        <filter id={shadow} x="-25%" y="-12%" width="160%" height="150%">
          <feDropShadow dx="1" dy="1.6" stdDeviation="1.2" floodColor="#0A3A90" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Top parallelogram — light cyan bar */}
      <path
        filter={`url(#${shadow})`}
        fill={`url(#${top})`}
        d="M7 36 L14 12 L60 6 L53 30 Z"
      />
      {/* Middle parallelogram */}
      <path
        filter={`url(#${shadow})`}
        fill={`url(#${mid})`}
        d="M7 58 L13 38 L52 32 L46 52 Z"
      />
      {/* Bottom triangle */}
      <path
        filter={`url(#${shadow})`}
        fill={`url(#${bot})`}
        d="M7 80 L13 60 L40 54 L24 80 Z"
      />
    </svg>
  );
}

type BrandLockupProps = {
  size?: "md" | "lg";
  className?: string;
};

export function BrandLockup({ size = "md", className }: BrandLockupProps) {
  return (
    <span className={cn("brand-lockup", size === "lg" && "brand-lockup-lg", className)}>
      <BrandMark />
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-wordmark">
        <span className="brand-name">Birustock</span>
        <span className="brand-sub">Indonesia</span>
      </span>
    </span>
  );
}
