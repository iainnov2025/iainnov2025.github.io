/** Copy that reads as AI slop, over-promises, or contradicts the discovery phase (spec §5, plan Global Constraints). */
export const BANNED = [
  "supercharge",
  "unlock",
  "révolutionn",
  "boostez",
  "libérez le potentiel",
  "✨",
  "🚀",
  "98%",
  "98 %",
  "rejoignez plus de",
  "join 200",
  "experts du droit",
  "legalvac",
  "100% sécurisé",
  "100 % sécurisé",
  "zéro erreur",
  "garanti sans erreur",
  "contrat pilote",
  "tarif",
  "€/mois",
  "€ / mois",
];

/** Returns the banned entries found in a page's visible text (case-insensitive). */
export function findBanned(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED.filter((b) => lower.includes(b));
}
