import "@/app/css/euclid-circular-a-font.css";
import "@/app/css/style.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/app/i18n/routing";
import { notFound } from "next/navigation";
import ClientLayout from "@/app/(site)/[locale]/ClientLayout";
import { comfortaa, cairo } from "@/app/fonts"; 

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const isRTL = locale === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const bodyClass = isRTL ? "rtl" : "ltr";

  // اختار الفونت حسب اللغة
  const fontClass = isRTL ? cairo.variable : comfortaa.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${fontClass} ${bodyClass}`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
