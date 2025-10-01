import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from "web-vitals";

const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

function getConnectionSpeed() {
  const nav = navigator as any;
  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection;

  if (connection?.effectiveType) {
    return connection.effectiveType;
  }
  return "unknown";
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
}

export function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    is_mobile: isMobileDevice(),
    device_type: isMobileDevice() ? "mobile" : "desktop",
  };

  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", metric.name, metric.value, metric);
    return;
  }

  const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: "POST",
      credentials: "omit",
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  try {
    // onFID was deprecated in favor of onINP
    onTTFB((metric) => sendToAnalytics(metric));
    onLCP((metric) => sendToAnalytics(metric));
    onCLS((metric) => sendToAnalytics(metric));
    onFCP((metric) => sendToAnalytics(metric));
    onINP((metric) => sendToAnalytics(metric));
  } catch (err) {
    console.error("[Web Vitals] Error:", err);
  }
}
