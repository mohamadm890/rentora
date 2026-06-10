

const ALLOWED_CITIES = ["agadir", "marrakech"];

const ALLOWED_TYPES = [
  "apartment",
  "studio",
  "house",
  "room",
  "villa",
];

export function parseSlug(slug: string[] = []) {
    let city = "";
    let type = "";
  
    for (const item of slug) {
      if (ALLOWED_CITIES.includes(item)) city = item;
      else if (ALLOWED_TYPES.includes(item)) type = item;
    }
  
    return { city, type };
  }