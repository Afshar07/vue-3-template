import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {useSideBarStore} from "@/stores/sideBar";
// import auth from "@/middlewares/auth";
const Doc: any = document
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: 'Trader | Login'
            },
            component: () => import('../views/index.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/dashboard.vue'),
            meta: {
                auth: true,
                title: 'Trader | Dashboard'
            }
        },
        {
            path: '/user/profile',
            name: 'profile',
            component: () => import('../views/user/editProfile.vue'),
            meta: {
                auth: true,
                title: 'Trader | My Account'
            }
        },
        {
            path: '/dashboard/AllOrders',
            name: 'AllOrders',
            component: () => import('../views/dashboard/AllOrders.vue'),
            meta: {
                auth: true,
                title: 'Trader | All Orders'
            }
        },
        {
            path: '/dashboard/users/AllUsers',
            name: 'AllUsers',
            component: () => import('../views/user/AllUsers.vue'),
            meta: {
                auth: true,
                title: 'Trader | All Users'
            }
        },
        {
            path: '/dashboard/MyOrders',
            name: 'MyOrders',
            component: () => import('../views/dashboard/MyOrders.vue'),
            meta: {
                auth: true,
                title: 'Trader | My Orders'
            }
        },
        {
            path: '/dashboard/CreateOrder',
            name: 'CreateOrder',
            component: () => import('../views/dashboard/CreateOrder.vue'),
            meta: {
                auth: true,
                title: 'Trader | Create Order'
            }
        },
        {
            path: '/user/apiKeys',
            name: 'apiKeys',
            component: () => import('../views/user/apiKeys.vue'),
            meta: {
                auth: true,
                title: 'Trader | api Keys'
            }
        },
    ]
})
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to?.meta?.title) {
        Doc.title = to?.meta?.title
    }
    if (to?.meta?.auth) {
        if (authStore.isLogged) {
            next()
        } else {
            next({name: 'index'})
        }
    } else {
        next()
    }
    const sideBarStore = useSideBarStore()
    if(sideBarStore.showSideBar){
        sideBarStore.showSideBar = false
    }
})
export default router
