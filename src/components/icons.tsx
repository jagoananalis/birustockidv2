type IconProps = {
  size?: number;
  className?: string;
};

export function IconTikTok({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V9.1a7.4 7.4 0 0 0 4.5 1.53v-3a4.4 4.4 0 0 1-4.5-4.4V2z" />
    </svg>
  );
}

export function IconTelegram({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M21 4 3 11.2l6 2.1M21 4 14.8 20l-5.8-6.7M21 4 9 13.3" />
    </svg>
  );
}

export function IconInstagram({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSearch({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="21" y1="21" x2="15.5" y2="15.5" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function IconTrendUp({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="3 17 10 10 14 14 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  );
}

export function IconTrendDown({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="3 7 10 14 14 10 21 18" />
      <polyline points="15 18 21 18 21 12" />
    </svg>
  );
}

export function IconBitcoin({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 7.5h3.4a2 2 0 0 1 0 4H9.8m0 0h3.8a2 2 0 0 1 0 4H9.8m0-8v9m1.6-9v9.5m2-9.5v9.5" />
    </svg>
  );
}

export function IconEuro({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 8.3a4.6 4.6 0 1 0 0 7.4M7.5 10.5h6M7.5 13.2h5" />
    </svg>
  );
}

export function IconDocument({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" />
      <path d="M14 2.5V7h4" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="15.5" x2="16" y2="15.5" />
      <line x1="8" y1="19" x2="13" y2="19" />
    </svg>
  );
}

export function IconGraduation({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11" />
      <path d="M21.5 9v6" />
    </svg>
  );
}

export function IconCalendar({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="2.5" x2="8" y2="6.5" />
      <line x1="16" y1="2.5" x2="16" y2="6.5" />
    </svg>
  );
}

export function CandlestickPattern() {
  const heights = [22, 34, 18, 40, 28, 46, 30, 52, 24, 38, 44, 20, 32, 48, 26, 36];
  return (
    <svg viewBox="0 0 580 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {heights.map((h, i) => {
        const x = 20 + i * 34;
        const wickTop = 60 - h / 2 - 14;
        const wickBottom = 60 + h / 2 + 14;
        const y = 60 - h / 2;
        const up = i % 3 !== 0;
        const fill = up ? "#8eb4ff" : "#3a3a44";
        return (
          <g key={i}>
            <line x1={x + 6} y1={wickTop} x2={x + 6} y2={wickBottom} stroke={fill} strokeWidth="1.5" />
            <rect x={x} y={y} width="12" height={h} fill={fill} rx="1.5" />
          </g>
        );
      })}
    </svg>
  );
}

export function NewsThumb({ type }: { type: "capitol" | "gold" | "bitcoin" }) {
  if (type === "capitol") {
    return (
      <svg viewBox="0 0 64 64" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="64" height="64" fill="#1e2a4a" />
        <circle cx="32" cy="20" r="7" fill="#d7dee8" />
        <rect x="29" y="12" width="6" height="6" fill="#d7dee8" />
        <polygon points="14,30 32,20 50,30" fill="#c3ccdb" />
        <rect x="16" y="30" width="4" height="18" fill="#c3ccdb" />
        <rect x="24" y="30" width="4" height="18" fill="#c3ccdb" />
        <rect x="32" y="30" width="4" height="18" fill="#c3ccdb" />
        <rect x="40" y="30" width="4" height="18" fill="#c3ccdb" />
        <rect x="12" y="48" width="40" height="5" fill="#c3ccdb" />
      </svg>
    );
  }
  if (type === "gold") {
    return (
      <svg viewBox="0 0 64 64" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6d778" />
            <stop offset="1" stopColor="#c8952f" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" fill="#2b2118" />
        <g transform="translate(8,36)">
          <polygon points="0,10 6,0 42,0 48,10 42,18 6,18" fill="url(#goldGrad)" stroke="#8a6416" strokeWidth="1" />
        </g>
        <g transform="translate(12,20)">
          <polygon points="0,10 5,2 37,2 42,10 37,16 5,16" fill="url(#goldGrad)" stroke="#8a6416" strokeWidth="1" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="64" height="64" fill="#1b1607" />
      <circle cx="32" cy="32" r="18" fill="#f7931a" />
      <text x="32" y="39" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1b1607" textAnchor="middle">
        B
      </text>
    </svg>
  );
}

const SOCIAL_ICONS = {
  tiktok: IconTikTok,
  telegram: IconTelegram,
  instagram: IconInstagram,
} as const;

export function SocialIcon({ id, size = 20 }: { id: keyof typeof SOCIAL_ICONS; size?: number }) {
  const Icon = SOCIAL_ICONS[id];
  return <Icon size={size} />;
}

const PAIR_ICONS = {
  trendUp: IconTrendUp,
  trendDown: IconTrendDown,
  bitcoin: IconBitcoin,
  euro: IconEuro,
} as const;

export function PairIcon({ id, size = 20 }: { id: keyof typeof PAIR_ICONS; size?: number }) {
  const Icon = PAIR_ICONS[id];
  return <Icon size={size} />;
}
