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
        title: "مالی ایران | ورود",
      },
      component: () => import("../views/index.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/dashboard.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | مالی ایران",
      },
    },
    // {
    //   path: "/user/profile",
    //   name: "profile",
    //   component: () => import("../views/user/editProfile.vue"),
    //   meta: {
    //     auth: true,
    //     title: "مالی ایران | حساب کاربری ",
    //   },
    // },
    {
      path: "/dashboard/users/AllUsers",
      name: "AllUsers",
      component: () => import("../views/admin/user/AllUsers.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | لیست کاربران",
      },
    },
    {
      path: "/user/profile",
      name: "user-profile",
      component: () => import("../views/admin/user/editProfile.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | حساب کاربری ",
      },
    },
    {
      path: "/user/my-shops",
      name: "user-my-shops",
      component: () => import("../views/admin/user/myShops.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | فروشگاه های من ",
      },
    },
    {
      path: "/requests/list",
      name: "requests-list",
      component: () => import("../views/admin/requests/RequestsList.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | لیست درخواست ها",
      },
    },
    {
      path: "/reports/list",
      name: "reports-list",
      component: () => import("../views/admin/reports/ReportsList.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | لیست گزارشات",
      },
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/test.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | تست",
      },
    },
    // reports start

    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/reports/index.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | گزارشات",
      },
    },
    {
      path: "/reports/seasonal-report",
      name: "seasonalReports",
      component: () => import("../views/reports/seasonalReports.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | گزارشات فصلی",
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
        title: "مالی ایران | خدمات",
      },
    },
    {
      path: "/services/statement",
      name: "statement",
      //@ts-ignore
      component: () => import("../views/services/statement.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | اظهار‌نامه",
      },
    },
    // services end

    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/chat/index.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | چت",
      },
    },
    {
      path: "/chat/:username",
      name: "conversation",
      component: () => import("../views/chat/SingleChat.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | چت با کاربر",
      },
    },
    {
      path: "/vipService",
      name: "vipService",
      component: () => import("../views/VIP/index.vue"),
      meta: {
        auth: true,
        title: "مالی ایران | گزارشات",
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
