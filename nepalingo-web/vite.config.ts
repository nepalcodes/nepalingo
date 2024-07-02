import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// Dynamically import PostCSS configuration
async function loadPostCSSConfig() {
  const postcssConfig = await import('./postcss.config.ts');
  return postcssConfig.default || postcssConfig;
}

export default defineConfig(async () => {
  const postcss = await loadPostCSSConfig();
  
  return {
    plugins: [
      react(),
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss
    }
  };
});
