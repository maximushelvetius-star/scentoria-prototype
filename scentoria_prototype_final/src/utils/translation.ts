// German translation definitions for fragrance notes and text elements
export const noteTranslationMap: Record<string, string> = {
  "mint": "Minze",
  "bergamot": "Bergamotte",
  "grapefruit": "Grapefruit",
  "lemon": "Zitrone",
  "ginger": "Ingwer",
  "nutmeg": "Muskatnuss",
  "jasmine": "Jasmin",
  "melon": "Melone",
  "incense": "Weihrauch",
  "amber": "Amber",
  "cedar": "Zedernholz",
  "sandalwood": "Sandelholz",
  "pink pepper": "Rosa Pfeffer",
  "juniper": "Wacholder",
  "violet": "Veilchen",
  "toffee": "Toffee",
  "cinnamon": "Zimt",
  "lavender": "Lavendel",
  "sage": "Salbei",
  "vanilla": "Vanille",
  "tonka bean": "Tonkabohne",
  "suede": "Wildleder",
  "honey": "Honig",
  "cashmeran": "Cashmeran",
  "jasmine sambac": "Jasmin-Sambac",
  "tobacco leaf": "Tabakblatt",
  "cherry": "Kirsche",
  "saffron": "Safran",
  "bitter almond": "Bittermandel",
  "black rose": "Schwarze Rose",
  "praline": "Praline",
  "woody notes": "Holzige Noten",
  "green leaves": "Grüne Blätter",
  "apple": "Apfel",
  "lotus": "Lotus",
  "musk": "Moschus",
  "eucalyptus": "Eukalyptus",
  "pineapple": "Ananas",
  "iris": "Iris",
  "tonka": "Tonka",
  "bitter orange": "Bitterorange",
  "rose": "Rose",
  "almond": "Mandel",
  "heliotrope": "Heliotrop",
  "white musk": "Weisser Moschus",
  "green mandarine": "Grüne Mandarine",
  "orange blossom": "Orangenblüte",
  "coffee": "Kaffee",
  "tuberose": "Tuberose",
  "cacao": "Kakao",
  "lime": "Limette",
  "sea notes": "Meeresnoten",
  "rosemary": "Rosmarin",
  "red apple": "Roter Apfel",
  "coriander": "Koriander",
  "cranberry": "Cranberry",
  "leather": "Leder",
  "sichuan pepper": "Sichuan-Pfeffer",
  "star anise": "Sternanis",
  "tangerine": "Mandarine",
  "mandarin orange": "Mandarinorange",
  "pear": "Birne",
  "orchid": "Orchidee",
  "lilac": "Flieder",
  "tea": "Tee",
  "yuzu": "Yuzu",
  "cardamom": "Kardamom",
  "black pepper": "Schwarzer Pfeffer",
  "vetiver": "Vetiver",
  "oud": "Oud",
  "white honey": "Weisser Honig",
  "plum": "Pflaume",
  "frangipani": "Frangipani",
  "coconut": "Kokosnuss",
  "peach": "Pfirsich",
  "bergamot leaf": "Bergamottblatt",
  "bergamot essence": "Bergamott-Essenz",
  "bergamot oil": "Bergamottöl",
  "seaweed": "Seetang",
  "ambrette (musk mallow)": "Ambrette (Moschusmalve)",
  "iso e super": "Iso E Super",
  "amberwood": "Amberholz",
  "ambergris": "Grauer Amber",
  "rum": "Rum",
  "spices": "Gewürze",
  "green apple": "Grüner Apfel",
  "litchi": "Litschi",
  "turkish rose": "Türkische Rose",
  "atlas cedar": "Atlas-Zeder",
  "tuscan iris": "Toskanische Iris",
  "italian orange": "Italienische Orange",
  "elemi": "Elemi",
  "elemi resin": "Elemirharz",
  "olibanum": "Olibanum",
  "cypress": "Zypresse",
  "haitian vetiver": "Haitianischer Vetiver",
  "benzoin": "Benzoe",
  "madagascar vanilla": "Madagaskar-Vanille",
  "ambroxan": "Ambroxan",
  "italian mandarin": "Italienische Mandarine",
  "chinese osmanthus": "Chinesischer Osmanthus",
  "juniper berries": "Wacholderbeeren",
  "vervain": "Eisenkraut",
  "violet leaf": "Veilchenblatt",
  "oakmoss": "Eichenmoos",
  "pepperwood™": "Pfefferholz",
  "sicilian citruses": "Sizilianische Zitrusfrüchte",
  "black currant": "Schwarze Johannisbeere",
  "oregano": "Oregano",
  "pepper": "Pfeffer",
  "agarwood (oud)": "Adlerholz (Oud)",
  "bay leaf": "Lorbeerblatt",
  "blue lotus": "Blauer Lotus",
  "tahitian vetiver": "Tahitianischer Vetiver",
  "bourbon vanilla": "Bourbon-Vanille",
  "calabrian bergamot": "Kalabrische Bergamotte",
  "tobacco": "Tabak",
  "liquor": "Likör",
  "hedione": "Hedione",
  "neroli": "Neroli"
};

/**
 * Translates a comma-separated string of English notes into German
 */
export function translateNotesString(notesStr: string): string {
  if (!notesStr) return notesStr;
  return notesStr
    .split(",")
    .map((item) => {
      const trimmed = item.trim();
      const lower = trimmed.toLowerCase();
      if (noteTranslationMap[lower]) {
        return noteTranslationMap[lower];
      }
      // Clean fallback
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join(", ");
}

/**
 * Translates any English notes found inside description text into German
 */
export function translateDescription(text: string): string {
  if (!text) return text;
  let translated = text;

  // Sort keys by length descending to match longer strings first
  const sortedKeys = Object.keys(noteTranslationMap).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const value = noteTranslationMap[key];
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedKey}\\b`, "gi");
    translated = translated.replace(regex, value);
  }

  return translated;
}
