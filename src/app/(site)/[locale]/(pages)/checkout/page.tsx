import React from "react";
import Checkout from "@/components/Checkout";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout Page | Timbo | Every Moment Easier",
  description: "Developed by ENS",
  // other metadata
};

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
