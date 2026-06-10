"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Star, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ThreeDotsMenu({ onDelete, onSetCover }: any) {

  const t = useTranslations("gallery");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-full bg-gray-100 backdrop-blur-md border border-gray-200 shadow-sm hover:bg-gray-200 transition">
          <MoreVertical size={18} className="text-gray-700" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          className="
            bg-gray-50 shadow-lg rounded-xl p-1 w-44 border border-gray-200
            origin-top-right
            data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=top]:slide-in-from-bottom-2
          "
        >
          {/* SET AS COVER */}
          <DropdownMenu.Item
            onClick={onSetCover}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            <Star size={16} className="text-gray-600" />
            {t("setAsCover")}

          </DropdownMenu.Item>

          {/* DELETE */}
          <DropdownMenu.Item
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            <Trash2 size={16} className="text-gray-600" />
            {t("delete")}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}