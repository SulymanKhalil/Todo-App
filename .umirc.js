import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: "TaskFlow",
  antd: {},
  model: {},
  initialState: {},
  tailwindcss: {},

  routes: [
    {
      path: "/login",
      component: "loginPage",
      layout: false,
    },
    {
      path: "/",
      component: "@/layouts/index",
      routes: [
        { path: "/", component: "index" },
        { path: "/about", component: "about" },
        { path: "/features", component: "features" },

        {
          path: "/admin",
          component: "admin",
          wrappers: ["@/wrappers/Auth"],
        },
      ],
    },
  ],

  locale: {
    default: "en",
    baseNavigator: true,
    antd: true,
    title: false,
    baseSeparator: "-",
  },

  styles: [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  ],
  jsMinifier: "esbuild",
  esbuildMinifyIIFE: true,
  npmClient: "npm",
});
