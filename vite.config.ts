import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    strictPort: true,
  },
  plugins: [react()],
  build: {
    // react-snap prerenders with a bundled Chromium ~v73, which cannot parse
    // optional chaining / nullish coalescing. Lower the output target so the
    // prerender browser can execute the bundle and emit real HTML.
    target: "chrome73",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
