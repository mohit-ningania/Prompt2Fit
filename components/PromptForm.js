import { ArrowUp, Loader2 } from "lucide-react";
import PromptChips from "./PromptChips";

const MAX_LENGTH = 300;

export default function PromptForm({ prompt, setPrompt, onSubmit, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass group relative rounded-3xl p-2 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] transition-colors focus-within:border-accent/40">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={loading}
          placeholder="Describe a mood, occasion, or aesthetic… e.g. “moody coffee shop first date in November”"
          className="w-full resize-none bg-transparent px-4 pt-3 pb-1 text-base text-text placeholder:text-text-muted/70 focus:outline-none sm:text-lg"
        />
        <div className="flex items-center justify-between px-4 pb-2 pt-1">
          <span className="text-[11px] text-text-muted">{prompt.length}/{MAX_LENGTH}</span>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-medium text-[#0b2233] shadow-[0_8px_24px_-8px_rgba(56,189,248,0.6)] transition-transform enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Styling…
              </>
            ) : (
              <>
                Style me
                <ArrowUp className="h-4 w-4 rotate-45" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <PromptChips onPick={setPrompt} disabled={loading} />
      </div>
    </form>
  );
}
