# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page React app built as a birthday gift experience ("JESS 39", 20 Aug 2026). It is **designed for a 100" Samsung TV browser driven by the remote's D-Pad**, not for mouse/touch. All UI copy is in **Spanish** — keep new strings in Spanish.

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

There is **no test suite** and **no type-check step**. `.ts`/`.tsx` files are transpiled by esbuild via Vite with no `tsconfig.json`, so type errors never fail the build — types are documentation only. `npm run lint` is the only automated check.

`npm run deploy` requires a git repo with a GitHub remote; this working copy is not currently a git repository.

## Architecture

**Single state machine in `src/App.tsx`.** `currentView` (`'welcome' | 'map' | 'modal' | 'finale' | 'nota'`) selects which of five mutually exclusive screens renders. All other components are presentational and receive state + callbacks as props. There is no router, no context, no state library.

**Progression state is in-memory only** — `unlockedLevel`, `completedLevels`, `focusedLevelId`. Nothing is persisted (no localStorage), so a page reload restarts the experience — that reload is the only way to reset progress, since the on-screen control bar was removed.

**Levels are identified by `importanceRank` (1–3), not by `id`.** Every lookup, unlock check, and focus comparison uses `importanceRank`. The `3` is hardcoded in several places (`App.tsx` unlock/finish logic, `isLastGift`, confetti trigger in `GiftDetailModal`, "REGALO SUPREMO" label in `LevelMap`) — adding a fourth gift means updating all of them.

**The modal never chains into the next gift.** Answering a challenge correctly calls `onSolved(rank)` → `handleGiftSolved` in `App.tsx`, which marks the level complete, raises `unlockedLevel`, and moves `focusedLevelId` to the next card — but leaves the modal on the gift just revealed. The only forward action is the main button (and Escape / the X), which returns to the map with the next level already focused, so Jess selects it herself with the D-Pad. Do not reintroduce an auto-advance path.

That button's single `onPrimaryAction` prop resolves in `handleModalPrimaryAction` (`App.tsx`), which picks one of three destinations from the gift data — keep the branching there, not in the modal:
- last gift (rank 3) → "¡DISFRUTÉMOSLO!" → `FinalScreen.tsx`, the congratulations screen with the cat photos (`src/assets/cats/`);
- `hasSizingNote` (the Oura gift) → "ABRE TU NOTA" → `SizingNote.tsx`, the full-screen note explaining that the ring ships only after the sizing kit. It is shown while Jess is handed the physical kit, and its button returns to the map for the last gift;
- anything else → "SIGUIENTE PARIDI" → back to the map.

**All keyboard input is handled by one `handleKeyDown` in `App.tsx`**, attached to `window`. Child components never listen for keys. The handler branches on `currentView`:
- welcome: any of Enter/Space/Right/Down → map
- map: arrows move `focusedLevelId` (Right/Left step by 1, Down/Up step by 2 for the grid); Enter opens the gift only if `focusedLevelId <= unlockedLevel`
- modal: Escape/Backspace closes; arrows cycle `focusedModalIndex` 0→1→2
- finale: Escape/Backspace/Enter/Space → map
- nota: Escape/Backspace/Enter/Space → map

In the modal, Enter/Space fires only **once the gift is revealed** (`completedLevels` contains its rank): it runs the X button when `focusedModalIndex === 2` and `handleModalPrimaryAction` otherwise. During the challenge stage Enter is deliberately inert, since the quiz options are still click-only — answering with the D-Pad would need an activation path wired to `focusedModalIndex`, and OK must not be allowed to skip the question.

**Gift content lives entirely in `src/data/giftsData.ts`** — riddles, quiz challenge + `correctOptionIndex`, the six detail cards, `brutalFact`, `healthImpact`, colors, and `husbandNote`. Components read it; no content is hardcoded in JSX.

