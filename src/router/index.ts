import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; //

NProgress.configure({ showSpinner: false });
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/index/index/index.vue"),
        name: "index",
      },
      {
        path: "mine",
        component: () => import("@/views/index/mine/index.vue"),
        name: "mine",
      },
      {
        path: "recycler",
        component: () => import("@/views/index/recycler/index.vue"),
        name: "recycler",
      },
      {
        path: "work",
        component: () => import("@/views/index/work/index.vue"),
        name: "work",
      },
      {
        path: "template",
        component: () => import("@/views/index/template/index.vue"),
        name: "template",
      },
      {
        path: "data/:uuid",
        component: () => import("@/views/index/data/index.vue"),
        name: "data",
      },
    ],
  },
  {
    path: "/editor",
    component: () => import("@/views/editor/index.vue"),
  },
  {
    path: "/user",
    component: () => import("@/views/user/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/user/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/user/register.vue"),
      },
      {
        path: "find",
        component: () => import("@/views/user/find.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start(); // start progress bar
  return true;
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
