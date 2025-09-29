"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { useLocale } from "next-intl";
import { getLimitedTimeOfferProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

const HeroCarousal = () => {
  const locale = useLocale();
  const { data: limitedTimeProducts } = useQuery({
    queryKey: ["limitedTimeOfferProducts"],
    queryFn: getLimitedTimeOfferProducts,
  });

  const fallbackProducts = [
    {
      id: 1,
      name_en: "True Wireless Noise Cancelling Headphone",
      name_ar: "سماعات لاسلكية مع إلغاء الضوضاء",
      offer_price: 299,
      price: 399,
      image_url: "/images/hero/hero-01.png",
    },
    {
      id: 2,
      name_en: "iPhone 14 Plus & 14 Pro Max",
      name_ar: "آيفون 14 بلس و 14 برو ماكس",
      offer_price: 699,
      price: 999,
      image_url: "/images/hero/hero-02.png",
    },
  ];

  const productsToShow =
    limitedTimeProducts && limitedTimeProducts.length > 0
      ? limitedTimeProducts.slice(0, 2)
      : fallbackProducts;

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${className} hero-dot"></span>`,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {productsToShow.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="relative group">
            {/* Main Card */}
            <div className="relative flex flex-col-reverse sm:flex-row items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E8E8E8]/50 transition-all duration-700 hover:shadow-2xl hover:scale-[1.02]">
              {/* Content Section */}
              <div
                className={`relative z-10 max-w-[394px] py-12 sm:py-16 lg:py-20 ${
                  locale === "en"
                    ? "pl-6 sm:pl-10 lg:pl-14"
                    : "pr-6 sm:pr-10 lg:pr-14"
                }`}
              >
                {/* Badge */}
                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                  <span className="block font-bold text-xl sm:text-2xl text-[#231f20] bg-[#cfff00] rounded-full px-5 py-2 shadow-md">
                    {product.offer_price && product.price > product.offer_price
                      ? Math.round(
                          ((product.price - product.offer_price) /
                            product.price) *
                            100
                        )
                      : 30}
                    %
                  </span>

                  <div className="flex flex-col">
                    <span className="block text-[#0380C8] font-semibold text-lg sm:text-xl leading-tight">
                      {locale === "en" ? "Flash Sale" : "عرض خاص"}
                    </span>
                    <span className="block text-[#231f20] text-sm sm:text-base opacity-70">
                      {locale === "en" ? "Limited Time" : "لفترة محدودة"}
                    </span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="text-[#231f20] text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight transition-colors duration-300">
                  <Link
                    href={`/shop-details?id=${product.id}`}
                    className="hover:text-[#0380C8] transition-colors duration-300"
                  >
                    {locale === "en" ? product.name_en : product.name_ar}
                  </Link>
                </h1>

                {/* Price Section */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {locale === "en" ? "Special Price" : "السعر الخاص"}
                    </span>
                    <span className="font-bold text-[#0380C8] text-2xl sm:text-3xl">
                      EG{product.offer_price || product.price}
                    </span>
                  </div>

                  {product.offer_price &&
                    product.price > product.offer_price && (
                      <>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            {locale === "en" ? "Was" : "كان"}
                          </span>
                          <span className="font-medium text-[#231f20]/50 line-through text-lg sm:text-xl">
                            EG{product.price}
                          </span>
                        </div>

                        <div className="ml-auto">
                          <span className="block bg-[#0380C8] text-white text-xs font-semibold px-3 py-1 rounded-full text-center">
                            {locale === "en" ? "Save EG " : "وفر EG "}
                            {product.price - product.offer_price}
                          </span>
                        </div>
                      </>
                    )}
                </div>
                {/* CTA Button */}
                <div className="absolute bottom-6 left-6 right-6 sm:static sm:mt-12">
                  <Link
                    href={`/shop-details?id=${product.id}`}
                    className="inline-flex items-center justify-center font-semibold text-white text-lg rounded-2xl bg-[#0380C8] py-3 px-8 transition-all duration-300 hover:bg-[#231f20] hover:scale-105 hover:shadow-lg w-full sm:w-auto"
                  >
                    <span className="mr-2">
                      {locale === "en" ? "Shop Now" : "تسوق الآن"}
                    </span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative flex-shrink-0">
                <Image
                  src={
                    Array.isArray(product.image_url)
                      ? product.image_url[0]
                      : product.image_url
                  }
                  alt={locale === "en" ? product.name_en : product.name_ar}
                  width={400}
                  height={450}
                  className="object-contain w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: "450px" }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
