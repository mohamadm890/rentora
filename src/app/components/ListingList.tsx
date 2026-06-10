import { useTranslations } from "next-intl";
import ListingCard from "./ListingCard";



export default function ListingList({ listings }: any) {

  const t = useTranslations("feed");

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
       <div className="flex flex-col">

       <span className="text-[16px] font-medium">
            {t("noResults")}
          </span>
          <span className="text-[13px]">
            {t("noResultsHint")}
          </span>
          
       </div>
      
      </div>
    );
  }

  return (

<div>
    <p className="text-[#323232] text-[14px] mb-4">
    {listings.length} rentals available.
  </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {listings.map((listing: any) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>

    </div>
  );
}