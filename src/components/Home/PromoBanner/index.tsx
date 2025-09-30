"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { getBanners, Banner } from "@/services/apiBanners";
import { motion } from "framer-motion";

const PromoBanner = () => {
  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = currentLocale === "ar";

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const bannersData = await getBanners();
        setBanners(bannersData || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <section className="overflow-hidden py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#0380C8] border-t-transparent"></div>
      </section>
    );
  }

  // Motion variants for small banners
  const cardVariant = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="overflow-hidden py-16 bg-gradient-to-b from-[#E8E8E8]/30 to-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 space-y-12">

        {/* Banner الرئيسي */}
        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.3 }}
  className="relative flex flex-col md:flex-row items-center gap-6 rounded-2xl bg-[#0380C8] text-white p-6 sm:p-8 shadow-lg overflow-hidden"
>
  {/* Text */}
  <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-snug">
      {isRTL ? "عرض مميز لفترة محدودة" : "Exclusive Limited-Time Offer"}
    </h2>
    <p className="text-sm sm:text-base opacity-90 max-w-sm">
      {isRTL
        ? "أفضل المنتجات بتخفيضات قوية، اغتنم الفرصة الآن."
        : "Grab the hottest deals on top products. Don’t miss out!"}
    </p>
    <Link
      href={`/${currentLocale}/shop`}
      className="inline-flex font-semibold text-sm sm:text-base text-[#231f20] bg-[#B7DE11] py-2 px-5 sm:py-2.5 sm:px-7 rounded-lg mt-4 transition-all hover:bg-white hover:text-[#0380C8] hover:scale-105"
    >
      {isRTL ? "شراء الآن" : "Shop Now"}
    </Link>
  </div>

  {/* Image */}
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }}
    className="flex-shrink-0 relative"
  >
    <Image
      src={banners[0]?.image || "/images/promo/promo-01.png"}
      alt="promo img"
      width={300}
      height={200}
      className="rounded-xl object-contain drop-shadow-md"
    />
  </motion.div>
</motion.div>




        {/* Bannners الصغيرين */}
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
          {[1, 2].map((i) => {
            const banner = banners[i] || { image: `/images/promo/promo-0${i + 1}.png` };
            return (
              <motion.div
                key={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex items-center gap-6 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 ${
                  i === 1 ? "bg-[#231f20] text-white" : "bg-[#E8E8E8]"
                }`}
              >
                <Image
                  src={banner.image ?? "/images/promo/promo-02.png"}
                  alt="promo img"
                  width={180}
                  height={180}
                  className="rounded-lg object-contain"
                />
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className={`text-xl font-bold mb-2 ${i === 1 ? "" : "text-[#231f20]"}`}>
                    {i === 1
                      ? isRTL ? "خصم يصل 40%" : "Up to 40% OFF"
                      : isRTL ? "تمرين في المنزل" : "Workout At Home"}
                  </h3>
                  <p className={`text-sm font-semibold ${i === 1 ? "text-[#B7DE11]" : "text-[#0380C8]"}`}>
                    {i === 1
                      ? isRTL ? "ساعة آبل أولترا" : "Apple Watch Ultra"
                      : isRTL ? "خصم 20%" : "20% OFF"}
                  </p>
                  <Link
                    href={`/${currentLocale}/shop`}
                    className={`inline-flex text-sm font-medium py-2 px-5 mt-4 rounded-lg transition-all hover:scale-105 ${
                      i === 1
                        ? "text-[#231f20] bg-[#B7DE11] hover:bg-white hover:text-[#0380C8]"
                        : "text-white bg-[#0380C8] hover:bg-[#231f20]"
                    }`}
                  >
                    {isRTL ? "شراء الآن" : "Grab Now"}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
