import { AnimatePresence, motion } from "framer-motion";
import ThreeDotsMenu from "./ThreeDotsMenu";

export function ImageGrid({
  images,
  onDelete,
  onSetCover,
}: any) {
  return (
    <AnimatePresence>
      {images.map((img: string, i: number) => (
        <motion.div
          key={img}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="relative aspect-square rounded-[14px] overflow-hidden"
        >
          <img
            src={img}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-2 right-2">
            <ThreeDotsMenu
              onDelete={() => onDelete(i + 1)}
              onSetCover={() => onSetCover(i + 1)}
            />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}