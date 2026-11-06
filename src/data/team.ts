/**
 * Only members with consent: true are published on /a-propos/.
 * This file is in a public repository: add a co-founder here only once they have agreed.
 */
export interface TeamMember { name: string; role: string; bio?: string; consent: boolean }

export const team: TeamMember[] = [
  {
    name: "Mohamed Amine Kerkouri",
    role: "Cofondateur",
    bio: "Docteur en informatique (Université d'Orléans, 2024), chercheur en intelligence artificielle et traitement automatique du langage.",
    consent: true,
  },
];
