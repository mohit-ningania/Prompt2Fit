// Curated fallback concepts used when no OPENAI_API_KEY is configured, or a
// live request fails. Keeps the product fully demoable without a key while
// still feeling designed rather than "error state".

export const DEMO_CONCEPTS = [
  {
    title: "Quiet Luxury Off-Duty",
    vibe: "Old money ease with tailored softness — muted neutrals, no logos.",
    palette: ["#EDE6D8", "#B8A88A", "#6B5D4F", "#2E2A24"],
    items: [
      { category: "Top", name: "Cashmere crew sweater", description: "Oatmeal, slightly oversized, sleeves pushed up." },
      { category: "Bottom", name: "Pleated wool trousers", description: "Camel, cropped to the ankle, single pleat." },
      { category: "Shoes", name: "Suede penny loafers", description: "Chocolate brown, worn barefoot." },
      { category: "Outerwear", name: "Long wool overcoat", description: "Draped open, ivory, horn buttons." },
      { category: "Accessory", name: "Leather tote + thin gold hoops", description: "Structured bag, minimal jewelry." },
    ],
    stylingTip: "Keep every texture soft — the contrast comes from tone, not pattern.",
  },
  {
    title: "Neo-Noir Night Out",
    vibe: "Sharp, monochrome, a little dangerous — city lights after dark.",
    palette: ["#0B0B0D", "#1F2937", "#4B5563", "#C0C0C8"],
    items: [
      { category: "Top", name: "Silk slip camisole", description: "Jet black, bias cut, thin straps." },
      { category: "Bottom", name: "Tailored wide-leg trousers", description: "Charcoal pinstripe, high rise." },
      { category: "Shoes", name: "Pointed-toe ankle boots", description: "Black leather, low block heel." },
      { category: "Outerwear", name: "Oversized blazer", description: "Worn draped over the shoulders." },
      { category: "Accessory", name: "Statement cuff + smoky liner", description: "One bold metal piece, nothing else." },
    ],
    stylingTip: "Let one piece — the blazer — do the talking; keep the rest matte and close to black.",
  },
  {
    title: "Cabincore Weekend",
    vibe: "Cozy, textured, made for wood smoke and cold mornings.",
    palette: ["#3E2C22", "#8A5A34", "#C89B6B", "#EDE0D0"],
    items: [
      { category: "Top", name: "Chunky cable-knit sweater", description: "Rust brown, ribbed hem and cuffs." },
      { category: "Bottom", name: "Straight-leg corduroy pants", description: "Burnt sienna, wide wale." },
      { category: "Shoes", name: "Shearling-lined boots", description: "Tan leather, lace-up." },
      { category: "Outerwear", name: "Waxed canvas jacket", description: "Field jacket cut, brass hardware." },
      { category: "Accessory", name: "Knit beanie + wool scarf", description: "Layered in a warm rust-and-cream check." },
    ],
    stylingTip: "Layer thick-to-thin from the inside out so every texture stays visible.",
  },
  {
    title: "Sunset Riviera",
    vibe: "Breezy resortwear — linen, citrus tones, golden hour.",
    palette: ["#F4A259", "#E07A5F", "#F2CC8F", "#FFF3E2"],
    items: [
      { category: "Top", name: "Linen camp collar shirt", description: "Terracotta, worn unbuttoned over a tank." },
      { category: "Bottom", name: "Pleated linen shorts", description: "Cream, relaxed fit, drawstring waist." },
      { category: "Shoes", name: "Woven leather sandals", description: "Tan, minimal straps." },
      { category: "Accessory", name: "Straw fedora + tortoiseshell sunglasses", description: "The finishing pair." },
      { category: "Accessory", name: "Woven raffia tote", description: "Carries everything, matches the sandals." },
    ],
    stylingTip: "Everything should look a little sun-faded — nothing too crisp or new.",
  },
  {
    title: "Studio Streetwear",
    vibe: "Utilitarian, oversized, built for movement between meetings and the gym.",
    palette: ["#101014", "#3A3A46", "#8F9AA6", "#E4E7EB"],
    items: [
      { category: "Top", name: "Boxy graphic hoodie", description: "Washed black, dropped shoulders." },
      { category: "Bottom", name: "Cargo joggers", description: "Slate grey, tapered, utility pockets." },
      { category: "Shoes", name: "Chunky retro trainers", description: "Two-tone grey and white." },
      { category: "Outerwear", name: "Nylon shell jacket", description: "Cropped, worn zipped halfway." },
      { category: "Accessory", name: "Crossbody bag + beanie", description: "Both in matching washed black." },
    ],
    stylingTip: "Play with proportion — oversized top, tapered bottom, keeps it sharp instead of sloppy.",
  },
  {
    title: "Garden Party Romantic",
    vibe: "Soft florals, flowing fabric, made for afternoon light.",
    palette: ["#F7D9E3", "#E8A0BF", "#7A5C61", "#FBF3EF"],
    items: [
      { category: "Top", name: "Puff-sleeve blouse", description: "Blush pink, sheer voile, tie neckline." },
      { category: "Bottom", name: "Tiered midi skirt", description: "Floral print, flows at the ankle." },
      { category: "Shoes", name: "Strappy kitten heels", description: "Dusty rose satin." },
      { category: "Accessory", name: "Pearl drop earrings", description: "Small, understated shimmer." },
      { category: "Accessory", name: "Woven clutch", description: "Cream, with a delicate chain strap." },
    ],
    stylingTip: "Stick to one dominant floral and let every other piece stay solid and soft-toned.",
  },
];

// Small deterministic hash so the same prompt always maps to the same demo
// concept in a session — feels intentional rather than random.
export function pickDemoConcept(prompt) {
  const text = (prompt || "").toLowerCase();
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  const base = DEMO_CONCEPTS[hash % DEMO_CONCEPTS.length];
  return { ...base, id: hash.toString(36) };
}

export const SYSTEM_PROMPT = `You are Prompt2Fit's senior stylist AI. Given a short natural-language prompt describing an occasion, mood, or aesthetic, respond with ONLY a JSON object (no markdown fences) shaped exactly like:
{
  "title": "2-4 word outfit name",
  "vibe": "one sentence describing the overall feel",
  "palette": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "items": [
    { "category": "Top", "name": "short item name", "description": "one short styling detail" }
  ],
  "stylingTip": "one concise, actionable styling tip"
}
Rules:
- Provide exactly 4-6 items, using varied categories (Top, Bottom, Shoes, Outerwear, Accessory, Dress, Layer, etc. as appropriate).
- palette must contain 4 hex colors that actually appear in the outfit, ordered light to dark or by prominence.
- Keep language editorial and confident, like a fashion lookbook, never generic.
- Never include any text outside the JSON object.`;

export function buildImagePrompt(concept) {
  const itemLines = concept.items.map((item) => `${item.name} (${item.description})`).join(", ");
  return `Editorial fashion lookbook photograph, full outfit flat-lay on a seamless studio background, styled outfit titled "${concept.title}". Pieces: ${itemLines}. Mood: ${concept.vibe}. Soft directional studio lighting, high-end fashion magazine aesthetic, no visible text or logos, no human model, shot on medium format film.`;
}
