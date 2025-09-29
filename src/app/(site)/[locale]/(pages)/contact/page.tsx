import Contact from "@/components/Contact";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title:
      locale === "ar"
        ? `صفحة الاتصال Timbo | Every Moment Easier`
        : `Contact Page Timbo | Every Moment Easier`,
    description:
      locale === "ar"
      ? `صفحة الاتصال Timbo | Every Moment Easier`
      : `Contact Page Timbo | Every Moment Easier`,
  };
}

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
