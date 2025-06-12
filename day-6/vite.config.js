import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
  },
}); 