"use client";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { useLocale } from "next-intl";
import { getLimitedTimeOfferProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

const Hero = () => {
  const locale = useLocale();
  const { data: limitedTimeProducts } = useQuery({
    queryKey: ["limitedTimeOfferProducts"],
    queryFn: getLimitedTimeOfferProducts,
  });

  const fallbackProducts = [
    {
      id: 1,
      name_en: "iPhone 14 Plus & 14 Pro Max",
      name_ar: "آيفون 14 بلس و 14 برو ماكس",
      offer_price: 699,
      price: 999,
      image_url: "/images/hero/hero-02.png",
    },
    {
      id: 2,
      name_en: "Wireless Headphone",
      name_ar: "سماعات لاسلكية",
      offer_price: 299,
      price: 399,
      image_url: "/images/hero/hero-01.png",
    },
  ];

  const productsToShow =
  limitedTimeProducts && limitedTimeProducts.length > 0
    ? [...limitedTimeProducts]  
        .reverse()            
        .slice(0, 2)           
    : fallbackProducts;


  return (
    <section className="overflow-hidden bg-gradient-to-b from-[#E8E8E8]/10 to-white pb-12 lg:pb-14 xl:pb-16">
    <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Carousel Section */}
        <div className="lg:flex-1 lg:max-w-[757px] w-full">
          <div className="relative z-0 rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-[#E8E8E8]/50">
            <Image
              src="/images/hero/hero-bg.png"
              alt="hero background shapes"
              className="absolute right-0 bottom-0 -z-10 opacity-60 hidden sm:block"
              width={534}
              height={520}
            />
            <HeroCarousel />
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:flex-shrink-0 lg:w-[393px] w-full">
          <div className="flex flex-col gap-6">
            {productsToShow.map((product) => (
              <div
                key={product.id}
                className="w-full relative rounded-2xl bg-white p-5 sm:p-6 shadow-md border border-[#E8E8E8]/40 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0380C8]/40"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Text */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-[#231f20] text-lg sm:text-xl mb-2 leading-snug">
                      <Link
                        href={`/shop-details?id=${product.id}`}
                        className="hover:text-[#0380C8] transition-colors duration-300"
                      >
                        {locale === "en" ? product.name_en : product.name_ar}
                      </Link>
                    </h2>

                    <div>
                      <p className="font-medium text-[#231f20]/70 text-sm mb-1.5">
                        {locale === "en"
                          ? "Limited Time Offer"
                          : "عرض محدود"}
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-semibold text-[#0380C8] text-lg">
                          {product.offer_price || product.price} {locale === "ar" ? "ج.م" : "EGP"}
                        </span>
                        {product.offer_price &&
                          product.price > product.offer_price && (
                            <span className="font-medium text-[#231f20]/50 line-through">
                              {product.price} {locale === "ar" ? "ج.م" : "EGP"}
                            </span>
                          )}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        Array.isArray(product.image_url)
                          ? product.image_url[0]
                          : product.image_url
                      }
                      alt={
                        locale === "en"
                          ? product.name_en
                          : product.name_ar
                      }
                      width={110}
                      height={140}
                      className="object-contain rounded transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Hero Features */}
    <HeroFeature />
  </section>
);
};
export default Hero;
