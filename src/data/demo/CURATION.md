# Demo case curation — GEN-2024-08471 (GEN-BIO c/ Clinique du Sud)

Source: real `legalvec_agent` v1 output (`output/GEN-2024-08471/demandeur`, run of 2026-05-09).
Export: `npx tsx scripts/export-demo.ts --v1 <path>` applies `curation.json` (corrections keyed by v1 title).
Every correction below was checked against the cited piece.

## Why this matters

On its own test case, the v1 run produced **12 wrong or unsupported facts among 23 timeline events**
(10 wrong dates, 1 inverted meaning, 1 unsupported event), **2 mis-sourced events, 1 wrong legal basis
and 2 mis-sourced SWOT items**. Nothing here was visible to v1's citation check, because it only
verified that a cited file existed. This is the strongest argument for the v2 verifier agent and the
timeline/deadline eval suites (spec 04 §4.3).

## Corrections

| Item | v1 said | Piece says | Fix |
|---|---|---|---|
| Contract signature | 2016-03-15 | 01, l.128 « Fait à Lyon, le 15 mars 2018 » | 2018-03-15 |
| Invoice 2023-0345 due date | 2023-04-12 | 02, « Date d'exigibilité : 14 avril 2023 » | 2023-04-14 |
| Invoice 2023-0389 issued / due | 04-20 / 04-22 | 03, 22 avril / 22 mai 2023 | fixed |
| Invoice 2023-0412 issued / due | 05-15 / 05-17 | 04, 18 mai / 17 juin 2023 | fixed |
| Invoice 2023-0456 issued / due | 06-15 / 06-17 | 11, 20 juin / 20 juillet 2023 | fixed |
| First repair request | cited piece 08 only | 08 l.62 + letter = piece 16 | source → 16 |
| Second repair request | 2023-04-25 | 08 l.62 « 25 février, 20 mars et 15 avril » | 2023-03-20, source 17 |
| First support ticket | cited wiki page | 14, « 18/02/2023, 14:23 » | source → 14 |
| « Découverte d'export illicite vers Madrid » | 2023-08-03, illicit | 24 dated 2 août 2023; l.70 « activités de recherche légitimes » | retitled as the audit note, 2023-08-02 |
| « Dépôt de l'assignation » | filing, 2024-01-15 | assignation l.21 « À l'audience du 15 janvier 2024 » | hearing (AUDIENCE) |
| « Suspension des livraisons » 08-15 | event | not in piece 10 nor elsewhere | excluded |
| Mise-en-demeure deadline basis | « Article 12.2 du Contrat » | 07 l.43, 15-day notice (12.2 = résiliation clause) | basis fixed |
| SWOT atout 127 450 € | cited invoices 02/03/04 (134 184 € together) | assignation l.83: invoices June–August, pieces 11, 12, 13 | sources + wording fixed |
| SWOT atout GEN-TRACE 1 247 flacons | no source | 09 l.55 « Nombre estimatif de flacons : 1 247 » | source 09, « estimés », « revente alléguée » |
| Pieces 07 and 17 text | « nous我们将被迫 de » | generation glitch in synthetic piece | « nous serons contraints de » |

Dropped automatically (see export report): 3 events marked « (estimation) », 2 undated events,
6 deadlines with no piece source (legal-only prescription/appeal periods), day counters
(`jours_restants`, relative to the run date) and the numeric success score.

## Spot-check (10 items not corrected above)

| # | Item | Piece | Result |
|---|---|---|---|
| 1 | Livraison réactifs 2023-03-08 | 02, « Date de livraison : 08 mars 2023 » | OK |
| 2 | Émission facture 2023-0345 2023-03-15 | 02, « Date d'émission : 15 mars 2023 » | OK |
| 3 | Mise en demeure 2023-06-12 | 07 (filename + letter) | OK |
| 4 | Échéance mise en demeure 2023-06-27 | 07 l.43 « au plus tard le 27 juin 2023 » | OK |
| 5 | Réponse CDS 2023-06-25 | 08 (filename) | OK |
| 6 | 1er règlement proposé 2023-07-15 | 08 l.47 « 1er règlement : 15 juillet 2023 » | OK |
| 7 | Émission facture 2023-0498 2023-07-25 | 12 « Date d'émission : 25 juillet 2023 » | OK |
| 8 | Exigibilité facture 2023-0498 2023-08-24 | 12 « Date d'exigibilité : 24 août 2023 » | OK |
| 9 | Résiliation immédiate 2023-08-14 | 10 l.16 « résiliation immédiate, à compter de ce jour » | OK |
| 10 | Préavis de dénonciation 2023-09-15 | 01 art. 3: 3 ans + 1 an tacite, préavis 6 mois (terme 15/03/2024) | OK |
