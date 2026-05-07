# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page website for the AI Weekends community, hosted on GitHub Pages at `aiweekends.kovanlabs.com`. No build tools, no package manager, no framework — pure HTML/CSS/vanilla JS.

## Development

**Run locally:**
```
# Any static file server works, e.g.:
python -m http.server 8080
# or
npx serve .
```

No install step required.

**Deploy:** Push to `main` branch — GitHub Pages serves it automatically.

## Architecture

Three files own all behavior:

- **`index.html`** — Single page. Sections: `header` (fixed nav), `#hero`, `#about`, `#what-to-expect`, `#community`, `footer`. SVG icons are inlined. No external JS dependencies.
- **`css/styles.css`** — All styling. Design tokens live in `:root` CSS custom properties at the top of the file. Keyframe animations are defined mid-file. Responsive breakpoints: 480px, 768px, 1024px.
- **`js/main.js`** — Five self-contained init functions called on `DOMContentLoaded`: `initHeader`, `initMobileMenu`, `initScrollAnimations`, `initSmoothScroll`, and a ripple effect on CTA buttons. Uses `IntersectionObserver` for scroll-triggered animations.

## Design System

**Aurora theme** — warm gradient palette inspired by the logo. Modify colors via CSS custom properties in `styles.css`:

| Token | Value | Use |
|---|---|---|
| `--color-golden-yellow` | `#F7C948` | Primary accent, glows |
| `--color-sunset-orange` | `#F5833C` | CTAs, highlights |
| `--color-coral` | `#E87B6A` | Gradient terminus |
| `--color-lime-green` | `#9AC33E` | Gradient start |
| `--gradient-aurora` | lime → yellow → orange → coral → green | Hero, community bg |

**Fonts:** Audiowide (display headings, all-caps treatment) and Exo 2 (body) — loaded from Google Fonts in `index.html`.

**Glassmorphism cards** use `backdrop-filter: blur()` + semi-transparent backgrounds — test in Chrome and Safari as filter support varies.

**Animations:** All keyframes use `transform`/`opacity` for GPU acceleration. `prefers-reduced-motion` disables all animations — keep new animations inside this media query guard.

## Content

Event registration links to `lu.ma/aiweekends`. The `roadmap.md` file contains the full design spec and implementation phases — consult it before making structural layout changes.
