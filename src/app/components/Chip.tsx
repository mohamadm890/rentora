import { ChevronDown } from "lucide-react";

export default function Chip({
  label,
  className = "",
  showDropdownIcon = false,
  ...props
}: {
  label: string;
  className?: string;
  showDropdownIcon?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-between px-3 py-1 border border-[#EAEAEA] rounded-full text-sm text-[#626262] cursor-pointer ${className}`}
    >
<span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
      {showDropdownIcon && (
        <ChevronDown size={16} color="#363636" />
      )}
    </button>
  );
}