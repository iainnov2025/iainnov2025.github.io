/**
 * What LegalVec commits to on data protection. Every statement starts as "planned":
 * a statement becomes "verified" only with written evidence (vendor DPA, contract, audit),
 * per spec 00 §5 / §9. The page shows « En cours de mise en place » for planned ones.
 */
export interface SecurityStatement {
  id: string;
  topic:
    | "hebergement" | "retention" | "entrainement" | "chiffrement" | "isolation" | "acces"
    | "journal" | "suppression" | "ia-act" | "cloud-act" | "supervision";
  title: string;
  text: string;
  status: "verified" | "planned";
  evidence?: string; // required when verified
}

export const securityStatements: SecurityStatement[] = [
  {
    id: "hebergement-france",
    topic: "hebergement",
    title: "Hébergement de l'application en France",
    text: "L'application et les pièces de vos dossiers sont prévues sur des serveurs et un stockage situés en France, chez des hébergeurs européens.",
    status: "planned",
  },
  {
    id: "cloud-act",
    topic: "cloud-act",
    title: "Aucune société américaine dans la chaîne de traitement",
    text: "Aucune société de droit américain ne traite ni ne stocke les données de vos dossiers, y compris dans une région européenne : pas d'exposition au Cloud Act.",
    status: "planned",
  },
  {
    id: "entrainement",
    topic: "entrainement",
    title: "Vos pièces n'entraînent aucun modèle",
    text: "Les fournisseurs de modèles d'IA retenus n'utilisent pas vos données pour entraîner leurs modèles.",
    status: "planned",
  },
  {
    id: "retention",
    topic: "retention",
    title: "Conservation minimale chez les fournisseurs d'IA",
    text: "Une conservation nulle des requêtes est demandée par écrit à chaque fournisseur de modèles. Seule LegalVec conserve vos analyses, dans votre espace.",
    status: "planned",
  },
  {
    id: "chiffrement",
    topic: "chiffrement",
    title: "Chiffrement en transit et au repos",
    text: "Les échanges sont chiffrés (TLS) et les pièces sont chiffrées dans le stockage.",
    status: "planned",
  },
  {
    id: "isolation",
    topic: "isolation",
    title: "Cloisonnement par cabinet",
    text: "Chaque cabinet dispose d'un espace isolé : aucun dossier n'est visible d'un autre cabinet, et l'assistant ne lit que le dossier ouvert.",
    status: "planned",
  },
  {
    id: "acces",
    topic: "acces",
    title: "Accès réservé aux membres du cabinet",
    text: "Seuls les membres invités par le cabinet accèdent à ses dossiers, avec des rôles distincts pour l'administration et le travail sur les dossiers.",
    status: "planned",
  },
  {
    id: "journal",
    topic: "journal",
    title: "Journal de toutes les modifications",
    text: "Chaque modification d'un dossier est tracée : qui, quand, quoi. Une action proposée par l'assistant porte la mention de l'avocat qui l'a validée.",
    status: "planned",
  },
  {
    id: "suppression",
    topic: "suppression",
    title: "Suppression complète sur demande",
    text: "Supprimer un dossier efface ses pièces, ses analyses et l'historique de l'assistant.",
    status: "planned",
  },
  {
    id: "ia-act",
    topic: "ia-act",
    title: "Transparence sur l'IA",
    text: "Les contenus produits par l'IA sont signalés comme tels et présentés comme des projets à relire, conformément aux obligations de transparence du règlement européen sur l'IA.",
    status: "planned",
  },
  {
    id: "supervision",
    topic: "supervision",
    title: "L'avocat reste décisionnaire",
    text: "L'assistant propose, l'avocat décide : aucune modification d'un dossier n'a lieu sans votre confirmation, et toute affirmation renvoie à la pièce qui la fonde.",
    status: "planned",
  },
];
