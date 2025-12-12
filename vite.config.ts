import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // correctly resolve @components to src/components
      "@components": path.resolve(process.cwd(), "src/components"),
      "@features": path.resolve(process.cwd(), "src/features"),
      "@api": path.resolve(process.cwd(), "src/api"),
      "@constants": path.resolve(process.cwd(), "src/constants"),
      "@hooks": path.resolve(process.cwd(), "src/hooks"),
    },
  },
});
