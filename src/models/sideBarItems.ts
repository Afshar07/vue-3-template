import { navItems } from "@/models/navigationItems";
import { useAuthStore } from "@/stores/auth";

const hasAccess = function (accessRoles: string[]): boolean {
  const authStore = useAuthStore();
  if (!accessRoles || accessRoles.includes(authStore.getUser!.role)) {
    return true;
  }
  return false;
};

export const sideBarItems: navItems[] = [
  // {
  //     title: 'داشبورد',
  //     link: '/dashboard',
  //     icon: 'DashboardIcon',
  //     hasChildren: false,
  //     hasAccess: true,
  //     children: []
  // },
  {
    title: "خدمات",
    link: "/services",
    icon: "ServicesIcon",
    hasChildren: false,
    hasAccess: true,
    children: [],
  },
  {
    title: "گزارشات",
    link: "/reports",
    icon: "ReportsIcon",
    hasChildren: false,
    hasAccess: true,
    children: [],
  },

  {
    title: "چت",
    link: "/chat",
    icon: "ChatIcon",
    hasChildren: false,
    hasAccess: true,
    children: [],
  },
  {
    title: "VIP",
    link: "/vipService",
    icon: "VIPIcon",
    hasChildren: false,
    hasAccess: true,
    children: [],
  },
  {
    title: " اکانت",
    link: "/user/profile",
    icon: "UserIcon",
    hasChildren: false,
    hasAccess: true,
    children: [],
  },
  // {
  //     title: 'Profile',
  //     link: '',
  //     icon: 'UserIcon',
  //     hasChildren: true,
  //     hasAccess: true,
  //     children: [
  //         {
  //             title: 'edit Profile',
  //             link: '/user/profile',
  //             hasAccess: true,
  //         },
  //         {
  //             title: 'Api Keys',
  //             link: '/user/apiKeys',
  //             hasAccess: true,
  //         },
  //     ]
  // },
  {
    title: "کاربران",
    link: "",
    icon: "UsersIcon",
    hasChildren: true,
    hasAccess: true,
    children: [
      {
        title: "لیست",
        link: "/dashboard/users/AllUsers",
        hasAccess: true,
      },
    ],
  },
  {
    title: "درخواست ها",
    link: "",
    icon: "ListIcon",
    hasChildren: true,
    hasAccess: ["vendor"],
    children: [
      {
        title: "لیست",
        link: "/requests/list",
        hasAccess: true,
      },
    ],
  },
  // {
  //     title: 'Orders',
  //     link: '',
  //     icon: 'OrderIcon',
  //     hasChildren: true,
  //     hasAccess: true,
  //     children: [
  //         {
  //             title: 'All Orders',
  //             link: '/dashboard/AllOrders',
  //             hasAccess: true,
  //         },
  //         {
  //             title: 'My Orders',
  //             link: '/dashboard/MyOrders',
  //             hasAccess: true,
  //         },
  //         {
  //             title: 'Create Order',
  //             link: '/dashboard/CreateOrder',
  //             hasAccess: true,
  //         },
  //     ]
  // },
];
