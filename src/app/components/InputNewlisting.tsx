import React from "react";

type InputNewlistingProps = {
  label?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  as?: "input" | "textarea";
  className?: string;
  name?: string;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputNewlisting = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputNewlistingProps
>(function InputNewlisting(
  {
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    as = "input",
    className = "",
    name,
    onBlur,
  },
  ref
) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="text-[13px] md:text-[14px] text-[#595959]">
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="px-3 py-2 w-full min-h-[120px] border border-[#F0EEEE] rounded-[8px] focus:outline-none focus:border-gray-300 transition resize-none"
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="px-3 py-2 w-full border border-[#F0EEEE] rounded-[8px] focus:outline-none focus:border-gray-300 transition"
        />
      )}
    </div>
  );
});

export default InputNewlisting;