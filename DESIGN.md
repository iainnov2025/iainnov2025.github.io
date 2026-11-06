---
# LegalVec visual identity — machine-readable tokens (format: DESIGN.md draft spec, Google Labs, April 2026).
# Source of truth for values: src/styles/tokens.css (site) and platform/apps/web/src/styles/tokens.css (app).
# If a value changes, change it here and in both token files in the same commit.
name: LegalVec
version: 1.0.0
updated: 2026-11-07
colors:
  ink: "#12161D"           # text, primary buttons, dark sections
  paper: "#F6F4EF"         # page background
  surface: "#FFFFFF"       # cards, panels, inputs
  line: "#E2DDD3"          # borders, dividers
  muted: "#5F646C"         # secondary text (5.4:1 on paper, 6.0:1 on surface)
  line-strong: "#878C93"   # input and control borders (3.1:1 on paper, 3.4:1 on surface)
  accent: "#1E4D43"        # the one accent: links, focus, selected, verified
  accent-ink: "#F6F4EF"    # text on accent
  accent-soft: "#E3ECE8"   # accent backgrounds (selected rows, chips)
  mark-accent: "#8FBFB0"   # logo square only, never for text
  danger: "#9B2C2C"        # destructive, contradicted, overdue
  success: "#2F6B3A"       # verified, done
  warning: "#8A5A14"       # partially supported, due soon, needs review
typography:
  serif: "Newsreader Variable, Iowan Old Style, Palatino Linotype, Georgia, serif"
  sans: "Geist Sans, Segoe UI, system-ui, sans-serif"
  mono: "Geist Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
  scale:                   # fluid 360px → 1440px; app UI uses fixed sizes, see "App density"
    step--1: "clamp(0.83rem, 0.80rem + 0.13vw, 0.90rem)"
    step-0: "clamp(1.00rem, 0.96rem + 0.19vw, 1.10rem)"
    step-1: "clamp(1.20rem, 1.12rem + 0.37vw, 1.40rem)"
    step-2: "clamp(1.44rem, 1.30rem + 0.65vw, 1.85rem)"
    step-3: "clamp(1.73rem, 1.48rem + 1.11vw, 2.50rem)"
    step-4: "clamp(2.07rem, 1.66rem + 1.85vw, 3.35rem)"
    step-5: "clamp(2.49rem, 1.83rem + 2.93vw, 4.45rem)"
spacing: { 1: 0.25rem, 2: 0.5rem, 3: 0.75rem, 4: 1rem, 5: 1.5rem, 6: 2rem, 7: 3rem, 8: 4.5rem, 9: 7rem }
radius: { 1: 4px, 2: 10px, app-frame: 14px, control: 6px, pill: 999px }
layout: { measure: 66ch, container: 1180px }
motion:
  ease-out: "cubic-bezier(.2, .7, .2, 1)"
  dur-1: 150ms             # hover, press
  dur-2: 250ms             # panels, tabs, chips
  dur-3: 400ms             # maximum for any transition
---

# LegalVec — Visual identity

Read this before writing any UI for the site (`apps/site`) or the app (`platform/apps/web`).
It says what LegalVec looks like, why, and the rules a change must respect. Tokens are in the
front matter; prose explains how to use them.

## 1. What the brand must feel like

LegalVec is for French litigation lawyers who will judge it on one question: *can I trust
what it says?* The design answers that question before the copy does.

- **Calm and exact.** A well-kept case file, not a startup launch. Quiet surfaces, generous
  space, precise alignment, numbers in tabular figures.
- **Evidence is visible.** Sources, dates, verification states and page numbers are shown,
  not hidden behind tooltips. A claim without its source looks unfinished on purpose.
- **The lawyer decides.** Anything the assistant proposes looks like a proposal (outlined
  card, explicit buttons), never like a done deal.

References the founder chose: Mercury (quiet confidence, spacing), Legora (motion that shows
the product working), Harvey (few words, editorial serif).

## 2. Logo

Direction A, « Renvoi » (chosen 6 November 2026; `src/brand/PICK` = `a`).

- **Wordmark first.** The mark is a serif « L » on an ink square with a small sage square at
  the top right: the reference marker (*renvoi*) a lawyer adds in a margin.
- Files: `src/brand/logo.svg` (light), `logo-dark.svg`, `logo-mono.svg`, `mark.svg`
  (favicon, app icon). Never redraw, recolour, stretch, outline or add effects.
