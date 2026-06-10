import type { MetadataRoute } from "next";
import { getListings } from "@/services/clients/property.client";
import { normalizeListing } from "./lib/normalizeListing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  let listings: any[] = [];

  try {
    const feed = await getListings();
    listings = feed?.documents?.map(normalizeListing) || [];
  } catch (error) {
    console.log("Sitemap error loading listings:", error);
    listings = [];
  }

  const listingUrls = listings.map((item: any) => ({
    url: `${baseUrl}/listing/${item.slug}`,
    lastModified: new Date(item.updatedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
    ...listingUrls,
  ];
}
