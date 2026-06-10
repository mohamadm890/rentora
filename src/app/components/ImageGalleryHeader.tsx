"use client";

import { useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "../lib/appwrite";
import { useRouter } from "next/navigation";

export default function ListingHeroGallery({ listing }: any) {
  const images = listing.imageIds || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const activeImage = images[activeIndex];

  // GO BACK
  const handleBack = () => {
    router.back();
  };

  // SHARE
  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: listing.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:mt-4">

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">

        <div className="relative w-full h-[420px] overflow-hidden">

          <Image
            src={getImageUrl(activeImage)}
            alt={listing.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          <div className="absolute top-3 left-3 right-3 flex justify-between z-20">

            <button
              onClick={handleBack}
              className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm"
            >
              <Share2 size={18} />
            </button>

          </div>

          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>

        </div>

        {/* THUMBNAILS */}
        <div className="mt-2 flex gap-2 overflow-x-auto px-1">
          {images.slice(0, 8).map((img: any, i: any) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border ${
                activeIndex === i ? "border-black" : "border-transparent opacity-70"
              }`}
            >
              <Image
                src={getImageUrl(img)}
                alt=""
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex gap-3">

        {/* MAIN IMAGE (FIXED) */}
        <div className="relative w-2/3 h-[440px] rounded-xl overflow-hidden group">

          <Image
            src={getImageUrl(images[activeIndex])}
            alt={listing.title}
            fill
            className="object-cover hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

          {/* ACTIONS */}
          <div className="absolute top-3 left-3 right-3 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition">

            <button
              onClick={handleBack}
              className="bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
            >
              <Share2 size={18} />
            </button>

          </div>
        </div>

        {/* SIDE THUMBNAILS (CLICKABLE FIXED) */}
        <div className="grid grid-cols-1 gap-2 w-1/3 h-[440px]">
          {images.slice(0, 5).map((img: any, i:any) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative rounded-xl overflow-hidden border ${
                activeIndex === i ? "border-gray-100" : "border-transparent opacity-70"
              }`}
            >
              <Image
                src={getImageUrl(img)}
                alt=""
                fill
                className="object-cover hover:scale-105 transition"
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}