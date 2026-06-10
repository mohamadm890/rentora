import { useState } from "react";

export function useListingImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addImage = (file: File) => {
    setLoading(true);

    // real file for upload
    setFiles((prev) => [...prev, file]);

    // preview only for UI
    const url = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, url]);

    setLoading(false);
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const setCover = (index: number) => {
    setFiles((prev) => {
      const copy = [...prev];
      const selected = copy[index];
      copy.splice(index, 1);
      copy.unshift(selected);
      return copy;
    });

    setPreviews((prev) => {
      const copy = [...prev];
      const selected = copy[index];
      copy.splice(index, 1);
      copy.unshift(selected);
      return copy;
    });
  };

  return {
    files,      // 👈 REAL FILES (UPLOAD THIS)
    previews,   // 👈 UI ONLY
    loading,
    addImage,
    removeImage,
    setCover,
  };
}