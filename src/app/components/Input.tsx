"use client";

import React from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
};

export default function Input({
  value,
  onChange,
  placeholder = "Type here...",
  type = "text",
  rightIcon = null,
  onRightIconClick,
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-3 pr-10 bg-[#FCFCFC] border border-[#EBEBEB] rounded-[8px] text-sm outline-none"
      />

      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}