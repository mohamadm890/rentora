"use client";

import InputNewlisting from "@/app/components/InputNewlisting";
import { StepHeader } from "@/app/components/StepHeader";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function BasicInfoStep({ register }: any) {
  const t = useTranslations("listing");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <StepHeader
        title={t("basicInfo")}
        description={t("header.subTitle")}
      />

      {/* TITLE */}
      <InputNewlisting
        label={t("title")}
        placeholder="e.g. Modern apartment in Gueliz"
        {...register("title")}
      />

      {/* TYPE */}
      <div className="space-y-1">
        <label className="text-[13px] md:text-[14px] text-[#595959]">
          {t("type")}
        </label>

        <div className="relative">
          <select
            {...register("type")}
            className="
              w-full p-2 pr-10
              rounded-lg border border-gray-200
              bg-white
              appearance-none
              focus:outline-none focus:ring-2 focus:ring-gray-200
            "
          >
            <option value="">{t("typePlaceholder")}</option>

            <option value="apartment">{t("types.apartment")}</option>
            <option value="villa">{t("types.villa")}</option>
            <option value="studio">{t("types.studio")}</option>
            <option value="room">{t("types.room")}</option>
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* CITY */}
      <InputNewlisting
        label={t("city")}
        placeholder="e.g. Marrakech"
        {...register("city")}
      />

      {/* LOCATION */}
      <InputNewlisting
        label={t("location")}
        placeholder="e.g. Gueliz"
        {...register("location")}
      />

      {/* DESCRIPTION */}
      <InputNewlisting
        label={t("description.label")}
        placeholder={t("description.placeholder")}
        as="textarea"
        {...register("description")}
      />

    </div>
  );
}