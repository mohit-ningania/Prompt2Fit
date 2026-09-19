import { Sparkles } from "lucide-react";
import Logomark from "./Logomark";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Logomark className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-display text-lg tracking-tight text-text">Prompt2Fit</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-text-muted">AI Stylist</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="hidden sm:inline">One sentence in. A full outfit out.</span>
          <span className="sm:hidden">AI-styled outfits</span>
        </div>
      </div>
    </header>
  );
}
