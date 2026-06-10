import { slugify } from "./slugify";
export function normalizeListing(listing: any) {
  if (!listing) return null;

  return {
    id: listing.id ?? listing.$id, // 👈 use id first, fallback to $id

    ...listing,

    city: slugify(listing?.city || ""),
    type: slugify(listing?.type || ""),
    slug: slugify(listing?.title || ""),

    location: listing?.location || "",
  };
}