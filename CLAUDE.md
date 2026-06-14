# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```s
npm run serve   # dev server (vue-cli-service serve, hot reload)
npm run build   # production build -> ./build (NOT ./dist)
npm run lint    # eslint via vue-cli-service
```

No test suite exists.

Build needs legacy OpenSSL on modern Node: `NODE_OPTIONS=--openssl-legacy-provider` (CI sets this; set locally if build fails with `ERR_OSSL_EVP_UNSUPPORTED`). Stack is Vue 2 / vue-cli 4 / Vuetify 2.

## Architecture

Single-page CV/portfolio site. Vue 2 + vue-router (hash-less history-ish) + Vuetify 2.

- `src/App.vue` — shell: nav drawer, app bar, dark-mode toggle (persisted in `localStorage` key `isDark`), `<router-view>`. Drawer menu counts come from fetching the JSON data files.
- `src/router.js` — routes map paths to components: `/cv` (default `/`), `/awards`, `/researches`, `/projects`, `/blog`.
- `src/components/*.vue` — one component per route (Cv, Award, Researches, Projects, Blog). Experience.vue / Experience-item.vue are Cv subcomponents.

### Data flow (important)

Content is NOT hardcoded in components. Components `fetch()` static JSON at runtime from `public/data/`:

- `public/data/cv.json` — cv, awards, researches sections (keyed by section name; `length` drives drawer counts)
- `public/data/projects.json` — projects, each with a `repos` array (count = sum of repo lengths)

To change CV content, edit the JSON in `public/data/`, not the `.vue` files. `axios` is referenced in commented-out code; native `fetch` is the active path.

Assets: `public/avatars`, `public/logos` served at root (e.g. `/avatars/van tuan tran.jpg`).

## Deploy

CI (`.github/workflows/main.yml`) on push to `master`: build → publish `build/` to the `huntertran.github.io` repo (GitHub Pages) via `peaceiris/actions-gh-pages`. Output dir is `build` (set in `vue.config.js`).

Requires repo secret `DEPLOY_TOKEN`: a personal access token with push rights to `huntertran/huntertran.github.io`. `force_orphan` wipes the target branch each deploy.
