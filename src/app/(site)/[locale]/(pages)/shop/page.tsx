import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop Page |Timbo | Every Moment Easier",
  description: "Developed by ENS",
  // other metadata
};

const ShopPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopPage;
