# Performance Optimization Guide

## 🚀 Implemented Optimizations

This document outlines all performance optimizations implemented to improve Lighthouse scores from **22 to 90+**.

### 1. Code Splitting & Lazy Loading ✅

**Problem**: Large initial bundle (1,376 KiB unused JavaScript)
**Solution**: Route-based code splitting with React.lazy()

```typescript
// All pages are now lazy loaded
const Home = lazy(() => import("./pages/Home"));
const Categoria = lazy(() => import("./pages/Categoria"));
// ... etc
```

**Expected Impact**:
- ⬇️ Initial bundle size: ~70% reduction
- ⬇️ First Contentful Paint: From 12.4s to <2s
- ⬇️ Largest Contentful Paint: From 22.8s to <3s

---

### 2. Build Optimization ✅

**Vite Configuration Enhancements**:

#### Manual Chunk Splitting
- `react-vendor`: React core libraries
- `ui-vendor`: Radix UI components
- `query-vendor`: TanStack Query
- `icons`: Lucide React icons

#### Minification
- Terser minification enabled
- Console logs removed in production
- Dead code elimination

#### Compression
- Gzip compression for all assets >10KB
- Brotli compression (better than gzip)
- Asset optimization and fingerprinting

**Expected Impact**:
- ⬇️ JavaScript bundle: 1,376 KiB reduction
- ⬇️ Total page size: ~60% reduction
- ⬆️ Cache efficiency: Improved with chunk splitting

---

### 3. Image Optimization ✅

**New Component**: `OptimizedImage.tsx`

Features:
- Lazy loading by default
- Placeholder while loading
- Async decoding
- Responsive sizing

Usage:
```tsx
<OptimizedImage 
  src={image} 
  alt={title}
  loading="lazy"
  className="w-full"
/>
```

**Expected Impact**:
- ⬇️ Image payload: 102 KiB savings
- ⬆️ LCP improvement: 30-40%

---

### 4. PWA & Caching ✅

**Service Worker Configuration**:

Cache Strategies:
- **Google Fonts**: CacheFirst (1 year)
- **Images**: CacheFirst (30 days)
- **Static Assets**: Automatic caching

**Expected Impact**:
- ⬆️ Repeat visit speed: 90% faster
- ⬇️ Network requests: Reduced by 70% on repeat visits
- 📱 Offline capability: Basic functionality

---

### 5. Resource Hints ✅

**HTML Optimizations**:
- DNS prefetch for Google Fonts
- Preconnect for critical origins
- Font display swap for non-blocking rendering

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Expected Impact**:
- ⬇️ Render blocking time: 300ms savings
- ⬆️ FCP improvement: 15-20%

---

### 6. Component Optimization ✅

**React Performance**:
- `React.memo()` on ArticleCard
- Prevents unnecessary re-renders
- Performance utilities in `lib/performance.ts`

**Utilities Added**:
- `debounce()` - For input handlers
- `throttle()` - For scroll/resize events
- `isSlowConnection()` - Adaptive loading
- `prefersReducedMotion()` - Accessibility

---

## 📊 Expected Results

### Before
- **Performance Score**: 22/100
- **FCP**: 12.4s
- **LCP**: 22.8s
- **TBT**: 40ms
- **Bundle Size**: ~4,288 KiB

### After (Projected)
- **Performance Score**: 90+/100
- **FCP**: <1.8s
- **LCP**: <2.5s
- **TBT**: <100ms
- **Bundle Size**: ~1,200 KiB (compressed: ~350 KiB)

---

## 🛠️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

This will:
1. Split code into optimized chunks
2. Minify JavaScript with Terser
3. Compress assets with Gzip & Brotli
4. Generate service worker
5. Optimize images

### Preview Production Build
```bash
npm run preview
```

---

## 📈 Monitoring

### Web Vitals
Use the performance utilities:

```typescript
import { reportWebVitals } from '@/lib/performance';

// In your app
reportWebVitals(console.log);
```

### Network-Aware Loading
```typescript
import { isSlowConnection } from '@/lib/performance';

if (isSlowConnection()) {
  // Load lighter versions
  // Reduce image quality
  // Disable animations
}
```

---

## 🎯 Best Practices

### Images
- Always use `OptimizedImage` component
- Provide width/height to prevent layout shift
- Use lazy loading except for above-the-fold images
- Consider WebP format for better compression

### Components
- Wrap expensive components in `React.memo()`
- Use `useMemo()` for heavy computations
- Use `useCallback()` for function props
- Virtualize long lists with `@tanstack/react-virtual`

### Fonts
- Keep font-display: swap
- Preload critical fonts
- Limit font weights and variants

### Third-Party Scripts
- Defer non-critical scripts
- Use async for analytics
- Self-host when possible

---

## 🔍 Testing

### Lighthouse
```bash
# Chrome DevTools > Lighthouse
# Run in incognito mode
# Test on mobile (Moto G Power)
# Use "Slow 4G" throttling
```

### Web Vitals
```bash
npm install -D web-vitals

# Then measure in production:
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
```

---

## 📝 Next Steps (Future Optimizations)

1. **Image CDN**: Consider Cloudinary or imgix
2. **Edge Caching**: Implement with Cloudflare or Vercel
3. **Critical CSS**: Inline critical CSS in `<head>`
4. **Prefetch Routes**: Prefetch likely navigation targets
5. **Bundle Analysis**: Use `rollup-plugin-visualizer`
6. **Database Optimization**: If using API, add Redis cache
7. **Font Subsetting**: Only include required glyphs

---

## 🎓 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)
- [PWA Best Practices](https://web.dev/pwa/)

---

**Last Updated**: November 11, 2025
**Maintained By**: Photon Media Development Team
