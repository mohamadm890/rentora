"use client";

import { Plus } from "lucide-react";
import { useImageDropzone } from "@/app/hooks/useImageDropzone";
import { ImageGrid } from "@/app/components/ImageGrid";
import { CoverImage } from "@/app/components/CoverImage";
import { AnimatePresence } from "framer-motion";
import { StepHeader } from "@/app/components/StepHeader";
import { useTranslations } from "next-intl";

type PhotosStepProps = {
  images: string[];
  loading: boolean;
  removeImage: (index: number) => void;
  setCover: (index: number) => void;
  addImage: (file: File) => void;
};
export default function PhotosStep({images, loading, removeImage, setCover, addImage, }: PhotosStepProps) {
 

  const { getInputProps, open } = useImageDropzone(addImage);

  const t = useTranslations("listing.photos");

  const cover = images[0];
  const rest = images.slice(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <StepHeader
        title={t("title")}
        description={t("subTitle")}
      />

      <input {...getInputProps()} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <CoverImage
          image={cover}
          loading={loading}
          onOpen={open}
          onDelete={() => removeImage(0)}
        />

        <AnimatePresence>
          <ImageGrid
            images={rest}
            onDelete={removeImage}
            onSetCover={setCover}
          />
        </AnimatePresence>

        {/* ADD BUTTON */}
        {cover && (
          <div
            onClick={open}
            className="aspect-square bg-gray-100 border-1 border-dashed border-gray-200 rounded-[14px] flex items-center justify-center cursor-pointer"
          >
            <Plus />
          </div>
        )}
      </div>
    </div>
  );
}