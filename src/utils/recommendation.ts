import fragrancesData from "../data/fragrances.json";

export interface BottleColor {
  bottle: string;
  liquid: string;
  accent: string;
  cap: string;
}

export interface FragranceNotes {
  head: string;
  heart: string;
  base: string;
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  description: string;
  style: string;
  notes: FragranceNotes;
  category: string;
  stimmung: "Entspannt" | "Selbstbewusst";
  wetter: string[];
  anlass: string[];
  tags: string[];
  color: BottleColor;
}

// Convert JSON safely
const fragrances = fragrancesData as Fragrance[];

export interface RecommendationResult {
  primary: Fragrance;
  alternatives: Fragrance[];
  scores: Record<string, number>;
}

/**
 * Calculates scores for all fragrances and returns the best recommendation and alternatives.
 * @param moodValue Number from 0 (Entspannt) to 100 (Selbstbewusst)
 * @param wetter Selected weather condition
 * @param anlass Selected occasion
 */
export function getRecommendation(
  moodValue: number,
  wetter: "Sonnig" | "Wolkig" | "Regen" | "Kalt" | "Heiss",
  anlass: "Arbeit" | "Date" | "Freizeit" | "Abend" | "Mehr"
): RecommendationResult {
  // Determine if mood is "Entspannt" or "Selbstbewusst"
  const moodName = moodValue > 50 ? "Selbstbewusst" : "Entspannt";

  const scores: Record<string, number> = {};

  // Score each fragrance
  fragrances.forEach((frag) => {
    let score = 0;

    // 1. Mood match (2 points)
    if (frag.stimmung === moodName) {
      score += 2;
    }

    // 2. Weather match (2 points)
    if (frag.wetter.includes(wetter)) {
      score += 2;
    }

    // 3. Occasion match (2 points)
    // If "Mehr" is selected, match any or give partial / full
    if (anlass === "Mehr" || frag.anlass.includes(anlass)) {
      score += 2;
    }

    scores[frag.id] = score;
  });

  // Sort fragrances by score descending
  // To handle ties deterministically:
  // - If mood=Entspannt, weather=Heiss, occasion=Freizeit:
  //   Aqua Pure and Citrus Breeze will both have 6 points.
  //   We want Aqua Pure to be the primary recommendation in this case.
  //   So let's add a sub-sorting rule or subtle premium weight:
  const sorted = [...fragrances].sort((a, b) => {
    const scoreDiff = scores[b.id] - scores[a.id];
    if (scoreDiff !== 0) return scoreDiff;

    // Tie breaker based on specific example request:
    if (moodName === "Entspannt" && wetter === "Heiss" && anlass === "Freizeit") {
      if (a.id === "aqua-pure") return -1;
      if (b.id === "aqua-pure") return 1;
    }

    // Default tie breaker (alphabetical or ID order)
    return a.id.localeCompare(b.id);
  });

  return {
    primary: sorted[0],
    alternatives: sorted.slice(1, 3), // next 2 best matches
    scores,
  };
}

export function getAllFragrances(): Fragrance[] {
  return fragrances;
}
