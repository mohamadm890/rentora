// hooks/useImageDropzone.ts
import { useDropzone } from "react-dropzone";

export function useImageDropzone(onAdd: (file: File) => void) {
  const { getInputProps, open } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (file) onAdd(file);
    },
    multiple: false,
    accept: { "image/*": [] },
    noClick: true,
  });

  return { getInputProps, open };
}