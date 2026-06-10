import { CITY_NAMES, TYPE_NAMES } from "./constants";

export function buildSEO(city?: string, type?: string) {
  const cityName = city ? CITY_NAMES[city] : null;
  const typeName = type ? TYPE_NAMES[type] : null;

  // /louer
  if (!city && !type) {
    return {
      title: "Location immobilière au Maroc | Rentora",
      description:
        "Trouvez appartements, villas et studios à louer partout au Maroc.",
      canonical: "https://rentora.ma/louer",
    };
  }

  // /louer/marrakech
  if (city && !type) {
    return {
      title: `Location à ${cityName}`,
      description: `Découvrez les meilleures locations à ${cityName}.`,
      canonical: `https://rentora.ma/louer/${city}`,
    };
  }

  // /louer/apartment (type only)
  if (!city && type) {
    return {
      title: `${typeName} à louer au Maroc`,
      description: `Découvrez des ${typeName?.toLowerCase()} à louer au Maroc.`,
      canonical: `https://rentora.ma/louer/${type}`,
    };
  }

  // /louer/marrakech/apartment
  if (city && type) {
    return {
      title: `${typeName} à louer à ${cityName}`,
      description: `Trouvez des ${typeName?.toLowerCase()} à ${cityName}.`,
      canonical: `https://rentora.ma/louer/${city}/${type}`,
    };
  }

  return {
    title: "Location immobilière",
    description: "Annonces immobilières au Maroc",
    canonical: "https://rentora.ma/louer",
  };
}