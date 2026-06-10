import { notFound } from "next/navigation";
import { getListings } from "@/services/clients/property.client";
import ListingDetailPage from "@/app/components/ListingDetailPage";
import { normalizeListing } from "@/app/lib/normalizeListing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  const feed = await getListings();
  const listings = feed.documents.map(normalizeListing);

  const listing = listings.find(
    (item: { slug: string }) => item.slug === params.slug
  );

  if (!listing) {
    return {
      title: "Listing not found",
      description: "This property does not exist.",
    };
  }

  const canonicalUrl = `${baseUrl}/listing/${listing.slug}`;
  const frUrl = `${baseUrl}/fr/listing/${listing.slug}`;

  return {
    title: `${listing.title} | Rentora`,
    description: listing.description?.slice(0, 160),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        fr: frUrl,
      },
    },

    openGraph: {
      title: listing.title,
      description: listing.description,
      url: canonicalUrl,
      images: [
        {
          url: listing.imageIds?.[0] || "/og-default.jpg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
    },
  };
}

export default async function Page({
  params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

  // 1. get data
  const feed = await getListings();
  const listings = feed.documents.map(normalizeListing);
  console.log("listings", listings);

  // 2. find single listing
  const listing = listings.find((item: any) => item.slug === slug);

  // 3. if not found → 404
  if (!listing) return notFound();

  // 4. render detail page
  return <ListingDetailPage listing={listing} />;
}
