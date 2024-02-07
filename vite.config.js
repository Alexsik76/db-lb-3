import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "node:url";

const filesNeedToExclude = ["./queries.json",];

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  plugins: [vue()],
  build: {
    manifest: true,
    rollupOptions: {
      external: [
        ...filesPathToExclude
      ],
    },
  },
},
)
