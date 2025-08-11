# Agents Guide

## Mission
Keep the app **fast, stable, and accessible**. Prefer clarity over cleverness.

## Definition of Done
- Mobile + desktop work reliably (keyboard focus, backspace, stats updates)
- Hidden input remains focused; mobile keyboard appears
- No user-agent sniffing; only media queries + small feature checks
- Gemini background function returns valid SVG and never exposes the key
- No console errors; basic a11y checks pass (labels, focus, contrast)

## PR Checklist
- [ ] Layout reflows at 900px and 600px breakpoints
- [ ] Stats math: WPM `(correct/5)/(seconds/60)`, accuracy `correct/typed`
- [ ] Function path `/.netlify/functions/generate_bg` returns `{ svg: string }`
- [ ] Strip code fences from model output before using SVG
- [ ] Don’t change `netlify.toml` without explaining why

## Roadmap
- Settings modal (font size, caret style)
- Playlist with multiple tracks
- Session history via `localStorage`
- Optional PWA manifest
