// Soft, drifting cloud footage as the site's backdrop. The gradient mesh
// sits underneath so there's no flash of empty color before the video can
// play, and it's what shows on browsers that block autoplay entirely. A
// light platinum scrim sits on top so body copy stays comfortably legible
// without flattening the footage into a flat color.
export default function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-30 bg-bg" />
      <div className="flow-mesh pointer-events-none fixed inset-0 -z-30" />

      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <video
          className="h-full w-full object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/flow-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,244,246,0.82) 0%, rgba(243,244,246,0.55) 30%, rgba(243,244,246,0.65) 70%, rgba(243,244,246,0.88) 100%)",
        }}
      />

      <div className="grain" />
    </>
  );
}