- Clear space: the height of the sage square on every side. Minimum size: mark 16 px,
  wordmark 88 px wide.
- On ink backgrounds use `logo-dark.svg`; on photos or colour, don't place the logo at all.
- `mark-accent` (#8FBFB0) exists only inside the logo.

## 3. Colour

One deep, muted base and **one** accent. Colour carries meaning; it is never decoration.

| Role | Token | Use |
|---|---|---|
| Page | `paper` | Background of every page and of the app shell |
| Content | `surface` | Cards, panels, tables, inputs, the document viewer |
| Text | `ink` / `muted` | Body and headings / secondary text, metadata, captions |
| Structure | `line` / `line-strong` | 1 px dividers and card borders (decorative) / borders of inputs, checkboxes and other controls (WCAG 1.4.11) |
| Action, focus, verified | `accent` | Links, focus rings, selected tab, "Vérifiée" state |
| Selected background | `accent-soft` | Selected row, active filter chip, highlighted source passage |
| Status | `success` / `warning` / `danger` | Verified · partially supported / due soon · contradicted / overdue / destructive |

Rules:
- **No gradients, no glassmorphism, no glow, no blur, no purple or blue.** Depth comes from a
  1 px `line` border and, for floating layers only, one soft shadow
  (`0 1px 0 rgba(18,22,29,.04), 0 30px 80px -20px rgba(0,0,0,.45)` for hero frames,
  `0 8px 24px -12px rgba(18,22,29,.25)` for popovers and dialogs).
- Primary buttons are `ink` on `paper` text, not accent. The accent is reserved for
  selection, links and verification, so "green" always means "checked against a source".
- Status colour never stands alone: pair it with a word or an icon (« Vérifiée »,
  « À revoir », « Contredite ») for colour-blind users.
- Contrast: body text ≥ 4.5:1, large text and UI borders that convey state ≥ 3:1
  (WCAG 2.2 AA). `muted` is 5.4:1 on `paper` and 6.0:1 on `surface`; don't lighten it. `line` (1.35:1) is decorative only: never use it alone to show a control's edge.
- Dark sections (site hero, final CTA) use `ink` background with `paper` text. The app has
  no dark mode in the MVP.

## 4. Typography

| Family | Token | Use |
|---|---|---|
| Newsreader (serif) | `serif` | H1, H2, case titles, dashboard section titles, pull quotes |
| Geist Sans | `sans` | All UI, body, H3 and below, buttons, tables |
| Geist Mono | `mono` | Piece references (P. 07), RG numbers, dates in tables, code, IDs |

- Serif headlines weight 500, letter-spacing −0.01em, line-height 1.12, `text-wrap: balance`.
- Body line-height 1.6 on the site, 1.45 in the app. Max line length `measure` (66ch).
- Numbers that line up (deadlines, amounts, counts) use `font-variant-numeric: tabular-nums`.
- **French typography is mandatory:** no-break space before `; : ! ?` and inside « »,
  « L. 442-1 » kept together, French quotes « » not "". The site enforces it at build time
  (`src/lib/french-typo.ts`); the app must use the same helper for generated text.
- Kicker labels: sans 500, uppercase, letter-spacing 0.08em, `step--1`, `muted`.

### App density
The app is a working tool: fixed sizes, not fluid. Base 14 px (0.875rem), small 12 px,
labels 11 px uppercase, section titles 18–20 px serif, case title 24 px serif. Row height
36 px in tables, 32 px for compact lists.

## 5. Space, grid and shape

- 4 px base; use the `spacing` scale only. Sections on the site breathe (`space-8`/`space-9`);
  app panels use `space-4`/`space-5` padding and `space-3` gaps.
- Site container 1180 px with 16 px gutters on phones. App shell: 232 px sidebar, fluid main,
  360 px chat panel (collapsible) at ≥ 1280 px; chat becomes a drawer below.
- Radius: 4 px for chips and inputs, 6 px for buttons, 10 px for cards, 14 px for the app frame.
  Never fully rounded buttons except status pills.

## 6. Components (shared vocabulary)

| Component | Look | Behaviour |
|---|---|---|
| **Button** | Primary: `ink` fill, `paper` text. Secondary: `surface` fill, `line` border. Danger: `danger` text, confirm dialog. Height 32 px (app) / 44 px (site). | Visible focus ring (2 px `accent`, offset 3 px). Disabled = 50 % opacity + `cursor: not-allowed` + reason in a tooltip. |
| **Source chip** | Mono label « P. 07 · p. 3 », `accent-soft` background, 4 px radius | Opens the document viewer at the quoted passage, passage highlighted in `accent-soft`. Legal refs open Légifrance / Judilibre in a new tab. |
| **Verification badge** | Dot + word: « Vérifiée » (`success`), « Partielle » (`warning`), « Non vérifiée » (`muted`), « Contredite » (`danger`) | Hover/focus shows the verifier's one-line reason. Unverified items hidden by default with a toggle. |
| **Analysis row** | Name, version, date, status, « Lancer / Relancer » | Run shows steps « Pré-contrôle → Analyse → Vérification » with a thin progress bar (no spinners longer than 1 s without a label). |
| **Proposal card** (assistant) | `surface`, 1 px dashed `accent` border, label « Action proposée » | Buttons « Valider », « Modifier », « Refuser ». Nothing changes before a click. After: « Validée par vous » in history. |
| **Pre-flight notice** | `warning` left rule, list of missing items | Each missing item has a shortcut button to fix it. |
| **Relevance flag** | Document row greyed, label « Hors dossier » + reason | « Garder » / « Exclure » override, logged. |
| **Tables** | No zebra; 1 px `line` row dividers; sticky header | Sort and filter in header; empty state explains what goes here and how to add it. |
| **Empty state** | Serif title, one sentence, one primary action | Never a blank panel. Shows what the panel will contain once filled. |
| **Toast** | `ink` background, `paper` text, bottom-right | 4 s, pausable on hover, never the only place an error appears. |

## 7. Motion

Motion explains what changed; it never decorates.
- Durations `dur-1` 150 ms (hover/press), `dur-2` 250 ms (panels, tabs), max `dur-3` 400 ms.
  Easing `ease-out`. Animate `transform` and `opacity` only.
- Site: scroll-linked 3D tilt and the "pile to case" scene are allowed on the marketing site
  only, gated by `html[data-motion="ok"]`.
- App: no decorative motion. Allowed: panel open/close, row insertion highlight (fade from
  `accent-soft`), progress bars, streaming text in chat.
- `prefers-reduced-motion: reduce` → no animation; final state shown immediately. Content
  must be complete without JavaScript on the site.

## 8. Iconography and imagery

- Icons: Lucide, 1.5 px stroke, 16 px in UI, 20 px in navigation, `currentColor`.
- **No legal clichés** (scales, gavels, columns, shields), no crypto clichés (hexagons,
  arrows), no stock or AI-generated people, no 3D renders, no Eiffel Tower.
- Every product image is the real product showing the demo case (GenBio). No fake data.

## 9. Voice (French)

Short, precise, concrete, confident without hype. *Vouvoiement.* Lawyer vocabulary:
*pièces, conclusions, délais, fondements, prétentions, juridiction*. No startup jargon or
avoidable anglicisms. Buttons are verbs (« Lancer l'analyse », « Ajouter des pièces »).
Errors say what happened and what to do (« Le fichier dépasse 50 Mo. Divisez-le ou
compressez-le. »). Banned words and claims: `tests/built/banned.ts`.

## 10. Accessibility (non-negotiable)

WCAG 2.2 AA: keyboard reachable everything, visible focus, logical heading order, labels on
every input, errors linked with `aria-describedby`, live regions for analysis progress and
streamed chat, targets ≥ 24 × 24 px (44 px on touch), no information by colour alone,
`lang="fr"`.

## 11. Anti-slop checklist (run before merging UI)

- [ ] No gradient, blur, glow, purple/blue, emoji bullets, sparkles.
- [ ] No generic three-icon card grid as the main structure.
- [ ] No invented numbers, testimonials or team expertise.
- [ ] Only tokens from this file; no new colours or font sizes without updating it.
- [ ] Every claim in the UI shows its source or is marked unverified.
- [ ] French typography passes; reduced motion respected; keyboard path works.

## 12. For coding agents

When generating UI: read this file and `src/styles/tokens.css` first, use the CSS variables
(`var(--color-accent)`, `var(--space-4)`…) rather than raw values, reuse the components in
section 6, and run the checklist in section 11. If a design need is not covered here, stop
and propose an addition to this file instead of inventing a style.
