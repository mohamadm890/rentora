"use client";

import { useState } from "react";
import PhotosStep from "./steps/PhotosStep";
import { PricingStep } from "./steps/PricingStep";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { createListing } from "@/services/clients/property.client";
import { Property, PropertyForm } from "@/types/property";
import { useListingImages } from "@/app/hooks/useListingImages";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const [step, setStep] = useState(0);
  const t = useTranslations("listing");
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const {
    files,
    previews,
    loading,
    addImage,
    removeImage,
    setCover,
  } = useListingImages();

  const {
    register,
    handleSubmit,
  } = useForm<PropertyForm>({
    defaultValues: {
      title: "",
      type: "apartment",
      city: "",
      location: "",
      description: "",
      price: 0,
      contact: "",
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const isLastStep = step === 2;

  // ✅ MAIN SUBMIT (SAFE)
  const AddListing = async (form: PropertyForm) => {
    try {
      if (step !== 2) return;
  
      setSubmitting(true); // 👈 start loading
  
      if (files.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }
  
      const uploadRes = await uploadImages(files);
  
      const imageIds = uploadRes.imageIds;
  
      const listing: Property = {
        ...form,
        imageIds,
        coverImageId: imageIds[0],
      };
  
      await createListing(listing);
  
      toast.success("Listing created!", {
        position: "top-center",
      });
  
      router.push("/");
    } catch (error) {
      console.error("❌ error", error);
  
      toast.error("Something went wrong", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false); // 👈 always stop loading
    }
  };

  // ✅ IMAGE UPLOAD
  async function uploadImages(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || `Upload failed (${res.status})`);
    }

    return data;
  }

  const onPublish = handleSubmit(AddListing);

  return (
 
      <div className="max-w-4xl mx-auto p-4 pb-24 space-y-6">
        {/* STEPS */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step-0">
              <BasicInfoStep register={register} />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step-1">
              <PhotosStep
                images={previews}
                addImage={addImage}
                removeImage={removeImage}
                setCover={setCover}
                loading={loading}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-2">
              <PricingStep register={register} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM BAR */}
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
            
            {/* BACK */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={back}
              disabled={step === 0}
              className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-40"
            >
              {t("back")}
            </motion.button>

            {/* PROGRESS */}
            <div className="text-xs text-gray-500">
              {t("next")} {step + 1} / 3
            </div>

            {/* NEXT / PUBLISH */}
            {!isLastStep ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={next}
                className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg"
              >
                {t("next")}
              </motion.button>
            ) : (
              <motion.button
              type="submit"
              onClick={onPublish}
              whileTap={{ scale: 0.97 }}
              disabled={submitting || loading}
              className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Spinner />
                </>
              ) : (
                t("publish")
              )}
            </motion.button>
            )}
          </div>
        </div>
      </div>
  );
}

function Spinner() {
  return (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}