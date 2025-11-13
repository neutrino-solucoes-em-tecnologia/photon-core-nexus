import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './index.html',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ['html', 'body'],
          deep: [/^animate-/, /^hover:/, /^group-hover:/, /^dark:/],
          greedy: [/^data-/, /^aria-/],
        },
      },
    } : {}),
  },
};
