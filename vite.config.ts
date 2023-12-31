/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  base: "/mortgage-calc/",
  test: {
    globals: true,
    environment: "jsdom",
    mockReset: true,
    setupFiles: ["./test/setup.ts"],
  },
});
