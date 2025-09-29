import Branches from "@/components/Branches";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "branches" });

  return {
    title: locale === "ar" ? `الفروع | Timbo | Every Moment Easier ` : `Branches | Timbo | Every Moment Easier`,
    description:
      locale === "ar"
      ? `الفروع | Timbo | Every Moment Easier ` : `Branches | Timbo | Every Moment Easier`,
  };
}

const BranchesPage = () => {
  return (
    <main>
      <Branches />
    </main>
  );
};

export default BranchesPage;
