# Prompt2Fit

Prompt2Fit is an AI-powered stylist: describe a mood, occasion, or aesthetic in
one sentence, and it returns a complete outfit — an item-by-item breakdown, a
color palette, a styling tip, and an AI-generated lookbook visual.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs fully in **demo mode** out of the box, cycling through a set of
designed outfit concepts so it looks and works great with zero configuration.

To enable **live AI generation** (GPT-powered styling + DALL·E lookbook
images), copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
# then edit .env.local
OPENAI_API_KEY=sk-...
```

Restart the dev server after adding the key.

## How it works

- `POST /api/generate` takes `{ prompt }` and:
  - With an `OPENAI_API_KEY` set, asks `gpt-4o-mini` for a structured JSON
    outfit concept (title, vibe, 4-color palette, itemized pieces, styling
    tip), then asks `dall-e-3` for a matching lookbook image.
  - Without a key — or if the live call fails for any reason — it falls back
    to a curated demo concept (`lib/outfitLibrary.js`) chosen deterministically
    from the prompt, so the UI never breaks or shows a dead end.
- The frontend (`pages/index.js`) always renders a full result: a real photo
  when one was generated, or an elegant palette-based "lookbook cover" built
  from the outfit's own colors when it wasn't.

## Stack

Next.js (Pages Router) · React 19 · Tailwind CSS v4 · Framer Motion ·
Lucide icons · OpenAI SDK.

## Project structure

```
components/   UI building blocks (form, result cards, background FX, etc.)
lib/          Outfit concept library, prompt templates, demo fallback logic
pages/        Routes + the /api/generate endpoint
styles/       Design tokens and global styles
```

---

© 2026 Prompt2Fit by Mohit Ningania
