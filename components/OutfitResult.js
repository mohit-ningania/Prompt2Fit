import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, Wand2 } from "lucide-react";
import OutfitVisual from "./OutfitVisual";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Swatch({ hex }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard unavailable — ignore silently, this is a non-critical nicety
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${hex}`}
      className="group flex flex-col items-center gap-1.5"
    >
      <span
        className="h-9 w-9 rounded-full border border-white/15 shadow-inner transition-transform group-hover:scale-110"
        style={{ background: hex }}
      />
      <span className="flex items-center gap-1 font-mono text-[10px] text-text-muted">
        {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
        {hex.toUpperCase()}
      </span>
    </button>
  );
}

const MODE_LABEL = {
  live: "Live AI render",
  "live-no-image": "Live AI styling",
  demo: "Demo preview",
  "demo-fallback": "Demo preview",
};

export default function OutfitResult({ result, onRegenerate, loading }) {
  const { concept, imageUrl, mode } = result;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      <motion.div variants={item}>
        <OutfitVisual concept={concept} imageUrl={imageUrl} imageFailed={mode === "live-no-image"} />
      </motion.div>

      <motion.div variants={item} className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-text-muted">
              <Wand2 className="h-3 w-3 text-accent" />
              {MODE_LABEL[mode] ?? "Styled"}
            </span>
            <h2 className="font-display mt-3 text-3xl leading-tight text-text sm:text-4xl">{concept.title}</h2>
            <p className="mt-2 text-text-muted">{concept.vibe}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {concept.palette?.map((hex) => (
            <Swatch key={hex} hex={hex} />
          ))}
        </div>

        <ul className="mt-7 space-y-3">
          {concept.items?.map((it, i) => (
            <li
              key={`${it.category}-${i}`}
              className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-bg-soft/60 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-text">{it.name}</p>
                <p className="mt-0.5 text-xs text-text-muted">{it.description}</p>
              </div>
              <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-wide text-text-muted">
                {it.category}
              </span>
            </li>
          ))}
        </ul>

        {concept.stylingTip && (
          <p className="mt-6 border-l-2 border-accent/60 pl-4 text-sm italic text-text-muted">
            {concept.stylingTip}
          </p>
        )}

        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="mt-7 flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-text disabled:opacity-40"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Restyle this prompt
        </button>
      </motion.div>
    </motion.div>
  );
}
