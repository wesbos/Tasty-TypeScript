import { defineConfig } from 'vite';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'


export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildCommonjs(['zbar.wasm'])
      ]
    }
  }
});
