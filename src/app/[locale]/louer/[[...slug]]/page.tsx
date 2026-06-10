import { notFound } from "next/navigation";
import { getListings } from "@/services/clients/property.client";
import { normalizeListing } from "@/app/lib/normalizeListing";
import HomeFilters from "@/app/components/HomeFilters";
import type { Metadata } from "next";
import { buildSEO } from "@/app/lib/seo/seo";
import { buildH1 } from "@/app/lib/seo/buildH1";
import ListingDetailPage from "@/app/components/ListingDetailPage";
/* ---------------- CONFIG ---------------- */

const CITIES = ["marrakech", "agadir", "casablanca", "rabat"];
const TYPES = ["studio", "villa", "apartment"];

/* ---------------- PARSER ---------------- */


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rentora.ma";

  const slug = params.slug || [];

  const ALLOWED_CITIES = ["agadir", "marrakech"];
  const ALLOWED_TYPES = ["apartment", "studio", "house", "room", "villa"];

  let city = "";
  let type = "";

  for (const s of slug) {
    if (ALLOWED_CITIES.includes(s)) city = s;
    else if (ALLOWED_TYPES.includes(s)) type = s;
  }

  const seo = buildSEO(city, type);

  const canonicalUrl = `${baseUrl}${seo.canonical}`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        fr: `${baseUrl}/fr${seo.canonical}`,
      },
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}
function parseSlug(slug: string[] = []) {
  let city;
  let type;

  for (const item of slug) {
    if (CITIES.includes(item)) city = item;
    if (TYPES.includes(item)) type = item;
  }

  return { city, type };
}

/* ---------------- PAGE ---------------- */

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug || [];

  const { city, type } = parseSlug(slug);

  const h1 = buildH1(city, type);

  const feed = await getListings();
  const listings = feed.documents.map(normalizeListing);




  const filtered = listings.filter((item: any) => {
    const matchCity = city
      ? item.city.toLowerCase() === city
      : true;

    const matchType = type
      ? item.type.toLowerCase() === type
      : true;

    return matchCity && matchType;
  });

  

  return (
    <div className="flex flex-col min-h-screen bg-white">
        
      <main className="flex-1 w-full pt-6 px-4 md:px-16">
        <h1 className="text-xl font-[500] mb-3">
        {h1}

        </h1>


       <div className="pb-8">

                <HomeFilters listings={filtered} />

       </div>

        {/* your cards here */}
      </main>
    </div>
  );
}
