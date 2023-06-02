import { navItems } from "@/models/navigationItems";
import { useAuthStore } from "@/stores/auth";


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
    hasAccess: ['subscriber'],
    children: [],
  },
  {
    title: "گزارشات",
    link: "/reports",
    icon: "ReportsIcon",
    hasChildren: false,
    hasAccess: ['subscriber'],
    children: [],
  },

  {
    title: "چت",
    link: "/chat/1",
    icon: "ChatIcon",
    hasChildren: false,
    hasAccess: ['subscriber'],
    children: [],
  },
  {
    title: "چت",
    link: "/chat",
    icon: "ChatIcon",
    hasChildren: false,
    hasAccess: ['admin'],
    children: [],
  },
  {
    title: "VIP",
    link: "/vipService",
    icon: "VIPIcon",
    hasChildren: false,
    hasAccess: ['subscriber'],
    children: [],
  },
  {
    title: "اکانت",
    link: "",
    icon: "UserIcon",
    hasChildren: true,
    hasAccess: ['subscriber'],
    children: [
      {
        title: "حساب کاربری",
        link: "/user/profile",
        hasAccess:  ['subscriber'],
      },
      {
        title: "فروشگاه ها",
        link: "/user/my-shops",
        hasAccess:  ['subscriber'],
      },
    ],
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
    hasAccess: ['admin'],
    children: [
      {
        title: "لیست",
        link: "/dashboard/users/AllUsers",
        hasAccess:  ['admin'],
      },
    ],
  },
  {
    title: "درخواست ها",
    link: "",
    icon: "ListIcon",
    hasChildren: true,
    hasAccess: ['admin'],
    children: [
      {
        title: "لیست",
        link: "/requests/list",
        hasAccess:  ['admin'],
      },
    ],
  },
  {
    title: "گزارشات",
    link: "",
    icon: "ListIcon",
    hasChildren: true,
    hasAccess: ['admin'],
    children: [
      {
        title: "لیست",
        link: "/reports/list",
        hasAccess:  ['admin'],
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
