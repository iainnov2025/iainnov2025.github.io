/**
 * Questions lawyers ask before trying LegalVec. Answers stay true to the current state:
 * nothing planned is described as done (see src/data/security.ts for statuses).
 * `home: true` → also shown on the home page.
 */
export interface FaqItem { id: string; q: string; a: string[]; home?: boolean; links?: { href: string; label: string }[] }

export const faq: FaqItem[] = [
  {
    id: "remplace-avocat",
    q: "LegalVec remplace-t-il le travail de l'avocat ?",
    a: [
      "Non. LegalVec prépare le dossier : il lit les pièces, en extrait chronologie, délais, SWOT et position, et relie chaque élément à la pièce qui le fonde.",
      "La stratégie, la qualification juridique et la décision restent les vôtres. Tout ce que LegalVec produit est conçu pour être relu et corrigé.",
    ],
    home: true,
  },
  {
    id: "hallucinations",
    q: "Comment éviter qu'une IA invente des faits ou des dates ?",
    a: [
      "Chaque affirmation affichée cite la pièce dont elle est tirée ; un clic ouvre la pièce. Une affirmation sans source n'est pas affichée.",
      "Nous développons un agent vérificateur qui relit chaque élément contre la pièce citée avant qu'il ne vous soit présenté. Cette vérification est en cours de développement ; le dossier de démonstration a été vérifié à la main, et nous y documentons les erreurs corrigées.",
    ],
    home: true,
    links: [{ href: "/dossier-de-demonstration/", label: "Voir le dossier de démonstration" }],
  },
  {
    id: "hebergement",
    q: "Où seront hébergées les pièces de mes dossiers ?",
    a: [
      "L'application et les pièces sont prévues en France, chez des hébergeurs européens, sans société de droit américain dans la chaîne de traitement, pour écarter l'exposition au Cloud Act.",
      "Le service n'est pas encore ouvert : nous publions l'état d'avancement de chaque engagement sur la page Sécurité, et un engagement n'est marqué comme acquis qu'avec une preuve écrite.",
    ],
    home: true,
    links: [{ href: "/securite/", label: "Nos engagements et leur état" }],
  },
  {
    id: "entrainement",
    q: "Mes documents serviront-ils à entraîner des modèles d'IA ?",
    a: [
      "Non. Nous ne retenons que des fournisseurs de modèles qui s'engagent par contrat à ne pas utiliser vos données pour l'entraînement et à ne pas les conserver au-delà du traitement.",
    ],
    home: true,
  },
  {
    id: "secret",
    q: "Est-ce compatible avec le secret professionnel et le RGPD ?",
    a: [
      "Pour vos dossiers, LegalVec agira comme sous-traitant au sens du RGPD : un contrat de sous-traitance précisera les traitements, la localisation, les sous-traitants ultérieurs et la suppression des données.",
      "Aucune donnée réelle de client ne sera traitée avant que ce cadre contractuel existe. D'ici là, seul le dossier fictif de démonstration est utilisé.",
    ],
    home: true,
    links: [{ href: "/blog/ia-generative-secret-professionnel-questions/", label: "IA générative et secret professionnel : les questions à poser" }],
  },
  {
    id: "dossiers",
    q: "Pour quels types de dossiers ?",
    a: [
      "Nous commençons par le contentieux commercial : litiges entre entreprises, impayés, rupture de relations commerciales, inexécution de contrats.",
      "Ces dossiers accumulent beaucoup de pièces hétérogènes et des délais nombreux, c'est là que la préparation prend le plus de temps.",
    ],
    home: true,
  },
  {
    id: "assistant",
    q: "L'assistant peut-il agir seul dans un dossier ?",
    a: [
      "Non. L'assistant répond à partir des pièces du dossier ouvert et peut proposer une action, par exemple ajouter une tâche ou une échéance. Rien n'est fait sans votre validation.",
      "Il ne supprime rien, ne modifie aucune pièce, n'envoie aucun message et ne sort jamais du dossier ouvert.",
    ],
  },
  {
    id: "pieces-insuffisantes",
    q: "Que se passe-t-il si les pièces sont insuffisantes ou hors sujet ?",
    a: [
      "L'objectif est de le dire plutôt que de combler les trous : une analyse lancée sur un dossier trop mince doit le signaler, et une pièce sans rapport avec le litige doit être écartée et signalée.",
      "Ces deux contrôles sont en cours de développement et seront évalués sur des dossiers piégés avant d'être activés.",
    ],
  },
  {
    id: "formats",
    q: "Quels formats de pièces seront acceptés ?",
    a: ["Les formats courants d'un dossier : PDF, y compris numérisés, documents Word, courriels exportés et images. La liste définitive sera publiée à l'ouverture."],
  },
  {
    id: "essayer",
    q: "Puis-je essayer LegalVec ?",
    a: [
      "Le dossier de démonstration est consultable librement, sans inscription.",
      "Nous voulons construire LegalVec avec des avocats : si vous acceptez de nous consacrer trente minutes pour donner votre avis sur la démonstration, écrivez-nous.",
    ],
    home: true,
    links: [{ href: "/contact/", label: "Nous écrire" }],
  },
  {
    id: "prix",
    q: "Combien coûtera LegalVec ?",
    a: [
      "Nous ne fixons pas de prix avant d'avoir compris, avec des praticiens, ce que l'outil vous fait gagner. Les premiers échanges servent à cela.",
    ],
  },
  {
    id: "qui",
    q: "Qui est derrière LegalVec ?",
    a: ["Un projet français, porté par une petite équipe. Nous cherchons des avocats en contentieux des affaires pour éprouver le produit avant son ouverture."],
    links: [{ href: "/a-propos/", label: "À propos" }],
  },
];

/** schema.org FAQPage for the given items (plain text answers). */
export function faqJsonLd(items: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a.join(" ") },
    })),
  };
}
