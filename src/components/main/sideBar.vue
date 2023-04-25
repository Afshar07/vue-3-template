<template>
  <div class="drawer drawer-mobile fixed"
       :class="{'!z-[99]':sideBarStore.showSideBar,'!z-[1]':!sideBarStore.showSideBar}">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
    <div class="drawer-side shadow-2xl">
      <label ref="sideBarLabel" @click="countTouch" for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-[16rem] bg-white dark:bg-dark-muted  text-base-content">
        <h1 class="font-bold text-gray-800 dark:text-white text-2xl p-2">{{ appName }}</h1>
        <!-- Sidebar content here -->
        <NavItem :class="{'collapse-open':isSelectedItem(item)}" @click="setSelectedNavItem(item)"
                 v-for="(item,idx) in navigationItems" :key="idx" :item="item"></NavItem>
        <NavItemCollapse @click="setSelectedNavItem(item)" v-for="(item,idx) in navigationItems" :key="idx"
                         :item="item"></NavItemCollapse>
        <div @click="logout" class="my-1 text-black dark:text-white fill-black dark:fill-white">
          <div
              class=" flex items-center gap-2 hover:fill-white rounded-xl px-3.5 py-3 cursor-pointer hover:bg-primary hover:text-white text-md font-medium">
            <DoorIcon></DoorIcon>
            <span class="mt-1">
            Logout
            </span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch , inject} from "vue";
import KeyIcon from "../icons/KeyIcon.vue";
import TasksIcon from "../icons/TasksIcon.vue";
import {useSideBarStore} from "../../stores/sideBar.js";
import CircleIcon from "@/components/icons/CircleIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import type {navItems} from "@/models/navigationItems";
import NavItemCollapse from "@/components/utilities/NavItemCollapse.vue";
import NavItem from "@/components/utilities/NavItem.vue";
import DoorIcon from "@/components/icons/DoorIcon.vue";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

const router = useRouter()
const authStore: any = useAuthStore()
const sideBarStore = useSideBarStore()
const sideBarLabel: any = ref(null)
const selectedNavItem = ref(null)
let user = authStore.user
let getSideBarStatus = computed(() => {
  return sideBarStore.showSideBar
})

const helper:any = inject('helper');
const appName = helper.appName;

function isSelectedItem(item: any): Boolean {
  //@ts-ignore
  return selectedNavItem?.value?.title === item.title;
}

watch(getSideBarStatus, async (val) => {
  //@ts-ignore
  sideBarLabel.value.click()
})
let count = ref(0)

function countTouch() {
  if (count.value === 0) {
    count.value++
  } else {
    sideBarStore.showSideBar = false
    count.value = 0
    sideBarLabel.value.click()
  }
}

function setSelectedNavItem(item: any) {
  if (item === selectedNavItem.value) {
    selectedNavItem.value = null
  } else {
    selectedNavItem.value = item
  }
}

const navigationItems = reactive<navItems[]>([
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
    hasAccess: user.role !== 'Subscriber',
    children: [
      {
        title: 'All Users',
        link: '/dashboard/users/AllUsers',
        hasAccess: user.role !== 'Subscriber',
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
        hasAccess: user.role !== 'Subscriber',
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
])

function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>

</style>
