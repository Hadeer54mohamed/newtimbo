import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const CustomSelect = ({
  options,
  isLoading = false,
}: {
  options?: any[];
  isLoading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options?.[0]);
  const router = useRouter();
  const locale = useLocale();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (option.value !== "0") {
      router.push(`/${locale}/shop?category=${option.value}`);
    } else {
      router.push(`/${locale}/shop`);
    }
  };

  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".custom-dropdown")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="custom-dropdown relative hidden lg:block w-[200px]">
      {/* Selected */}
      <div
        className={`flex items-center justify-between bg-transparent px-4 py-3 text-[13px] font-medium text-[#231f20] cursor-pointer transition-colors border-r border-[#0380C8] ${
          isOpen ? "text-[#0380C8]" : ""
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={isLoading ? undefined : toggleDropdown}
      >
        <span className="truncate">
          {isLoading ? "جاري التحميل..." : selectedOption?.label}
        </span>
        <span
          className={`ml-2 transition-transform text-[#0380C8] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Options */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 rounded-lg border border-[#0380C8] bg-white shadow-lg z-50 overflow-hidden">
          {options?.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-3 text-[13px] cursor-pointer transition-colors font-medium ${
                selectedOption?.value === option.value
                  ? "bg-[#0380C8] text-white"
                  : "hover:bg-[#B7DE11] hover:text-[#231f20]"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
