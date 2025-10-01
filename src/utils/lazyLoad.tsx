import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

interface LoadingProps {
  text?: string;
}

const DefaultLoader = ({ text = "Loading..." }: LoadingProps) => {
  const { isMobile } = useMobilePerformance();
  
  return (
    <div className={`flex items-center justify-center ${isMobile ? 'min-h-[150px]' : 'min-h-[200px]'}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-primary mx-auto mb-2 ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}></div>
        <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{text}</p>
      </div>
    </div>
  );
};

export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingComponent?: ComponentType<LoadingProps>
) {
  const Loader = loadingComponent || DefaultLoader;
  
  return dynamic(importFunc, {
    loading: () => <Loader />,
    ssr: true,
  });
}

export function withSuspense<T extends ComponentType<any>>(
  Component: T,
  fallback?: React.ReactNode
): T {
  const FallbackComponent = fallback || <DefaultLoader />;
  
  const WrappedComponent = (props: any) => (
    <Suspense fallback={FallbackComponent}>
      <Component {...props} />
    </Suspense>
  );
  
  return WrappedComponent as T;
}

// Mobile-optimized lazy loading hook
export function useMobileLazyLoad() {
  const { isMobile, isSlowConnection } = useMobilePerformance();
  
  return {
    shouldLazyLoad: isMobile || isSlowConnection,
    loadingOffset: isMobile ? "50px" : "200px",
    loadingDelay: isSlowConnection ? 100 : 0,
  };
}