export const SUGGESTIONS = [
  "Old money brunch in autumn",
  "Neo-noir first date in the city",
  "Cozy cabin weekend by the fire",
  "Sunset beach picnic in the Riviera",
  "Streetwear for a gallery opening",
  "Soft romantic garden party",
];

export default function PromptChips({ onPick, disabled }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onPick(s)}
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text-muted transition-all hover:border-accent/50 hover:text-text disabled:pointer-events-none disabled:opacity-40"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
