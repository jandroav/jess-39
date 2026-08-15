# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

A single-page React app built as a gamified birthday gift experience ("JESS 39",
20 Aug 2026). It is **designed for a 100" Samsung TV browser driven by the
remote's D-Pad**, not for mouse/touch. All UI copy is in **Spanish** — keep new
user-facing strings in Spanish.

Jess progresses through 3 gift levels (barefoot shoes → Oura Ring 5 → Casa
Marcial dinner), solving a quiz challenge per level to reveal each gift.

## Commands

```bash
npm install
npm run dev                # localhost only
npm run dev -- --host      # required to reach the dev server from the TV on the LAN
npm run build              # vite build -> dist/
npm run preview
npm run lint               # oxlint (see .oxlintrc.json)
npm run deploy             # predeploy runs build, then gh-pages -d dist
```

There is **no test suite** and **no type-check step**. `.ts`/`.tsx` files are
transpiled by esbuild via Vite with no `tsconfig.json`, so type errors never
fail the build — types are documentation only. `npm run lint` (oxlint, plugins
`react` + `oxc`) is the only automated check; run it after changes.

`npm run deploy` requires a git repo with a GitHub remote; this working copy is
**not currently a git repository**, so deployment needs `git init`, a remote,
and enabling GitHub Pages on the `gh-pages` branch first (see README.md).

## Tech stack

- React 19 + Vite 8 (`@vitejs/plugin-react`), ES modules, `type: module`
- Tailwind CSS v4 via `@tailwindcss/vite`, configured entirely through
  `@import "tailwindcss"` in `src/index.css` — there is no `tailwind.config.js`
- `lucide-react` icons, `canvas-confetti` for the finale
- Web Audio API for all sound — no audio asset files
- `gh-pages` for deployment to GitHub Pages; `vite.config.js` sets `base: './'`
  so built assets resolve relatively under a Pages subpath

## Architecture

**Single state machine in `src/App.tsx`.** `currentView`
(`'welcome' | 'map' | 'modal'`) selects which of three mutually exclusive
screens renders. All other components are presentational and receive state +
callbacks as props. There is no router, no context, no state library.

**Progression state is in-memory only** — `unlockedLevel`, `completedLevels`,
`focusedLevelId`. Nothing is persisted (no localStorage); a page reload restarts
the experience, and that reload is the only way to reset progress.

**Levels are identified by `importanceRank` (1–3), not by `id`.** Every lookup,
unlock check, and focus comparison uses `importanceRank`. The `3` is hardcoded
in several places (`App.tsx` unlock logic, `isLastGift` prop, confetti trigger
in `GiftDetailModal`, "REGALO SUPREMO" label in `LevelMap`, "Regalo X de 3"
header) — adding a fourth gift means updating all of them.

**The modal never chains into the next gift.** Answering a challenge correctly
in `GiftDetailModal.handleOptionSelect` plays the fanfare, calls
`onSolved(rank)` → `handleGiftSolved` in `App.tsx` (marks the level complete,
raises `unlockedLevel`, pre-focuses the next card on the map), and — only for
`importanceRank === 3` — fires the `canvas-confetti` burst. The modal stays on
the gift just revealed; the only forward action is the back-to-map button
(labelled "VOLVER AL INICIO"/"SIGUIENTE PARIDI" style) and Escape / the X, so
Jess selects the next level herself with the D-Pad. Do not reintroduce an
auto-advance path.

**All keyboard input is handled by one `handleKeyDown` in `App.tsx`**, attached
to `window`. Child components never listen for keys. The handler branches on
`currentView`:

- welcome: any of Enter/Space/Right/Down → map
- map: arrows move `focusedLevelId` (Right/Left step by 1, Down/Up step by 2 for
  the grid); Enter/Space opens the gift only if `focusedLevelId <= unlockedLevel`
- modal: Escape/Backspace closes; arrows cycle `focusedModalIndex` 0→1→2

The modal branch does **not** handle Enter/Space — `focusedModalIndex` only
drives focus rings (index 1 = the back-to-map button, index 2 = the X), and the
buttons are activated by `onClick`. Remote-driven modal interaction would need
an activation path added there; Escape is currently the reliable remote exit.

**Gift content lives entirely in `src/data/giftsData.ts`** — riddles, quiz
challenge + `correctOptionIndex`, the detail cards, `brutalFact`,
`healthImpact`, colors, and `husbandNote`. Components read it; no content is
hardcoded in JSX. Data conventions that couple that file to the components:

- `iconName` (on facts/brutalFact) is a **string key resolved through a `switch`**
  in `getIcon` in `GiftDetailModal.tsx`. A new icon name silently falls back to
  a default `Sparkles` icon unless a case is added. `LevelMap`'s `getGiftIcon`
  switches on `visualType` instead. The `icon` field on `Gift` is currently
  **dead data** — nothing reads it.
