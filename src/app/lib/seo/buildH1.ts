import { CITY_NAMES, TYPE_NAMES } from "./constants";

export function buildH1(city?: string, type?: string) {
  const cityName = city ? CITY_NAMES[city] : null;
  const typeName = type ? TYPE_NAMES[type] : null;

  if (!city && !type) return "Location immobilière au Maroc";

  if (city && !type) return `Location à ${cityName}`;

  if (!city && type) return `${typeName} à louer au Maroc`;

  return `${typeName} à louer à ${cityName}`;
}