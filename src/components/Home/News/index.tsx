"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";

import type { BlogData } from "@/types/blogItem";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { getBlogs } from "@/services/apiBlogs";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const News = () => {
  const sliderRef = useRef<any>(null);
  const t = useTranslations("news");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (loading || blogs.length === 0) return null;

  return (
    <section className="overflow-hidden pb-16.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="swiper news-carousel common-carousel p-5 bg-[#E8E8E8] rounded-2xl shadow-md">
          {/* Section title */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-[#0380C8] mb-1.5">
                <Image
                  src="/images/icons/icon-07.svg"
                  alt="icon"
                  width={17}
                  height={17}
                />
                {t("latestNews")}
              </span>
              <h2 className="font-semibold text-xl xl:text-heading-5 text-[#231f20]">
                {t("subtitle")}
              </h2>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <div
                onClick={isRTL ? handleNext : handlePrev}
                className="swiper-button-prev cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#0380C8] text-white hover:bg-[#B7DE11] hover:text-[#231f20] transition"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                  />
                </svg>
              </div>

              <div
                onClick={isRTL ? handlePrev : handleNext}
                className="swiper-button-next cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#0380C8] text-white hover:bg-[#B7DE11] hover:text-[#231f20] transition"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Swiper slides */}
          <Swiper
            ref={sliderRef}
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((item: BlogData) => (
              <SwiperSlide key={item.id}>
                <SingleItem newsItem={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default News;
