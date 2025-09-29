import { Category } from "@/types/category";
import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";

const SingleItem = ({ item }: { item: Category }) => {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/shop?category=${item.id}`}
      className="group flex flex-col items-center"
    >
      <div className="max-w-[130px] w-full h-[130px] rounded-full bg-[#E8E8E8] flex items-center justify-center mb-4 overflow-hidden relative shadow-md group-hover:shadow-xl transition-all duration-300">
        <Image
          src={item.image_url || "/images/placeholder-category.png"}
          alt={locale === "ar" ? item.name_ar : item.name_en}
          fill
          className="object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-[#231f20] relative transition-colors duration-300 group-hover:text-[#0380C8]">
          {locale === "ar" ? item.name_ar : item.name_en}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#B7DE11] transition-all duration-500 group-hover:w-full"></span>
        </h3>
      </div>
    </Link>
  );
};

export default SingleItem;
