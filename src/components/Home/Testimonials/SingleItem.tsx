import React from "react";
import { TestimonialData } from "@/types/testimonial";
import Image from "next/image";
import { useLocale } from "next-intl";

const SingleItem = ({ testimonial }: { testimonial: TestimonialData }) => {
  const locale = useLocale();
  const displayReview =
    locale === "ar"
      ? testimonial.message_ar || testimonial.message_en
      : testimonial.message_en || testimonial.message_ar;
  const displayName =
    locale === "ar"
      ? testimonial.name_ar || testimonial.name_en
      : testimonial.name_en || testimonial.name_ar;

  return (
    <div className="shadow-lg bg-[#E8E8E8] rounded-2xl py-7 px-6 sm:px-8 hover:shadow-xl transition-all duration-300">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-5 text-[#B7DE11]">
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={18}
            height={18}
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-[#231f20] text-base mb-6 leading-relaxed">
        {displayReview}
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0380C8]">
          <Image
            src={testimonial.image || "/images/users/user-01.jpg"}
            alt="author"
            className="object-cover w-full h-full"
            width={56}
            height={56}
          />
        </div>

        <div>
          <h3 className="font-semibold text-[#0380C8]">{displayName}</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
