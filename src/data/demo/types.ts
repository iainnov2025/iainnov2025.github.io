export interface DemoPiece { id: string; title: string; date: string | null; text: string } // id = filename without .md
export interface DemoSourceRef { pieceId: string }
export type DemoCategory = "FAIT" | "DEPOT" | "AUDIENCE" | "ECHEANCE" | "DELAI";
export type DemoImportance = "CRITIQUE" | "IMPORTANT" | "INFORMATIF";
export interface DemoEvent { date: string; title: string; category: DemoCategory; importance: DemoImportance; sources: DemoSourceRef[] }
export interface DemoDeadline { description: string; dueDate: string; basis: string; urgency: "CRITIQUE" | "IMPORTANT" | "NORMAL"; sources: DemoSourceRef[] }
export interface DemoSwotItem { text: string; weight: "CRITIQUE" | "IMPORTANT" | "MINEUR"; action: string; sources: DemoSourceRef[] }
export interface DemoCase {
  reference: "GEN-2024-08471";
  title: string;
  jurisdiction: string;
  perspective: "demandeur";
  parties: { name: string; role: string }[];
  claims: string[];
  position: { level: "Forte" | "Solide" | "Fragile" | "Critique"; justification: string; summary: string };
  swot: { atouts: DemoSwotItem[]; failles: DemoSwotItem[]; menaces: DemoSwotItem[]; opportunites: DemoSwotItem[] };
  timeline: DemoEvent[];
  deadlines: DemoDeadline[];
  pieces: DemoPiece[];
  generatedFrom: "legalvec_agent v1 (2026-05-09)";
}
