# Agents Guide

## Mission
Keep the app **fast, stable, and accessible**. Prefer clarity over cleverness.

## How to Work
- Use feature branches and PRs.
- Write small, focused commits: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`.
- Keep JS modular in `src/` and CSS split between `styles/base.css` and `styles/typing.css`.

## Definition of Done
- Works on **mobile** and **desktop**.
- No regressions in WPM/accuracy updates.
- Hidden input remains focused; mobile keyboard appears reliably.
- Lint-free. No unhandled errors in console.
- Accessibility: logical heading order, focusable prompt container, descriptive button labels.

## Review Checklist
- [ ] Layout reflows under 600px and 900px.
- [ ] No user-agent sniffing; use media queries and feature checks only.
- [ ] Audio does not autoplay; UI toggle required.
- [ ] Prompt rendering does not reflow excessively (spans reused/reset).
- [ ] Stats math: WPM `(correct/5)/(seconds/60)`, accuracy `correct/typed`.

## Roadmap (PRs welcome)
- Settings modal (font size, caret style).
- Multi-track playlist with memory of last track.
- Local history of sessions (date, wpm, accuracy) in `localStorage`.
- Optional PWA manifest.
