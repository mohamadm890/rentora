"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Globe, HousePlus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);

  const t = useTranslations("header");

  // detect listing page (example: /fr/listing or /en/listing)
  const isListingPage = segments[1] === "listing";

  return (
    <div
      className={`relative border border-gray-100 flex items-center justify-between py-6 px-4 md:px-16 mb-6 ${
        isListingPage ? "hidden md:flex" : "flex"
      }`}
    >
      {/* LOGO */}
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={20}
        priority
      />

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        
        <button
          onClick={() => router.push("/new/listing")}
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <HousePlus size={18} />
          <span className="hidden md:inline">
            {t("listProperty")}
          </span>
        </button>

        <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">
          <Globe size={18} className="text-gray-600" />
        </button>

      </div>
    </div>
  );
}