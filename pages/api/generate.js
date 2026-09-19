import OpenAI from "openai";
import { SYSTEM_PROMPT, buildImagePrompt, pickDemoConcept } from "@/lib/outfitLibrary";

const MAX_PROMPT_LENGTH = 300;

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function parseConcept(raw) {
  const cleaned = raw.trim().replace(/^```json\s*|```$/g, "");
  const parsed = JSON.parse(cleaned);
  if (!parsed.title || !Array.isArray(parsed.items) || !Array.isArray(parsed.palette)) {
    throw new Error("Malformed concept payload");
  }
  return parsed;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "A prompt is required." });
  }

  const trimmedPrompt = prompt.trim().slice(0, MAX_PROMPT_LENGTH);
  const client = getClient();

  if (!client) {
    const concept = pickDemoConcept(trimmedPrompt);
    return res.status(200).json({ concept, imageUrl: null, mode: "demo" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: trimmedPrompt },
      ],
    });

    const concept = parseConcept(completion.choices[0].message.content);

    let imageUrl = null;
    try {
      const image = await client.images.generate({
        model: "dall-e-3",
        prompt: buildImagePrompt(concept),
        size: "1024x1792",
        quality: "standard",
        n: 1,
      });
      imageUrl = image.data[0]?.url ?? null;
    } catch (imageError) {
      console.error("Prompt2Fit image generation failed:", imageError);
    }

    return res.status(200).json({ concept, imageUrl, mode: imageUrl ? "live" : "live-no-image" });
  } catch (error) {
    console.error("Prompt2Fit generation failed:", error);
    const concept = pickDemoConcept(trimmedPrompt);
    return res.status(200).json({ concept, imageUrl: null, mode: "demo-fallback" });
  }
}
