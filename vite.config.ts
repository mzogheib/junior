import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    emptyOutDir: true,
    outDir: "../dist",
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
