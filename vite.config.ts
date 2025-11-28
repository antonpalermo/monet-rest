import { defineConfig } from "vite";

import path from "path";
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
  ],
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./client"),
      "@components": path.resolve(__dirname, "./client/components"),
      "@lib": path.resolve(__dirname, "./client/lib"),
      "@hooks": path.resolve(__dirname, "./client/hooks"),
      "@providers": path.resolve(__dirname, "./client/providers"),
      "@ui": path.resolve(__dirname, "./client/components/ui"),
      "@workers": path.resolve(__dirname, "./workers")
    }
  }
});
