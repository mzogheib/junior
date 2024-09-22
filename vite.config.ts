import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      misc: path.resolve(__dirname, "./src/misc"),
      pages: path.resolve(__dirname, "./src/pages"),
      services: path.resolve(__dirname, "./src/services"),
      sharedState: path.resolve(__dirname, "./src/sharedState"),
    },
  },
});