Three data conventions couple that file to the components:
- `iconName` / `icon` are **string keys resolved through `switch` statements** — `getIcon` in `GiftDetailModal.tsx` and `getGiftIcon` in `LevelMap.tsx`. A new icon name silently falls back to a default unless a case is added.
- `accentColor` / `bgGlow` are applied as **inline `style` props**, never Tailwind classes, because Tailwind can't generate classes from runtime values. Follow that pattern for per-gift theming.
- `photoSrc` (optional) is an imported image asset; when present the modal renders the real photo instead of the hand-drawn `GiftVisual` SVG. Only the Oura gift uses one (`src/assets/oura-ring-black.jpg`).

**`GiftVisual.tsx`** returns a hand-written inline SVG per `visualType` (`footwear | ring | michelin`) with its own gradient/filter `id`s.

**`src/utils/audio.ts`** exports a `soundEngine` singleton that synthesizes all sound with the Web Audio API — no audio assets. Audio is always on; there is no mute state or toggle. The `AudioContext` is created lazily and `resume()`d on every play call to survive browser autoplay policy, and every method is wrapped in try/catch so a failing TV browser degrades silently rather than throwing.

## TV / 10-foot UI constraints

- `index.css` defines the design system: `.tv-safe-zone` (overscan padding on the root container), `.tv-focused` (gold outline + glow + scale used for the focused element), and the `fadeIn` / `pulseGlow` animations. Focus is expressed with these classes or Tailwind `ring-*` utilities — native `*:focus { outline: none }` is globally disabled.
- Tailwind v4 via `@tailwindcss/vite`, configured entirely through `@import "tailwindcss"` in `src/index.css`. There is no `tailwind.config.js`.
- **TV browser zoom compensation.** Samsung's browser is often left at 110–125% zoom, shrinking the CSS viewport (1080px → ~864px) while fixed-px paddings and icons keep their size, so the modal's `94vh` box clips its action bar. `index.css` applies `zoom: 0.9` / `0.8` to `#root` via `max-height` media queries (1000px / 900px) so the layout always behaves as designed at ~1080px.
- **The gift modal must never scroll and must never clip.** It is fixed at `h-[94vh]` with `overflow-hidden`, so anything that does not fit is silently cut off — there is no scrollbar to save you. Three mechanisms keep that invariant, and changes to the modal have to respect all three:
  1. **Fluid type scale** (`.tv-text-xs` … `.tv-text-3xl` in `index.css`): `clamp()` sizes tied to `vh`, so text grows on the TV and shrinks on a laptop instead of overflowing. Use these in the modal rather than `text-xs` / `text-[10px]`.
  2. **Length-capped copy, not `line-clamp`.** The doc comment on `ScienceFact` gives the caps (stat ~14 chars, title ~30, description ~60). Truncated text was the old failure mode; keep the copy short instead of clamping it.
  3. **Each gift carries 5–6 detail cards** on a 6-column track, 3 per row. Three cards left a large empty gap that the `grow` on the DATO BRUTAL card had to absorb; a full two-row grid fills the column instead. `getCardSpan()` widens a short last row (2 leftovers span half each) so the grid never shows a hole, and the DATO BRUTAL card keeps `grow` as the slack absorber.

  After changing modal content, re-verify with a headless browser: open each of the three gifts and assert `scrollHeight === clientHeight` on the two columns, and that no leaf element has `scrollWidth > clientWidth`.
- Entry point is `src/main.jsx` (`.jsx`, referenced by `index.html`), while everything it imports is `.tsx`.
- `vite.config.js` sets `base: './'` so built assets resolve relatively under a GitHub Pages subpath.

## Note on README.md

`README.md` (Spanish) is the user-facing setup and deploy guide. Its project-structure section lists a `BirthdayCakeSection.tsx` component that does not exist in `src/components/` — the final "candles/fireworks" step is currently just a fanfare + confetti call in `App.tsx`'s `handleUnlockNext`.
