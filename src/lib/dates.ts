const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** "2018-03-15" → "15 mars 2018"; "2023-08-01" → "1er août 2023". Pure string math, no timezone. */
export function formatDateFr(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const day = Number(m[3]);
  return `${day === 1 ? "1er" : day} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}
