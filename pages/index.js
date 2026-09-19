import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History } from "lucide-react";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";
import PromptForm from "@/components/PromptForm";
import EmptyState from "@/components/EmptyState";
import ResultSkeleton from "@/components/ResultSkeleton";
import OutfitResult from "@/components/OutfitResult";
import Footer from "@/components/Footer";

const HISTORY_KEY = "prompt2fit:history";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      if (Array.isArray(stored)) setHistory(stored);
    } catch {
      // localStorage may be unavailable (private mode, SSR quirks) — non-critical
    }
  }, []);

  const persistHistory = (nextPrompt) => {
    setHistory((prev) => {
      const next = [nextPrompt, ...prev.filter((p) => p !== nextPrompt)].slice(0, 6);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
      return next;
    });
  };

  const generate = async (promptOverride) => {
    const activePrompt = (promptOverride ?? prompt).trim();
    if (!activePrompt) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: activePrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong while styling that outfit.");
      }

      setResult(data);
      persistHistory(activePrompt);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryPick = (p) => {
    setPrompt(p);
    generate(p);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-text-muted">
            Prompt → Outfit
          </span>
          <h1 className="font-display mt-5 text-4xl leading-[1.08] text-text sm:text-6xl">
            Describe a vibe.
            <br />
            <span className="text-gradient">Wear the outfit.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-text-muted sm:text-lg">
            Prompt2Fit turns a single sentence about your mood, occasion, or aesthetic into a
            complete AI-styled outfit — full breakdown, color palette, and a lookbook visual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <PromptForm prompt={prompt} setPrompt={setPrompt} onSubmit={() => generate()} loading={loading} />

          {history.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] text-text-muted">
                <History className="h-3 w-3" /> Recent:
              </span>
              {history.map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={loading}
                  onClick={() => handleHistoryPick(p)}
                  className="rounded-full border border-border/70 px-2.5 py-1 text-[11px] text-text-muted transition-colors hover:border-accent/50 hover:text-text disabled:opacity-40"
                >
                  {p.length > 40 ? `${p.slice(0, 40)}…` : p}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto mt-6 max-w-2xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}

        <div className="mt-16">
          {loading && !result && <ResultSkeleton />}
          {!loading && result && (
            <OutfitResult result={result} onRegenerate={() => generate()} loading={loading} />
          )}
          {loading && result && (
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-bg/40 backdrop-blur-[1px]" />
              <OutfitResult result={result} onRegenerate={() => generate()} loading={loading} />
            </div>
          )}
          {!loading && !result && !error && <EmptyState />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
