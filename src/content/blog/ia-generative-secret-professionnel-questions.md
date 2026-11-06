---
title: "IA générative et secret professionnel de l'avocat : les questions à poser à un fournisseur"
description: "Avant de confier des pièces à un outil d'IA, quelques questions simples permettent de vérifier ce qu'il advient des données. Une grille neutre, appuyée sur les textes."
date: 2026-11-06
author: "LegalVec"
tags: ["secret professionnel", "intelligence artificielle", "RGPD"]
pillar: "ia-et-cabinet"
sources:
  - label: "Loi n° 71-1130 du 31 décembre 1971, notamment l'article 66-5"
    url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000508793"
  - label: "Règlement (UE) 2016/679 (RGPD), notamment l'article 28"
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj"
  - label: "Règlement (UE) 2024/1689 sur l'intelligence artificielle, notamment l'article 50"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
draft: false
---

Les outils d'IA générative peuvent lire un dossier en quelques minutes. Mais un dossier d'avocat n'est pas un document comme un autre : il est couvert par le secret professionnel. Avant de confier des pièces à un outil, quel qu'il soit, il est utile de savoir précisément ce qu'il advient des données. Voici une grille de questions, volontairement neutre, appuyée sur les textes.

## Ce que couvre le secret

L'article 66-5 de la loi n° 71-1130 du 31 décembre 1971 étend le secret professionnel, en toutes matières, aussi bien dans le domaine du conseil que dans celui de la défense, aux consultations, aux correspondances entre l'avocat et son client, aux notes d'entretien et, plus généralement, à toutes les pièces du dossier. Le texte complet est consultable sur Légifrance.

Concrètement, les pièces que l'on serait tenté de déposer dans un outil d'IA (contrats, échanges, conclusions) relèvent de ce périmètre. Les questions qui suivent visent à vérifier que leur traitement reste compatible avec cette exigence.

## 1. Où les données sont-elles traitées et stockées ?

- Dans quel pays se trouvent les serveurs qui traitent les requêtes et ceux qui stockent les fichiers ?
- Quelle est la société qui exploite ces serveurs, et sous quel droit est-elle constituée ?
- Cette société est-elle soumise à un droit étranger qui permettrait à une autorité d'exiger la communication des données, y compris lorsqu'elles sont stockées en Europe ?

La localisation des serveurs ne suffit pas : la nationalité et le droit applicable à la société qui les exploite comptent tout autant.

## 2. Les données servent-elles à entraîner des modèles ?

- Le contrat exclut-il expressément l'utilisation des pièces, des questions et des réponses pour entraîner ou améliorer un modèle ?
- Cette exclusion vaut-elle pour le fournisseur de l'outil et pour le fournisseur du modèle sous-jacent, s'ils sont distincts ?

## 3. Combien de temps les données sont-elles conservées ?

- Les requêtes sont-elles conservées par le fournisseur du modèle, et pour combien de temps (journaux de surveillance des abus, par exemple) ?
- Une conservation nulle est-elle possible, et est-elle prévue par écrit ?
- Que deviennent les pièces et les analyses lorsque l'on supprime un dossier ou que l'on quitte le service ?

## 4. Qui sont les sous-traitants ?

Le RGPD encadre la relation entre le responsable du traitement et son sous-traitant. Son article 28 prévoit notamment que le responsable ne fait appel qu'à des sous-traitants présentant des garanties suffisantes, et que le traitement est régi par un contrat. Les questions pratiques sont donc :

- Le fournisseur propose-t-il un accord de traitement des données ?
- La liste de ses propres sous-traitants (hébergeur, fournisseur de modèle) est-elle communiquée, avec leur localisation ?
- Comment êtes-vous informé d'un changement de sous-traitant ?

## 5. Qui peut accéder aux dossiers ?

- Les données de chaque cabinet sont-elles isolées de celles des autres clients ?
- Les membres du cabinet peuvent-ils avoir des droits différents ?
- Les accès et les modifications sont-ils journalisés ?
- Le personnel du fournisseur peut-il consulter les dossiers, et dans quelles conditions ?

## 6. L'outil dit-il d'où viennent ses réponses ?

Pour un avocat, une affirmation sans source n'est pas exploitable. Il est légitime de demander :

- Chaque affirmation renvoie-t-elle à la pièce, et idéalement au passage, qui la fonde ?
- Les articles de loi et les décisions cités sont-ils vérifiés sur les sources officielles, dans leur version applicable ?
- Que se passe-t-il lorsque le dossier ne permet pas de répondre : l'outil le dit-il, ou comble-t-il le vide ?

## 7. Transparence et supervision

Le règlement européen sur l'intelligence artificielle prévoit, à son article 50, des obligations de transparence, notamment pour que les personnes sachent qu'elles interagissent avec un système d'IA. Au-delà de ce cadre :

- Les contenus produits par l'IA sont-ils clairement signalés comme tels ?
- L'outil peut-il modifier un dossier sans validation humaine ?
- Les actions proposées par l'outil et validées par un utilisateur sont-elles tracées ?

## En pratique

Ces questions n'appellent pas de longues réponses : un fournisseur sérieux doit pouvoir y répondre par écrit, documents à l'appui. Elles valent pour tout outil, généraliste ou spécialisé, et c'est la grille que nous nous appliquons à nous-mêmes pour construire LegalVec.
