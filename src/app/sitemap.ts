import type { MetadataRoute } from "next";
import { getListings } from "@/services/clients/property.client";
import { normalizeListing } from "./lib/normalizeListing";

const TYPES = ["studio", "villa", "apartment", "house", "room"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/fr`;
  let listings: any[] = [];

  try {
    const feed = await getListings();
    listings = feed?.documents?.map(normalizeListing) || [];
  } catch (error) {
    console.log("Sitemap error loading listings:", error);
    listings = [];
  }

  const uniqueCities = new Set<string>();
  const cityTypePairs = new Set<string>();

  /* ---------------- LISTING PAGES ---------------- */
  const listingUrls = listings.map((item: any) => {
    const city = item.city?.toLowerCase();
    const type = item.type?.toLowerCase();

    if (city) uniqueCities.add(city);
    if (city && type) cityTypePairs.add(`${city}/${type}`);

    return {
      url: `${baseUrl}/listing/${item.slug}`,
      lastModified: new Date(item.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  /* ---------------- CITY PAGES ---------------- */
const cityUrls = Array.from(uniqueCities).map((city) => ({
  url: `${baseUrl}/louer/${city}`,
  lastModified: new Date(),
  changeFrequency: "daily" as const,
  priority: 0.9,
}));

/* ---------------- CITY + TYPE PAGES ---------------- */
const cityTypeUrls = Array.from(cityTypePairs).map((pair) => ({
  url: `${baseUrl}/louer/${pair}`,
  lastModified: new Date(),
  changeFrequency: "daily" as const,
  priority: 0.85,
}));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/louer`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...cityUrls,
    ...cityTypeUrls,
    ...listingUrls,
  ];
}
