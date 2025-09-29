import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timbo | Every Moment Easier",
  description: "Developed by ENS",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
