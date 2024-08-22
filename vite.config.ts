/// <reference types="vite/client" />
// @ts-ignore
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import { resolve } from 'path';

const __dirname = fileURLToPath(new URL('./', import.meta.url));
console.log( resolve(__dirname, "src"))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3010, // Replace with the desired port number
  },
  resolve: {
     alias: {
  //     // '@': fileURLToPath(new URL('./src', import.meta.url))
       "@": resolve(__dirname, "src"),
     },
  },
});
