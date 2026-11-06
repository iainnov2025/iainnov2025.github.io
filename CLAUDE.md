# Notes for coding agents

- Visual identity, tokens and UI rules: read `DESIGN.md` before any UI change; run its section 11 checklist.
- Tokens live in `src/styles/tokens.css`; keep them in sync with `DESIGN.md`.
- Banned copy: `tests/built/banned.ts`. French typography is enforced at build (`src/lib/french-typo.ts`).
