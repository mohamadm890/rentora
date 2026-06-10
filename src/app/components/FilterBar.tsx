"use client";

import { ReactNode } from "react";

type FilterBarProps = {
  
  children: ReactNode;
};

export default function FilterBar({  children }: FilterBarProps) {
  return (
    <div className="w-full mb-6">
      {/* Title */}
    
      {/* Filters row */}
      <div className="flex gap-3 flex-wrap">
        {children}
      </div>
    </div>
  );
}