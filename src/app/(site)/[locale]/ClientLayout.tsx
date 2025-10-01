"use client";
import { useState, useEffect } from "react";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";
import { Providers } from "@/app/context/QueryProvider";
import { Toaster } from "react-hot-toast";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { isMobile, isSlowConnection } = useMobilePerformance();

  useEffect(() => {
    // تقليل وقت التحميل للموبايل والاتصالات البطيئة
    const loadingTime = isMobile || isSlowConnection ? 500 : 1000;
    setTimeout(() => setLoading(false), loadingTime);
  }, [isMobile, isSlowConnection]);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div className={`${isMobile ? 'mobile-optimized' : ''} ${isSlowConnection ? 'reduced-motion' : ''}`}>
      <Providers>
        <ReduxProvider>
          <CartModalProvider>
            <ModalProvider>
              <PreviewSliderProvider>
                <Header />
                <main className="min-h-screen pt-[120px] md:pt-0">
                  {children}
                </main>
                <QuickViewModal />
                <CartSidebarModal />
                <PreviewSliderModal />
              </PreviewSliderProvider>
            </ModalProvider>
          </CartModalProvider>
        </ReduxProvider>
      </Providers>
      <ScrollToTop />
      <Footer />
      <Toaster 
        position={isMobile ? "top-center" : "top-right"}
        toastOptions={{
          duration: isMobile ? 3000 : 4000,
        }}
      />
    </div>
  );
}
