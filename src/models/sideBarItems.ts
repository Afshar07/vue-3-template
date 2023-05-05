import {navItems} from "@/models/navigationItems";
export const sideBarItems:navItems[] = [
        // {
        //     title: 'داشبورد',
        //     link: '/dashboard',
        //     icon: 'DashboardIcon',
        //     hasChildren: false,
        //     hasAccess: true,
        //     children: []
        // },
    {
        title: 'گزارشات',
        link: '/reports',
        icon: 'ReportsIcon',
        hasChildren: false,
        hasAccess: true,
        children: []
    },
    {
        title: 'خدمات',
        link: '/services',
        icon: 'ServicesIcon',
        hasChildren: false,
        hasAccess: true,
        children: []
    },
    {
        title: 'چت',
        link: '/chat',
        icon: 'ChatIcon',
        hasChildren: false,
        hasAccess: true,
        children: []
    },
    {
        title: 'VIP',
        link: '/vipService',
        icon: 'VIPIcon',
        hasChildren: false,
        hasAccess: true,
        children: []
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
    // {
    //     title: 'Users',
    //     link: '',
    //     icon: 'UsersIcon',
    //     hasChildren: true,
    //     hasAccess: true,
    //     children: [
    //         {
    //             title: 'All Users',
    //             link: '/dashboard/users/AllUsers',
    //             hasAccess: true,
    //         },
    //     ]
    // },
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
]
