import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mobile-optimized class name utility
export function cnMobile(...inputs: ClassValue[]) {
  const baseClasses = twMerge(clsx(inputs));
  
  // Add mobile-specific optimizations
  const mobileClasses = [
    'touch-manipulation',
    'mobile-optimized'
  ];
  
  return twMerge(baseClasses, ...mobileClasses);
}

// Responsive class name utility
export function cnResponsive(
  mobile: ClassValue,
  tablet?: ClassValue,
  desktop?: ClassValue
) {
  const classes = [
    mobile,
    tablet && `sm:${tablet}`,
    desktop && `lg:${desktop}`
  ].filter(Boolean);
  
  return twMerge(clsx(classes));
}