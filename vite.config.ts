import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "./",
  plugins: [dts({ rollupTypes: true }), react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "jotaiRecoilAdapter",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
} satisfies UserConfig);
