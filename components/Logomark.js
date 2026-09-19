import { useId } from "react";

// An abstract flowing ribbon that loops from a "spark" into a garment
// collar-like curve — a wordless mark for a product about turning a prompt
// into a fit. Two intertwined strokes on a frosted glass disc, with a
// slow-traveling gradient so the mark itself feels "flowy".
export default function Logomark({ className = "h-9 w-9", animated = true }) {
  const id = useId();

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`p2f-a-${id}`} x1="6" y1="10" x2="58" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f0abfc" />
          {animated && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-8 0; 8 0; -8 0"
              dur="9s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
        <linearGradient id={`p2f-b-${id}`} x1="58" y1="10" x2="6" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id={`p2f-glass-${id}`} cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#eef3f7" stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill={`url(#p2f-glass-${id})`} stroke="rgba(255,255,255,0.8)" />

      <path
        d="M13 40c3-10 8-17 15-17s10 9 17 9 8-4 10-9"
        stroke={`url(#p2f-a-${id})`}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 21c5 2 8 7 8 12 0 6-4 10-4 15"
        stroke={`url(#p2f-b-${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <circle cx="45" cy="15" r="2.4" fill="#f0abfc" />
    </svg>
  );
}
