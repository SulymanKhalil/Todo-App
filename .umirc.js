import { defineConfig } from "@umijs/max";

export default defineConfig({
  antd: {},
  model: {},

  tailwindcss: {},

  styles: [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    "./tailwind.css",
  ],

  npmClient: "npm",
});
