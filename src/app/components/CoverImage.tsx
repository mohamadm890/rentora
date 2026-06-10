import ThreeDotsMenu from "./ThreeDotsMenu";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { useTranslations } from "next-intl";

export function CoverImage({
  image,
  loading,
  onOpen,
  onDelete,
}: any) {
  const t = useTranslations("listing");

  if (!image) {
    return (
      <div
        onClick={onOpen}
        className="sm:col-span-3 aspect-[16/9] border border-dashed border-gray-200 rounded-[20px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
      >
        <Images size={40} className="text-gray-400" />

        <p className="text-sm text-gray-500 mt-2">
          {loading ? t("uploading") : t("uploadCoverImage")}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {t("multiplePhotosHint")}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="sm:col-span-3 relative aspect-[16/9] rounded-[20px] overflow-hidden"
    >
      <img src={image} className="w-full h-full object-cover" />

      <div className="absolute top-3 right-3">
        <ThreeDotsMenu onDelete={onDelete} onSetCover={() => {}} />
      </div>
    </motion.div>
  );
}