- `accentColor` / `bgGlow` are applied as **inline `style` props**, never
  Tailwind classes, because Tailwind can't generate classes from runtime
  values. Follow that pattern for per-gift theming.
- `photoSrc` (optional) is an imported image asset; when present the modal
  renders the real photo instead of the `GiftVisual` SVG and **skips the
  `intriguingStory` block** (the photo needs the height). `photoFit: 'contain'`
  is for documents that must not be cropped; `photoLabel` renders a headline
  above the photo. Two gifts use photos: the Oura ring
  (`src/assets/oura-ring-black.jpg`) and the Casa Marcial reservation
  (`src/assets/casa-marcial-reserva.png`, with `photoFit: 'contain'` and
  `photoLabel`).
- `visualType` (`footwear | ring | michelin`) selects the hand-written
  inline SVG in `GiftVisual.tsx`, each with its own gradient/filter `id`s.

**`src/utils/audio.ts`** exports a `soundEngine` singleton that synthesizes all
sound with the Web Audio API. Audio is always on; there is no mute state or
toggle. The `AudioContext` is created lazily and `resume()`d on every play call
to survive browser autoplay policy, and every method is wrapped in try/catch so
a failing TV browser degrades silently. Note: `playReveal()` exists but is never
called.

**`src/components/BackgroundParticles.tsx`** renders a fixed full-screen canvas
starfield (70 drifting particles over a radial vignette) behind all views.

Entry point is `src/main.jsx` (`.jsx`, referenced by `index.html`), while
everything it imports is `.tsx`. `index.html` loads the Cinzel & Outfit Google
Fonts and sets `lang="es"`.

## TV / 10-foot UI constraints

- `src/index.css` defines the design system: `.tv-safe-zone` (overscan padding
  on the root container), `.tv-focused` (gold outline + glow + scale for the
  focused element), and the `fadeIn` / `pulseGlow` animations. Focus is
  expressed with these classes or Tailwind `ring-*` utilities — native
  `*:focus { outline: none }` is globally disabled.
- **The gift modal must never scroll and must never clip.** It is fixed at
  `h-[94vh]` with `overflow-hidden`, so anything that does not fit is silently
  cut off — there is no scrollbar to save you. Three mechanisms keep that
  invariant, and changes to the modal have to respect all three:
  1. **Fluid type scale** (`.tv-text-xs` … `.tv-text-3xl` in `index.css`):
     `clamp()` sizes tied to `vh`, so text grows on the TV and shrinks on a
     laptop instead of overflowing. Use these in the modal rather than `text-xs`
     / `text-[10px]`.
  2. **Length-capped copy, not `line-clamp`.** The doc comment on `ScienceFact`
     in `giftsData.ts` gives the caps (stat ~14 chars, title ~30, description
     ~60). Keep the copy short instead of clamping it.
  3. **Each gift carries 5–6 detail cards** on a 6-column track, 3 per row.
     `getCardSpan()` widens a short last row (2 leftovers span half each, a lone
     leftover spans full width) so the grid never shows a hole, and the DATO
     BRUTAL card keeps `grow` as the slack absorber. The Casa Marcial gift has
     5 cards; the others have 6.

  After changing modal content, verify with a browser: open each of the three
  gifts and assert `scrollHeight === clientHeight` on the two columns, and that
  no leaf element has `scrollWidth > clientWidth`.

## Code style

- Functional components with typed props interfaces; hooks at the top.
- Spanish for UI strings, English for code identifiers and most comments
  (matching the existing files).
- Inline `style` props for runtime colors (`accentColor`, `bgGlow`); Tailwind
  classes for everything static.
- Keep components presentational — state and keyboard handling stay in `App.tsx`.

## Testing

There is no test framework and no CI. Verification is manual: `npm run lint`,
`npm run build`, then `npm run dev -- --host` and exercise the full flow
(welcome → map → solve each of the 3 challenges → finale confetti) in a browser,
ideally at TV resolution, checking the modal no-scroll/no-clip invariant above.

## Security considerations

- Purely static frontend: no backend, no network calls besides Google Fonts, no
  user input beyond quiz clicks, nothing persisted. Attack surface is minimal.
- No secrets in the repo — do not add API keys or credentials; there is nothing
  to use them with.
- The content is personal (gift details, a real dinner reservation screenshot in
  `src/assets/casa-marcial-reserva.png`); the deployed site is public on GitHub
  Pages, so treat anything committed as public.

## Notes on README.md

`README.md` (Spanish) is the user-facing setup and deploy guide and is accurate
for commands and deployment. Its project-structure section is slightly stale: it
omits `src/assets/casa-marcial-reserva.png` and describes the Oura photo as the
only image asset.
