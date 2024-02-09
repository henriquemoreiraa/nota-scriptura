import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
      "shadcn/utils": new URL("./src/lib/utils.ts", import.meta.url).pathname,
    },
    globals: true,
  },
});
