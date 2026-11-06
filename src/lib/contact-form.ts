/** Contact form model, shared by the page (options), the browser script (validation) and tests. */

export const SUBJECTS = {
  demonstration: "Voir une démonstration",
  avis: "Donner mon avis sur la démonstration (30 min)",
  question: "Poser une question",
  autre: "Autre",
} as const;
export type Subject = keyof typeof SUBJECTS;

export const SIZES = {
  "1": "Avocat exerçant seul",
  "2-5": "2 à 5 avocats",
  "6-20": "6 à 20 avocats",
  "21+": "Plus de 20 avocats",
  "": "Je préfère ne pas répondre",
} as const;

export interface ContactInput {
  nom: string;
  cabinet: string;
  email: string;
  telephone: string;
  taille: string;
  objet: Subject;
  message: string;
  consentement: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s.()-]{8,20}$/;
export const MESSAGE_MIN = 20;

/** Field → French error message; empty object when the input is valid. */
export function validateContact(i: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!i.nom.trim()) e.nom = "Indiquez votre nom.";
  if (!i.cabinet.trim()) e.cabinet = "Indiquez le nom de votre cabinet.";
  if (!i.email.trim()) e.email = "Indiquez votre adresse électronique.";
  else if (!EMAIL.test(i.email.trim())) e.email = "Cette adresse électronique semble incomplète.";
  if (i.telephone.trim() && !PHONE.test(i.telephone.trim())) e.telephone = "Ce numéro de téléphone n'est pas valide.";
  if (!(i.objet in SUBJECTS)) e.objet = "Choisissez l'objet de votre message.";
  if (i.message.trim().length < MESSAGE_MIN) e.message = `Votre message doit compter au moins ${MESSAGE_MIN} caractères.`;
  if (!i.consentement) e.consentement = "Votre accord est nécessaire pour que nous puissions vous répondre.";
  return e;
}

/** The form only ever sends to an https endpoint set in the site config; until then it sends nothing. */
export function contactSubmitMode(endpoint: string | null): "send" | "disabled" {
  return endpoint && endpoint.startsWith("https://") ? "send" : "disabled";
}
