# LoFi Typing Remix

A lightweight, responsive typing app with a calm lofi vibe. No build step, no backend—just static files you can deploy to Netlify or any static host.

## Features
- Mobile-first typing with a hidden input (disables autocorrect/caps/spellcheck).
- Real-time **WPM**, **accuracy**, **elapsed time**.
- Per-character feedback with a custom caret.
- Lofi music (user-initiated) + volume slider.
- Light/Dark theme with `localStorage` persistence.
- No user-agent sniffing—pure responsive CSS and small feature checks.

## Quick Start
Just open `index.html` in a modern browser, or serve statically with any HTTP server.

## Deploy on Netlify
1. Push this repo to GitHub.
2. In Netlify, **New site from Git** → pick your repo.
3. No build command. **Publish directory:** `/` (repo root).
4. Deploy. That’s it.

## Customize
- **Prompts:** `src/prompts.js` (`PROMPTS` + `PARAGRAPHS`).
- **Theme:** tweak CSS variables in `styles/base.css`.
- **Audio:** drop `public/audio/track1.mp3`.

## Accessibility
- Keyboard focus retained via hidden input; visual caret for current character.
- Color contrast tuned for light/dark.
- Respects reduced motion (keep animations minimal).

## License
MIT – see `LICENSE`.
