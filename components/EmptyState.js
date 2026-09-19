import { Palette, Shirt, Sparkle } from "lucide-react";

const STEPS = [
  { icon: Sparkle, title: "Describe a vibe", body: "Mood, occasion, weather, aesthetic — one sentence is enough." },
  { icon: Shirt, title: "AI styles a full outfit", body: "Top to shoes, with the reasoning behind every piece." },
  { icon: Palette, title: "Get a palette + visual", body: "A lookbook cover and color story you can screenshot or share." },
];

export default function EmptyState() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {STEPS.map(({ icon: Icon, title, body }, i) => (
        <div key={title} className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 text-text-muted">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-soft text-xs font-mono">
              {i + 1}
            </span>
            <Icon className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 text-sm font-medium text-text">{title}</p>
          <p className="mt-1 text-xs text-text-muted">{body}</p>
        </div>
      ))}
    </div>
  );
}
