// lib/buildListingUrl.ts
import { slugify } from "./slugify";

export function buildListingUrl(listing: any) {
  if (!listing) return "/listing";

  const slug = listing.slug
    ? listing.slug
    : slugify(listing.title || "");

  return `/listing/${slug}`;
}