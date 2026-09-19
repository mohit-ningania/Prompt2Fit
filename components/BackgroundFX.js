export default function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
        <div
          className="float-slow absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-2), transparent 70%)" }}
        />
        <div
          className="float-slow-delay absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
        />
        <div
          className="float-slow absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6b4a8a, transparent 70%)" }}
        />
      </div>
      <div className="grain" />
    </>
  );
}
