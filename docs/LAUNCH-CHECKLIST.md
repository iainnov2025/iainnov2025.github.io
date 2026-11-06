# Launch checklist — LegalVec site

Status on 2026-11-06: built, tested, deployed at https://iainnov2025.github.io in **noindex** mode.

## Automated (all green)

- Unit tests (config guard, tokens contrast, logos, typography, dates, demo data, security data, contact, blog schema, OG)
- Built-site checks on every page: `lang="fr"`, title, description, canonical, robots meta, banned copy,
  French typography, heading order, no gradients/blur in CSS, blog JSON-LD/OG/disclaimer, RSS, robots, sitemap
- e2e (Playwright): 360 px no overflow, no-JS mobile menu, demo tabs + source dialog + focus return,
  no-JS demo and hero, reduced motion = 0 animations, CTAs, security/feedback/booking/product/legal pages
- Lighthouse (desktop): performance, accessibility, best practices = 1.00 on /, /produit/,
  /dossier-de-demonstration/, /securite/, /blog/. SEO is 0.66 only because of the intentional `noindex`
  (`is-crawlable`); it is enforced at ≥ 0.95 automatically once `launch: true`.

## Manual anti-slop review (spec §5) — done at 360 px and 1440 px

| Check | Result |
|---|---|
| No gradients, glassmorphism, glow, sparkles, emoji bullets | OK (also enforced by tests) |
| No "Supercharge/Unlock/Révolutionnez" copy, no invented numbers, no fake testimonials | OK (enforced) |
| No stock or AI-generated people, no clichés in logo | OK — logo directions are wordmarks; no photos anywhere |
| Every product visual uses real product output | OK — curated v1 GenBio analysis (see src/data/demo/CURATION.md) |
| French typography (« », espaces insécables, L. 442-1 kept together) | OK (automatic pass + test) |
| Tone: precise, vouvoiement, no startup jargon | OK |
| Nothing for sale, no price, no expertise claim, no real client data invited | OK |

## Founder checkpoints before `launch: true`

1. **Pick the logo** at https://iainnov2025.github.io/brand-preview/ (A is installed provisionally),
   then `npx tsx scripts/build-logos.ts --pick <a|b|c>`.
2. **Fill** `publisherName`, `publisherAddress`, `contactEmail` in `src/config/site.ts`
   (the build refuses to launch without them). Create the `contact@legalvec.com` mailbox first.
3. **Confirm** the legal-notice wording required for an individual publisher (mentions légales).
4. **Co-founders**: add them to `src/data/team.ts` only once they agree to appear.
5. Optional: `bookingUrl` (self-hosted Cal.com) and `analyticsScriptUrl` (self-hosted Plausible CE/Umami).
6. Set `launch: true`, push, check that `robots.txt` allows indexing and pages carry `index, follow`.

## Later

- Custom domain: add `public/CNAME` with `legalvec.com`, set `siteUrl`, configure DNS, enable HTTPS.
- Security page: switch statements to `verified` only with written vendor evidence.
- Product page « Bientôt » badges: remove as each v2 feature ships (`features.relevanceFlags` etc.).
