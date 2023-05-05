import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSideBarStore } from "@/stores/sideBar";
// import auth from "@/middlewares/auth";
const Doc: any = document;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      meta: {
        title: "داشبورد | ورود",
      },
      component: () => import("../views/index.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/dashboard.vue"),
      meta: {
        auth: true,
        title: "داشبورد | داشبورد",
      },
    },
    {
      path: "/user/profile",
      name: "profile",
      component: () => import("../views/user/editProfile.vue"),
      meta: {
        auth: true,
        title: "داشبورد | حساب کاربری ",
      },
    },

    {
      path: "/dashboard/users/AllUsers",
      name: "AllUsers",
      component: () => import("../views/user/AllUsers.vue"),
      meta: {
        auth: true,
        title: "داشبورد | لیست کاربران",
      },
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/test.vue"),
      meta: {
        auth: true,
        title: "داشبورد | تست",
      },
    },
    // reports start

    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/reports/index.vue"),
      meta: {
        auth: true,
        title: "داشبورد | گزارشات",
      },
    },
    {
      path: "/reports/seasonalReports",
      name: "seasonalReports",
      component: () => import("../views/reports/seasonalReports.vue"),
      meta: {
        auth: true,
        title: "داشبورد | گزارشات فصلی",
      },
    },
    // reports end

    // services start
    {
      path: "/services",
      name: "services",
      //@ts-ignore
      component: () => import("../views/services/index.vue"),
      meta: {
        auth: true,
        title: "داشبورد | خدمات",
      },
    },
    {
      path: "/services/statement",
      name: "statement",
      //@ts-ignore
      component: () => import("../views/services/statement.vue"),
      meta: {
        auth: true,
        title: "داشبورد | اظهار‌نامه",
      },
    },
    // services end

    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/chat/index.vue"),
      meta: {
        auth: true,
        title: "داشبورد | چت",
      },
    },
    {
        path: "/chat/:username",
        name: "conversation",
        component: () => import("../views/chat/SingleChat.vue"),
        meta: {
          auth: true,
          title: "داشبورد | چت با کاربر",
        },
      },
    {
      path: "/vipService",
      name: "vipService",
      component: () => import("../views/VIP/index.vue"),
      meta: {
        auth: true,
        title: "داشبورد | گزارشات",
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to?.meta?.title) {
    Doc.title = to?.meta?.title;
  }
  if (to?.meta?.auth) {
    if (authStore.isLogged) {
      next();
    } else {
      next({ name: "index" });
    }
  } else {
    next();
  }
  const sideBarStore = useSideBarStore();
  if (sideBarStore.showSideBar) {
    sideBarStore.showSideBar = false;
  }
});
export default router;
