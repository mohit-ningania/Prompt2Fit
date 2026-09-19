export default function Logomark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="p2f-logo-g" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-accent-2)" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="var(--color-bg-soft)" stroke="var(--color-border)" />
      <path
        d="M20 46V18h11.5c5.79 0 9.5 3.4 9.5 8.6 0 5.2-3.71 8.6-9.5 8.6H26.4V46H20Zm6.4-15.9h4.4c2.87 0 4.53-1.36 4.53-3.9 0-2.53-1.66-3.9-4.53-3.9h-4.4v7.8Z"
        fill="url(#p2f-logo-g)"
      />
      <path d="M46 14l1.8 4.6L52 20.4l-4.2 1.8L46 27l-1.8-4.8L40 20.4l4.2-1.8L46 14Z" fill="url(#p2f-logo-g)" />
    </svg>
  );
}
