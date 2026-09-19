import { motion } from "framer-motion";
import { SUGGESTIONS } from "./PromptChips";
import { DEMO_CONCEPTS } from "@/lib/outfitLibrary";

export default function Gallery({ onPick, disabled }) {
  // SUGGESTIONS and DEMO_CONCEPTS are authored in matching order (one
  // curated concept per suggestion) so the gallery always shows six
  // distinct looks instead of hashing into duplicates.
  const cards = SUGGESTIONS.map((prompt, i) => ({ prompt, concept: DEMO_CONCEPTS[i] }));

  return (
    <section className="mt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted">
          Inspiration
        </span>
        <h2 className="font-display mt-4 text-3xl text-text sm:text-4xl">A few looks to start from</h2>
        <p className="mt-2 text-text-muted">Tap one to style it instantly.</p>
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ prompt, concept }, i) => (
          <motion.button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onPick(prompt)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="glass group flex flex-col gap-4 rounded-2xl p-5 text-left transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(56,189,248,0.5)] disabled:pointer-events-none disabled:opacity-40"
          >
            <div className="flex gap-1.5">
              {concept.palette.map((hex) => (
                <span key={hex} className="h-6 w-6 rounded-full border border-white/60" style={{ background: hex }} />
              ))}
            </div>
            <div>
              <p className="font-display text-xl text-text">{concept.title}</p>
              <p className="mt-1 text-sm text-text-muted">{concept.vibe}</p>
            </div>
            <p className="mt-auto text-xs italic text-text-muted/80 transition-colors group-hover:text-text-muted">
              “{prompt}”
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
