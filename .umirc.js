import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: "TaskFlow",
  antd: {},
  model: {},

  tailwindcss: {},

  styles: [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    "./tailwind.css",
  ],
  jsMinifier: "esbuild",
  esbuildMinifyIIFE: true,

  npmClient: "npm",
});
