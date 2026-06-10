"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import CustomSheet from "./CustomSheet";
import Chip from "./Chip";
import FilterBar from "./FilterBar";
import ListingList from "./ListingList";

import {
  Building,
  Bed,
  Home,
  BedSingle,
  type LucideIcon,
} from "lucide-react";

import { parseSlug } from "../lib/parseSlug";
import Pagination from "./Pagination";
import { Property } from "@/types/property";

// ------------------------
// CONFIG
// ------------------------

const propertyIcons: Record<string, LucideIcon> = {
  apartment: Building,
  studio: Bed,
  villa: Home,
  house: Home,
  room: BedSingle,
};

// ------------------------
// PAGINATION CONFIG
// ------------------------

const ITEMS_PER_PAGE = 8;

// ------------------------
// MAIN COMPONENT
// ------------------------

export default function HomeFilters({ listings }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("filters");

  // ------------------------
  // URL PARSING
  // ------------------------

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];
  const slug = segments.slice(2);

  const { city: citySlug, type: typeSlug } = parseSlug(slug);

  // ------------------------
  // FILTER LABELS
  // ------------------------

  const getCityLabel = (value: string) => {
    if (!value || value === "all") return t("all");
    return t(`cities.${value}`);
  };

  const getTypeLabel = (value: string) => {
    if (!value || value === "all") return t("all");
    return t(`types.${value}`);
  };

  // ------------------------
  // FILTER STATE
  // ------------------------

  const activeCity = citySlug || "all";
  const activeType = typeSlug || "all";

  const filters = {
    city: activeCity,
    type: activeType,
  };

  // ------------------------
  // FILTER LISTINGS
  // ------------------------

  const filteredListings = listings.filter((item: any) => {
    const itemCity = item.city.toLowerCase();
    const itemType = item.type.toLowerCase();

    return (
      (!citySlug || itemCity === citySlug) &&
      (!typeSlug || itemType === typeSlug)
    );
  });

  // ------------------------
  // PAGINATION
  // ------------------------

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredListings.length / ITEMS_PER_PAGE)
  );

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  // ------------------------
  // ROUTING (FILTERS RESET PAGE)
  // ------------------------

  function handleCity(item: string) {
    const value = item.toLowerCase();
    const base = `/${locale}/louer`;

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value === "all") {
      router.push(typeSlug ? `${base}/${typeSlug}?${params}` : base);
      return;
    }

    if (typeSlug) {
      router.push(`${base}/${value}/${typeSlug}?${params}`);
      return;
    }

    router.push(`${base}/${value}?${params}`);
  }

  function handleType(item: string) {
    const value = item.toLowerCase();
    const base = `/${locale}/louer`;

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value === "all") {
      router.push(citySlug ? `${base}/${citySlug}?${params}` : base);
      return;
    }

    if (citySlug) {
      router.push(`${base}/${citySlug}/${value}?${params}`);
      return;
    }

    router.push(`${base}/${value}?${params}`);
  }

  // ------------------------
  // UI
  // ------------------------

  return (
    <div>
      <FilterBar>
        {/* CITY */}
        <CustomSheet
          title={t("city.title")}
          description={t("city.description")}
          trigger={
            <Chip
              label={getCityLabel(filters.city)}
              showDropdownIcon
              className="h-[40px] w-[140px] rounded-[8px] text-[14px]"
            />
          }
        >
          <div className="space-y-3">
            {["all", "agadir", "marrakech"].map((item) => (
              <button
                key={item}
                onClick={() => handleCity(item)}
                className={`w-full p-3 border border-gray-100 rounded-lg text-left hover:bg-gray-100 ${
                  activeCity === item ? "bg-gray-100" : ""
                }`}
              >
                {getCityLabel(item)}
              </button>
            ))}
          </div>
        </CustomSheet>

        {/* TYPE */}
        <CustomSheet
          title={t("type.title")}
          description={t("type.description")}
          trigger={
            <Chip
              label={getTypeLabel(filters.type)}
              showDropdownIcon
              className="h-[40px] w-[140px] rounded-[8px] text-[14px]"
            />
          }
        >
          <div className="space-y-3">
            {["all", "apartment", "studio", "house", "room", "villa"].map(
              (item) => {
                const Icon = propertyIcons[item];

                return (
                  <button
                    key={item}
                    onClick={() => handleType(item)}
                    className={`w-full flex items-center gap-3 p-3 border border-gray-100 rounded-lg text-left hover:bg-gray-100 ${
                      activeType === item ? "bg-gray-100" : ""
                    }`}
                  >
                    {Icon && <Icon size={18} className="text-gray-600" />}
                    <span>{getTypeLabel(item)}</span>
                  </button>
                );
              }
            )}
          </div>
        </CustomSheet>
      </FilterBar>

      {/* LISTINGS */}
      <ListingList listings={paginatedListings} />

      {/* PAGINATION */}
      <div className="pb-4">
      <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }}
/>
</div>
    </div>
  );
}