"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import Chip from "./Chip";
import Image from "next/image";
import { buildListingUrl } from "../lib/buildListingUrl";
import { getImageUrl } from "../lib/appwrite";

export default function ListingCard({ listing }: any) {
  const { title, price, city, type } = listing;

  

  const isRTL =
    typeof document !== "undefined" &&
    document.documentElement.dir === "rtl";

  return (
    <Link href={buildListingUrl(listing)} className="block">
      <div className="mb-3">

        {/* IMAGE */}
        <div className="relative w-full aspect-[373/280] rounded-[12px] overflow-hidden">
          <Image
            src={getImageUrl(listing.imageIds?.[0])}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* INFO */}
        <div className="mt-3">

          {/* PRICE */}
          <div className={`flex items-end gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <h3 className="text-[18px] font-medium">{price} DH</h3>
            <p className="text-[#626262] text-[14px]">/ Month</p>
          </div>

          {/* LOCATION */}
          <p className={`flex items-center gap-2 text-[#666] text-sm mt-1 ${
            isRTL ? "flex-row-reverse text-right" : ""
          }`}>
            <MapPin size={16} />
            {city}
          </p>

          {/* CHIP */}
          <div className={`mt-2 flex ${isRTL ? "justify-end" : "justify-start"}`}>
            <Chip label={type} />
          </div>

        </div>
      </div>
    </Link>
  );
}