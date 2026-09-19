import { useId } from "react";

// A lettermark, not an abstract shape: an italic serif "P" — cut from the
// brand's cool metal/stone/sky gradient — on a frosted glass badge, with a
// flowing signature swoosh underneath and a small "+" spark to complete
// "P+". Georgia/Times are used instead of the site's webfont so the mark
// renders identically here and in the standalone favicon.
export default function Logomark({ className = "h-9 w-9" }) {
  const id = useId();

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`p2f-badge-${id}`} x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dfe3e7" />
        </linearGradient>
        <linearGradient id={`p2f-letter-${id}`} x1="18" y1="12" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2e3a46" />
          <stop offset="55%" stopColor="#5c7285" />
          <stop offset="100%" stopColor="#a9c6da" />
        </linearGradient>
        <linearGradient id={`p2f-swoosh-${id}`} x1="14" y1="0" x2="50" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a9c6da" stopOpacity="0" />
          <stop offset="50%" stopColor="#a9c6da" />
          <stop offset="100%" stopColor="#5c7285" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="62" height="62" rx="18" fill={`url(#p2f-badge-${id})`} stroke="rgba(46,58,70,0.14)" />

      <text
        x="26"
        y="43"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="30"
        fill={`url(#p2f-letter-${id})`}
      >
        P
      </text>

      <path
        d="M16 47c6 3.5 14 3.5 21-1"
        stroke={`url(#p2f-swoosh-${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      <path d="M46 15v8M42 19h8" stroke="#a9c6da" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
