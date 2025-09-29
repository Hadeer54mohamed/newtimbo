import { Metadata } from "next";
import { Suspense } from "react";
import NewsDetails from "@/components/NewsDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "ar"
        ? "تفاصيل الخبر Timbo | Every Moment Easier"
        : "News Details Timbo | Every Moment Easier",
    description:
      locale === "ar"
        ? "اقرأ تفاصيل الخبر كاملة"
        : "Read the full news article details",
  };
}

const NewsDetailsPage = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsDetails />
      </Suspense>
    </main>
  );
};

export default NewsDetailsPage;
