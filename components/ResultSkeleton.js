export default function ResultSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="shimmer aspect-[3/4] w-full rounded-2xl border border-border" />
      <div className="glass space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="shimmer h-4 w-28 rounded-full" />
        <div className="shimmer h-8 w-2/3 rounded-lg" />
        <div className="shimmer h-4 w-full rounded-lg" />
        <div className="flex gap-3 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="shimmer h-9 w-9 rounded-full" />
          ))}
        </div>
        <div className="space-y-3 pt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="shimmer h-14 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
