"use client";

import InputNewlisting from "@/app/components/InputNewlisting";
import { StepHeader } from "@/app/components/StepHeader";
import { useTranslations } from "next-intl";

export function PricingStep({ register }: any) {
  const t = useTranslations("listing.pricing");
  const tr = useTranslations("listing");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <StepHeader
        title={t("title")}
        description={t("subTitle")}
      />

      {/* PRICE */}
      <InputNewlisting
        label={t("priceLabel")}
        type="number"
        placeholder="0"
        {...register("price", { valueAsNumber: true })}
      />

      {/* WHATSAPP */}
      <InputNewlisting
        label={tr("whatsapp")}
        placeholder="+212 6 00 00 00 00"
        {...register("contact")}
      />

    </div>
  );
}