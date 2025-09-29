"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/apiCat";

const Categories = () => {
  const locale = useLocale();
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <section className="overflow-hidden pt-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-16 border-b border-[#E8E8E8]">
        <div className="swiper categories-carousel common-carousel">
          {/* section title */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-[#0380C8] mb-1.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_834_7356)">
                    <path
                      d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                      stroke="#B7DE11"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="7.17245"
                      cy="7.39917"
                      r="1.66667"
                      transform="rotate(-45 7.17245 7.39917)"
                      stroke="#B7DE11"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.61837 15.4164L15.4342 9.6004"
                      stroke="#B7DE11"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_834_7356">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {locale === "ar" ? "الأقسام" : "Categories"}
              </span>
              <h2 className="font-semibold text-xl xl:text-2xl text-[#231f20]">
                {locale === "ar" ? "تصفح حسب النوع" : "Browse by Category"}
              </h2>
            </div>

            {/* Navigation buttons */}
            <div
              className={`flex items-center gap-3 ${
                locale === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#0380C8] text-[#0380C8] hover:bg-[#0380C8] hover:text-white transition-all duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 19L9.5 12L15.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#0380C8] text-[#0380C8] hover:bg-[#0380C8] hover:text-white transition-all duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 5L14.5 12L8.5 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#0380C8] border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{locale === "ar" ? "خطأ في تحميل الأقسام" : "Error loading categories"}</p>
          ) : (
            <Swiper
              ref={sliderRef}
              spaceBetween={20}
              slidesPerView={6}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1200: { slidesPerView: 6, spaceBetween: 20 },
              }}
            >
              {categories?.map((item: any, key: number) => (
                <SwiperSlide key={key}>
                  <SingleItem item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
