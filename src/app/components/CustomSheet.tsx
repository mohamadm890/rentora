"use client";

import { Drawer } from "vaul";
import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type CustomSheetProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function CustomSheet({
  trigger,
  title,
  description,
  children,
}: CustomSheetProps) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Drawer.Content
          className="
            fixed bg-white shadow-lg overflow-auto p-5

            bottom-0 left-0 right-0
            rounded-t-2xl max-h-[85vh]

            md:top-1/2
            md:left-1/2
            md:right-auto
            md:bottom-auto
            md:w-[500px]
            md:max-h-[80vh]
            md:-translate-x-1/2
            md:-translate-y-1/2
            md:rounded-[24px]
          "
        >
          {/* 👇 REQUIRED FOR ACCESSIBILITY (fix warning) */}
          <Dialog.Title className="sr-only">
            {title || "Sheet"}
          </Dialog.Title>

          {/* Drag handle → mobile only */}
          <div className="mx-auto w-12 h-1.5 bg-gray-300 rounded-full mb-4 md:hidden" />

          {(title || description) && (
            <div className="mb-4">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}

              {description && (
                <p className="text-sm text-gray-500 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}

          <div>{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}