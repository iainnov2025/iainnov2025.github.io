# LegalVec — site vitrine

Site marketing de LegalVec (français), publié sur GitHub Pages : https://iainnov2025.github.io

- Spec : `docs/superpowers/specs/2026-11-05-02-website-brand-design.md` (dépôt LegalVec)
- Plan : `docs/superpowers/plans/2026-11-06-website.md`

## Commandes

```bash
npm ci
npm run dev        # http://localhost:4321
npm test           # tests unitaires
npm run build      # build statique dans dist/
npm run test:built # contrôles sur le HTML construit (après build)
npm run test:e2e   # Playwright
```

## Lancement

Le site reste en `noindex` tant que `launch: false` dans `src/config/site.ts`.
Le build refuse `launch: true` si `publisherName`, `publisherAddress` ou `contactEmail` sont vides.
