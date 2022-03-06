// const path = require("path");
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
const { dependencies } = require("./package.json");
import styleImport, { VantResolve } from "vite-plugin-style-import";

const chunks = Object.entries(dependencies as { [key: string]: string }).map(
  ([key, value]) => key,
);
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  build: {
    cssCodeSplit: true,
    target: "modules",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview/index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            for (let i = 0; i < chunks.length; i++) {
              if (id.includes(chunks[i])) {
                return chunks[i];
              }
            }
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
