import { defineConfig } from "@umijs/max";

export default defineConfig({
  title: "TaskFlow",
  antd: {},
  model: {},
  initialState: {},
  tailwindcss: {},

  layout: false,

  routes: [
    {
      path: "/login",
      component: "loginPage",
      layout: false,
    },
    {
      path: "/",
      component: "@/layouts/MainLayout",
      wrappers: ["@/wrappers/Auth"],
      routes: [
        { path: "/", component: "index" },
        { path: "/about", component: "about" },
        { path: "/features", component: "features" },

        {
          path: "/admin",
          component: "admin",
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
