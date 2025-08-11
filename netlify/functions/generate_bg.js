// Netlify Function: Generate a lofi SVG background using Google Gemini (text model outputs SVG)
// Keep your API key in Netlify env var: GEMINI_API_KEY

export async function handler(event) {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(),
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders(), body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: corsHeaders(), body: JSON.stringify({ error: "Missing GEMINI_API_KEY" }) };
  }

  let theme = "dark";
  try {
    const body = JSON.parse(event.body || "{}");
    if (body.theme) theme = String(body.theme);
  } catch {}

  const prompt = `You are a graphics generator. Return ONLY a compact inline SVG (no markdown fences, no commentary) for a soft, abstract, seamless-looking lofi background.
- Aesthetic: ${theme} mode, subtle gradients, noise-like shapes, pastel accents.
- Size: viewBox 0 0 1600 1000.
- Keep under 30KB.
- No external resources.
- No script.
- Avoid huge path lists.
- Use a few <defs> like radial/linear gradients or simple patterns.`;

  try {
    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
        }),
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: resp.status, headers: corsHeaders(), body: JSON.stringify({ error: "Gemini error", details: text }) };
    }

    const data = await resp.json();
    const textOut = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip code fences if present and trim
    const svg = stripFences(textOut).trim();

    // Basic sanity guard
    if (!svg.startsWith("<svg") || !svg.includes("</svg>")) {
      return { statusCode: 502, headers: corsHeaders(), body: JSON.stringify({ error: "Invalid SVG returned" }) };
    }

    return { statusCode: 200, headers: corsHeaders(), body: JSON.stringify({ svg }) };
  } catch (e) {
    return { statusCode: 500, headers: corsHeaders(), body: JSON.stringify({ error: "Server error", details: String(e) }) };
  }
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function stripFences(s) {
  return s
    .replace(/^```[a-zA-Z]*\n?/g, "")
    .replace(/```$/g, "");
}
