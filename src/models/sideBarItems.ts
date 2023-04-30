import {navItems} from "@/models/navigationItems";
export const sideBarItems:navItems[] = [
    {
        title: 'DashBoard',
        link: '/dashboard',
        icon: 'DashboardIcon',
        hasChildren: false,
        hasAccess: true,
        children: []
    },
    {
        title: 'Profile',
        link: '',
        icon: 'UserIcon',
        hasChildren: true,
        hasAccess: true,
        children: [
            {
                title: 'edit Profile',
                link: '/user/profile',
                hasAccess: true,
            },
            {
                title: 'Api Keys',
                link: '/user/apiKeys',
                hasAccess: true,
            },
        ]
    },
    {
        title: 'Users',
        link: '',
        icon: 'UsersIcon',
        hasChildren: true,
        hasAccess: true,
        children: [
            {
                title: 'All Users',
                link: '/dashboard/users/AllUsers',
                hasAccess: true,
            },
        ]
    },
    {
        title: 'Orders',
        link: '',
        icon: 'OrderIcon',
        hasChildren: true,
        hasAccess: true,
        children: [
            {
                title: 'All Orders',
                link: '/dashboard/AllOrders',
                hasAccess: true,
            },
            {
                title: 'My Orders',
                link: '/dashboard/MyOrders',
                hasAccess: true,
            },
            {
                title: 'Create Order',
                link: '/dashboard/CreateOrder',
                hasAccess: true,
            },
        ]
    },
]
