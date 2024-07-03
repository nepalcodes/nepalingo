// Using cjs instead of this file because vite is still using postcss-load-config v4 which
// does not support esm with typescript
// https://github.com/postcss/postcss-load-config/issues/239 (fix added in v4)
// https://github.com/vitejs/vite/issues/15869#issuecomment-1939414914
// https://github.com/vitejs/vite/pull/15235

export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
};