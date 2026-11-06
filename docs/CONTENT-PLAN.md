# Plan de contenu et règles de rédaction (site LegalVec)

Mis à jour le 6 novembre 2026.

## Pourquoi ce plan

Les avocats cherchent d'abord des réponses à des questions de pratique (un délai, un texte, une procédure), puis, plus tard, un outil. Le blog vise donc les questions qu'ils tapent réellement, regroupées en **quatre piliers** (clusters thématiques). Chaque article renvoie vers son pilier et vers le dossier de démonstration.

Les volumes de recherche n'ont pas été mesurés : il faut les vérifier avec un outil d'analyse de mots-clés (Search Console une fois le site lancé, ou un outil tiers) avant de prioriser la suite.

## Règles non négociables

1. **Chaque citation de loi est vérifiée** sur Légifrance, EUR-Lex ou le site de la Cour de cassation, **dans sa version en vigueur à la date de publication**. La version retenue est indiquée dans les sources.
2. **Aucune citation de mémoire.** Un texte non vérifié est paraphrasé sans guillemets, avec un lien vers la source officielle, ou bien l'article attend.
3. **Aucune promesse produit** au-delà de ce qui existe : ce qui est en développement est dit comme tel.
4. **Un article répond à une question.** Le titre reprend la question ou le texte, l'introduction donne la réponse courte et la section « À retenir » la résume.
5. Mention finale : « Article à visée informative ; il ne constitue pas une consultation juridique. » (ajoutée automatiquement).
6. Mettre à jour le champ `updated` dès qu'un texte cité change, et relire tous les articles qui le citent.

## Piliers et articles

Légende : ✅ publié · ⏳ à rédiger · ⚠️ à rédiger après vérification du texte en vigueur.

### 1. Contentieux commercial : les textes (`contentieux-commercial`)

| Requête visée | Article | État |
|---|---|---|
| rupture brutale relation commerciale établie préavis | rupture-brutale-article-l442-1-ii | ✅ |
| prescription commerciale 5 ans L110-4 | prescription-commerciale-article-l110-4 | ✅ |
| mise en demeure article 1344 effets | mise-en-demeure-article-1344-code-civil | ✅ |
| clause pénale modération juge 1231-5 | clause-penale-article-1231-5-code-civil | ✅ |
| pénalités de retard entre professionnels, indemnité forfaitaire 40 € | L. 441-10 a changé au 1er septembre 2026 | ⚠️ |
| exception d'inexécution entre entreprises (C. civ. 1219-1220) | — | ⏳ |
| résolution du contrat pour inexécution (C. civ. 1224 s.) | — | ⏳ |
| garantie des vices cachés entre professionnels, délai de deux ans (C. civ. 1641, 1648) | — | ⏳ |
| clause d'exclusivité territoriale : violation et preuve | — | ⏳ |

### 2. Procédure et délais (`procedure`)

| Requête visée | Article | État |
|---|---|---|
| injonction de payer créance commerciale, délai d'opposition | injonction-de-payer-creance-commerciale | ✅ |
| référé-provision tribunal de commerce | refere-provision-article-873-tribunal-de-commerce | ✅ |
| calcul délai procédure civile, délai d'appel un mois | calcul-des-delais-procedure-civile-articles-640-642 | ✅ |
| communication des pièces, bordereau (CPC 132 s.) | — | ⏳ |
| interruption de la prescription par une demande en justice (C. civ. 2241) | couvert en partie par l'article prescription | ⏳ |
| tribunal des activités économiques : compétence | vérifier l'état de l'expérimentation | ⚠️ |

### 3. IA, données et cabinet d'avocats (`ia-et-cabinet`)

| Requête visée | Article | État |
|---|---|---|
| IA avocat secret professionnel | ia-generative-secret-professionnel-questions | ✅ |
| RGPD outil IA cabinet d'avocats sous-traitant | rgpd-cabinet-avocat-outil-ia-sous-traitant | ✅ |
| IA juridique hallucination, vérifier une citation | ia-juridique-verifier-version-en-vigueur | ✅ |
| AI Act avocats obligations | règlement 2024/1689 : vérifier la version consolidée et les modifications de 2026 | ⚠️ |
| Cloud Act cabinet d'avocats, hébergement souverain (RGPD art. 48) | vérifier art. 48 RGPD | ⚠️ |
| logiciel IA avocat : critères de choix | page comparative neutre, sans dénigrement | ⏳ |

### 4. Méthode : préparer un dossier (`methode`)

| Requête visée | Article | État |
|---|---|---|
| chronologie dossier contentieux | chronologie-dossier-contentieux-methode | ✅ |
| analyse SWOT d'un dossier contentieux | — | ⏳ |
| tableau des délais d'un dossier | — | ⏳ |
| préparer une première consultation client avec les pièces | — | ⏳ |

## Rythme

Un article par semaine suffit au démarrage. Priorité : les ⚠️ dès que la vérification des textes est faite (ce sont les sujets où l'actualité crée de la demande), puis les ⏳ du pilier 1.

## Bonnes pratiques retenues (recherche du 6 novembre 2026)

**Page d'accueil.**
- Le titre principal annonce un résultat pour le lecteur et reste court.
- Un aperçu réel du produit apparaît dès le premier écran, et on peut le manipuler.
- Un seul appel à l'action principal (le dossier de démonstration), plus un appel secondaire (le contact).
- Les éléments de confiance (hébergement, sources) sont placés près des boutons.
- La FAQ répond aux objections, et la page reste lisible sur mobile.
- Aucun chiffre ni témoignage inventé : il faudra ajouter de vrais témoignages d'avocats dès qu'il y en aura.

**Site d'entreprise.**
- Navigation courte, avec une page de contact munie d'un formulaire de peu de champs.
- Mentions légales et politique de confidentialité complètes.
- Contenu complet sans JavaScript et respect des préférences de mouvement réduit.
- Performance et accessibilité contrôlées en intégration continue.

**Blog.**
- Les articles sont organisés en piliers thématiques reliés entre eux : liens internes et section « À lire aussi ».
- L'expertise est montrée par des sources officielles, des dates de publication et de mise à jour, et des exemples tirés de pièces.
- Le balisage structuré `Article` et `BreadcrumbList` est en place, ainsi que `FAQPage` pour la FAQ.
- Les articles anciens sont mis à jour plutôt que multipliés.

Ces pratiques viennent pour l'essentiel de blogs d'agences et d'éditeurs. Leurs chiffres de conversion n'ont pas été vérifiés : ce sont des orientations, pas des garanties.
