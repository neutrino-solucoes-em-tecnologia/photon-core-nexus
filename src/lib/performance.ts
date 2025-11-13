// Performance monitoring utilities

/**
 * Report Web Vitals to analytics
 */
export const reportWebVitals = (metric: any) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(metric);
  }
  
  // Send to analytics in production
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

/**
 * Lazy load images when they enter the viewport
 */
export const observeImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Preload critical resources
 */
export const preloadResources = (urls: string[], type: 'font' | 'image' | 'script' = 'image') => {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    switch (type) {
      case 'font':
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        break;
      case 'script':
        link.as = 'script';
        break;
      default:
        link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Check if device has reduced motion preference
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get network information
 */
export const getNetworkInfo = () => {
  const nav = navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }
  
  return null;
};

/**
 * Check if user is on slow connection
 */
export const isSlowConnection = (): boolean => {
  const networkInfo = getNetworkInfo();
  if (!networkInfo) return false;
  
  return networkInfo.effectiveType === 'slow-2g' || 
         networkInfo.effectiveType === '2g' ||
         networkInfo.saveData === true;
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
