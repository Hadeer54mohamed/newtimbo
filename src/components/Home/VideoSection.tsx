"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
const VideoSection = () => {
  const locale = useLocale();
  return (
    <section className="relative w-full pt-0 sm:pt-0 lg:pt-0">
    <Image
      src="/images/hero0.png"
      alt="Hero Banner"
      width={1920}
      height={800}
      className="w-full h-auto object-cover"
      priority
    />
  
    {/* Overlay Button */}
    <div className="absolute inset-0 flex items-end justify-center pb-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: -10 }} // يتحرك شوي فوق
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        <Link
          href="/shop"
          className="px-8 py-3 text-lg font-semibold rounded-2xl 
            bg-[#0380C8] text-[#E8E8E8] 
            hover:bg-[#231f20] hover:text-[#cfff00] 
            transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {locale === "en" ? "Shop Now" : "تسوق الآن"}
        </Link>
      </motion.div>
    </div>
  </section>
  
);
};


export default VideoSection;
