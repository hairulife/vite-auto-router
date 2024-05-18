import { createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob("../views/**/page.js", {
  eager: true,
  import: "default",
});

const components = import.meta.glob("../views/**/index.vue");

const routes = Object.entries(pages).map(([path, meta]) => {
  const componentPath = path.replace("/page.js", "/index.vue");
  path = path.replace("../views", "").replace("/page.js", "") || "/";
  const name = path.split("/").filter(Boolean).join("-") || "home";
  return {
    path,
    name,
    meta,
    component: components[componentPath],
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
