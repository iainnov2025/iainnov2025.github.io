---
title: "IA juridique : toujours vérifier la version en vigueur d'un texte avant de le citer"
description: "Deux articles du Code de commerce ont changé de rédaction en août et septembre 2026. Pourquoi un outil d'IA, comme un praticien, doit vérifier la version applicable à la date des faits et à la date de la citation."
date: 2026-11-06
author: "LegalVec"
tags: ["intelligence artificielle", "vérification", "Légifrance", "méthode"]
pillar: "ia-et-cabinet"
sources:
  - label: "Code de commerce, article L. 442-1 (version en vigueur depuis le 20 août 2026)"
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054716237"
  - label: "Code de commerce, article L. 441-10 (version en vigueur du 26 avril 2019 au 1er septembre 2026)"
    url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038414392"
draft: false
---

Un modèle de langage apprend les textes à une date donnée. Le droit, lui, continue de changer. Un outil d'IA qui cite un article de mémoire peut donc citer une rédaction abrogée, sans le moindre signe d'hésitation. Nous en avons fait l'expérience en préparant ce blog.

## Deux exemples de l'automne 2026

**L'article L. 442-1 du Code de commerce**, qui régit notamment la rupture brutale des relations commerciales établies, a une nouvelle version en vigueur depuis le 20 août 2026. En rédigeant [notre article sur la rupture brutale](/blog/rupture-brutale-article-l442-1-ii/), nous avons constaté que la rédaction que nous avions en mémoire n'était plus celle en vigueur : nous avons donc cité la version publiée sur Légifrance.

**L'article L. 441-10 du Code de commerce**, relatif aux délais de paiement entre professionnels et aux pénalités de retard, figure sur Légifrance dans une version en vigueur depuis le 26 avril 2019 et abrogée à compter du 1er septembre 2026. Nous n'avons pas encore publié d'article sur ce texte, précisément parce qu'il faut d'abord analyser la rédaction désormais applicable.

Dans les deux cas, un résumé rédigé de mémoire, par un humain ou par une IA, aurait pu être faux tout en paraissant exact.

## Deux dates à vérifier, pas une

Vérifier « la version en vigueur » recouvre en réalité deux questions :

1. **la version applicable aux faits** : dans un litige portant sur une rupture intervenue en 2023, c'est en principe la rédaction applicable à cette date qui compte, sous réserve des règles d'application de la loi dans le temps ;
2. **la version en vigueur au jour de la citation** : pour un article de doctrine, une note au client ou une consultation, le lecteur doit savoir de quelle rédaction on parle.

Une citation fiable indique donc la version retenue, et pourquoi.

## Ce qu'on peut attendre d'un outil d'IA juridique

Pour qu'un outil d'IA soit utilisable sur ce point, il devrait au minimum :

- **citer à partir de la source officielle**, consultée au moment de la réponse, et non de sa mémoire ;
- **indiquer la version** utilisée : identifiant, date d'entrée en vigueur, éventuelle date de fin ;
- **signaler les modifications** entre la date des faits et la date de la réponse ;
- **lier chaque citation** au texte officiel, pour que la vérification prenne quelques secondes.

C'est la règle que nous appliquons à ce blog : chaque citation de texte est vérifiée sur le site officiel, et la version retenue est indiquée dans les sources en fin d'article. C'est aussi l'objectif du module de textes officiels de LegalVec, en cours de développement.

## À retenir

Les textes changent : deux articles du Code de commerce l'ont montré en août et en septembre 2026. Avant de citer un texte, il faut vérifier la version applicable aux faits et celle en vigueur à la date de la citation, sur la source officielle. Un outil d'IA juridique doit faire de même, et le montrer.
