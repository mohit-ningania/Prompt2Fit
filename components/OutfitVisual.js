import { ImageOff } from "lucide-react";

// Editorial "lookbook cover" rendered purely from the palette when no live
// image is available (no API key, or image generation failed) — so the
// product still feels finished, not broken.
function PaletteCover({ concept }) {
  const colors = concept.palette?.length ? concept.palette : ["#2E2A24", "#6B5D4F", "#B8A88A", "#EDE6D8"];
  const bands = colors.length >= 3 ? colors : [...colors, ...colors].slice(0, 4);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border">
      <div className="absolute inset-0 flex">
        {bands.map((c, i) => (
          <div key={i} style={{ background: c, flex: 1 }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">Lookbook cover</p>
        <p className="font-display mt-1 text-2xl leading-tight text-white drop-shadow-sm">{concept.title}</p>
      </div>
    </div>
  );
}

export default function OutfitVisual({ concept, imageUrl, imageFailed }) {
  if (imageUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`AI-generated lookbook visual for the "${concept.title}" outfit`}
          className="aspect-[3/4] w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <PaletteCover concept={concept} />
      {imageFailed && (
        <p className="flex items-center gap-1.5 text-xs text-text-muted">
          <ImageOff className="h-3.5 w-3.5" />
          Live image render was unavailable — showing a palette-based cover instead.
        </p>
      )}
    </div>
  );
}
