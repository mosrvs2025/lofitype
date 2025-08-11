# LoFi Typing Remix

A lightweight, responsive typing app with a calm lofi vibe. Static files + one Netlify Function that asks **Gemini** to generate an SVG background. Your API key stays server-side.

## Features
- Mobile-first typing (hidden input disables autocorrect/caps/spellcheck)
- Real-time **WPM**, **accuracy**, **elapsed time**
- Per-character feedback + custom caret
- Lofi music (user-initiated) + volume slider
- Light/Dark theme with `localStorage`
- **Gemini-powered background** via Netlify Function (no key exposure)

## Quick Start
- Open `index.html` locally or serve statically.
- Click **Generate BG** to call the serverless function (requires deploy with env var).

## Deploy on Netlify
1. Push this repo to GitHub.
2. In Netlify: **New site from Git** → select repo.
3. **Build command:** _none_ (static). **Publish directory:** `/` (repo root).
4. In Site settings → **Environment variables**, add `GEMINI_API_KEY` with your key.
5. Deploy. The function will be available at `/.netlify/functions/generate_bg`.

## Local dev (optional)
- Install Netlify CLI: `npm i -g netlify-cli`
- Run: `netlify dev` (reads `.env` if present)
- Add a local `.env` with `GEMINI_API_KEY=...` (do **not** commit).

## Customize
- **Prompts:** `src/prompts.js`
- **Theme:** CSS variables in `styles/base.css`
- **Audio:** add `public/audio/track1.mp3`

## Security note
Never commit your API key. Keep it in Netlify env vars or a local `.env` for dev.

## License
MIT – see `LICENSE`.
