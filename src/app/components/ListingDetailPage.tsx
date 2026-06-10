import Image from "next/image";
import { ArrowLeft, MapPin, Phone, Share2 } from "lucide-react";
import { getImageUrl } from "../lib/appwrite";
import ListingHeroGallery from "./ImageGalleryHeader";

export default function ListingDetailPage({ listing }: any) {
  const message = encodeURIComponent(
    `Bonjour 👋,

Je suis intéressé(e) par ce bien :
🏠 ${listing.title}
📍 ${listing.location}
💰 ${listing.price} DH / mois

Est-ce qu’il est encore disponible ? Merci 😊`
  );

  const whatsappUrl = `https://wa.me/${listing.phone}?text=${message}`;

  return (
<div className="w-full  max-w-6xl mx-auto  sm:px-6 md:px-10 lg:px-16 md:py-6 pb-40">

<ListingHeroGallery listing={listing} />

{/* INFO SECTION */}
<div className="mt-6 p-3 flex flex-col md:flex-row gap-6">

  {/* LEFT */}
  <div className="flex-1 space-y-3">
    <h1 className="text-[24px] font-poppins text-gray-900 tracking-[-0.04em] leading-[1.2]">
      {listing.title}
    </h1>

    <p className="flex text-[14px] items-center gap-2 text-gray-600">
      <MapPin size={14} />
      {listing.location}
    </p>

    <p className="text-[14px] text-gray-600 leading-relaxed">
      {listing.description}
    </p>
  </div>

  {/* RIGHT */}
  <div className="w-full md:w-[280px] shrink-0">
  <div className="fixed rounded-[16px] md:sticky bottom-0 md:bottom-auto md:top-6 right-0 md:right-auto w-full md:w-[280px] border border-gray-200 p-3  bg-white space-y-4 z-50">

<div className="text-[16px] font-semibold text-gray-900">
  {listing.price} DH
  <span className="text-sm font-normal text-gray-500 ml-1">
    / Par mois
  </span>
</div>

<a
  href={whatsappUrl}
  target="_blank"
  className="flex items-center justify-center gap-2 bg-[#1E40AF] text-white px-4 py-3 rounded-[12px]"
>
  <Phone size={16} />
  Contact on WhatsApp
</a>

</div>
  </div>

</div>

    </div>
  );
}
