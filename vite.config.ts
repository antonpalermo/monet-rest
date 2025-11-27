import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./client/routes",
      generatedRouteTree: "./client/routeTree.gen.ts"
    }),
    react(),
    tailwind(),
    cloudflare()
  ]
});
