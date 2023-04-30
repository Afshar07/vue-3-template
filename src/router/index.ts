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
                title: 'Dashboard | Login'
            },
            component: () => import('../views/index.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/dashboard.vue'),
            meta: {
                auth: true,
                title: 'Dashboard | Dashboard'
            }
        },
        {
            path: '/user/profile',
            name: 'profile',
            component: () => import('../views/user/editProfile.vue'),
            meta: {
                auth: true,
                title: 'Dashboard | My Account'
            }
        },

        {
            path: '/dashboard/users/AllUsers',
            name: 'AllUsers',
            component: () => import('../views/user/AllUsers.vue'),
            meta: {
                auth: true,
                title: 'Dashboard | All Users'
            }
        },
        {
            path: '/user/apiKeys',
            name: 'apiKeys',
            component: () => import('../views/user/apiKeys.vue'),
            meta: {
                auth: true,
                title: 'Dashboard | api Keys'
            }
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/test.vue'),
            meta: {
                auth: true,
                title: 'Dashboard | test'
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
