# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```s
npm run dev      # Vite dev server, port 8080, HMR
npm run build    # production build -> ./build (NOT ./dist)
npm run preview  # serve the production build locally
npm run lint     # eslint (flat config, eslint.config.js)
```

No test suite exists. Stack is Vue 3 + Vite 5 + vue-router 4, custom CSS (no UI framework). No build flags needed.

## Architecture

Single-page CV/portfolio site, terminal/dev visual theme. `<script setup>` SFCs.

- `index.html` (repo root) — Vite entry; loads `src/main.js`.
- `src/main.js` — creates app, installs router, imports `src/styles/global.css`.
- `src/styles/global.css` — design system: CSS variables on `:root` and `:root[data-theme='light']`; shared primitives (`.card`, `.btn`, `.pill`, `.section-title`, `.prompt`, `.comment`). Edit theme colors here.
- `src/App.vue` — terminal-window shell: top bar (traffic lights + path + theme toggle), sidebar nav with live counts, `<router-view>`. Theme persisted in `localStorage` key `theme` (default `dark`); applied via `data-theme` attr on `<html>`.
- `src/router.js` — HTML5 history (clean URLs, no `#`). Deep-link refresh on GitHub Pages works via a `404.html` fallback: `vite.config.js`'s `spaFallback` plugin copies built `index.html` → `404.html`. Routes: `/cv` (default `/`), `/awards`, `/researches`, `/projects`, `/blog`.
- `src/components/*.vue` — one per route: Cv, Awards, Researches, Projects, Blog. `Timeline.vue` is a Cv subcomponent (experience/education/volunteer).

Projects.vue fetches live repo metadata from the GitHub API (`api.github.com/repos/huntertran/<name>`) at runtime — subject to unauthenticated rate limits; cards just don't render on 403.

### Data flow (important)

Content is NOT hardcoded in components. Components `fetch()` static JSON at runtime from `public/data/`:

- `public/data/cv.json` — cv, awards, researches sections (keyed by section name; `length` drives drawer counts)
- `public/data/projects.json` — projects, each with a `repos` array (count = sum of repo lengths)

To change CV content, edit the JSON in `public/data/`, not the `.vue` files. `axios` is referenced in commented-out code; native `fetch` is the active path.

Assets: `public/avatars`, `public/logos` served at root (e.g. `/avatars/van tuan tran.jpg`).

## Deploy

CI (`.github/workflows/main.yml`) on push to `master`: build → publish `build/` to the `huntertran.github.io` repo (GitHub Pages) via `peaceiris/actions-gh-pages`. Output dir is `build` (set in `vite.config.js`).

Requires repo secret `GITHUBIO_DEPLOY`: a personal access token with push rights to `huntertran/huntertran.github.io`. `force_orphan` wipes the target branch each deploy.
