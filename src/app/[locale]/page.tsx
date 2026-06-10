import Image from "next/image";
import HomeFilters from "../components/HomeFilters";
import { listings } from "../data/listings";
import { getTranslations } from "next-intl/server";
import { getListings } from "@/services/clients/property.client";

import {normalizeListing} from '../lib/normalizeListing';

import type { Metadata } from "next";



export async function generateMetadata(): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: "Rentora | Location immobilière au Maroc",
    description:
      "Trouvez les meilleures annonces de location d’appartements, villas et studios au Maroc.",

    alternates: {
      canonical: `${baseUrl}/`,

      languages: {
        "x-default": `${baseUrl}/`,
        fr: `${baseUrl}/fr`,
      },
    },

    openGraph: {
      title: "Rentora | Location immobilière au Maroc",
      description:
        "Trouvez les meilleures annonces de location d’appartements, villas et studios au Maroc.",
      url: `${baseUrl}/`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Rentora | Location immobilière au Maroc",
      description:
        "Trouvez les meilleures annonces de location d’appartements, villas et studios au Maroc.",
    },
  };
}

export default async function Page() {
  
  const t = await getTranslations('feed');

  const feed = await getListings();

  const listing = feed.documents.map(normalizeListing);




  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

 

  {/* MAIN */}
  <main className="flex-1 w-full ">


<div className="flex flex-col gap-2 px-4 md:px-16">
<h1 className="text-[20px] font-[600] text-[#111]  ">
{t("header")}</h1>
<HomeFilters listings={listing}/>



   </div>

  



  </main>
</div>
  );
}
