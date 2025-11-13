import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
// @ts-ignore
import { performanceOptimizationsPlugin } from './vite-plugins/performance-optimizations.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    performanceOptimizationsPlugin(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    // PWA configuration
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Photon Media',
        short_name: 'Photon',
        description: 'Rede internacional de portais de conteúdo inteligente',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache strategies
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        passes: 2, // Multiple passes for better compression
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
        dead_code: true,
        toplevel: true,
        unused: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks more granularly
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Radix UI components - split by usage
            if (id.includes('@radix-ui')) {
              // Only frequently used components in main chunk
              if (id.includes('dialog') || id.includes('dropdown-menu') || id.includes('slot')) {
                return 'ui-core';
              }
              // Less frequently used components in separate chunk
              return 'ui-extended';
            }
            // Query
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Other vendors
            return 'vendor';
          }
        },
        // Optimize asset names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // Increase chunk size warning limit (in KB)
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging (disable for max perf)
    sourcemap: false,
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  // Enable dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lovable-tagger'],
  },
}));
